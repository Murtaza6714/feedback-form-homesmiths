var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

module.exports = ( sr, body, connection, myIp, dateTimeNow) => {
  // Values contain variables idicated by '@' sign
  const sql = `INSERT INTO feedback (SR_NO, NAME, CCode, MOBILE, EMAIL, iExperience, iEasy, iAttitude, iHelpfulness, iInformation, Remarks, IP_ADDRESS, Tdate) 
          VALUES (@srNo, @name, @phoneCode, @mobile, @email, @experience, @easy, @attitude, @helpfulness, @productInformation, @remarks, @myIp, @dateTimeNow)`;
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
  request.addParameter("phoneCode", TYPES.NVarChar, body.phone_code);
  request.addParameter("mobile", TYPES.NVarChar, body.phone_number);
  request.addParameter("email", TYPES.NVarChar, body.email);
  request.addParameter("experience", TYPES.Int, body.experience);
  request.addParameter("easy", TYPES.Int, body.easy); 
  request.addParameter("attitude", TYPES.Int, body.attitude);
  request.addParameter("helpfulness", TYPES.Int, body.helpfulness);
  request.addParameter("productInformation", TYPES.Int, body.productInformation);
  request.addParameter("remarks", TYPES.NVarChar, body.remarks);
  request.addParameter("myIp", TYPES.NVarChar, myIp);
  request.addParameter("dateTimeNow", TYPES.NVarChar, dateTimeNow);
  connection.execSql(request);
};
