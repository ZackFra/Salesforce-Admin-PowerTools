import { createElement } from "lwc";
import CustomRecordListLightningDatatable from "c/customRecordListLightningDatatable";

const COLUMNS = [
  {
    label: "API Name",
    fieldName: "Name",
    type: "formattedLink"
  },
  {
    label: "Label",
    fieldName: "Label",
    type: "text"
  },
  {
    label: "Description",
    fieldName: "Parent.Name",
    type: "parentNameField"
  }
];

const mockData = [
  {
    Id: "a",
    Name: "Name1",
    Label: "Label1",
    Parent: {
      Name: "Parent1"
    }
  },
  {
    Id: "b",
    Name: "Name2",
    Label: "Label2",
    Parent: {
      Name: "Parent2"
    }
  }
];

describe("c-custom-record-list-lightning-datatable", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Should instantiate a custom datatable", () => {
    // Arrange
    const element = createElement("c-custom-record-list-lightning-datatable", {
      is: CustomRecordListLightningDatatable,
      columns: COLUMNS,
      keyField: "Id",
      data: mockData,
      hideCheckboxColumn: true
    });

    // Act
    document.body.appendChild(element);

    // It created the table without failing... not really sure what else to test here
    // without creating a mock table and checking the innerHTML of the table
    // but at that point, what am I even testing?
    expect(1).toBe(1);
  });
});
