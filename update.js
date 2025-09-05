import handler from "./libs/handler-lib.js";
import dynamoDb from "./libs/dynamodb-lib.js";
export const main =handler(async(event,context) => {
        const data= JSON.parse(event.body);
        const params= {
            TableName: process.env.tableName,
            //'Key'definesthepartition key andsortkeyoftheitemtobeupdated
            Key: {
                userid: "123", //Theidof the author
                noteid: event.pathParameters.id, //Theidofthenotefromthepath
            },
            //'UpdateExpression'definestheattributestobeupdated
            //'ExpressionAttributeValues' definesthevalueintheupdateexpression
            UpdateExpression: "SET content= :content,attachment=:attachment",
            ExpressionAttributeValues: {
                ":attachment": data.attachment|| null,
                ":content": data.content ||null,
            },
            //'ReturnValues'specifies if and how toreturntheitem'sattributes,
            //whereALL_NEWreturnsall attributesoftheitemaftertheupdate;you
            //caninspect'result'belowto seehowitworkswithdifferentsettings
            ReturnValues: "ALL_NEW",
        };
        await dynamoDb.update(params);
        return { status: true };
})