/**
 * @typedef {import('typings/list-filter')} ListFilter
 */

import { LightningElement } from "lwc";

// @ts-ignore
import NAME_FIELD from "@salesforce/schema/Group.Name";
// @ts-ignore
import CREATED_DATE_FIELD from "@salesforce/schema/Group.CreatedDate";
// @ts-ignore
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
    return `/lightning/setup/PublicGroups/page?address=/setup/own/groupedit.jsp?retURL=${window.location.pathname}`;
  }

  get viewLink() {
    return `/lightning/setup/PublicGroups/page?address=/setup/own/groupdetail.jsp?id={{recordId}}`;
  }

  /**
   * @return {ListFilter[]}
   */
  get filters() {
    return [
      {
        field: "Type",
        operator: "=",
        comparate: {
          type: "string",
          value: "Regular"
        }
      }
    ];
  }
}
