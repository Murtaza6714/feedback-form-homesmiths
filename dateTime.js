var moment = require("moment");

exports.getDateTime=(dateTime) => {
    return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
}