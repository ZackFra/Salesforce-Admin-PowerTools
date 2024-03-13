import { createElement } from "lwc";
import CustomRecordListHeader from "c/customRecordListHeader";

describe("c-custom-record-list-header", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Should default the icon to standard:account", () => {
    // Arrange
    const element = createElement("c-custom-record-list-header", {
      is: CustomRecordListHeader
    });

    // Act
    document.body.appendChild(element);

    const icon = element.shadowRoot.querySelector("lightning-icon");
    expect(icon.iconName).toBe("standard:account");
  });
  it('Should default the label to "Accounts"', () => {
    // Arrange
    const element = createElement("c-custom-record-list-header", {
      is: CustomRecordListHeader
    });

    // Act
    document.body.appendChild(element);

    const label = element.shadowRoot.querySelector("h1");
    expect(label.textContent).toBe("Accounts");
  });

  it('Should default the objectApiName to "Account"', () => {
    // Arrange
    const element = createElement("c-custom-record-list-header", {
      is: CustomRecordListHeader
    });

    // Act
    document.body.appendChild(element);

    expect(element.objectApiName).toBe("Account");
  });

  it("Should allow us to set the objectApiName", () => {
    // Arrange
    const element = createElement("c-custom-record-list-header", {
      is: CustomRecordListHeader
    });

    // Act
    element.objectApiName = "Contact";
    document.body.appendChild(element);

    expect(element.objectApiName).toBe("Contact");
  });

  it("Should hide the new button when hideNewButton is true", () => {
    // Arrange
    const element = createElement("c-custom-record-list-header", {
      is: CustomRecordListHeader,
      hideNewButton: true
    });

    // Act
    document.body.appendChild(element);

    const newButton = element.shadowRoot.querySelector("lightning-button");
    expect(newButton).toBeNull();
  });

  it("Should fire a modalclose event when the modal is closed", () => {
    // Arrange
    const element = createElement("c-custom-record-list-header", {
      is: CustomRecordListHeader
    });

    // Act
    document.body.appendChild(element);

    const handler = jest.fn();
    const newButton = element.shadowRoot.querySelector(
      "c-custom-record-list-new-button"
    );
    element.addEventListener("modalclose", handler);
    newButton.dispatchEvent(new CustomEvent("modalclose"));

    expect(handler).toHaveBeenCalled();
  });
});
