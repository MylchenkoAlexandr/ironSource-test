const MySQL = require("mysql");

module.exports = class Database {
    #_host;
    #_port;
    #_database;
    #_user;
    #_password;

    constructor() {
    }

    #_connection;

    get connection() {
        return this.#_connection
    }

    get config() {
        return {
            host: this.#_host,
            port: this.#_port,
            database: this.#_database,
            user: this.#_user,
            password: this.#_password
        }
    }

    create({host, port, database, user, password}) {
        this.#_host = host;
        this.#_port = port;
        this.#_database = database;
        this.#_user = user;
        this.#_password = password;

        return new Promise((resolve, reject) => {
            const onConnect = (error) => {
                if (error) return reject(error);

                try {
                    this.executeQuery("select 1+1")
                } catch (error) {
                    return reject(error)
                }

                return resolve(this.connection);
            };

            this.#_connection = MySQL.createConnection({host, user, password, database});
            this.#_connection.connect(onConnect);
        });
    }

    executeQuery(query) {
        return new Promise((resolve, reject) => {
            const callback = (error, data) => Boolean(error) ? reject(error) : resolve(data);
            this.connection.query(query, [], callback);
        });
    }
}