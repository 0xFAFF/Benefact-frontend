import React from "react";
import { PageProp, PageProps } from "components/Pages/PageContext";
import { Form, Input } from "components/UI/PageComponents";
import { notifyToast } from "utils";
import { string } from "prop-types";

interface Props {
  onClose(): void;
}

class ImportBoard extends React.Component<Props & PageProps, {}> {
  onCreateBoard = async (data: { board: any; urlName: string }) => {
    const { board, urlName } = data;
    const {
      page: { compFetch, history }
    } = this.props;

    const missing = [] as Array<string>;
    if (!board) missing.push("BoardTitle");
    if (!urlName) missing.push("URL Name");
    if (missing.length) {
      notifyToast("error", `Missing ${missing.join(", ")}`);
      return;
    }
    const queryParams = { Board: data.board, UrlName: data.urlName };
    await compFetch("board", "TRELLO_IMPORT", queryParams).then((result: any) => {
      if (result) {
        history.push(`/board/${urlName}`);
        notifyToast("success", `Created board ${board.name}`, { autoClose: 2000 });
      }
    });
  };

  render() {
    const trelloParse = (e: string) => {
      let result: any = null;
      try {
        let data = JSON.parse(e);
        const filter = ["id", "name", "labels", "cards", "lists"];
        const checklists = data.checklists.reduce((c: any, v: any) => {
          c[v.id] = v;
          return c;
        }, {});
        console.log(checklists);
        result = filter.reduce((r: any, f) => {
          r[f] = data[f];
          return r;
        }, {});
        result.cards = result.cards.map((c: any) => {
          const checklistString = (c.idChecklists as Array<string>)
            .map((cId: string) => {
              const cl = checklists[cId];
              if (!cl) return;
              const itemsString = cl.checkItems.map(
                (ci: any) => ` - [${ci.state === "complete" ? "x" : " "}] ${ci.name}`
              ).join("\n");
              return `### ${cl.name}\n\n${itemsString}`;
            })
            .filter(cls => Boolean(cls)).join("\n\n") + "\n\n";
          c.desc = checklistString + c.desc;
          return c;
        });
        console.log(result);
      } finally {
        return result;
      }
    };
    return (
      <Form
        submitBtnTitle="Create"
        cancelBtnTitle="Cancel"
        onSubmit={this.onCreateBoard}
        onCancel={this.props.onClose}
        keepAfterSubmit
      >
        {({ attach, value: { board } }: { attach: any; value: { board: any } }) => (
          <div className="section">
            <Input id="urlName" label="URL Name" icon="link" {...attach("urlName")} />
            {board && (
              <div className="section bg-primary">
                Trello data successfully imported for board {board.name}
              </div>
            )}
            <Input
              id="board"
              label="Paste Trello data"
              icon={board ? "check" : ""}
              {...attach("board", trelloParse, () => "")}
            />
          </div>
        )}
      </Form>
    );
  }
}

export default PageProp(ImportBoard);
