import { LightningElement, wire, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import getRecords from "@salesforce/apex/CustomRecordListController.getRecords";
import getRecordCount from "@salesforce/apex/CustomRecordListController.getRecordCount";
import getPageSize from "@salesforce/apex/CustomRecordListController.getPageSize";

export default class CustomRecordList extends LightningElement {
  /**
   * @type {number}
   */
  pageNumber = 0;

  recordsResult;
  totalRecordsResult;

  /**
   * @type {number}
   */
  @wire(getPageSize)
  _getPageSize({ data, error }) {
    if (!error && !data) {
      return;
    }
    if (error) {
      this.handleError(error);
      return;
    }

    this.pageSize = data;
  }

  /**
   * @description If a record is created via a save modal, we need to refresh the records
   */
  handleModalClose() {
    refreshApex(this.recordsResult);
    refreshApex(this.totalRecordsResult);
  }

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
  viewLink = `/{{recordId}}`;

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
    return Math.ceil(this.totalRecords / this.pageSize) || 1;
  }

  /**
   * @type {number}
   * @readonly
   * @returns {number}
   */
  get pageNumberDisplay() {
    return !this.totalRecords ? 1 : this.pageNumber + 1;
  }

  @wire(getRecords, {
    fields: "$fields",
    objectName: "$objectApiName",
    nameField: "$nameField",
    pageNumber: "$pageNumber",
    searchKey: "$searchKey"
  })
  _getRecords(results) {
    this.recordsResult = results;
    const { err, data } = results;
    if (!err && !data) {
      return;
    }
    this.isLoading = false;
    if (err) {
      this.handleError(err);
    }

    this.records = data;
  }

  @wire(getRecordCount, {
    objectName: "$objectApiName",
    nameField: "$nameField",
    searchKey: "$searchKey"
  })
  _getRecordCount(result) {
    this.totalRecordsResult = result;
    const { err, data } = result;
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
    return this.pageNumberDisplay >= this.totalPages;
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
    this.searchKey = event.detail.value;
    this.pageNumber = 0;
  }
}
