import { APIGatewayEvent, Context } from "aws-lambda";
import * as aws from "aws-sdk";
import { PutItemInput } from "aws-sdk/clients/dynamodb";

const ddb = new aws.DynamoDB();

export default async (event: APIGatewayEvent, context: Context): Promise<any> => {
    const putItemInput: PutItemInput = {
        TableName: process.env.CONNECTIONS_TABLE_NAME as string,
        Item: {
            connectionId: { S: event.requestContext.connectionId }
        }
    };

    try {
        await ddb.putItem(putItemInput).promise();
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500
        };
    }

    return {
        statusCode: 200
    };
};
