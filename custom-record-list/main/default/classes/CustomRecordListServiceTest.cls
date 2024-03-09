@IsTest
public with sharing class CustomRecordListServiceTest {
  final static string QUERY_STRING = 'SELECT Name,DeveloperName,Type FROM Group WHERE Name LIKE :searchKey  ORDER BY Name LIMIT :PAGE_SIZE OFFSET :offset';
  final static String COUNT_QUERY_STRING = 'SELECT COUNT() FROM Group WHERE Name LIKE :searchKey ';

  private static GetRecordOptions buildOptions(List<String> fields) {
    GetRecordOptions options = new GetRecordOptions();
    options.fields = fields;
    options.objectName = 'Group';
    options.nameField = 'Name';
    options.searchKey = 'Name';
    options.filters = new List<ListFilter>();
    return options;
  }

  private static GetRecordOptions buildOptions() {
    return buildOptions(new List<String>());
  }

  @IsTest
  private static void testGetRecords() {
    Group g1 = new Group(
      Name = 'Test Group 1',
      DeveloperName = 'Test_Group_1',
      Type = 'Regular'
    );

    Group g2 = new Group(
      Name = 'Test Group 2',
      DeveloperName = 'Test_Group_2',
      Type = 'Regular'
    );

    List<Group> groups = new List<Group>{ g1, g2 };
    MockORM db = new MockORM();
    db.getDML().doInsert(groups, true);

    db.reset();
    CustomRecordListService service = new CustomRecordListService();
    service.db = db;

    List<String> fields = new List<String>{ 'Name', 'DeveloperName', 'Type' };
    GetRecordOptions options = buildOptions(fields);
    db.registerQuery(QUERY_STRING, groups);
    Test.startTest();
    List<Group> result = service.getRecords(options, 0);
    Test.stopTest();

    Assert.areEqual(2, result.size(), 'Expected 2 records');
    Assert.isTrue(db.calledQuery(QUERY_STRING), 'Expected query to be called');
  }

  @IsTest
  private static void testGetRecordCount() {
    Group g1 = new Group(
      Name = 'Test Group 1',
      DeveloperName = 'Test_Group_1',
      Type = 'Regular'
    );

    Group g2 = new Group(
      Name = 'Test Group 2',
      DeveloperName = 'Test_Group_2',
      Type = 'Regular'
    );

    List<Group> groups = new List<Group>{ g1, g2 };
    MockORM db = new MockORM();
    db.getDML().doInsert(groups, true);

    db.reset();
    CustomRecordListService service = new CustomRecordListService();
    service.db = db;
    GetRecordOptions options = buildOptions();
    db.registerCountQuery(COUNT_QUERY_STRING, groups.size());
    Test.startTest();
    Integer recordCount = service.getRecordCount(options);
    Test.stopTest();

    Assert.areEqual(2, recordCount, 'Expected 2 records');
    Assert.isTrue(
      db.calledQuery(COUNT_QUERY_STRING),
      'Expected query to be called'
    );
  }
}
