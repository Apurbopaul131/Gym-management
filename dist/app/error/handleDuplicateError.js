"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const message = 'Duplicate key';
    const statusCode = 400;
    //Exteract message using javasctipt regex
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.default = handleDuplicateError;
