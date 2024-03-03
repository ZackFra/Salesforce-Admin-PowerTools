public inherited sharing class PublicGroupsService {
  final static String PUBLIC_GROUP_TYPE = 'Regular';
  final static Integer PAGE_SIZE = 50;

  public List<Group> getPublicGroups(Integer pageNumber, String searchKey) {
    Integer offset = pageNumber * PAGE_SIZE;
    if (!Schema.sObjectType.Group.isAccessible()) {
      return new List<Group>();
    }

    searchKey = '%' + searchKey + '%';
    return [
      SELECT Id, Name, DeveloperName, CreatedBy.Name, CreatedDate
      FROM Group
      WHERE Type = :PUBLIC_GROUP_TYPE AND Name LIKE :searchKey
      OFFSET :offset
    ];
  }

  public Integer getPublicGroupsCount() {
    if (!Schema.sObjectType.Group.isAccessible()) {
      return 0;
    }
    return [
      SELECT COUNT()
      FROM Group
      WHERE Type = :PUBLIC_GROUP_TYPE
    ];
  }
}
