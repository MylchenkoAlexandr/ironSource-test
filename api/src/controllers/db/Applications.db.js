const Core = require("../core");
const {CustomerTypes} = require("../../constants");
const Squel = require("squel");

module.exports = class CategoriesDbController {
    static RESULTS_LIMIT = 3;
    static getApplicationsByCategory = (category_id) => {
        const query = Squel.select();
        query.from("ranks_cross_view");
        query.where("category_id = ?", [ +category_id ]) ;

        return Core.singleton().database.executeQuery(query.toString());
    }
    static getRelevantApplication = (category_id, customerType) => {
        switch (customerType) {
            case CustomerTypes.CUSTOMER_TYPE_GOLD:
                return Core.singleton().database.executeQuery(`CALL getGoldRank(${+category_id},${CategoriesDbController.RESULTS_LIMIT});`);
            case CustomerTypes.CUSTOMER_TYPE_BRONZE:
                return Core.singleton().database.executeQuery(`CALL getBronzeRank(${+category_id},${CategoriesDbController.RESULTS_LIMIT});`);
            default: {
                return Promise.reject("Unknwon error")
            }
        }
    }
    static applicationRankUp = (applicationId) => {
        return Core.singleton().database.executeQuery(`CALL applicationRankUp(${+applicationId});`);
    }
}