import 'reflect-metadata';
import {APIGatewayEvent, Callback, Context, Handler} from 'aws-lambda';
import {DatabaseManager} from "../../models";
import {HttpResponse} from "../../helpers/http-response";
import {BookController} from "../../controllers/bookController";
import {Auth} from "../../helpers/auth";

const authRoutes = {
    '/book': {
        POST: BookController.createBook
    },
    '/book/{bookId}': {
        PUT: BookController.updateBook,
        DELETE: BookController.deleteBook
    }
};
const unauthRoutes = {
    '/book': {
        GET: BookController.getBooks
    },
    '/book/{bookId}': {
        GET: BookController.getBook
    }
};

export const bookHandler: Handler =
    async (event: APIGatewayEvent, context: Context, cb: Callback) => {
        try {
            await DatabaseManager.init();
            const method = event.httpMethod;
            const route = event.resource;
            if (route in authRoutes && method in authRoutes[route]) {
                Auth.validateCognito(event);
                await authRoutes[route][method](event, context, cb);
            } else if (route in unauthRoutes && method in unauthRoutes[route])
                await unauthRoutes[route][method](event, context, cb);
            else cb(null, HttpResponse.methodNotAllowed());
        } catch (error) {
            cb(null, HttpResponse.fromError(error));
        } finally {
            await DatabaseManager.close();
        }
    };
