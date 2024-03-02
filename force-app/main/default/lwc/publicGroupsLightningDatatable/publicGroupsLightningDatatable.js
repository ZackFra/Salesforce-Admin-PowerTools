import LightningDatatable from "lightning/datatable";
import formattedLink from "./formattedLinkTemplate.html";

export default class PublicGroupsLightningDatatable extends LightningDatatable {
  static customTypes = {
    formattedLink: {
      template: formattedLink,
      standardCellLayout: true
    }
  };
}
