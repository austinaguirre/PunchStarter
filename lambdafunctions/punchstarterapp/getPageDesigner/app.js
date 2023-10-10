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

    let Email_ID = info.Email_ID;
    let searchValue;
    if (info.searchValue) {
        searchValue = info.searchValue;
    }
    else {
        searchValue = "";
    }



    let returnJSON = {
        "Projects": [

        ],
        "User": {},
        "SupportedPledges": [],
        "SupportedProjects": []
    }
    // var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';


    let getallProjects = (email) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Project where Email_ID=?", [email], (error, rows) => {
                if (error) { return reject(error); }
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        // returnJSON.Projects.push()
                        returnJSON["Projects"].push({
                            "Project_ID": rows[i].Project_ID,
                            "Description": rows[i].Description,
                            "Goal": rows[i].Goal,
                            "CurrentAmount": rows[i].CurrentAmount,
                            "IsLaunched": rows[i].IsLaunched,
                            "StartDate": rows[i].StartDate,
                            "EndDate": rows[i].EndDate,
                            "Email_ID": rows[i].Email_ID,
                            "Tag": rows[i].Tag,
                            "Author": rows[i].Author,
                            "Pledges": [],
                            "Transactions": []

                        });
                        // var res = await getall(rows[i].Project_ID, i)
                        // return new Promise((resolve,reject)=>{
                        //     resolve(getallPledges(rows[i].Project_ID, i));
                        // })
                    }
                    return resolve(true); // TRUE if does exist
                }
                else {
                    return resolve(false);
                }
            });
        });
    };

    let getPledges = (projectID, projectIndex) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Pledge where Project_ID=?", [projectID], (error, rows) => {
                if (error) { return (error); }
                if (rows) {
                    for (let i = 0; i < rows.length; i++) {
                        returnJSON.Projects[projectIndex].Pledges.push({
                            "Pledge_ID": rows[i].Pledge_ID,
                            "Name": rows[i].Name,
                            "Description": rows[i].Description,
                            "MaxSupporters": rows[i].MaxSupporters,
                            "NumberSupporters": rows[i].NumberSupporters,
                            "Project_ID": rows[i].Project_ID,
                            "Cost": rows[i].Cost
                        })
                    }
                    return resolve(true);
                }
                else {
                    return resolve(false);
                }
            });

        });
    };

    let getUserData = (email) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Designer where Email_ID=?", [email], (error, rows) => {
                if (error) { return reject(error); }
                if (rows.length > 0) {
                    returnJSON["User"] = {
                        "Email_ID": rows[0].Email_ID,
                        "Funds": rows[0].Funds
                    }
                    return resolve(true); // TRUE if does exist
                }
                else {
                    return resolve(false);
                }
            });
        });
    };

    let getSearchedProjects = (searchValue, email) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Project where Project_ID like ? and Email_ID=?", [searchValue, email], (error, rows) => {
                if (error) { return reject(error); }
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        returnJSON["Projects"].push({
                            "Project_ID": rows[i].Project_ID,
                            "Description": rows[i].Description,
                            "Goal": rows[i].Goal,
                            "CurrentAmount": rows[i].CurrentAmount,
                            "IsLaunched": rows[i].IsLaunched,
                            "StartDate": rows[i].StartDate,
                            "EndDate": rows[i].EndDate,
                            "Email_ID": rows[i].Email_ID,
                            "Tag": rows[i].Tag,
                            "Author": rows[i].Author,
                            "Pledges": [],
                            "Transactions": []

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
    
    let getTransaction = (Project_ID, projectIndex) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Transaction where Project_ID=?", [Project_ID], (error, rows) => {
                if (error) { return reject(error); }
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        if (rows[i].Pledge_ID) {
                            // returnJSON["Projects"].push({
                             returnJSON.Projects[projectIndex].Transactions.push({
                                "Project_ID": rows[i].Project_ID,
                                "Amount": rows[i].Amount,
                                "Pledge_ID": rows[i].Pledge_ID
                            })
                        }
                        else {
                            //returnJSON["SupportedProjects"].push({
                            console.log(rows[i].Project_ID);
                            console.log(rows[i].Amount);
                            console.log(returnJSON.Projects[projectIndex]);
                            console.log(returnJSON.Projects[projectIndex].Transactions);
                             returnJSON.Projects[projectIndex].Transactions.push({
                                "Project_ID": rows[i].Project_ID,
                                "Amount": rows[i].Amount
                            })
                        }
                    }
                    return resolve(true); // TRUE if does exist
                }
                else {
                    return resolve(false);
                }
            });
        });
    };
    
    //getpage designer
    try {
        await getUserData(Email_ID);
        searchValue = "%" + searchValue + "%";

        await getSearchedProjects(searchValue, Email_ID);

        let projects = returnJSON.Projects;
        let len = projects.length;
        let i;
        for (i = 0; i < len; i++) {
            let theproject = projects[i];
            let theid = theproject.Project_ID;
            await getTransaction(theid,i);
            await getPledges(theid, i);
        }

        response.body = JSON.stringify(returnJSON);
        response.statusCode = 200;
    }
    catch (err) {
        response.statusCode = 400;
        response.error = "something wrong:" + err;
    }
    return response
};
