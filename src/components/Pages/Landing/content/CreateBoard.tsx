import React from "react";
import { PageProp } from "components/Pages/PageContext";
import { Form, Segment } from "components/UI/PageComponents";
import { notifyToast } from "utils";

interface Props {
  page: {
    compFetch(type: string, action: string, queryParams?: any, errorHandler?: any): any;
    closeModal(): void;
    history: { push(url: string): void };
  };
}

class CreateBoard extends React.Component<Props, {}> {
  onCreateBoard = async ({ title, urlName }: { title: string; urlName: string }) => {
    const {
      page: { compFetch, closeModal, history }
    } = this.props;

    if (!title || !urlName) {
      const missing = [];
      if (!title) missing.push("BoardTitle");
      if (!urlName) missing.push("URL Name");
      notifyToast("error", `Missing ${missing.join(", ")}`);
      return;
    }

    const queryParams = {
      title,
      urlName
    };
    await compFetch("board", "ADD", queryParams).then((result: any) => {
      if (result) {
        closeModal();
        history.push(`/board/${urlName}`);
      }
    });
  };

  formItems = [
    { name: "boardTitle", placeholder: "Board Title", icon: "columns" },
    { name: "urlName", placeholder: "URL Name", icon: "link" }
  ];

  render() {
    return (
      <Segment margin>
        <Form items={this.formItems} submitBtnTitle="Create Board" onSubmit={this.onCreateBoard} />
      </Segment>
    );
  }
}

export default PageProp(CreateBoard);
