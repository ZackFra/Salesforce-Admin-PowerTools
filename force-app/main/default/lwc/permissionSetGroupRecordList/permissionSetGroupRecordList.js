import { LightningElement } from "lwc";

import DESCRIPTION_FIELD from "@salesforce/schema/PermissionSetGroup.Description";
import LABEL_FIELD from "@salesforce/schema/PermissionSetGroup.MasterLabel";
import LAST_MODIFIIED_DATE_FIELD from "@salesforce/schema/PermissionSetGroup.LastModifiedDate";
import CREATED_DATE_FIELD from "@salesforce/schema/PermissionSetGroup.CreatedDate";

const COLUMNS = [
  {
    label: "API Name",
    fieldName: "Name",
    type: "formattedLink"
  },
  {
    label: "Label",
    fieldName: LABEL_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Description",
    fieldName: DESCRIPTION_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Last Modified Date",
    fieldName: LAST_MODIFIIED_DATE_FIELD.fieldApiName,
    type: "date"
  },
  {
    label: "Created Date",
    fieldName: CREATED_DATE_FIELD.fieldApiName,
    type: "date"
  },
  {
    label: "Status",
    fieldName: "Status",
    type: "text"
  }
];

export default class PermissionSetGroupRecordList extends LightningElement {
  columns = COLUMNS;
  fields = [
    "DeveloperName",
    "MasterLabel",
    "Description",
    "LastModifiedDate",
    "CreatedDate",
    "Status"
  ];

  get newRecordLink() {
    return `flow:Create_Permission_Set_Group`;
  }
  get viewLink() {
    return `/lightning/setup/PermSetGroups/page?address=/{{recordId}}`;
  }
}
