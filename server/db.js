const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log("DB connected successfully")
    } catch (error) {
        console.log(error);
    }
};