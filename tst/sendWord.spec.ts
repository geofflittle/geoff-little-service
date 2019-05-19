import { expect } from 'chai';
import 'mocha';
import sendWord from '../src/sendWord';
import { APIGatewayEvent, Context } from "aws-lambda";
import { ISendWordResponse } from "../src/models";


const context: Context = {} as Context;

describe('sendWord', () => {

    it(`returns 422 when there's no connection id`, async () => {
        const event: APIGatewayEvent = {
            body: "body"
        } as APIGatewayEvent;

        const response: ISendWordResponse = await sendWord(event, context);

        expect(response.statusCode).to.equal(422);
    });

    it(`returns 422 when there's no body`, async () => {
        const event: APIGatewayEvent = {
            requestContext: {
                connectionId: "connection-id"
            }
        } as APIGatewayEvent;

        const response: ISendWordResponse = await sendWord(event, context);

        expect(response.statusCode).to.equal(422);
    });

});