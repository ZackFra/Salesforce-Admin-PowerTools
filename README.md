# Custom Record Lists

This project was created to create fancy list view for records that Salesforce has not migrated to Lightning yet.

In the salesforce_administration_package, you can see three examples of this. In it there is a custom tab defined for "Users", "Permission Sets", and "Public Groups & Queues". This is just an example, the required code to just use this app is listed in the package.xml file.

To use this tool, all you need to do is create a lightning web component configured to be tab-accessible. Then in the lightning web component, add in the c-custom-record-list component and you'll be good to go.

## Example

```
<template>
  <c-custom-record-list
    label="Groups"
    icon-name="standard:groups"
    object-api-name="Group"
    fields={fields}
    new-record-link={newRecordLink}
    view-link={viewLink}
    columns={columns}
  ></c-custom-record-list>
</template>
```

## API

- `label`, the label of your component, typically the plural of whichever record you're pulling.
- `name-field`, defaults to "Name", this is the name of the record. In some cases this may not be "Name", ex. for Cases this would be "CaseNumber".
- `icon-name`, the name of the icon, typically it's whatever icon aligns with the records you're listing.
- `object-api-name`, the API name of the SObject.
- `fields`, the list fields you want displayed
- `new-record-link`, defaults to the standard Salesforce link for new records. For setup objects (ex. Groups, Users) you'll want to use the links from the setup page.
- `view-link`, the link to view the record. Defaults to the standard record view page. For setup objects, you'll want to use the links from the setup page.
- `columns`, the columns of the table. This tool uses a custom lightning-datatable, the custom-record-list-lightning-datatable. It extends the standard lightning-datatable with two new column types.
  - `formattedLink`, works with the name-field. Whatever field is set to the name-field will be transformed into a link to the record. The fieldApiName should be "Name", since a fake "Name" column will be added to the data to support this. The label can be whatever you want.
  - `parentNameField`, is used when you want to pull in the "Name" field from a related record. For example for Users, you'll want to pull in UserRole.Name.
