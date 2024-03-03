import { LightningElement, wire, api } from "lwc";
import { refreshApex } from "@salesforce/apex";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getRecords from "@salesforce/apex/CustomRecordListController.getRecords";
import getRecordCount from "@salesforce/apex/CustomRecordListController.getRecordCount";

const PAGE_SIZE = 50;
export default class CustomRecordList extends LightningElement {
  /**
   * @type {number}
   */
  pageNumber = 0;

  totalRecordsResult;

  /**
   * @type {number}
   */
  totalRecords = 0;
  /**
   * @type {boolean}
   */
  isLoading = true;
  /**
   * @type {string}
   */
  searchKey = "";

  /**
   * @type {Array}
   */
  records;

  @api
  label;

  @api
  iconName;

  @api
  hideNewButton = false;

  /**
   * @type {string}
   */
  @api
  objectApiName;

  /**
   * @type {string[]}
   */
  @api
  fields;

  /**
   * @type {Array}
   */
  @api
  columns;

  /**
   * @type {string}
   */
  @api
  viewLink = `/lightning/r/${this.objectApiName}/{{recordId}}/view`;

  /**
   * @type {string}
   * @default 'Name'
   * @description The field to use as the label for the record, normally 'Name', but there are weird cases like 'CaseNumber' for Case
   */
  @api
  nameField = "Name";

  /**
   * @type {Array}
   */
  @api
  get rows() {
    return this.records.map((record) => {
      return {
        ...record,
        Name: {
          label: record[this.nameField],
          link: this.viewLink.replace("{{recordId}}", record.Id)
        }
      };
    });
  }

  /**
   * @type {string}
   */
  @api
  newRecordLink;

  get totalPages() {
    console.log(
      this.totalRecords,
      PAGE_SIZE,
      Math.ceil(this.totalRecords / PAGE_SIZE)
    );
    return Math.ceil(this.totalRecords / PAGE_SIZE);
  }

  /**
   * @type {number}
   * @readonly
   * @returns {number}
   */
  get pageNumberDisplay() {
    return !this.totalRecords ? 0 : this.pageNumber + 1;
  }

  @wire(getRecords, {
    fields: "$fields",
    objectName: "$objectApiName",
    nameField: "$nameField",
    pageNumber: "$pageNumber",
    searchKey: "$searchKey"
  })
  _getRecords(results) {
    this.totalRecordsResult = results;
    const { error, data } = results;
    if (!error && !data) {
      return;
    }
    this.isLoading = false;
    if (error) {
      this.handleError(error);
    }

    this.records = data;
  }

  @wire(getRecordCount, {
    objectName: "$objectApiName",
    searchKey: "$searchKey"
  })
  _getRecordCount({ data, err }) {
    if (!err && !data && data !== 0) {
      return;
    }

    if (err) {
      this.handleError(err);
      return;
    }
    this.totalRecords = data;
  }

  get isNextDisabled() {
    let totalPages = Math.ceil(this.totalRecords / PAGE_SIZE);
    return this.pageNumber >= totalPages - 1;
  }

  get isPreviousDisabled() {
    return this.pageNumber === 0;
  }

  handleNext() {
    this.pageNumber++;
  }

  handlePrevious() {
    this.pageNumber--;
  }

  handleError(err) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Error loading records",
        message: err.body.message,
        variant: "error"
      })
    );
  }

  /**
   *
   * @param {Event & { detail : Object }} event
   */
  handleSearchKeyChange(event) {
    console.log("handleSearchKeyChangeFired", event.detail.value);
    this.searchKey = event.detail.value;
    this.pageNumber = 0;
    refreshApex(this.totalRecordsResult);
  }
}
