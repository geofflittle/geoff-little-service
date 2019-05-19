export interface ISendWordResponse {
    statusCode: number;
    body: string;
}

export class UnprocessableEntity extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, UnprocessableEntity.prototype);
    }
}
