import { LightningElement, api } from "lwc";

export default class Modal extends LightningElement {
  connectedCallback() {
    this.dispatchEvent(
      new CustomEvent("register", {
        bubbles: true,
        composed: true,
        detail: this
      })
    );
  }

  @api
  open() {
    this.dispatchEvent(
      new CustomEvent("show", {
        bubbles: true,
        composed: true,
        detail: this
      })
    );
  }

  @api
  close() {
    this.dispatchEvent(
      new CustomEvent("close", {
        bubbles: true,
        composed: true,
        detail: this
      })
    );
  }
}
