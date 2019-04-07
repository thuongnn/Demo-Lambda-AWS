import {APIGatewayEvent} from 'aws-lambda';

export class Auth {
    static validateCognito(event: APIGatewayEvent) {
        const claims = event.requestContext.authorizer['claims'];
        event['authUser'] = {
            email: claims['email'],
            email_verified: claims['email_verified'],
            username: claims['cognito:username']
        };
    }
}
