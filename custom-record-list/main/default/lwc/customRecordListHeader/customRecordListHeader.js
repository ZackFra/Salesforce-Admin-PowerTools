import { LightningElement, api } from "lwc";

export default class CustomRecordListHeader extends LightningElement {
  @api
  iconName = "standard:account";
  @api
  label = "Accounts";
  @api
  objectApiName = "Account";
  @api
  hideNewButton = false;
  @api
  newRecordLink;

  get showNewButton() {
    return !this.hideNewButton;
  }

  handleModalClose() {
    this.dispatchEvent(new CustomEvent("modalclose"));
  }
}
