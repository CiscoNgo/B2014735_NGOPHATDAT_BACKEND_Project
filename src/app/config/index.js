const config = {
    app: {
        port: process.env.PORT || 3004,
    },
    db: {
        uri: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/sale",
    },
};
module.exports = config;