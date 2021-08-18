const {CategoriesDB} = require("../db");
const {CustomerTypes} = require("../../constants");
const {HttpHeaders} = require("../../constants");
const HttpStatusCodes = require("http-status-codes");

module.exports = async ({path, data}, req, res) => {
    try {
        const categories = await CategoriesDB.getAllCategories();
        res.writeHead(HttpStatusCodes.OK, {'Content-Type': HttpHeaders.HTTP_HEADER_JSON});
        return res.end(JSON.stringify({
            categories,
            customerTypes: [
                CustomerTypes.CUSTOMER_TYPE_BRONZE,
                CustomerTypes.CUSTOMER_TYPE_GOLD
            ]
        }));

    } catch ({message}) {
        res.writeHead(HttpStatusCodes.FORBIDDEN, {'Content-Type': HttpHeaders.HTTP_HEADER_TEXT_PLAIN});
        return res.end(message);
    }
}