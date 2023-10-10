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
    const date = new Date();
    let day = date.getDate()-1;
    let month = date.getMonth() + 1;
    if (month === 1) { month = "Jan" }
    else if (month === 2) { month = "Feb" }
    else if (month === 3) { month = "Mar" }
    else if (month === 4) { month = "Apr" }
    else if (month === 5) { month = "May" }
    else if (month === 6) { month = "Jun" }
    else if (month === 7) { month = "Jul" }
    else if (month === 8) { month = "Aug" }
    else if (month === 9) { month = "Sep" }
    else if (month === 10) { month = "Oct" }
    else if (month === 11) { month = "Nov" }
    else if (month === 12) { month = "Dec" }
    let year = date.getFullYear();

    let theDate = month + "-" + day + "-" + year;
    console.log("theDate", theDate)

    let Project_ID = info.Project_ID;

    //query database to see if there is a match
    // if match 200
    // anything else is 400
    let checkisProject = (Project_ID) => {
        return new Promise((resolve, reject) => {

            pool.query("SELECT * FROM Project WHERE Project_ID=?", [Project_ID], (error, rows) => {

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

    let updateProject = (Project_ID, date) => {
        return new Promise((resolve, reject) => {
            pool.query("update Project set IsLaunched = true, StartDate=? where Project_ID=?", [date, Project_ID], (error, result) => {
                if (error) { return reject(error); }
                if (result.affectedRows == 1) {
                    return resolve(true); // TRUE if does exist
                }
                else {
                    return resolve(false);
                }
            });
        });
    };


    try {
        const isProject = await checkisProject(Project_ID);
        if (isProject) {
            const updatedProject = await updateProject(Project_ID, theDate);
            if (updatedProject) {
                response.statusCode = 200;
            }
            else {
                response.statusCode = 400;
                response.error = "failed update";
            }
        }
        else {
            response.statusCode = 400;
            response.error = "no project with this ID";
        }
    }
    catch (err) {
        response.statusCode = 400;
        response.error = "something wrong" + err;
    }
    return response
};
