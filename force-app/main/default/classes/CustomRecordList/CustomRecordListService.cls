/**
 * @description CustomRecordListService class to get records from the database for the custom record list component
 */
public inherited sharing class CustomRecordListService {
  @TestVisible
  IORM db = new ORM();

  public static final Integer PAGE_SIZE = 25;

  private class CustomListServiceException extends Exception {
  }

  /**
   * @description Get records from the database
   * @param fields List of fields to be queried
   * @param objectName Name of the object to be queried
   * @param nameField Name of the field to be used for ordering
   * @param pageNumber Page number to be queried
   * @param searchKey Search key to be used for filtering
   * @return List of records
   */
  public List<SObject> getRecords(
    GetRecordOptions options,
    Integer pageNumber
  ) {
    GetRecordOptions escapedOptions = escapeOptions(options);

    Map<String, Object> binds = new Map<String, Object>{
      'offset' => pageNumber * PAGE_SIZE,
      'searchKey' => '%' +
      escapedOptions.searchKey +
      '%',
      'PAGE_SIZE' => PAGE_SIZE
    };

    String filterValue = '';
    for (ListFilter filter : escapedOptions.filters) {
      filterValue += 'AND ' + filter.buildQueryFilter(binds) + ' ';
    }

    return this.db.getSelector()
      .queryWithBinds(
        'SELECT ' +
          String.join(escapedOptions.fields, ',') +
          ' FROM ' +
          escapedOptions.objectName +
          ' WHERE ' +
          escapedOptions.nameField +
          ' LIKE :searchKey' +
          ' ' +
          filterValue +
          ' ORDER BY ' +
          escapedOptions.nameField +
          ' LIMIT :PAGE_SIZE' +
          ' OFFSET :offset',
        binds,
        AccessLevel.USER_MODE
      );
  }

  private GetRecordOptions escapeOptions(GetRecordOptions options) {
    GetRecordOptions escapedOptions = options.clone();
    try {
      for (Integer i = 0; i < escapedOptions.fields.size(); i++) {
        escapedOptions.fields[i] = String.escapeSingleQuotes(
          escapedOptions.fields[i]
        );
      }
      escapedOptions.objectName = String.escapeSingleQuotes(
        escapedOptions.objectName
      );
      escapedOptions.nameField = String.escapeSingleQuotes(
        escapedOptions.nameField
      );
      for (ListFilter filter : escapedOptions.filters) {
        filter.field = String.escapeSingleQuotes(filter.field);
        filter.operator = String.escapeSingleQuotes(filter.operator);
      }
    } catch (Exception e) {
      throw new CustomListServiceException(
        'Error escaping options: ' + e.getMessage()
      );
    }
    return escapedOptions;
  }

  /**
   * @description Get the total number of records from the database
   * @param objectName Name of the object to be queried
   * @param nameField Name of the field to be used for ordering
   * @param searchKey Search key to be used for filtering
   * @return Total number of records
   */
  public Integer getRecordCount(GetRecordOptions options) {
    GetRecordOptions escapedOptions = escapeOptions(options);
    String searchKey = '%' + escapedOptions.searchKey + '%';
    Map<String, Object> binds = new Map<String, Object>{
      'searchKey' => searchKey
    };

    String filterValue = '';
    for (ListFilter filter : escapedOptions.filters) {
      filterValue += 'AND ' + filter.buildQueryFilter(binds) + ' ';
    }
    String query =
      'SELECT COUNT()' +
      ' FROM' +
      ' ' +
      escapedOptions.objectName +
      ' WHERE' +
      ' ' +
      escapedOptions.nameField +
      ' LIKE :searchKey' +
      ' ' +
      filterValue;
    System.debug('query: ' + query);
    return this.db.getSelector()
      .countQueryWithBinds(query, binds, AccessLevel.USER_MODE);
  }
}
