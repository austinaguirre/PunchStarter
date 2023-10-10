
export class Project{
    // //stringify returns payload, parse return to create project
    // constructor(name, description, goal, developer){
    //     this.name = name;
    //     this.description = description;
    //     this.goal = goal;
    //     this.developer = developer;
    //     this.isLaunched = false;
    //     this.start = null;
    //     this.end = null;
    //     this.pledges = [];
    //     this.currentFunds = 0;
    //     this.directSupport = [];

    //     //name, description, goal, developer, currentFunds, isLaunched, start, end, pledges, directSupport
    // }
    //constructor that takes in the required input to make a new project
    constructor(name, description, goal, Date){
        this.name = name;
        this.description = description;
        this.goal = goal;
        this.developer = null;
        this.isLaunched = false;
        this.start = null;
        this.end = Date;
        this.pledges = [];
        this.currentFunds = 0;
        this.directSupport = [];

        //name, description, goal, developer, currentFunds, isLaunched, start, end, pledges, directSupport
    }
    parse(projectJSON){
        //tempProj = JSON.parse(projectJSON)
        //this.name = name;
        //this.description = description;
        //this.goal = goal;
        //this.developer = developer;
        //this.isLaunched = false;
        //this.start = Date(null,null,null);
        //this.end = Date(null,null,null);
        //this.pledges = [null];
        //this.currentFunds = 0;
        //this.directSupport = [null];

        //name, description, goal, developer, currentFunds, isLaunched, start, end, pledges, directSupport
    }

    getJSON(){
        //get the json
    }

}

export class Date{
    constructor(year, month, day){
        this.year = year;
        this.month = month;
        this.day = day;
    }
    toString(){
        return "deez"
    }
}

export class Pledge{
    // constructor(pledgeName, projectName, description, amount, maxContributors){
    //     this.pledgeName = pledgeName;
    //     this.projectName = projectName;
    //     this.description = description;
    //     this.amount = amount;
    //     this.maxContributors = maxContributors;
    // }
    constructor(pledgeName,projectName, description, amount, maxContributors){
        this.pledgeName = pledgeName;
        this.projectName = projectName;
        this.description = description;
        this.amount = amount;
        this.maxContributors = maxContributors;
    }
    parse(pledgeJSON){}
    getJSON(){}
}

export class directSupport {
    constructor(supporterID, amount, projectID){
        this.supporterID = supporterID;
        this.amount = amount;
        this.projectID = projectID;
    }
}
