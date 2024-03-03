public inherited sharing class CustomRecordListService {
  @TestVisible
  IORM db = new ORM();

  public static final Integer PAGE_SIZE = 50;

  public List<SObject> getRecords(
    List<String> fields,
    String objectName,
    String nameField,
    Integer pageNumber,
    String searchKey
  ) {
    Map<String, Object> binds = new Map<String, Object>{
      'offset' => pageNumber * PAGE_SIZE,
      'searchKey' => '%' +
      searchKey +
      '%',
      'PAGE_SIZE' => PAGE_SIZE
    };
    return this.db.getSelector()
      .queryWithBinds(
        'SELECT ' +
          String.join(fields, ',') +
          ' FROM ' +
          objectName +
          ' WHERE Name LIKE :searchKey' +
          ' ORDER BY ' +
          nameField +
          ' LIMIT :PAGE_SIZE' +
          ' OFFSET :offset',
        binds,
        AccessLevel.USER_MODE
      );
  }

  public Integer getRecordCount(String objectName, String searchKey) {
    searchKey = '%' + searchKey + '%';
    Map<String, Object> binds = new Map<String, Object>{
      'searchKey' => searchKey
    };
    return this.db.getSelector()
      .countQueryWithBinds(
        'SELECT COUNT()' +
          ' FROM ' +
          objectName +
          ' WHERE Name LIKE :searchKey',
        binds,
        AccessLevel.USER_MODE
      );
  }
}
