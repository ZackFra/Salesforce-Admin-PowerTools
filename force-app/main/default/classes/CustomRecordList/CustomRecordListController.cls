public with sharing class CustomRecordListController {
  @TestVisible
  private static CustomRecordListService service = new CustomRecordListService();

  @AuraEnabled(Cacheable=true)
  public static List<Group> getRecords(
    List<String> fields,
    String objectName,
    String nameField,
    Integer pageNumber,
    String searchKey
  ) {
    try {
      return service.getRecords(
        fields,
        objectName,
        nameField,
        pageNumber,
        searchKey
      );
    } catch (Exception ex) {
      throw new AuraHandledException(ex.getMessage());
    }
  }

  @AuraEnabled(Cacheable=true)
  public static Integer getRecordCount(String objectName, String searchKey) {
    try {
      return service.getRecordCount(objectName, searchKey);
    } catch (Exception ex) {
      throw new AuraHandledException(ex.getMessage());
    }
  }

  @AuraEnabled(Cacheable=true)
  public static Integer getPageSize() {
    return CustomRecordListService.PAGE_SIZE;
  }
}
