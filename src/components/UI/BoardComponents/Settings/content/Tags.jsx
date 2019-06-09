import React from "react";
import { notifyToast } from "utils";
import DisplayTag from "components/UI/BoardComponents/Tags/DisplayTag";
import { Button, Form, Input, ButtonGroup } from "components/UI/PageComponents";
import {
  Colors,
  Characters
} from "components/UI/AddComponents/AddTag/components/CreateTag/options";

export class Tags extends React.Component {
  state = { editId: null, addTag: false };
  onUpdate = async tag => {
    await this.props.handleUpdate("tags", "UPDATE", tag).then(_ => {
      this.setState({ editId: null });
      notifyToast("success", "Updated tag", { autoClose: 2000 });
    });
  };
  onAdd = async tag => {
    await this.props.handleUpdate("tags", "ADD", tag).then(_ => {
      this.setState({ addTag: false });
      notifyToast("success", "Created new tag", { autoClose: 2000 });
    });
  };
  onDelete = async tag => {
    this.props.handleUpdate("tags", "DELETE", { id: tag.id }).then(_ => {
      notifyToast("success", "Deleted tag", { autoClose: 2000 });
    });
  };

  tagForm = (tag, onAccept, onCancel) => (
    <div className="create-tag grow">
      <Form
        values={{ id: tag && tag.id }}
        defaults={tag || { title: "", color: "" }}
        submitBtnTitle={tag ? "Update" : "Add"}
        onlyChanged={Boolean(tag)}
        className="col"
        onSubmit={onAccept}
      >
        {({ attach, value }) => {
          return (
            <>
              <div className="row">
                <DisplayTag tag={value} className="lg" />
                <ButtonGroup>
                  <Button className="grow" onClick={onCancel}>
                    Cancel
                  </Button>
                </ButtonGroup>
              </div>
              <div className="create-tag-inputs">
                <Input id="name" {...attach("name")} label="Tag Name" />
                <Colors id="color" {...attach("color")} label="Tag Color" />
                <Characters id="char" {...attach("character")} label="Tag Symbol" />
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
  render = () => {
    const { tags } = this.props.page.data;
    return (
      <div className="tags-list center">
        {tags.map(tag => {
          return (
            <div key={tag.id} className="section row wrap">
              {tag.id === this.state.editId ? (
                this.tagForm(tag, this.onUpdate, () => this.setState({ editId: null }))
              ) : (
                <>
                  <DisplayTag tag={tag} className="lg" />
                  <ButtonGroup>
                    <Button
                      className="sm"
                      icon="edit"
                      onClick={() => this.setState({ editId: tag.id })}
                    />
                    <Button className="sm" icon="trash" onClick={() => this.onDelete(tag)} />
                  </ButtonGroup>
                </>
              )}
            </div>
          );
        })}
        {this.state.addTag ? (
          <div className="section row">
            {this.tagForm(null, this.onAdd, () => this.setState({ addTag: false }))}
          </div>
        ) : (
          <ButtonGroup>
            <Button onClick={() => this.setState({ addTag: true })}>Add Tag</Button>
          </ButtonGroup>
        )}
      </div>
    );
  };
}
