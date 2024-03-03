import { LightningElement, api } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import DynamicFlowModal from "c/dynamicFlowModal";

export default class CustomRecordListNewButton extends NavigationMixin(
  LightningElement
) {
  @api
  objectApiName;

  @api
  className = "";

  // can be overwritten for weird cases like groups
  @api
  newRecordLink;

  async handleNew() {
    if (this.newRecordLink.startsWith("flow:")) {
      const flowApiName = this.newRecordLink.split(":")[1];
      DynamicFlowModal.flowApiName = flowApiName;
      await DynamicFlowModal.open({
        label: "Create New Record",
        flowApiName: flowApiName
      });
      this.dispatchEvent(new CustomEvent("modalclose"));
      return;
    } else if (this.newRecordLink) {
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
      return;
    }

    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: this.objectApiName,
        actionName: "new"
      }
    });
  }
}
