var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

module.exports = ( sr, name, mobileNo, email, experience, needs, find, friendly, ability, connection, myIp) => {
  // Values contain variables idicated by '@' sign
  const sql = `INSERT INTO feedback (SR_NO, NAME, MOBILE, EMAIL, EXPERIENCE, NEEDS, FIND, FRIENDLY, ABILITY, IP_ADDRESS) 
          VALUES (@srNo, @name, @mobile, @email, @experience, @needs, @find, @friendly, @ability, @myIp)`;
  const request = new Request(sql, (err, rowCount) => {
    if (err) {
      throw err;
    }

    console.log("rowCount: ", rowCount);
    console.log("input parameters success!");
  });

  // Setting values to the variables. Note: first argument matches name of variable above.
  request.addParameter("srNo", TYPES.Int, sr);
  request.addParameter("name", TYPES.NVarChar, name);
  request.addParameter("mobile", TYPES.NVarChar, mobileNo);
  request.addParameter("email", TYPES.NVarChar, email);
  request.addParameter("experience", TYPES.NVarChar, experience);
  request.addParameter("needs", TYPES.NVarChar, needs);
  request.addParameter("find", TYPES.NVarChar, find);
  request.addParameter("friendly", TYPES.NVarChar, friendly);
  request.addParameter("ability", TYPES.NVarChar, ability);
  request.addParameter("myIp", TYPES.NVarChar, myIp);
  connection.execSql(request);
};
