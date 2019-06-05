import React from "react";
import { Form, Button } from "components/UI/PageComponents";
import { PrivilegeInput } from "./PrivilegeInput";
import "./Invite.scss";
import { notifyToast } from "utils";

export class Invite extends React.Component<any, { currentLink: string }> {
  editRef = React.createRef<HTMLDivElement>();
  state = { currentLink: "" };
  onSubmit = async (form: any) => {
    this.setState({ currentLink: await this.props.page.compFetch("boards", "INVITE", form) });
  };

  selectText = () => {
    if (this.editRef.current) {
      if ((document as any).selection) {
        // IE
        const range = (document.body as any).createTextRange();
        range.moveToElementText(this.editRef.current);
        range.select();
      } else if (window.getSelection != null) {
        const range = document.createRange();
        range.selectNode(this.editRef.current);
        const select = window.getSelection();
        if (select) {
          select.removeAllRanges();
          select.addRange(range);
        }
      }
      return true;
    }
    return false;
  };

  copyToClipBoard = () => {
    if (this.selectText()) {
      document.execCommand("copy");
      notifyToast("success", "Link copied to clipboard!");
    }
  };

  render() {
    return (
      <Form
        className="section"
        onSubmit={this.onSubmit}
        keepAfterSubmit
        submitBtnTitle={(!Boolean(this.state.currentLink) && "Create Link") || undefined}
        defaults={{ privilege: 1 }}
        onChange={() => this.setState({ currentLink: "" })}
      >
        <PrivilegeInput label="Invite Link Privilege" id="privilege" />
        {this.state.currentLink && (
          <div className="invite-container row">
            <div ref={this.editRef} className="invite-link grow" onClick={this.selectText}>
              {`${window.location.href}?i=${this.state.currentLink}`}
            </div>
            <Button icon="clipboard" className="sm pull-right" onClick={this.copyToClipBoard} />
          </div>
        )}
      </Form>
    );
  }
}
