import { APIGatewayEvent, Context, DynamoDBStreamEvent } from "aws-lambda";
import * as aws from "aws-sdk";
import { Key, PutItemInput, ScanInput, ScanOutput } from "aws-sdk/clients/dynamodb";

export default async (event: DynamoDBStreamEvent, context: Context): Promise<any> => {
    const ddb = new aws.DynamoDB();

    let exclusiveStartKey: Key | undefined = undefined;
    let scanOutputs: ScanOutput[] = [];
    do {
        const scanInput: ScanInput = {
            TableName: process.env.CONNECTIONS_TABLE_NAME as string,
            ExclusiveStartKey: exclusiveStartKey
        };
        const scanOutput: ScanOutput = await ddb.scan(scanInput).promise();
        exclusiveStartKey = scanOutput.LastEvaluatedKey;
        scanOutputs.push(scanOutput);
    } while (!!exclusiveStartKey);
};
