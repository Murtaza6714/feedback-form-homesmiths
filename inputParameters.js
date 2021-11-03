var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

module.exports = ( sr, body, connection, myIp, dateTimeNow) => {
  // Values contain variables idicated by '@' sign
  const sql = `INSERT INTO feedback (SR_NO, NAME, MOBILE, EMAIL, EXPERIENCE, NEEDS, FIND, FRIENDLY, ABILITY, Remarks, IP_ADDRESS, Tdate) 
          VALUES (@srNo, @name, @mobile, @email, @experience, @needs, @find, @friendly, @ability, @remarks, @myIp, @dateTimeNow)`;
  const request = new Request(sql, (err, rowCount) => {
    if (err) {
      throw err;
    }

    console.log("rowCount: ", rowCount);
    console.log("input parameters success!");
  });

  // Setting values to the variables. Note: first argument matches name of variable above.
  request.addParameter("srNo", TYPES.Int, sr);
  request.addParameter("name", TYPES.NVarChar, body.name);
  request.addParameter("mobile", TYPES.NVarChar, body.mobileNo);
  request.addParameter("email", TYPES.NVarChar, body.email);
  request.addParameter("experience", TYPES.NVarChar, body.experience);
  request.addParameter("needs", TYPES.NVarChar, body.needs);
  request.addParameter("find", TYPES.NVarChar, body.find);
  request.addParameter("friendly", TYPES.NVarChar, body.friendly);
  request.addParameter("ability", TYPES.NVarChar, body.ability);
  request.addParameter("remarks", TYPES.NVarChar, body.remarks);
  request.addParameter("myIp", TYPES.NVarChar, myIp);
  request.addParameter("dateTimeNow", TYPES.NVarChar, dateTimeNow);
  connection.execSql(request);
};
