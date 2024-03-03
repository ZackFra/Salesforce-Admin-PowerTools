import { LightningElement } from "lwc";

import NAME_FIELD from "@salesforce/schema/Group.Name";
import CREATED_DATE_FIELD from "@salesforce/schema/Group.CreatedDate";
import DEVELOPER_NAME_FIELD from "@salesforce/schema/Group.DeveloperName";

const COLUMNS = [
  {
    label: "Name",
    fieldName: NAME_FIELD.fieldApiName,
    type: "formattedLink"
  },
  {
    label: "Group Name",
    fieldName: DEVELOPER_NAME_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Created Date",
    fieldName: CREATED_DATE_FIELD.fieldApiName,
    type: "date"
  },
  {
    label: "Created By",
    fieldName: "CreatedBy",
    type: "parentNameField"
  }
];

export default class GroupRecordList extends LightningElement {
  columns = COLUMNS;
  fields = ["Name", "DeveloperName", "CreatedDate", "CreatedBy.Name"];

  get newRecordLink() {
    return `/lightning/setup/PublicGroups/page?address=/setup/own/groupedit.jsp`;
  }

  get viewLink() {
    return `/lightning/setup/PublicGroups/page?address=/setup/own/groupdetail.jsp?id={{recordId}}`;
  }
}
