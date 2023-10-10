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
        conx.query(sql, params, function (err, rows) {
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
    let Tag = info.tagSearchValue;
    let searchValue;
    let tagSearchArray = Tag.split(",");

    if (info.searchValue) {
        searchValue = info.searchValue;
    }
    else {
        searchValue = "";
    }

    const date = new Date();
    let day = date.getDate() - 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let theDate = month + "-" + day + "-" + year;
    console.log("theDate", theDate)



    let returnJSON = {
        "Projects": [

        ],
        "User": {},
        "SupportedPledges": [],
        "SupportedProjects": [],
        "TopProjectsRN": []
    }


    let getTopProjects = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Project where IsLaunched=? order by CurrentAmount desc limit 3", [1], (error, rows) => {
                if (error) { return reject(error); }
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let valid = false

                        let endDateDB = rows[i].EndDate;
                        let d = endDateDB.split('-')

                        if (parseInt(d[2]) === year) {

                            let numDB = null
                            let e = d[0]

                            if (e === "Jan" || e === "jan") { numDB = 1 }
                            else if (e === "Feb" || e === "feb") { numDB = 2 }
                            else if (e === "Mar" || e === "mar") { numDB = 3 }
                            else if (e === "Apr" || e === "apr") { numDB = 4 }
                            else if (e === "May" || e === "may") { numDB = 5 }
                            else if (e === "Jun" || e === "jun") { numDB = 6 }
                            else if (e === "Jul" || e === "jul") { numDB = 7 }
                            else if (e === "Aug" || e === "aug") { numDB = 8 }
                            else if (e === "Sep" || e === "sep") { numDB = 9 }
                            else if (e === "Oct" || e === "oct") { numDB = 10 }
                            else if (e === "Nov" || e === "nov") { numDB = 11 }
                            else if (e === "Dec" || e === "dec") { numDB = 12 }

                            if (numDB === month) {
                                if (d[1] === day || d[1] > day) {
                                    valid = true
                                }
                            }
                            else if (numDB > month) {
                                valid = true
                            }

                        }
                        else if (d[2] > year) {
                            valid = true
                        }

                        if (valid) {
                            returnJSON["TopProjectsRN"].push({
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
                                "Pledges": []

                            });
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


    let getSearchedProjects = (searchValue) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Project where IsLaunched=? and Project_ID like ?", [1, searchValue], (error, rows) => {
                if (error) { return reject(error); }
                if (rows.length > 0) {
                    if (tagSearchArray.length === 0) {
                        //return everything
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
                                "Pledges": []
                            });
                        }
                    }
                    else {
                        //only return stuffy that tags match
                        for (let i = 0; i < rows.length; i++) {
                            let counter = 0;
                            while (counter < tagSearchArray.length) {
                                if (rows[i].Tag === tagSearchArray[counter]) {
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
                                        "Pledges": []
                                    });
                                    counter = tagSearchArray.length;
                                }
                                else {
                                    counter++;
                                }
                            }
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
            pool.query("SELECT * FROM Supporter where Email_ID=?", [email], (error, rows) => {
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

    let getSupported = (email) => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Transaction where Supporter_ID=?", [email], (error, rows) => {
                if (error) { return reject(error); }
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        if (rows[i].Pledge_ID) {
                            returnJSON["SupportedPledges"].push({
                                "Project_ID": rows[i].Project_ID,
                                "Amount": rows[i].Amount,
                                "Pledge_ID": rows[i].Pledge_ID
                            })
                        }
                        else {
                            returnJSON["SupportedProjects"].push({
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

    try {
        await getUserData(Email_ID)
        await getSupported(Email_ID)
        await getTopProjects()
        searchValue = "%" + searchValue + "%"
        await getSearchedProjects(searchValue)

        let projects = returnJSON.Projects;
        let len = projects.length;
        let i;
        for (i = 0; i < len; i++) {
            let theproject = projects[i];
            let theid = theproject.Project_ID;
            await getPledges(theid, i);
        }
        response.body = JSON.stringify(returnJSON);
        response.statusCode = 200;

    }
    catch (err) {
        response.statusCode = 400;
        response.error = "something wrong" + err;
    }
    return response
};
