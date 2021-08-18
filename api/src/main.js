const Core = require('./controllers/core');
const Router = require('./controllers/router');
const routes = require('./controllers/routes');

/* debug */
console.clear();

const config = {
    server: {
        port: 3000
    },
    db: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "aura_test_db"
    }
};
const router = new Router(routes);
Core.singleton().init(config, router.factory);
