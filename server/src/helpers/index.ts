import {validate} from 'class-validator';
import {HttpError} from "./http-error";
import * as HttpStatus from 'http-status-codes';

export const currentDate = () => {
    return new Date().getDate();
};

const unCamelCase = (str) => {
    return str
    // insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, str => str.toUpperCase());
};

export const validateByModel = async (modelClass: any, body: any) => {
    const validationResult = await validate(modelClass.repo.create(body));
    if (validationResult.length > 0) {
        const detailErrors = validationResult.reduce(
            (res, item) => {
                let errorMessage = Object.keys(item.constraints).map((key) => {
                    return item.constraints[key];
                }).join(', ');
                errorMessage = errorMessage.replace(item.property, unCamelCase(item.property));
                return {...res, [item.property]: `${errorMessage}.`};
            },
            {},
        );
        throw new HttpError(HttpStatus.BAD_REQUEST, 'Data is invalid.', detailErrors);
    }
};
