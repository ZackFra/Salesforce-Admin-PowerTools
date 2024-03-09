import LightningDatatable from "lightning/datatable";
import formattedLink from "./formattedLinkTemplate.html";
import parentNameField from "./parentNameFieldTemplate.html";

export default class CustomRecordListLightningDatatable extends LightningDatatable {
  static customTypes = {
    formattedLink: {
      template: formattedLink,
      standardCellLayout: true
    },
    parentNameField: {
      template: parentNameField,
      standardCellLayout: true
    }
  };
}
