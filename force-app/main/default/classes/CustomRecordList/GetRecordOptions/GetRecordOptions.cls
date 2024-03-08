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
}
