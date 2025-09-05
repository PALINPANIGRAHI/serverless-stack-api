import* as uuid from "uuid";


import handler from "./libs/handler-lib.js";
import dynamoDb from "./libs/dynamodb-lib.js";

export const main =handler(async(event,context) => {
    const data= JSON.parse(event.body);
    const params= {
        TableName: process.env.tableName,
        Item: {
            // Theattributesoftheitemto be created
            userid: "123", //Theidof the author
            noteid: uuid.v1(), //Auniqueuuid
            content: data.content, //Parsedfrom requestbody
            attachment: data.attachment,//Parsedfromrequestbody
            createdAt: Date.now(), //Current Unixtimestamp
        },
    };
    await dynamoDb.put(params);
    return params.Item;
});
 