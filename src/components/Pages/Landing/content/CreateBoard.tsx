import React from "react";
import { PageProp, PageProps } from "components/Pages/PageContext";
import { Form, Input } from "components/UI/PageComponents";
import { notifyToast } from "utils";

interface Props {
  onClose(): void;
}

class CreateBoard extends React.Component<Props & PageProps, {}> {
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
      page: { compFetch, history }
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
        history.push(`/board/${urlName}`);
        notifyToast("success", `Created board ${title}`, { autoClose: 2000 });
      }
    });
  };

  render() {
    return (
      <Form
        submitBtnTitle="Create"
        cancelBtnTitle="Cancel"
        onSubmit={this.onCreateBoard}
        onCancel={this.props.onClose}
        defaults={{ createTemplate: true }}
        keepAfterSubmit
      >
        {({ attach }: { attach: any }) => (
          <div className="section">
            <Input id="title" label="Board Title" icon="columns" {...attach("title")} />
            <Input id="urlName" label="URL Name" icon="link" {...attach("urlName")} />
            <Input
              id={`createTemplate`}
              className="row"
              label="Create with default board template?"
              type="checkbox"
              {...attach("createTemplate")}
            />
          </div>
        )}
      </Form>
    );
  }
}

export default PageProp(CreateBoard);
