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
    let Description = info.Description;
    let Goal = info.Goal;
    let EndDate = info.EndDate;
    let Tag = info.Tag;
    let Author = info.Author;
    


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

    let checkinsertProject = (Project_ID,Email_ID,Pledge_ID,Description,Goal,EndDate,Tag, Author) => {
        return new Promise((resolve, reject) => {

            pool.query("insert into Project(Project_ID, Description, Goal, CurrentAmount, IsLaunched, StartDate, EndDate, Email_ID, Tag, Author) values(?,?,?,?,?,?,?,?,?,?)",
            [Project_ID, Description, Goal ,0,0,null,EndDate, Email_ID, Tag, Author], (error, result) => {
                if (error) { return reject(error); }
                if (result.affectedRows == 1) {
                    return resolve(true);
                }
                else {
                    return resolve(false);
                }
            });
        });
    };
    

    try {
        const isProject = await checkisProject(Project_ID);
        if (!isProject) {
            const insertedProject = await checkinsertProject(Project_ID,Email_ID,Pledge_ID,Description,Goal,EndDate,Tag, Author);
            if (insertedProject) {
                response.statusCode = 200;
            }
            else {
                response.statusCode = 400;
                response.error = "failed insert";
            }
        }
        else {
            response.statusCode = 400;
            response.error = "already project with this ID";
        }
    }
    catch (err) {
        response.statusCode = 400;
        response.error = "something wrong" + err;
    }
    return response
};
