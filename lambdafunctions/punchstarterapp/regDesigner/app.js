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
            } else {
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

      let email = info.Email_ID;
      let password = info.Password;


        //query database to see if there is a match
        // if match 200
        // anything else is 400
        let CheckUser = (email,password) => { 
            return new Promise((resolve, reject) => {
                
            pool.query("SELECT * FROM Designer WHERE Email_ID=?", [email], (error, rows) => {
               
                if (error) { return reject(error); }
                
                if ((rows) && (rows.length == 1)) { 
                    return resolve(true);   // TRUE if does exist
                } else { 
                    return resolve(false); //no user with email 
                }
            });
        });
    };
    
    let registerUser = (email,password) => {
        return new Promise((resolve, reject) => {
                
            pool.query("insert into Designer(Email_ID, Password, Funds) values(?,?,?)", [email,password,0], (error, rows) => {
               
                if (error) { return reject(error); }
                
                if ((rows) && (rows.length == 1)) {
                    return resolve(true);   // TRUE if does exist
                } else { 
                    return resolve(true);
                }
            });
        });
    };
        
        
    try {
        const isUpdatedUser = await CheckUser(email,password);
        if(!isUpdatedUser) {
            const register = await registerUser(email,password);
            if(register) {
                response.statusCode = 200;
            }
            else {
                 response.statusCode = 400;
                 response.error = "failed insert";
            }
        }
        else {
            response.statusCode = 400;
            response.error = "user already exists with this email";
        }
    } catch (err) {
        response.statusCode = 400;
        response.error = "something wrong" + err;
    }
    return response
};
