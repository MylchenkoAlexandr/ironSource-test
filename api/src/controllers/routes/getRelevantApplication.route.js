const {ApplicationsDB} = require("../db");
const {HttpHeaders, CustomerTypes} = require("../../constants");
const HttpStatusCodes = require("http-status-codes");
const {isEmpty} = require("lodash");

module.exports = async ({path, data}, req, res) => {
    try {
        if (isEmpty(data)) {
            res.writeHead(HttpStatusCodes.FAILED_DEPENDENCY, {'Content-Type': HttpHeaders.HTTP_HEADER_TEXT_PLAIN});
            return res.end("Request data cannot be empty");
        }

        const {category_id = null, customerType = null} = data;
        if (!(category_id && customerType)) {
            res.writeHead(HttpStatusCodes.FAILED_DEPENDENCY, {'Content-Type': HttpHeaders.HTTP_HEADER_TEXT_PLAIN});
            return res.end("One of request dependency is empty");
        }

        if (![CustomerTypes.CUSTOMER_TYPE_BRONZE, CustomerTypes.CUSTOMER_TYPE_GOLD].includes(customerType)) {
            res.writeHead(HttpStatusCodes.FAILED_DEPENDENCY, {'Content-Type': HttpHeaders.HTTP_HEADER_TEXT_PLAIN});
            return res.end("Incorrect customer type");
        }

        const [payload] = await ApplicationsDB.getRelevantApplication(category_id, customerType);
        res.writeHead(HttpStatusCodes.OK, {'Content-Type': HttpHeaders.HTTP_HEADER_JSON});
        return res.end(JSON.stringify(payload));

    } catch ({message}) {
        res.writeHead(HttpStatusCodes.FORBIDDEN, {'Content-Type': HttpHeaders.HTTP_HEADER_TEXT_PLAIN});
        return res.end(message);
    }
}