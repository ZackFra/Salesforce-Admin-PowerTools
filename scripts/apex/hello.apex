// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

IORM db = new ORM();

db.getSelector().queryWithBinds(
    'SELECT Id, Name' + 
    ' FROM Account' +
    ' ORDER BY Name',
    new Map<String, Object> {
        'objectName' => 'Account',
        'nameField' => 'Name'
    },
    AccessLevel.USER_MODE
);