class Utils {
    static isJSON = (value) => {
        try {
            JSON.parse(value)
        } catch (error) {
            return false
        }
        return true;
    }
}

module.exports = Utils;