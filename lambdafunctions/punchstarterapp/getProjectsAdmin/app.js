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

    let role = info.role;


    let returnJSON = {
        "Projects": []
    }
    // var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
    //                                                                                               


    let getallProjects = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Project", [], (error, rows) => {
                if (error) { return reject(error); }
                if (rows.length > 0) {
                    console.log("row.length:" + rows.length)
                    for (let i = 0; i < rows.length; i++) {

                        returnJSON["Projects"].push({
                            "Project_ID": rows[i].Project_ID,
                            "Description": rows[i].Description,
                            "Goal": rows[i].Goal,
                            "CurrentAmount": rows[i].CurrentAmount,
                            "IsLaunched": rows[i].IsLaunched,
                            "StartDate": rows[i].StartDate,
                            "EndDate": rows[i].EndDate,
                            "Email_ID": rows[i].Email_ID
                        });
                    }

                    return resolve(true); // TRUE if does exist
                }
                else {
                    return resolve(false);
                }
            });
        });
    };


    try {
        await getallProjects();
        response.body = JSON.stringify(returnJSON);
        response.statusCode = 200;

    }
    catch (err) {
        response.statusCode = 400;
        response.error = "something wrong" + err;
    }
    return response
};
