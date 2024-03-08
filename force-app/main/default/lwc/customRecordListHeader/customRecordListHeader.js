import { LightningElement, api } from "lwc";

export default class CustomRecordListHeader extends LightningElement {
  /** @type {string} */
  @api
  iconName = "standard:account";
  /** @type {string} */
  @api
  label = "Accounts";
  /** @type {string} */
  @api
  objectApiName = "Account";
  /** @type {boolean} */
  @api
  hideNewButton = false;
  /** @type {string} */
  @api
  newRecordLink;

  get showNewButton() {
    return !this.hideNewButton;
  }

  handleModalClose() {
    this.dispatchEvent(new CustomEvent("modalclose"));
  }
}
