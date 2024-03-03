import { LightningElement } from "lwc";

import DESCRIPTION_FIELD from "@salesforce/schema/PermissionSet.Description";

const COLUMNS = [
  {
    label: "Name",
    fieldName: "Name",
    type: "formattedLink"
  },
  {
    label: "Description",
    fieldName: DESCRIPTION_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "License",
    fieldName: "License",
    type: "parentNameField"
  }
];

export default class PermissionSetRecordList extends LightningElement {
  columns = COLUMNS;
  fields = ["Label", "Description", "License.Name"];

  get newRecordLink() {
    return `/lightning/setup/PermSets/page?address=/udd/PermissionSet/newPermissionSet.apexp`;
  }

  get viewLink() {
    return `/lightning/setup/PermSets/page?address=/{{recordId}}`;
  }
}
