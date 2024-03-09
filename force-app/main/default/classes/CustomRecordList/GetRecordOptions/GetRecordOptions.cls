public inherited sharing class GetRecordOptions {
  @AuraEnabled
  public List<String> fields { get; set; }
  @AuraEnabled
  public String objectName { get; set; }
  @AuraEnabled
  public String nameField { get; set; }
  @AuraEnabled
  public List<ListFilter> filters { get; set; }
  @AuraEnabled
  public String searchKey { get; set; }

  /**
   * @description Validates the fields of the GetRecordOptions object
   * @throws OptionsException if any required fields are missing
   */
  public void validate() {
    List<String> missingFields = new List<String>();
    Map<String, Object> optionsMap = new Map<String, Object>{
      'fields' => this.fields,
      'objectName' => this.objectName,
      'nameField' => this.nameField,
      'searchKey' => this.searchKey
    };
    for (String key : optionsMap.keySet()) {
      if (optionsMap.get(key) == null) {
        missingFields.add(key);
      }
    }
    if (!missingFields.isEmpty()) {
      throw new OptionsException(
        'The following fields are required: ' + String.join(missingFields, ', ')
      );
    }
  }

  private class OptionsException extends Exception {
  }
}
