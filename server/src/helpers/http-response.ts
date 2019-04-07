import {HttpError} from './http-error';
import * as HttpStatus from 'http-status-codes';

export class HttpResponse {
    static ok(response: any = 'Success') {
        return {
            statusCode: HttpStatus.OK,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                status: HttpStatus.OK,
                data: response,
            }),
        };
    }

    static okWithCors(response: any = 'Success') {
        return {
            statusCode: HttpStatus.OK,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                status: HttpStatus.OK,
                data: response,
            }),
        };
    }

    static serverError(error: Error) {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            body: JSON.stringify({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            }),
        };
    }

    static unauthorizedError(error: HttpError) {
        return {
            statusCode: HttpStatus.UNAUTHORIZED,
            body: JSON.stringify({
                status: HttpStatus.UNAUTHORIZED,
                message: error.message,
            }),
        };
    }

    static notFoundError(error: HttpError) {
        return {
            statusCode: HttpStatus.NOT_FOUND,
            body: JSON.stringify({
                status: HttpStatus.NOT_FOUND,
                message: error.message,
            }),
        };
    }

    static badRequestError(error: HttpError) {
        return {
            status: HttpStatus.BAD_REQUEST,
            body: JSON.stringify({
                status: HttpStatus.BAD_REQUEST,
                message: error.message,
                detail: error.detail,
            }),
        };
    }

    static fromError(error: Error | HttpError) {
        if (error instanceof HttpError) {
            switch (error.status) {
                case HttpStatus.UNAUTHORIZED:
                    return HttpResponse.unauthorizedError(error);
                case HttpStatus.NOT_FOUND:
                    return HttpResponse.notFoundError(error);
                case HttpStatus.BAD_REQUEST:
                    return HttpResponse.badRequestError(error);
            }
        }
        return HttpResponse.serverError(error);
    }

    static methodNotAllowed() {
        return {
            statusCode: HttpStatus.METHOD_NOT_ALLOWED,
            body: JSON.stringify({
                status: HttpStatus.METHOD_NOT_ALLOWED,
                message: 'You are not allowed to perform this action.',
            }),
        };
    }
}
