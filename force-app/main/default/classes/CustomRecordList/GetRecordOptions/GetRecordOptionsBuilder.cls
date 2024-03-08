public inherited sharing class GetRecordOptionsBuilder {
  private GetRecordOptions options;
  private class BuilderException extends Exception {
  }

  public GetRecordOptionsBuilder() {
    this.options = new GetRecordOptions();
    this.options.fields = new List<String>();
    this.options.filters = new List<ListFilter>();
  }

  public GetRecordOptionsBuilder setFields(List<String> fields) {
    this.options.fields = fields;
    return this;
  }

  public GetRecordOptionsBuilder setObjectName(String objectName) {
    this.options.objectName = objectName;
    return this;
  }

  public GetRecordOptionsBuilder setNameField(String nameField) {
    this.options.nameField = nameField;
    return this;
  }

  public GetRecordOptionsBuilder setFilters(List<ListFilter> filters) {
    this.options.filters = filters;
    return this;
  }

  public GetRecordOptionsBuilder setSearchKey(String searchKey) {
    this.options.searchKey = searchKey;
    return this;
  }

  private void validate() {
    if (this.options.fields == null) {
      throw new BuilderException('Fields are required');
    }
    if (this.options.objectName == null) {
      throw new BuilderException('Object name is required');
    }
    if (this.options.nameField == null) {
      throw new BuilderException('Name field is required');
    }
    if (this.options.searchKey == null) {
      throw new BuilderException('Search key is required');
    }
  }

  /**
   * @description Builds the options for the get records method
   * @return GetRecordOptions
   * @throws CustomListServiceException
   */
  public GetRecordOptions build() {
    validate();
    return this.options;
  }
}
