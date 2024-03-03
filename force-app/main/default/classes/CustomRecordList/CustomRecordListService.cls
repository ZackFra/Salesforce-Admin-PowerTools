public inherited sharing class CustomRecordListService {
  @TestVisible
  IORM db = new ORM();

  public static final Integer PAGE_SIZE = 25;

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

    for (Integer i = 0; i < fields.size(); i++) {
      fields[i] = String.escapeSingleQuotes(fields[i]);
    }
    objectName = String.escapeSingleQuotes(objectName);
    nameField = String.escapeSingleQuotes(nameField);

    return this.db.getSelector()
      .queryWithBinds(
        'SELECT ' +
          String.join(fields, ',') +
          ' FROM ' +
          objectName +
          ' WHERE ' +
          nameField +
          ' LIKE :searchKey' +
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
    objectName = String.escapeSingleQuotes(objectName);
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
