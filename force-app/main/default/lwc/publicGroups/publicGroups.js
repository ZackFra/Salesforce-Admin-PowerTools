import { LightningElement, wire, track } from "lwc";
import getPublicGroups from "@salesforce/apex/PublicGroupsController.getPublicGroups";
import getPublicGroupsCount from "@salesforce/apex/PublicGroupsController.getPublicGroupsCount";
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
    type: "text"
  }
];
const PAGE_SIZE = 50;

export default class PublicGroups extends LightningElement {
  pageNumber = 0;
  totalGroups = 0;
  columns = COLUMNS;
  isLoading = true;

  /**
   * @type {Array}
   */
  @track
  publicGroups;

  get datatableRows() {
    return this.publicGroups.map((group) => {
      return {
        ...group,
        CreatedBy: group.CreatedBy.Name,
        Name: {
          label: group.Name,
          link: `/lightning/setup/PublicGroups/page?address=/setup/own/groupdetail.jsp?id=${group.Id}`
        }
      };
    });
  }

  @wire(getPublicGroups, { pageNumber: "$pageNumber" })
  getGroups({ error, data }) {
    if (!error && !data) {
      return;
    }
    this.isLoading = false;

    if (data) {
      this.publicGroups = data;
    }
  }

  @wire(getPublicGroupsCount)
  getTotal({ data, err }) {
    if (!err && !data) {
      return;
    }

    if (data) {
      this.totalGroups = data;
    }
  }

  get isNextDisabled() {
    let totalPages = Math.ceil(this.totalGroups / PAGE_SIZE);
    return this.pageNumber >= totalPages - 1;
  }

  get isPreviousDisabled() {
    return this.pageNumber === 0;
  }

  handleNext() {
    this.isLoading = true;
    this.pageNumber++;
  }

  handlePrevious() {
    this.isLoading = true;
    this.pageNumber--;
  }
}
