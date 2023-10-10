let Projectexamplejson = {
    "Projects": [
      {
        "Project_ID": "projectname/id",
        "Description": "project descriptiosotn",
        "Goal": 20,
        "CurrentAmount": 10,
        "IsLaunched": false,
        "start": { "year": 2002, "month": 2, "day": 11 },
        "end": { "year": 2003, "month": 2, "day": 11 },
        "Email_ID": "designerwhomadeit",
        "Pledges": [
          {
            "pledgeName": "firstfirstpledge",
            "projectName": "projectname/id",
            "description": "pledge one description",
            "Cost": 20,
            "maxContributors": 3
          },
        ]
      }
    ],
    "User": {
      "Email_ID": "devemail",
      "Funds": 10
    }
  }
  // console.log(Projectexamplejson.Projects[0].Pledges);
  // console.log(Projectexamplejson["Projects"])
  
  //  "Projects":[{"Project_ID": "projectname/id","Description": "project descriptiosotn","Goal": 20,"CurrentAmount": 10,"IsLaunched": false,"start": { "year": 2002, "month": 2, "day": 11 },"end": { "year": 2003, "month": 2, "day": 11 },"Email_ID" : "designerwhomadeit"}]}
  
  let ProjectList = {
    "Projects": [
      {
        "name": "firstproject",
        "description": "big long descritopoiton for one",
        "goal": 20,
        "developer": { "type": "DEVELOPER", "email": "firstemail", "projectids": [2342, 2356, 2333], "funds": 10 },
        "isLaunched": false,
        "start": { "year": 2002, "month": 2, "day": 11 },
        "end": { "year": 2003, "month": 2, "day": 11 },
        "pledges": [
          {
            "pledgeName": "firstfirstpledge",
            "projectName": "firstproject",
            "description": "pledge one description",
            "amount": 20,
            "maxContributors": 3
          },
          {
            "pledgeName": "secondfirstpledge",
            "projectName": "firstproject",
            "description": "pledge two description",
            "amount": 10,
            "maxContributors": 6
          }
        ],
        "currentFunds": 0,
        "directSupport": []
      },
      {
        "name": "secondproject",
        "description": "big long descritopoiton for two",
        "goal": 50,
        "developer": { "type": "DEVELOPER", "email": "secndemail", "projectids": [2343, 2357, 2343], "funds": 30 },
        "isLaunched": true,
        "start": { "year": 2002, "month": 2, "day": 11 },
        "end": { "year": 2006, "month": 2, "day": 11 },
        "pledges": [
          {
            "pledgeName": "firstfirstpledge",
            "projectName": "secondproject",
            "description": "pledge one description",
            "amount": 20,
            "maxContributors": 3
          },
          {
            "pledgeName": "secondfirstpledge",
            "projectName": "secondproject",
            "description": "pledge two description",
            "amount": 10,
            "maxContributors": 6
          }
        ],
        "currentFunds": 0,
        "directSupport": []
      },
      {
        "name": "thirdproject",
        "description": "big long descritopoiton for two",
        "goal": 50,
        "developer": { "type": "DEVELOPER", "email": "firstemail", "projectids": [2343, 2357, 2343], "funds": 30 },
        "isLaunched": true,
        "start": { "year": 2002, "month": 2, "day": 11 },
        "end": { "year": 2006, "month": 2, "day": 11 },
        "pledges": [
          {
            "pledgeName": "firstfirstpledge",
            "projectName": "secondproject",
            "description": "pledge one description",
            "amount": 20,
            "maxContributors": 3
          },
          {
            "pledgeName": "secondfirstpledge",
            "projectName": "secondproject",
            "description": "pledge two description",
            "amount": 10,
            "maxContributors": 6
          }
        ],
        "currentFunds": 0,
        "directSupport": []
      }
    ]
  }
  let DesignerProjectList = {
    "Projects": [
      {
        "name": "firstproject",
        "description": "big long descritopoiton for one",
        "goal": 20,
        "developer": { "type": "DEVELOPER", "email": "firstemail", "projectids": [2342, 2356, 2333], "funds": 10 },
        "isLaunched": false,
        "start": { "year": 2002, "month": 2, "day": 11 },
        "end": { "year": 2003, "month": 2, "day": 11 },
        "pledges": [
          {
            "pledgeName": "firstfirstpledge",
            "projectName": "firstproject",
            "description": "pledge one description",
            "amount": 20,
            "maxContributors": 3
          },
          {
            "pledgeName": "secondfirstpledge",
            "projectName": "firstproject",
            "description": "pledge two description",
            "amount": 10,
            "maxContributors": 6
          }
        ],
        "currentFunds": 0,
        "directSupport": []
      },
      {
        "name": "thirdproject",
        "description": "big long descritopoiton for two",
        "goal": 50,
        "developer": { "type": "DEVELOPER", "email": "firstemail", "projectids": [2343, 2357, 2343], "funds": 30 },
        "isLaunched": true,
        "start": { "year": 2002, "month": 2, "day": 11 },
        "end": { "year": 2006, "month": 2, "day": 11 },
        "pledges": [
          {
            "pledgeName": "firstfirstpledge2",
            "projectName": "thirdproject",
            "description": "pledge one description",
            "amount": 20,
            "maxContributors": 3
          },
          {
            "pledgeName": "secondfirstpledg2e",
            "projectName": "thirdproject",
            "description": "pledge two description",
            "amount": 10,
            "maxContributors": 6
          }
        ],
        "currentFunds": 0,
        "directSupport": []
      }
    ]
  }
  // this.name = name;
  // this.description = description;
  // this.goal = goal;
  // this.developer = developer;
  // this.type = "DEVELOPER";
  // this.email = email;
  // this.ProjectIDs = ProjectIDs;
  // this.funds = funds;
  // this.isLaunched = false;
  // this.start = null;
  // this.year = year;
  // this.month = month;
  // this.day = day;
  // this.end = null;
  // this.pledges = [];
  // this.pledgeName = pledgeName;
  // this.projectName = projectName;
  // this.description = description;
  // this.amount = amount;
  // this.maxContributors = maxContributors;
  // this.currentFunds = 0;
  // this.directSupport = [];