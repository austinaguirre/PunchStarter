import React, { Component } from "react";
import popup from "./popup.css"
import { CurrentJSON, model, instance} from "./../App"
import { layout } from '../cssstuff.js'


export default class NewProjectPopUp extends Component {
    handleClose = () => {
        this.props.toggle();
    };

    handleSubmit = event => {
        event.preventDefault();
        let namearr = window.location.href.split("/");
        let name = namearr[namearr.length - 1].slice(0, -1)
        let currentProject = null;
        if (CurrentJSON) {
            CurrentJSON.Projects.forEach(Project => {
                if (Project.Project_ID === name) {
                    currentProject = Project;
                }
            })
        }
        let id
        let des
        let gol
        let ta
        let aut

        if (!document.getElementById("editname").value) {
            id = currentProject.Project_ID
        }
        if (!document.getElementById("editdis").value) {
            des = currentProject.Description
        }
        if (!document.getElementById("editgoal").value) {
            gol = currentProject.Goal
        }
        if (!document.getElementById("edittag").value) {
            ta = currentProject.Tag
        }
        if (!document.getElementById("editauthor").value) {
            aut = currentProject.Author
        }
        if (isNaN(gol) || gol <= 0 || gol % 1 != 0) {
            window.alert("incorrect input")
            return;
        }

        let userEmail = model.user.email

        let msg = {}
        msg["Project_ID"] = id;
        msg["Description"] = des;
        msg["Goal"] = gol;
        msg["Email_ID"] = userEmail;
        msg["Tag"] = ta;
        msg["Author"] = aut;
  
        let dataValue = JSON.stringify(msg);
        let data = { 'body': dataValue }
        instance.post('/TTTTTTTTTTBBBBBDDDDDDD', data).then((response) => {
          if (response.data.statusCode === 200) {
            window.location.reload()
          } else {
            console.log(response.data.error);
            window.alert("Sorry you already have a project with this name!")
          }
        })

        window.location.reload()
    }


    render() {
        return (
            <div>
                <div style={layout.editProjectPopUp} className="modal_content">
                    <span className="close" onClick={this.handleClose}>
                        &times;
                    </span>
                    <form style = {layout.submitButton} id="editproject" onSubmit={this.handleSubmit}>
                        <h3>Edit Project</h3>
                        <label>
                            Edit Name of Project:
                            <input type="text" id="editname" />
                        </label><br></br>
                        <label>
                            Description:
                            <input type="text" id="editdis" />
                        </label><br></br>
                        <label>
                            Goal:
                            <input type="text" id="editgoal" />
                        </label><br></br>
                        <label>
                            Tag:
                            <select id="edittag">
                                <option value="other">Other</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="technology">Technology</option>
                                <option value="art">Art</option>
                                <option value="foodsandcrafts">Foods and Crafts</option>
                                <option value="games">Games</option>
                            </select>
                        </label><br></br>
                        <label>
                            Author:
                            <input type="text" id="editauthor" />
                        </label><br></br>
                        <br />
                        <input type="submit" />
                    </form>
                </div>
            </div>
        );
    }
}
