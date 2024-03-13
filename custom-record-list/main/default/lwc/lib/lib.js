import { ShowToastEvent } from "lightning/platformShowToastEvent";

/**
 * @description emits an error message
 *
 * @param {*} ref
 * @param {{title: string, message: string, variant: string}} config
 */
export function handleError(ref, config) {
  ref.dispatchEvent(
    new ShowToastEvent({
      title: config.title,
      message: config.message,
      variant: config.variant
    })
  );
}
