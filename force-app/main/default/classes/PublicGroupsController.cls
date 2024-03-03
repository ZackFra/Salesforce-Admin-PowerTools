public with sharing class PublicGroupsController {
  @AuraEnabled(Cacheable=true)
  public static List<Group> getPublicGroups(
    Integer pageNumber,
    String searchKey
  ) {
    PublicGroupsService service = new PublicGroupsService();
    try {
      return service.getPublicGroups(pageNumber, searchKey);
    } catch (Exception ex) {
      throw new AuraHandledException(ex.getMessage());
    }
  }

  @AuraEnabled(Cacheable=true)
  public static Integer getPublicGroupsCount() {
    PublicGroupsService service = new PublicGroupsService();
    try {
      return service.getPublicGroupsCount();
    } catch (Exception ex) {
      throw new AuraHandledException(ex.getMessage());
    }
  }
}
