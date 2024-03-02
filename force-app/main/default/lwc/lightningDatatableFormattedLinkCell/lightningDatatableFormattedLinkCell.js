import { LightningElement, api } from "lwc";

export default class LightningDatatableFormattedLinkCell extends LightningElement {
  @api
  value;

  get label() {
    return this.value.label;
  }

  get link() {
    return this.value.link;
  }
}
