const Core = require("../core");
const Squel = require("squel");

module.exports = class CategoriesDbController {
    static getAllCategories = () => {
        const query = Squel.select();
        query.from("categories");
        return Core.singleton().database.executeQuery(query.toString());
    }
}