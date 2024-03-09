import { LightningElement, api } from "lwc";

export default class CustomRecordListNavButtons extends LightningElement {
  @api
  isPreviousDisabled = false;

  @api
  isNextDisabled = false;

  handlePrevious() {
    this.dispatchEvent(new CustomEvent("previous"));
  }

  handleNext() {
    this.dispatchEvent(new CustomEvent("next"));
  }
}
