import { LightningElement, api } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import DynamicFlowModal from "c/dynamicFlowModal";
import { handleError } from "c/lib";

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
    try {
      await this[this.handler]();
    } catch (err) {
      const config = {
        title: "Failed to handle new record",
        message: err.message,
        variant: "error"
      };
      handleError(this, config);
    }
  }

  /**
   *
   * @description Returns the handler name for the "New" button
   * @readonly
   * @type {("handleFlow" | "handleRegularLink" | "handleStandardRecord")}
   */
  get handler() {
    if (this.newRecordLink.startsWith("/flow/")) {
      return "handleFlow";
    } else if (this.newRecordLink) {
      return "handleRegularLink";
    }
    return "handleStandardRecord";
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
