import React from "react";
import { PageProp } from "components/Pages/PageContext";
import { Form, Segment, Input } from "components/UI/PageComponents";
import { notifyToast } from "utils";

interface Props {
  page: {
    compFetch(type: string, action: string, queryParams?: any, errorHandler?: any): any;
    closeModal(): void;
    history: { push(url: string): void };
  };
}

class CreateBoard extends React.Component<Props, {}> {
  onCreateBoard = async ({
    title,
    urlName,
    createTemplate
  }: {
    title: string;
    urlName: string;
    createTemplate: boolean;
  }) => {
    const {
      page: { compFetch, closeModal, history }
    } = this.props;

    if (!title || !urlName) {
      const missing = [] as Array<string>;
      if (!title) missing.push("BoardTitle");
      if (!urlName) missing.push("URL Name");
      notifyToast("error", `Missing ${missing.join(", ")}`);
      return;
    }

    const queryParams = {
      title,
      urlName,
      createTemplate
    };

    await compFetch("board", "ADD", queryParams).then((result: any) => {
      if (result) {
        closeModal();
        history.push(`/board/${urlName}`);
        notifyToast("success", `Created board ${title}`, { autoClose: 2000 });
      }
    });
  };

  render() {
    return (
      <Segment margin>
        <Form
          submitBtnTitle="Create"
          cancelBtnTitle="Cancel"
          onSubmit={this.onCreateBoard}
          defaults={{ createTemplate: true }}
          keepAfterSubmit
        >
          {({ attach }: { attach: any }) => (
            <>
              <Input id="title" label="Board Title" icon="columns" {...attach("title")} />
              <Input id="urlName" label="URL Name" icon="link" {...attach("urlName")} />
              <Input
                id={`createTemplate`}
                className="row"
                label="Create Template?"
                type="checkbox"
                {...attach("createTemplate")}
              />
            </>
          )}
        </Form>
      </Segment>
    );
  }
}

export default PageProp(CreateBoard);
