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
    let Name = info.Name;
    let Pledge_ID = Name+Project_ID;
    let Description = info.Description;
    let Cost = info.Cost;
    let MaxSupporters = info.MaxSupporters;


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
                    return resolve(false); //FALSE if it doesn't exist
                }
            });
        });
    };

    let checkinsertPledge = (Project_ID,Name,Pledge_ID,Description,Cost,MaxSupporters) => {
        return new Promise((resolve, reject) => {

            pool.query("insert into Pledge(Pledge_ID, Name, Description, MaxSupporters, NumberSupporters, Project_ID, Cost) values(?,?,?,?,?,?,?)",
            [Pledge_ID,Name,Description,MaxSupporters,0,Project_ID,Cost], (error, result) => {
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
        const isPledge = await checkisPledge(Pledge_ID);
        if (!isPledge) {
            if(!Name || !Project_ID ) {
                response.statusCode = 400;
                response.error = "Name or Project_ID cannot be null";
                return response;
            }
            if(isNaN(Cost) || !Cost >= 1) {
                response.statusCode = 400;
                response.error = "Invalid Cost";
                return response;
            }
            if(isNaN(MaxSupporters) || !(MaxSupporters >= 1 || MaxSupporters !== -1)) {
                response.statusCode = 400;
                response.error = "Invalid Max Supporters";
                return response;
            }
            
            //if all checks pass, we try inserting pledge into database
            const insertedPledge = await checkinsertPledge(Project_ID,Name,Pledge_ID,Description,Cost,MaxSupporters);
            if (insertedPledge) {
                response.statusCode = 200;
            }
            else {
                response.statusCode = 400;
                response.error = "failed insert";
            }
        }
        else {
            response.statusCode = 400;
            response.error = "already pledge with this ID";
        }
    }
    catch (err) {
        response.statusCode = 400;
        response.error = "something wrong" + err;
    }
    return response
};
