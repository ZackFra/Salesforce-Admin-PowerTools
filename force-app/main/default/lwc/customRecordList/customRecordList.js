/**
 * @typedef {import('typings/custom-record-list-service-options')} CustomRecordListServiceOptions
 * @typedef {import('typings/list-filter')} ListFilter
 */

import { LightningElement, wire, api } from "lwc";
// @ts-ignore
import { ShowToastEvent } from "lightning/platformShowToastEvent";
// @ts-ignore
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
   * @description Retrieves the number of records to display per page from the server
   * @param {*} results
   */
  @wire(getPageSize)
  _getPageSize({ error, data }) {
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
   * @type {ListFilter[]}
   * @default []
   */
  @api
  filters = [];

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
   * @default ''
   */
  searchKey = "";

  /**
   * @type {Array}
   */
  records;

  /**
   * @type {string}
   */
  @api
  label;

  /**
   * @type {string}
   */
  @api
  iconName;

  /**
   * @type {boolean}
   */
  @api
  hideNewButton = false;

  /**
   * @type {string}
   */
  @api
  objectApiName;

  /**
   * @type {string[]}
   * @default []
   */
  @api
  fields = [];

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
   * @type {Object[]}
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

  /**
   *
   * @param {*} results
   * @returns {void}
   */
  @wire(getRecords, {
    fields: "$fields",
    objectName: "$objectApiName",
    nameField: "$nameField",
    pageNumber: "$pageNumber",
    filters: "$filters",
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

  /**
   *
   * @param {*} result
   * @returns {void}
   */
  @wire(getRecordCount, {
    objectName: "$objectApiName",
    nameField: "$nameField",
    filters: "$filters",
    searchKey: "$searchKey"
  })
  _getRecordCount(result) {
    this.totalRecordsResult = result;
    const { error, data } = result;
    if (!error && !data && data !== 0) {
      return;
    }

    if (error) {
      console.error("filters", JSON.stringify(this.filters));
      this.handleError(error);
      return;
    }
    this.totalRecords = data;
  }

  /**
   * @type {boolean}
   */
  get isNextDisabled() {
    return this.pageNumberDisplay >= this.totalPages;
  }

  /**
   * @type {boolean}
   */
  get isPreviousDisabled() {
    return this.pageNumber === 0;
  }

  /**
   * @description Handles the next button click
   * @returns {void}
   */
  handleNext() {
    this.pageNumber++;
  }

  /**
   * @description Handles the previous button click
   * @returns {void}
   */
  handlePrevious() {
    this.pageNumber--;
  }

  /**
   * @description Handles errors
   * @param {Error & { body: { message: string } } } err
   * @returns {void}
   */
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
   * @param {Event & { detail : object }} event
   */
  handleSearchKeyChange(event) {
    this.searchKey = event.detail.value;
    this.pageNumber = 0;
  }
}
