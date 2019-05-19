import * as aws from "aws-sdk";
import { APIGatewayEvent, Context } from "aws-lambda";
import { PutItemInput } from "aws-sdk/clients/dynamodb";
import { UnprocessableEntity } from "./models";
import { MapAttributeValue } from "aws-sdk/clients/dynamodbstreams";

interface DisplayWord {
    word: string;
    widthPercent: number;
    heightPercent: number;
}

const ddb = new aws.DynamoDB();

export default async (event: APIGatewayEvent, context: Context): Promise<void> => {
    try {
        await handle(event);
    } catch (error) {
        console.log(error);
    }
};

async function handle(event: APIGatewayEvent) {
    if (!event.requestContext || !event.requestContext.connectionId || !event.body) {
        throw new UnprocessableEntity("Connection id and body are required");
    }
    const putItemInput: PutItemInput = getPutItemInput(event.requestContext.connectionId, event.body);
    await ddb.putItem(putItemInput).promise();
}

function getPutItemInput(connectionId: string, body: string): PutItemInput {
    const displayWord: DisplayWord = JSON.parse(body);
    const displayWordAttribute: MapAttributeValue = translateDisplayWord(displayWord);
    return {
        TableName: process.env.CONNECTIONS_TABLE_NAME as string,
        Item: {
            connectionId: { S: connectionId },
            displayWord: { M: displayWordAttribute }
        }
    };
}

function translateDisplayWord(displayWord: DisplayWord): MapAttributeValue {
    return {
        word: { S: displayWord.word },
        widthPercent: { N: displayWord.widthPercent.toString() },
        heightPercent: { N: displayWord.heightPercent.toString() }
    };
}