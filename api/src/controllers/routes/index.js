module.exports = {
    get: {
        "/api/v1/all_categories": require("./getAllCategories.route"),
        "/api/v1/applications_by_category": require("./getApplicationsByCategory.route"),
        "/api/v1/relevant_application": require("./getRelevantApplication.route")
    },
    post: {
        "/api/v1/install_app": require("./postInstallApp.route")
    }
}