import { expect } from 'chai';
import 'mocha';
import sendWord from '../src/sendWord';
import { APIGatewayEvent, Context } from "aws-lambda";
import { ISendWordResponse } from "../src/models";
import * as aws from "aws-sdk-mock";

const context: Context = {} as Context;

describe('updateWorld', () => {

    before(() => {
        aws.mock("DynamoDB", "scan", (params: any, callback: (err: any, data: any) => void) => {

        });
    });

    after(() => {

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