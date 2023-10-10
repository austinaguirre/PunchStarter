// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const mysql = require('mysql');

var config = require('./config.json');
var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

function query(conx, sql, params) {
    return new Promise((resolve, reject) => {
        conx.query(sql, params, function(err, rows) {
            if (err) {
                // reject because there was an error
                reject(err);
            }
            else {
                // resolve because we have result(s) from the query. it may be an empty rowset or contain multiple values
                resolve(rows);
            }
        });
    });
}


/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {

    let response = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*", // Allow from anywhere
            "Access-Control-Allow-Methods": "POST" // Allow POST request
        }
    }; // response

    let actual_event = event.body;
    let info = JSON.parse(actual_event);
    
    let Project_ID = info.Project_ID;
    let Email_ID = info.Email_ID;
    let Pledge_ID = info.Pledge_ID;


    //query database to see if there is a match
    // if match 200
    // anything else is 400
    let checkisPledge = (Pledge_ID) => {
        return new Promise((resolve, reject) => {

            pool.query("SELECT * FROM Pledge WHERE Pledge_ID=?", [Pledge_ID], (error, rows) => {

                if (error) { return reject(error); }

                if ((rows) && (rows.length == 1)) {
                    return resolve(true); // TRUE if does exist
                }
                else {
                    return resolve(false); //no user with email 
                }
            });
        });
    };

    let checkdeletePledge = (Pledge_ID) => {
        return new Promise((resolve, reject) => {

            pool.query("delete from Pledge where Pledge_ID=?", [Pledge_ID], (error, result) => {

                if (error) { return reject(error); }
                // console.log("rows"+rows[0].Project_ID);
                console.log(result)
                if (result.affectedRows == 1) {
                    // console.log(rows[0].Project_ID) && (rows.length == 1)
                    // console.log(rows[1].Project_ID)
                    return resolve(true); // TRUE if does exist
                }
                else {
                    return resolve(false);
                }
            });
        });
    };


    try {
        const isPledge = await checkisPledge(Pledge_ID);
        if (isPledge) {
            const deletedPledge = await checkdeletePledge(Pledge_ID);
            if (deletedPledge) {
                response.statusCode = 200;
            }
            else {
                response.statusCode = 400;
                response.error = "failed delete";
            }
        }
        else {
            response.statusCode = 400;
            response.error = "no pledge with this ID";
        }
    }
    catch (err) {
        response.statusCode = 400;
        response.error = "something wrong" + err;
    }
    return response
};
