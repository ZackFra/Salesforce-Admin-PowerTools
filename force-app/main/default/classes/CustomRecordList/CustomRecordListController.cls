/**
 * @description CustomRecordListController class to handle the logic for the custom record list lwc
 */
public with sharing class CustomRecordListController {
  @TestVisible
  private static CustomRecordListService service = new CustomRecordListService();

  /**
   * @description Aura-enabled method to get records for the custom record list lwc
   * @param fields - List of fields to retrieve
   * @param objectName - API name of the object
   * @param nameField - API name of the field to use as the name
   * @param pageNumber - Page number to retrieve
   * @param searchKey - Search key to filter records
   * @return List of records
   * @throws AuraHandledException
   */
  @SuppressWarnings('PMD.ExcessiveParameterList')
  @AuraEnabled(Cacheable=true)
  public static List<Group> getRecords(
    List<String> fields,
    String objectName,
    String nameField,
    List<ListFilter> filters,
    Integer pageNumber,
    String searchKey
  ) {
    try {
      GetRecordOptions options = new GetRecordOptionsBuilder()
        .setFields(fields)
        .setObjectName(objectName)
        .setNameField(nameField)
        .setSearchKey(searchKey)
        .setFilters(filters)
        .build();
      return service.getRecords(options, pageNumber);
    } catch (Exception ex) {
      throw new AuraHandledException(ex.getMessage());
    }
  }

  /**
   * @description Aura-enabled method to get the record count for the custom record list lwc
   * @param objectName - API name of the object
   * @param nameField - API name of the field to use as the name
   * @param searchKey - Search key to filter records
   * @return Record count
   * @throws AuraHandledException
   */
  @SuppressWarnings('PMD.ExcessiveParameterList')
  @AuraEnabled(Cacheable=true)
  public static Integer getRecordCount(
    String objectName,
    String nameField,
    List<ListFilter> filters,
    String searchKey
  ) {
    try {
      GetRecordOptions options = new GetRecordOptionsBuilder()
        .setObjectName(objectName)
        .setNameField(nameField)
        .setFilters(filters)
        .setSearchKey(searchKey)
        .build();
      return service.getRecordCount(options);
    } catch (Exception ex) {
      throw new AuraHandledException(ex.getMessage());
    }
  }

  /**
   * @description Aura-enabled method to get the page size for the custom record list lwc
   * @return Page size
   */
  @AuraEnabled(Cacheable=true)
  public static Integer getPageSize() {
    return CustomRecordListService.PAGE_SIZE;
  }
}
