import { createElement } from "lwc";
import CustomRecordListNavButtons from "c/customRecordListNavButtons";

describe("c-custom-record-list-nav-buttons", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Should disable the previous button", () => {
    // Arrange
    const element = createElement("c-custom-record-list-nav-buttons", {
      is: CustomRecordListNavButtons
    });

    element.isPreviousDisabled = true;

    // Act
    document.body.appendChild(element);

    // Assert
    const previousButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="previous"]'
    );
    console.log(previousButton.disabled);
    expect(previousButton.disabled).toBe(true);
  });

  it("Should disable the next button", () => {
    // Arrange
    const element = createElement("c-custom-record-list-nav-buttons", {
      is: CustomRecordListNavButtons
    });

    element.isNextDisabled = true;

    // Act
    document.body.appendChild(element);

    // Assert
    const nextButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="next"]'
    );
    expect(nextButton.disabled).toBe(true);
  });

  it("Should handle the previous button click", () => {
    // Arrange
    const element = createElement("c-custom-record-list-nav-buttons", {
      is: CustomRecordListNavButtons
    });

    let previousClicked = false;
    element.addEventListener("previous", () => {
      previousClicked = true;
    });

    // Act
    document.body.appendChild(element);
    const previousButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="previous"]'
    );
    previousButton.click();

    // Assert
    expect(previousClicked).toBe(true);
  });

  it("Should handle the next button click", () => {
    // Arrange
    const element = createElement("c-custom-record-list-nav-buttons", {
      is: CustomRecordListNavButtons
    });

    let nextClicked = false;
    element.addEventListener("next", () => {
      nextClicked = true;
    });

    // Act
    document.body.appendChild(element);
    const nextButton = element.shadowRoot.querySelector(
      'lightning-button[data-id="next"]'
    );
    nextButton.click();

    // Assert
    expect(nextClicked).toBe(true);
  });
});
