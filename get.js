import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main =handler(async(event,context) => {
    const params= {
        TableName: process.env.tableName,
        //'Key'definesthepartitionkeyandsortkeyoftheitemtoberetrieved
        Key: {
            userid: "123", //Theidof the author
            noteid: event.pathParameters.id, //Theidofthenotefromthepath
        },
    };
    const result= await dynamoDb.get(params);
    if(!result.Item){
        thrownewError("Itemnotfound.");
    }
    //Returntheretrieveditem
    return result.Item;
});
