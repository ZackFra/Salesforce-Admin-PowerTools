/**
 * @description CustomRecordListService class to get records from the database for the custom record list component
 */
public inherited sharing class CustomRecordListService {
  @TestVisible
  IORM db = new ORM();

  public static final Integer PAGE_SIZE = 25;

  /**
   * @description Get records from the database
   * @param fields List of fields to be queried
   * @param objectName Name of the object to be queried
   * @param nameField Name of the field to be used for ordering
   * @param pageNumber Page number to be queried
   * @param searchKey Search key to be used for filtering
   * @return List of records
   */
  @suppressWarnings('PMD.ExcessiveParameterList')
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

  /**
   * @description Get the total number of records from the database
   * @param objectName Name of the object to be queried
   * @param nameField Name of the field to be used for ordering
   * @param searchKey Search key to be used for filtering
   * @return Total number of records
   */
  public Integer getRecordCount(
    String objectName,
    String nameField,
    String searchKey
  ) {
    searchKey = '%' + searchKey + '%';
    Map<String, Object> binds = new Map<String, Object>{
      'searchKey' => searchKey
    };
    objectName = String.escapeSingleQuotes(objectName);
    nameField = String.escapeSingleQuotes(nameField);

    return this.db.getSelector()
      .countQueryWithBinds(
        'SELECT COUNT()' +
          ' FROM ' +
          objectName +
          ' WHERE ' +
          nameField +
          ' LIKE :searchKey',
        binds,
        AccessLevel.USER_MODE
      );
  }
}
