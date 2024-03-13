import { LightningElement, api } from "lwc";

/**
 * Description Header for the Custom Record List component
 *
 * @export
 * @class CustomRecordListHeader
 * @extends {LightningElement}
 */
class CustomRecordListHeader extends LightningElement {
  /**
   * @type {string}
   */

  @api
  iconName = "standard:account";

  /**
   * @type {string}
   */
  @api
  label = "Accounts";

  /**
   * @type {string}
   */
  @api
  objectApiName = "Account";

  /**
   * @type {boolean}
   */
  @api
  hideNewButton = false;

  /**
   * @type {string}
   */
  @api
  newRecordLink;

  /**
   * @readonly
   * @type {boolean}
   */
  get showNewButton() {
    return !this.hideNewButton;
  }

  /**
   * @description Propagates the new event to the parent component
   */
  handleModalClose() {
    this.dispatchEvent(new CustomEvent("modalclose"));
  }
}

export default CustomRecordListHeader;
