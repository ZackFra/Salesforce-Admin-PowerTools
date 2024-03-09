import { LightningElement } from "lwc";
import NAME_FIELD from "@salesforce/schema/User.Name";
import ALIAS_FIELD from "@salesforce/schema/User.Alias";
import USERNAME_FIELD from "@salesforce/schema/User.Username";
import ACTIVE_FIELD from "@salesforce/schema/User.IsActive";

const COLUMNS = [
  {
    label: "Full Name",
    fieldName: NAME_FIELD.fieldApiName,
    type: "formattedLink"
  },
  {
    label: "Alias",
    fieldName: ALIAS_FIELD.fieldApiName,
    type: "text"
  },
  {
    label: "Username",
    fieldName: USERNAME_FIELD,
    type: "text"
  },
  {
    label: "Role",
    fieldName: "UserRole",
    type: "parentNameField"
  },
  {
    label: "Active",
    fieldName: ACTIVE_FIELD.fieldApiName,
    type: "boolean"
  },
  {
    label: "Profile",
    fieldName: "Profile",
    type: "parentNameField"
  }
];

export default class UserRecordList extends LightningElement {
  columns = COLUMNS;
  fields = [
    "Name",
    "Alias",
    "Username",
    "IsActive",
    "Profile.Name",
    "UserRole.Name"
  ];

  get newRecordLink() {
    return `/lightning/setup/ManageUsers/page?address=/005/e`;
  }

  get viewLink() {
    return `/lightning/setup/ManageUsers/page?address=/{{recordId}}?noredirect=1&isUserEntityOverride=1`;
  }
}
