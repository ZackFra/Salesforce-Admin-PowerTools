import { LightningElement, api } from "lwc";
import { NavigationMixin } from "lightning/navigation";

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

  handleNew() {
    if (this.newRecordLink) {
      this[NavigationMixin.Navigate]({
        type: "standard__webPage",
        attributes: {
          url: this.newRecordLink
        }
      });
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
