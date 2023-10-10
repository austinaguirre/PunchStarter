import {Project, Pledge} from './Developer_Project.js'

export class Developer{
    constructor(email, ProjectIDs, funds){
        this.type = "DEVELOPER";
        this.email = email;
        this.ProjectIDs = null;
        this.funds = funds;
    }

    parse(developerJSON){
        //if ProjectIDs doesnt exist, add a null field here
        //this.email = email;
        //this.ProjectIDs = ProjectIDs;
        //this.funds = funds;
    }
}
