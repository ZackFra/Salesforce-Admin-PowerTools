@IsTest
public with sharing class ComparateTest {
  @IsTest
  private static void testComparate() {
    Boolean isExceptionThrown = false;
    Test.startTest();
    try {
      Comparate comp = new Comparate();
      comp.value = 1;
      comp.type = 'integer';
    } catch (Exception ex) {
      isExceptionThrown = true;
    }
    Test.stopTest();
    Assert.isFalse(isExceptionThrown, 'Exception was thrown');
  }
}
