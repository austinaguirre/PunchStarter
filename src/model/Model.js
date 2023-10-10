import {Developer} from './Developer.js'
export class Model {
    constructor(user) {
        // this.type = user.type;
        this.user = user;
    }
}

export class login{
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
}