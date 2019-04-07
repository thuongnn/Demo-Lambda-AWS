import {APIGatewayEvent, Callback, Context, Handler} from "aws-lambda";
import {Book} from "../models/book";
import {HttpResponse} from "../helpers/http-response";
import {validateByModel} from '../helpers';

export class BookController {
    static getBooks: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
        const books = await Book.repo.getAll();
        cb(null, HttpResponse.ok(books));
    };

    static getBook: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
        const {bookId} = event.pathParameters;
        const book = await Book.repo.getOne(bookId);
        cb(null, HttpResponse.ok(book));
    };

    static createBook: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
        const body = JSON.parse(event.body || '{}');
        body['createdBy'] = event['authUser']['email'];
        await validateByModel(Book, body);
        const newBook = await Book.repo.save(body);
        const response = await Book.repo.findOne({id: newBook.id});
        cb(null, HttpResponse.ok(response));
    };

    static updateBook: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
        const body = JSON.parse(event.body || '{}');
        const {bookId} = event.pathParameters;
        const response = await Book.repo.updateById(bookId, body);
        cb(null, HttpResponse.ok(response));
    };

    static deleteBook: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
        const {bookId} = event.pathParameters;
        await Book.repo.delete(bookId);
        cb(null, HttpResponse.ok({
            status: "Delete book successfully !"
        }));
    };
}
