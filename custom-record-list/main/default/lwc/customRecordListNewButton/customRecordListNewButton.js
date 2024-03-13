import { LightningElement, api } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import DynamicFlowModal from "c/dynamicFlowModal";

/**
 *
 *
 * @class CustomRecordListNewButton
 * @extends {NavigationMixin}
 */
class CustomRecordListNewButton extends NavigationMixin(LightningElement) {
  /**
   *
   *
   * @type {string}
   */
  @api
  objectApiName;

  /**
   *
   *
   * @type {string}
   */
  @api
  className = "";

  /**
   *
   * @description can be overwritten for weird cases like groups
   * @type {string}
   */
  @api
  newRecordLink;

  /**
   *
   * @returns {Promise<void>}
   */
  async handleNew() {
    await this.newHandlers[this.type]();
  }

  /**
   * @description The newHandlers object is a map of functions that handle the different types of newRecordLink
   *
   * @type {{ flow: () => Promise<void>; regularLink: () => Promise<void>; standardRecord: () => Promise<void>; }}
   */
  newHandlers = {
    flow: this.handleFlow,
    regularLink: this.handleRegularLink,
    standardRecord: this.handleStandardRecord
  };

  /**
   *
   * @description Returns the type of newRecordLink
   * @readonly
   * @type {("flow" | "regularLink" | "standardRecord")}
   */
  get type() {
    if (this.newRecordLink.startsWith("/flow/")) {
      return "flow";
    } else if (this.newRecordLink) {
      return "regularLink";
    }
    return "standardRecord";
  }

  /**
   *
   * @description Opens the flow modal, sets the flowApiName, and dispatches a modalclose event
   * @async
   * @returns {Promise<void>}
   */
  async handleFlow() {
    const flowApiName = this.newRecordLink.split("/flow/")[1];
    DynamicFlowModal.flowApiName = flowApiName;
    await DynamicFlowModal.open({
      label: "Create New Record",
      flowApiName: flowApiName
    });
    this.dispatchEvent(new CustomEvent("modalclose"));
  }

  /**
   *
   * @description Opens a new tab or window depending on the URL
   * @async
   * @returns {Promise<void>}
   */
  async handleRegularLink() {
    let target = "_blank";
    if (this.newRecordLink.includes("retURL")) {
      target = "_self";
    }
    const url = await this[NavigationMixin.GenerateUrl]({
      type: "standard__webPage",
      attributes: {
        url: this.newRecordLink
      }
    });
    window.open(url, target);
  }

  /**
   *
   * @description Opens the standard record page for the objectApiName
   * @async
   * @returns {Promise<void>}
   */
  async handleStandardRecord() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: this.objectApiName,
        actionName: "new"
      }
    });
  }
}

export default CustomRecordListNewButton;
