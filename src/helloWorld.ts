import { APIGatewayEvent, Callback, Context } from "aws-lambda";

export function handler(event: APIGatewayEvent, context: Context, callback: Callback): void {
    callback(null, {
        statusCode: 200,
        body: "Hello world"
    });
    return;
};
