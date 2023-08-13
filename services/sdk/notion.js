const config = require('config');
const secretKey = config.get('notion').secretKey;
const KeysTable = config.get('notion').KeysTable;
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: secretKey });


const queryKeysTable = async (keyName) => {
    const response = await notion.databases.query({
        database_id: KeysTable,
        filter: {
              or: [
                // {
                //   property: 'In stock',
                //   checkbox: {
                //     equals: true,
                //   },
                // },
              ],
        },
        sorts: [
        ],
    });

    // response.results.forEach(item => [
        
    // ])

    return response;
}


//https://www.notion.so/{workspace_name}/{database_id}?v={view_id}

exports.queryDatabase = async (databaseId , parameters) => {

    // const url = 'https://api.notion.com/v1/databases/' + databaseId + '/query';
    // const { } = parameters;
    
    const keys = await queryKeysTable("testtable");
    // const response = await notion.databases.query({
    //     database_id: databaseId,
    //     filter: {
    //           or: [
    //             // {
    //             //   property: 'In stock',
    //             //   checkbox: {
    //             //     equals: true,
    //             //   },
    //             // },
    //           ],
    //     },
    //     sorts: [
    //     //   {
    //     //     property: 'Last ordered',
    //     //     direction: 'ascending',
    //     //   },
    //     ],
    // });


    return keys;
   
}

exports.retrieveDatabase = async (databaseId) => {

    const response = await notion.databases.retrieve({
        database_id: databaseId,
        filter: {
              or: [
                // {
                //   property: 'In stock',
                //   checkbox: {
                //     equals: true,
                //   },
                // },
              ],
        },
        sorts: [
        //   {
        //     property: 'Last ordered',
        //     direction: 'ascending',
        //   },
        ],
    });

    return response;
}


exports.updateDatabase = async (databaseId) => {

    const url = 'https://api.notion.com/v1/databases/' + databaseId;
    
}

exports.listDatabase = async (databaseId) => {

    const url = 'https://api.notion.com/v1/databases';
    
}