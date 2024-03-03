import { api } from "lwc";
import LightningModal from "lightning/modal";

export default class DynamicFlowModal extends LightningModal {
  @api flowApiName;
  handleStatusChange(event) {
    if (event.detail.status === "FINISHED") {
      this.close();
    }
  }
}
