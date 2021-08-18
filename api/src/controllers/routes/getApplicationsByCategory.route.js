const {ApplicationsDB} = require("../db");
const {HttpHeaders} = require("../../constants");
const HttpStatusCodes = require("http-status-codes");
const {isEmpty, isNil} = require("lodash");

module.exports = async ({path, data}, req, res) => {
    try {
        if (isEmpty(data)) {
            res.writeHead(HttpStatusCodes.FAILED_DEPENDENCY, {'Content-Type': HttpHeaders.HTTP_HEADER_TEXT_PLAIN});
            return res.end("Request data cannot be empty");
        }

        const {category_id = null} = data;
        if (isNil(category_id)) {
            res.writeHead(HttpStatusCodes.FAILED_DEPENDENCY, {'Content-Type': HttpHeaders.HTTP_HEADER_TEXT_PLAIN});
            return res.end("One of request dependency is empty");
        }

        const applications = await ApplicationsDB.getApplicationsByCategory(category_id) ;
        res.writeHead(HttpStatusCodes.OK, {'Content-Type': HttpHeaders.HTTP_HEADER_JSON});
        return res.end(JSON.stringify(applications));

    } catch ({message}) {
        res.writeHead(HttpStatusCodes.FORBIDDEN, {'Content-Type': HttpHeaders.HTTP_HEADER_TEXT_PLAIN});
        return res.end(message);
    }
}