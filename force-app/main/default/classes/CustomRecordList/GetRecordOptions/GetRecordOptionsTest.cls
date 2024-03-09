@IsTest
public with sharing class GetRecordOptionsTest {
  @IsTest
  private static void testGetRecordOptions() {
    Comparate comp = new Comparate();
    comp.value = 1;
    comp.type = 'integer';

    ListFilter filter = new ListFilter();
    filter.field = 'Name';
    filter.comparate = comp;
    filter.operator = '=';

    Boolean isExceptionThrown = false;
    Test.startTest();
    try {
      GetRecordOptions options = new GetRecordOptions();
      options.objectName = 'Account';
      options.filters = new List<ListFilter>{ filter };
      options.fields = new List<String>{ 'Name' };
      options.nameField = 'Name';
      options.searchKey = 'Name';
    } catch (Exception ex) {
      isExceptionThrown = true;
    }
    Test.stopTest();
    Assert.isFalse(isExceptionThrown, 'An exception was thrown');
  }

  @IsTest
  private static void testValidateSuccess() {
    Comparate comp = new Comparate();
    comp.value = 1;
    comp.type = 'integer';

    ListFilter filter = new ListFilter();
    filter.field = 'Name';
    filter.comparate = comp;
    filter.operator = '=';

    Boolean isExceptionThrown = false;
    Test.startTest();
    try {
      GetRecordOptions options = new GetRecordOptions();
      options.objectName = 'Account';
      options.filters = new List<ListFilter>{ filter };
      options.fields = new List<String>{ 'Name' };
      options.nameField = 'Name';
      options.searchKey = 'Name';
      options.validate();
    } catch (Exception ex) {
      isExceptionThrown = true;
    }
    Test.stopTest();
    Assert.isFalse(isExceptionThrown, 'An exception was thrown');
  }

  @IsTest
  private static void testValidateFail() {
    Comparate comp = new Comparate();
    comp.value = 1;
    comp.type = 'integer';

    ListFilter filter = new ListFilter();
    filter.field = 'Name';
    filter.comparate = comp;
    filter.operator = '=';

    Boolean isExceptionThrown = false;
    Test.startTest();
    try {
      GetRecordOptions options = new GetRecordOptions();
      options.objectName = 'Account';
      options.filters = new List<ListFilter>{ filter };
      options.fields = new List<String>{ 'Name' };
      options.nameField = 'Name';
      options.validate();
    } catch (Exception ex) {
      isExceptionThrown = true;
    }
    Test.stopTest();
    Assert.isTrue(isExceptionThrown, 'Expected an exception to be thrown');
  }
}
