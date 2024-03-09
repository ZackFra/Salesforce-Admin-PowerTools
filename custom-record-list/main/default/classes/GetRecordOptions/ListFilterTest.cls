@IsTest
public with sharing class ListFilterTest {
  @IsTest
  private static void testListFilter() {
    Comparate comp = new Comparate();
    comp.value = 1;
    comp.type = 'integer';
    Boolean isExceptionThrown = false;
    Test.startTest();
    try {
      ListFilter filter = new ListFilter();
      filter.field = 'Name';
      filter.comparate = comp;
      filter.operator = '=';
    } catch (Exception e) {
      isExceptionThrown = true;
    }
    Test.stopTest();
    Assert.isFalse(isExceptionThrown, 'Exception was thrown');
  }

  @IsTest
  private static void testBuildQueryBoolean() {
    Comparate comp = new Comparate();
    comp.value = true;
    comp.type = 'boolean';
    Boolean isExceptionThrown = false;

    ListFilter filter = new ListFilter();
    filter.field = 'Name';
    filter.comparate = comp;
    filter.operator = '=';

    Map<String, Object> binds = new Map<String, Object>();
    String queryFilter;
    Test.startTest();
    try {
      queryFilter = filter.buildQueryFilter(binds);
    } catch (Exception e) {
      isExceptionThrown = true;
    }
    Test.stopTest();
    Assert.isFalse(isExceptionThrown, 'Exception was thrown');
    Assert.areEqual(1, binds.size(), 'Binds size is not 1');
    Assert.isTrue(
      queryFilter.contains('Name = :Name'),
      'Query filter does not contain Name = :Name'
    );
  }

  @IsTest
  private static void testBuildQueryDecimal() {
    Comparate comp = new Comparate();
    comp.value = 1.5;
    comp.type = 'decimal';
    Boolean isExceptionThrown = false;

    ListFilter filter = new ListFilter();
    filter.field = 'Name';
    filter.comparate = comp;
    filter.operator = '=';

    Map<String, Object> binds = new Map<String, Object>();
    String queryFilter;
    Test.startTest();
    try {
      queryFilter = filter.buildQueryFilter(binds);
    } catch (Exception e) {
      isExceptionThrown = true;
    }
    Test.stopTest();
    Assert.isFalse(isExceptionThrown, 'Exception was thrown');
    Assert.areEqual(1, binds.size(), 'Binds size is not 1');
    Assert.isTrue(
      queryFilter.contains('Name = :Name'),
      'Query filter does not contain Name = :Name'
    );
  }

  @IsTest
  private static void testBuildQueryString() {
    Comparate comp = new Comparate();
    comp.value = 'hello world';
    comp.type = 'string';
    Boolean isExceptionThrown = false;

    ListFilter filter = new ListFilter();
    filter.field = 'Name';
    filter.comparate = comp;
    filter.operator = '=';

    Map<String, Object> binds = new Map<String, Object>();
    String queryFilter;
    Test.startTest();
    try {
      queryFilter = filter.buildQueryFilter(binds);
    } catch (Exception e) {
      isExceptionThrown = true;
    }
    Test.stopTest();
    Assert.isFalse(isExceptionThrown, 'Exception was thrown');
    Assert.areEqual(1, binds.size(), 'Binds size is not 1');
    Assert.isTrue(
      queryFilter.contains('Name = :Name'),
      'Query filter does not contain Name = :Name'
    );
  }

  @IsTest
  private static void testBuildQueryInteger() {
    Comparate comp = new Comparate();
    comp.value = 1;
    comp.type = 'integer';
    Boolean isExceptionThrown = false;

    ListFilter filter = new ListFilter();
    filter.field = 'Name';
    filter.comparate = comp;
    filter.operator = '=';

    Map<String, Object> binds = new Map<String, Object>();
    String queryFilter;
    Test.startTest();
    try {
      queryFilter = filter.buildQueryFilter(binds);
    } catch (Exception e) {
      isExceptionThrown = true;
    }
    Test.stopTest();
    Assert.isFalse(isExceptionThrown, 'Exception was thrown');
    Assert.areEqual(1, binds.size(), 'Binds size is not 1');
    Assert.isTrue(
      queryFilter.contains('Name = :Name'),
      'Query filter does not contain Name = :Name'
    );
  }

  @IsTest
  private static void testBuildQueryFail() {
    Comparate comp = new Comparate();
    comp.value = 1;
    comp.type = 'double';
    Boolean isExceptionThrown = false;

    ListFilter filter = new ListFilter();
    filter.field = 'Name';
    filter.comparate = comp;
    filter.operator = '>';

    Map<String, Object> binds = new Map<String, Object>();
    String queryFilter;
    Test.startTest();
    try {
      queryFilter = filter.buildQueryFilter(binds);
    } catch (Exception e) {
      isExceptionThrown = true;
    }
    Test.stopTest();
    Assert.isTrue(isExceptionThrown, 'Exception was not thrown');
  }
}
