import './App.css';
import { Model } from './model/Model';
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios"
import PunchStarterDarkMode from './PunchStarterDarkMode.png'
import WhitePink from './WhitePink.png'
import WhiteRainbow from './WhiteRainbow.png'
import PunchStarterLightMode from './PunchStarterLightMode.png'
import punchstarterbackground from './punchstarterbackground.jpeg'
import winky from './winky.png'
import WhiteGreen from './WhiteGreen.png'
import WhitePink2 from './WhitePink2.png'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate
} from 'react-router-dom';
import { Developer } from './model/Developer';
import { Admin } from './model/Admin';
import { Supporter } from './model/Supporter';
import PopUp from "reactjs-popup"
import NewProjectPopUp from './Popups/NewProjectPopUp';

import { useCookies } from 'react-cookie';

// import { layout } from './cssstuff.js'
import { render } from '@testing-library/react';


export let CurrentJSON;

// let primaryColor = '#FF69B4';
const green = '#FF69B4'
const pink = '#00FF85'
const purple = '#774dbf'
const yellow = '#eaff00'


let logout = false;
export let model = new Model();
let url = 'https://jjz9gc0wr6.execute-api.us-east-2.amazonaws.com/Prod'

export const instance = axios.create({
  baseURL: url
});


function App() {

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  function handleNewCookie(Email_ID, Role) {
    setCookie("Email_ID", Email_ID, {
      path: "/"
    });
    setCookie("Role", Role, {
      path: "/"
    })
  }
  function rmCookie() {
    removeCookie("Email_ID");
    removeCookie("Role");
  }
  function rmtheCookie(str) {
    removeCookie(str);
  }

  function amountLeftHelper(max, current) {
    if (max == -1) {
      return "infinte";
    }
    else {
      return max - current;
    }
  }

  function updateAdmin(cookieEmail) {
    model.user = new Admin(cookieEmail)
    GetProjectsAdmin(null);
  }
  function updateDeveloper(cookieEmail) {
    model.user = new Developer(cookieEmail, 0, null)
    GetPageDesigner(null);
  }
  function updateSupporter(cookieEmail, setData) {
    model.user = new Supporter(cookieEmail, 0, null)
    GetPageSupporter(setData);
  }

  function updateCurrentDeveloper() {
    if (CurrentJSON.User.Email_ID) {
      //checkif you want
    }
    model.user.funds = CurrentJSON.User.Funds;
  }


  const [primaryColor, setPrimaryColor] = useState(pink);
  const [punchstarterIcon, setPunchstarterIcon] = useState(WhiteGreen);

  function handleColorSwitch() {
    if (primaryColor === green) {
      setPrimaryColor(pink);
      setPunchstarterIcon(WhiteGreen);
    } else if (primaryColor === pink) {
      setPrimaryColor(purple);
      setPunchstarterIcon(WhiteRainbow);
    } else if (primaryColor === purple) {
      setPrimaryColor(yellow);
      setPunchstarterIcon(WhiteRainbow);
    } else if (primaryColor === yellow) {
      setPrimaryColor(green);
      setPunchstarterIcon(WhitePink2);
    }
  }

  const layout = {

    punchstarter: {
      
      fontSize: 50,
      position: 'absolute',
      top: 13,
      left: 310,
      color: 'white',
      fontFamily: 'punchstarterfont',
      letterSpacing: 2,
      //backgroundColor: "#e8ccd7",

      overflowWrap: 'break-word',
    },

    loginScreenLogin: {
      fontSize: 40,
      position: 'absolute',
      top: 100,
      left: 660,
      color: 'white',
      fontFamily: 'punchstarterfont',
      letterSpacing: 0.5,
      overflowWrap: 'break-word',
    },

    winkyHomeScreen: {

      position: 'absolute',
      top: 45,
      left: 50,
      height: 50,
      width: 50,
      overflowWrap: 'break-word',
    },
    winkyAdminHome: {

      position: 'absolute',
      top: 45,
      left: 1200,
      height: 50,
      width: 50,
      overflowWrap: 'break-word',
    },

    winkyDesignerHome: {

      position: 'absolute',
      top: 45,
      left: 1200,
      height: 50,
      width: 50,
      overflowWrap: 'break-word',
    },

    homeScreenBackground: {

      backgroundColor: 'pink',

      overflowWrap: 'break-word',
    },

    supporterLogin: {

      fontSize: 30,
      position: 'absolute',
      top: 200,
      left: 195,
      color: 'white',
      fontFamily: 'punchstarterfont',
      letterSpacing: 0.5,


      overflowWrap: 'break-word',
    },

    supporterEmailField: {

      fontSize: 20,
      position: 'absolute',
      top: 300,
      left: 200,
      width: 250,
      height: 30,
      borderRadius: 10,
      color: '#ffffff',
      backgroundColor: '#383A38',
      borderColor: 'black',
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',

      overflowWrap: 'break-word',
    },

    supporterPasswordField: {

      fontSize: 20,
      position: 'absolute',
      top: 360,
      left: 200,
      width: 250,
      height: 30,
      borderRadius: 10,
      color: '#ff0000',
      color: '#ffffff',
      backgroundColor: '#383A38',
      borderColor: 'black',
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',

      overflowWrap: 'break-word',
    },

    supporterSignInButton: {

      fontSize: 30,
      position: 'absolute',
      top: 445,
      left: 265,
      height: 40,
      borderRadius: 10,
      backgroundColor: primaryColor,
      fontFamily: 'punchstarterfont',
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    supporterCreateAccountButton: {

      fontSize: 30,
      position: 'absolute',
      top: 510,
      left: 195,
      height: 40,
      borderRadius: 10,
      backgroundColor: primaryColor,
      fontFamily: 'punchstarterfont',
      borderColor: 'black',



      overflowWrap: 'break-word',
    },

    designerLogin: {
      position: 'absolute',
      fontSize: 30,
      top: 200,
      left: 600,
      borderRadius: 10,
      color: 'white',
      fontFamily: 'punchstarterfont',
      letterSpacing: 0.5,
      overflowWrap: 'break-word',
    },

    designerEmailField: {

      position: 'absolute',
      fontSize: 20,
      top: 296,
      left: 595,
      width: 250,
      height: 30,
      borderRadius: 10,
      color: '#ffffff',
      backgroundColor: '#383A38',
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    designerPasswordField: {

      position: 'absolute',
      fontSize: 20,
      top: 360,
      left: 595,
      width: 250,
      height: 30,
      borderRadius: 10,
      color: '#ffffff',
      backgroundColor: '#383A38',
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    designerSignInButton: {

      position: 'absolute',
      fontSize: 30,
      top: 445,
      left: 665,
      height: 40,
      borderRadius: 10,
      backgroundColor: primaryColor,
      fontFamily: 'punchstarterfont',
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    designerCreateAccountButton: {

      position: 'absolute',
      fontSize: 30,
      top: 510,
      left: 595,
      height: 40,
      borderRadius: 10,
      backgroundColor: primaryColor,
      fontFamily: 'punchstarterfont',
      borderColor: 'black',


      overflowWrap: 'break-word',
    },

    adminLogin: {

      position: 'absolute',
      fontSize: 30,
      top: 200,
      left: 1030,
      borderRadius: 10,
      color: 'white',
      letterSpacing: 0.5,
      fontFamily: 'punchstarterfont',
      borderColor: 'black',
      overflowWrap: 'break-word',
    },

    adminEmailField: {

      fontSize: 20,
      position: 'absolute',
      top: 296,
      left: 1000,
      width: 250,
      height: 30,
      borderRadius: 10,
      color: '#ffffff',
      backgroundColor: '#383A38',
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    adminPasswordField: {

      fontSize: 20,
      position: 'absolute',
      top: 357,
      left: 1000,
      width: 250,
      height: 30,
      boarderRadius: 20,
      borderRadius: 10,
      color: '#ffffff',
      backgroundColor: '#383A38',
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    adminSignInButton: {

      fontSize: 30,
      position: 'absolute',
      top: 445,
      left: 1070,
      height: 40,
      borderRadius: 10,
      backgroundColor: primaryColor,
      fontFamily: 'punchstarterfont',
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    adminCreateAccountButton: {

      fontSize: 30,
      position: 'absolute',
      top: 510,
      left: 1000,
      height: 40,
      borderRadius: 10,
      backgroundColor: primaryColor,
      fontFamily: 'punchstarterfont',
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    background: {
      backgroundColor: 'black',
      overflowWrap: 'break-word',
    },

    punchstarterdarkmode: {

      position: 'absolute',
      top: 45,
      left: 670,
      height: 50,
      width: 600,
      overflowWrap: 'break-word',

      // position: 'absolute',
      // top: -45,
      // left: 610,
      // height: 220,
      // width: 600,
      // overflowWrap: 'break-word',
    },



    //supporter css

    //supporter
    supporterPSicon: {

      fontSize: 40,
      position: 'absolute',
      top: -21,
      left: 815,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    supporterPSlogo: {
      position: 'absolute',
      top: -90,
      left: 300,
      height: 220,
      width: 600,

      overflowWrap: 'break-word',
    },

    supporterAccount: {

      fontSize: 40,
      position: 'absolute',
      top: 40,
      left: 590,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    supporterFunds: {

      fontSize: 30,
      position: 'absolute',
      top: 100,
      left: 1000,
      fontFamily: 'punchstarterfont',
      color: 'white',


      overflowWrap: 'break-word',
    },

    supporterAmountToAdd: {

      fontSize: 20,
      position: 'absolute',
      top: 175,
      left: 1025,
      width: 225,
      height: 30,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      backgroundColor: '#383A38',
      color: 'white',
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    supporterPassword: {

      fontSize: 20,
      position: 'absolute',
      top: 225,
      left: 1025,
      width: 225,
      height: 30,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: 'black',
      backgroundColor: '#383A38',
      color: 'white',
      overflowWrap: 'break-word',
    },

    supporterAddFundsButton: {

      fontSize: 20,
      position: 'absolute',
      top: 175,
      left: 1275,
      width: 125,
      height: 70,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    currentSupportedItems: {

      fontSize: 30,
      position: 'absolute',
      top: 90,
      left: 50,
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    viewCurrentActivityButton: {

      fontSize: 20,
      position: 'absolute',
      top: 175,
      left: 200,
      width: 125,
      height: 70,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',
      overflowWrap: 'break-word',
    },

    supportedProjectsList: {

      fontSize: 20,
      fontFamily: 'punchstarterfont',
      padding: 10,
      color: 'black',
      width: 400,
      height: 30,
      borderRadius: 10,
      backgroundColor: primaryColor,
      lineHeight: 0.9,
      paddingTop: 20,


      overflowWrap: 'break-word',
    },

    projectList: {

      fontSize: 30,
      fontFamily: 'punchstarterfont',
      padding: 10,
      color: 'black',
      position: 'absolute',
      top: 200,
      left: 580,
      color: 'white',
      width: 400,

      overflowWrap: 'break-word',
    },

    searchProjectField: {

      fontSize: 20,
      position: 'absolute',
      top: 295,
      left: 595,
      width: 225,
      height: 30,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: 'black',
      backgroundColor: '#383A38',
      color: 'white',

      overflowWrap: 'break-word',
    },

    searchProjectButton: {

      fontSize: 20,
      position: 'absolute',
      top: 292,
      left: 835,
      width: 120,
      height: 45,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',


      overflowWrap: 'break-word',
    },

    searchProjectClear: {

      fontSize: 20,
      position: 'absolute',
      top: 292,
      left: 465,
      width: 120,
      height: 45,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: '#383A38',
      color: '#b9b6ba',
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    supporterCurrentSearch: {

      fontSize: 20,
      position: 'absolute',
      top: 325,
      left: 600,
      width: 225,
      height: 20,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      color: 'white',
      overflowWrap: 'break-word',


      overflowWrap: 'break-word',
    },

    supporterCheckbox: {

      color: 'white',
      fontFamily: 'punchstarterfont',
      fontSize: 25,
      position: 'absolute',
      top: 300,
      left: 100,
      width: 300,
      overflowWrap: 'break-word',
      borderWidth: 3,
      borderColor: 'white',
      borderStyle: 'solid',
      borderRadius: 10,
      textAlign: 'center',

      overflowWrap: 'break-word',
    },

    supporterLogout: {

      fontSize: 20,
      position: 'absolute',
      top: 50,
      left: 10,
      width: 120,
      height: 35,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    supporterProjects: {

      fontSize: 30,
      fontFamily: 'punchstarterfont',
      padding: 10,
      color: 'black',
      position: 'relative',
      top: -400,
      left: 455,
      borderRadius: 10,
      width: 500,
      color: 'white',
      textAlign: 'center',
      borderColor: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      backgroundColor: '#383A38',
      marginBottom: 30,

      overflowWrap: 'break-word',
    },

    supporterProjectsName: {

      backgroundColor: primaryColor,
      color: 'black',
      textAlign: 'center',
      borderRadius: 10,
      height: 40,
      paddingTop: 20,

      overflowWrap: 'break-word',
    },
    /*
    supporterHR : {
      border: 'none',
      height: 12,
      background: 'white',
      marginBottom: 50,
    
     overflowWrap: 'break-word', },
    */

    psbackground: {
      backgroundSize: 'cover',
      overflowWrap: 'break-word',
    },

    psActivity: {

      fontSize: 40,
      position: 'absolute',
      top: -21,
      left: 815,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      color: 'white',
      overflowWrap: 'break-word',
    },

    supporterActivity: {

      fontSize: 40,
      position: 'absolute',
      top: 25,
      left: 600,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    supporterActivityFunds: {

      fontSize: 25,
      position: 'absolute',
      top: 50,
      left: 1150,
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    supporterActivitySupportedItems: {

      fontSize: 30,
      position: 'absolute',
      top: 100,
      left: 450,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      color: 'white',


      overflowWrap: 'break-word',
    },

    supporterActivityBackButton: {

      fontSize: 20,
      position: 'absolute',
      top: 50,
      left: 50,
      width: 120,
      height: 50,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    supportedProjectsText: {

      fontSize: 30,
      position: 'absolute',
      top: 200,
      left: 160,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    claimedPledgesText: {


      fontSize: 30,
      position: 'absolute',
      top: 200,
      left: 980,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      color: 'white',


      overflowWrap: 'break-word',
    },

    supportedProjects: {

      fontSize: 30,
      fontFamily: 'punchstarterfont',
      padding: 10,
      color: 'black',
      position: 'relative',
      top: -800,
      left: 100,
      borderRadius: 10,
      width: 400,
      color: 'white',
      textAlign: 'center',

      overflowWrap: 'break-word',
    },

    pledgesClaimed: {

      fontSize: 30,
      fontFamily: 'punchstarterfont',
      padding: 10,
      color: 'black',
      position: 'relative',
      top: -4080,
      left: 900,
      borderRadius: 10,
      width: 500,
      color: 'white',
      textAlign: 'center',

      overflowWrap: 'break-word',
    },

    claimedPledgesList: {

      fontSize: 20,
      fontFamily: 'punchstarterfont',
      padding: 10,
      color: 'black',
      width: 400,
      height: 30,
      borderRadius: 10,
      backgroundColor: primaryColor,
      lineHeight: 0.9,
      paddingTop: 20,


      overflowWrap: 'break-word',
    },

    projectLandingPageSupporter: {

      fontSize: 40,
      position: 'absolute',
      top: '5%',
      left: '13%',
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    projectLandingPageSupporterFunds: {

      fontSize: 30,
      position: 'absolute',
      top: '15%',
      left: '69.5%',
      fontFamily: 'punchstarterfont',
      color: 'white',


      overflowWrap: 'break-word',
    },

    projectLandingPageLogoSupporter: {
      position: 'absolute',
      top: -90,
      left: 300,
      height: 220,
      width: 600,
      overflowWrap: 'break-word',
    },

    projectLandingPageSupporterText: {

      fontSize: 40,
      position: 'absolute',
      top: -21,
      left: 815,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    projectLandingPageSupporterCurrentFunds: {

      fontSize: 30,
      position: 'absolute',
      top: 120,
      left: 50,
      height: 40,
      fontFamily: 'punchstarterfont',
      color: 'white',
      overflowWrap: 'break-word',
    },

    projectLandingPageSupporterInfo: {

      fontSize: 30,
      position: 'absolute',
      top: 250,
      left: 20,
      height: 260,
      width: 600,
      fontFamily: 'punchstarterfont',
      color: 'black',
      backgroundColor: primaryColor,
      borderColor: 'black',
      borderRadius: 10,
      textAlign: 'center',
      overflowWrap: 'break-word',
    },

    projectLandingPageDonateText: {

      fontSize: 30,
      position: 'absolute',
      top: '28%',
      left: '69.5%',
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    projectLandingPageDonateTextField: {

      fontSize: 20,
      position: 'absolute',
      top: '37.5%',
      left: '69.5%',
      height: '5%',
      width: '17%',
      fontFamily: 'punchstarterfont',
      color: 'black',
      borderRadius: 10,
      color: '#ffffff',
      textAlign: 'center',
      backgroundColor: '#383A38',
      borderColor: 'black',
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',

      overflowWrap: 'break-word',
    },

    projectLandingPageDonateButton: {


      fontSize: 20,
      position: 'absolute',
      top: '36.5%',
      left: '89%',
      width: 125,
      height: 50,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    projectLandingPageSupporterProjectInfo: {
      fontSize: 40,
      color: 'white',
      fontWeight: 'bold',
      overflowWrap: 'break-word',
    },

    projectLandingPageSupporterBackButton: {

      fontSize: 15,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    projectLandingPageSupporterPledges: {

      backgroundColor: '#292b29',
      borderColor: 'black',
      borderRadius: 10,
      padding: 10,
      color: 'white',


      overflowWrap: 'break-word',
    },

    projectLandingPageSupporterPledgesOutline: {
      borderColor: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 10,
      backgroundColor: '#383A38',
      color: 'white',
      padding: 30,
      marginBottom: 50,
      overflowWrap: 'break-word',
    },

    projectLandingPageSupporterClaimPledgesButton: {

      fontSize: 20,
      height: 50,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    projectLandingPageSupporterPledgeName: {

      fontSize: 30,
      fontWeight: 'bold',

      overflowWrap: 'break-word',
    },

    signInAgainError: {
      color: 'white',
      textAlign: 'center',
      padding: 20,
      fontSize: 40,
      fontFamily: 'punchstarterfont',
      overflowWrap: 'break-word',
    },

    signInAgainErrorButton: {
      display: 'block', margin: '0 auto',
      fontSize: 20,
      height: 50,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',
      overflowWrap: 'break-word',
    },

    psLogoDesigner: {

      position: 'absolute',
      top: '0%',
      left: '40%',
      height: 220,
      width: 600,
      fontFamily: 'punchstarterfont',
      fontSize: 40,

      overflowWrap: 'break-word',
    },

    designerAccountName: {

      position: 'absolute',
      top: '3%',
      left: '40%',
      height: 220,
      width: 600,
      fontFamily: 'punchstarterfont',
      fontSize: 40,
      color: 'white',

      overflowWrap: 'break-word',
    },

    designerHomeCurrentFunds: {

      fontSize: 30,
      position: 'absolute',
      top: '15%',
      left: '69.5%',
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    designerProjectList: {



      overflowWrap: 'break-word',
    },

    designerHomeLogo: {
      position: 'absolute',
      top: '-13.2%',
      padding: 10,
      left: '21%',
      height: '30%',
      width: '40%',

      overflowWrap: 'break-word',
    },

    designerIcon: {

      fontSize: 40,
      position: 'absolute',
      top: '-2.7%',
      left: '56%',
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      color: 'white',
      overflowWrap: 'break-word',
    },

    designerYourProjectList: {

      fontSize: 30,
      position: 'absolute',
      top: '13.5%',
      left: '37.5%',
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    designerSearchProjectField: {

      fontSize: 20,
      position: 'absolute',
      top: '25%',
      left: '41%',
      width: 225,
      height: 30,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: 'black',
      backgroundColor: '#383A38',
      color: 'white',

      overflowWrap: 'break-word',
    },

    designerSearchProjectSearchButton: {


      fontSize: 20,
      position: 'absolute',
      top: '25%',
      left: '58%',
      width: 120,
      height: 35,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',


      overflowWrap: 'break-word',
    },

    designerSearchProjectClearButton: {
      fontSize: 20,
      position: 'absolute',
      top: '25%',
      left: '32%',
      width: 120,
      height: 35,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: '#383A38',
      color: '#b9b6ba',
      borderColor: 'black',
      overflowWrap: 'break-word',
    },

    designerCurrentSearch: {

      fontSize: 20,
      position: 'absolute',
      top: '29%',
      left: '42%',
      fontFamily: 'punchstarterfont',
      color: 'white',

      overflowWrap: 'break-word',
    },

    designerMakeANewProjectButton: {

      fontSize: 20,
      position: 'absolute',
      top: '20%',
      left: '5%',
      width: 150,
      height: 50,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    designerLogoutButton: {

      fontSize: 15,
      height: 40,
      position: 'absolute',
      top: '1.5%',
      left: '2.5%',
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    designerListProject: {

      fontSize: 30,
      fontFamily: 'punchstarterfont',
      padding: 10,
      color: 'black',
      position: 'relative',
      top: 300,
      left: '31%',
      borderRadius: 10,
      width: 500,
      color: 'black',
      textAlign: 'center',
      overflowWrap: 'break-word',

      overflowWrap: 'break-word',
    },

    designerNotLaunched: {
      backgroundColor: '#383A38',
      overflowWrap: 'break-word',
    },

    topFundedProjects: {

      fontSize: 30,
      fontFamily: 'punchstarterfont',
      padding: 10,
      color: 'black',
      position: 'relative',
      top: -800,
      left: 65,
      borderRadius: 10,
      width: 1300,
      color: 'white',
      textAlign: 'center',
      borderColor: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      backgroundColor: '#383A38',
      overflowWrap: 'break-word',
      overflowWrap: 'break-word',
    },

    topFundedProjectsText: {
      color: 'white',
      fontFamily: 'punchstarterfont',
      position: 'relative',
      top: -800,
      left: 400,
      fontSize: 30,
      overflowWrap: 'break-word',
      overflowWrap: 'break-word',
    },

    hi: {

      backgroundColor: primaryColor,
      color: 'black',
      borderRadius: 10,

      overflowWrap: 'break-word',
    },

    hi2: {
      color: 'black',
      overflowWrap: 'break-word',
    },

    moveDown: {

      position: 'absolute',
      top: 400,

      overflowWrap: 'break-word',
    },

    designerLaunchProjectButton: {

      fontSize: 15,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    designerDeleteProjectButton: {

      fontSize: 15,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: '#e81728',
      borderColor: 'black',
      marginBottom: 10,

      overflowWrap: 'break-word',
    },


    designerDeletePledgeButton: {

      fontSize: 15,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: '#e81728',
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    createNewProjectLayout: {
      textAlign: 'center',
      padding: 100,
      fontFamily: 'punchstarterfont',
      overflowWrap: 'break-word',
    },

    createNewProjectText: {

      fontSize: 40,
      color: 'white',

      overflowWrap: 'break-word',
    },

    nameOfProjectTextField: {

      fontSize: 20,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: 'black',
      backgroundColor: '#383A38',
      color: 'white',
      width: '25%',
      marginTop: '1%',


      overflowWrap: 'break-word',
    },

    descriptionTextField: {

      fontSize: 20,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: 'black',
      backgroundColor: '#383A38',
      color: 'white',
      width: '25%',
      marginTop: '1%',

      overflowWrap: 'break-word',
    },


    createProjectGoalTextField: {


      fontSize: 20,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: 'black',
      width: '25%',
      backgroundColor: '#383A38',
      color: 'white',
      marginTop: '1%',

      overflowWrap: 'break-word',
    },
    deadlineTextField: {

      fontSize: 20,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: 'black',
      width: '25%',
      backgroundColor: '#383A38',
      color: 'white',
      marginTop: '1%',


      overflowWrap: 'break-word',
    },

    authorTextField: {

      fontSize: 20,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      width: '25%',
      borderColor: 'black',
      backgroundColor: '#383A38',
      color: 'white',
      marginTop: '1%',



      overflowWrap: 'break-word',
    },

    tagDropDown: {

      fontSize: 20,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      width: '25%',
      borderColor: 'black',
      backgroundColor: '#383A38',
      color: 'white',
      marginTop: '1%',

    },

    tagTextField: {

      fontSize: 20,
      textAlign: 'center',
      borderRadius: 10,
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      width: '25%',
      borderColor: 'black',
      backgroundColor: '#383A38',
      color: 'white',
      marginTop: '1%',


      overflowWrap: 'break-word',
    },

    makeNewProjectButton: {


      fontSize: 30,
      width: '20%',
      marginTop: '2%',
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',

      overflowWrap: 'break-word',
    },

    backtoDesignerHomePageButton: {


      fontSize: 15,
      width: '10%',
      position: 'absolute',
      top: '2.5%',
      left: '2.5%',
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',


      overflowWrap: 'break-word',
    },

    makeNewPledgeButton: {


      fontSize: 30,
      width: '35%',
      marginTop: '2%',
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',


      overflowWrap: 'break-word',
    },

    makeNewPledgeLayout: {

      textAlign: 'right',
      padding: 100,
      fontFamily: 'punchstarterfont',

      overflowWrap: 'break-word',
    },

    designerProjectInfoLayout: {

      fontSize: 30,
      fontFamily: 'punchstarterfont',
      padding: 20,
      color: 'black',
      position: 'absolute',
      top: 250,
      left: 20,
      borderRadius: 10,
      width: 500,
      color: 'black',
      textAlign: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'solid',
      backgroundColor: '#383A38',
      marginBottom: 30,
      overflowWrap: 'break-word',

      overflowWrap: 'break-word',
    },


    designerPledges: {

      fontSize: 30,
      fontFamily: 'punchstarterfont',
      padding: 20,
      color: 'black',
      position: 'absolute',
      top: 250,
      left: 800,
      borderRadius: 10,
      width: 500,
      color: 'black',
      textAlign: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'solid',
      backgroundColor: '#383A38',
      marginBottom: 30,

      overflowWrap: 'break-word',
    },

    designerPledgeInfo: {
      fontSize: 20,
      overflowWrap: 'break-word',
    },


    designerDelPledgeButton: {

      fontSize: 15,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: '#e81728',
      borderColor: 'black',
      marginBottom: 10,

      overflowWrap: 'break-word',
    },

    designerCreatePledgeButton: {
      fontSize: 15,
      height: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',
      marginTop: 10,
      overflowWrap: 'break-word',
    },

    newPledgeTextField: {

      fontSize: 20,
      textAlign: 'center',
      borderRadius: 10,
      width: '50%',
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',
      borderColor: primaryColor,
      backgroundColor: 'black',
      color: 'white',
      marginTop: '1%',
      overflowWrap: 'break-word',
    },

    projectLandingPageDesigner: {

      fontSize: 40,
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      color: 'white',
      textAlign: 'center',

      overflowWrap: 'break-word',
    },

    adminLogoutButton: {


      fontSize: 20,
      width: '8.5%',
      height: '6.5%',
      position: 'absolute',
      top: '2.5%',
      left: '2.5%',
      borderRadius: 10,
      fontFamily: 'punchstarterfont',
      backgroundColor: primaryColor,
      borderColor: 'black',


      overflowWrap: 'break-word',
    },

    amountOfDaysProject: {

      fontSize: 20,
      width: 250,
      height: 30,
      borderRadius: 10,
      color: '#ffffff',
      borderColor: primaryColor,
      backgroundColor: '#383A38',
      textAlign: 'center',
      fontFamily: 'textFieldPS',
      fontWeight: 'bold',

    },

    editProjectButton: {

      fontSize: 20,
      height: 40,
      borderRadius: 10,
      marginBottom: 10,
      backgroundColor: primaryColor,
      fontFamily: 'punchstarterfont',
      borderColor: 'black',

    },

    editProjectPopUp: {


      fontFamily: 'punchstarterfont',
      backgroundColor: 'pink',
      position: 'absolute',
      top: 300,
      left: 500,
      width: 500,
      height: 200,

    },

    submitButton: {

      fontSize: 20,
      height: 40,
      borderRadius: 10,
      marginBottom: 10,
      backgroundColor: primaryColor,
      fontFamily: 'punchstarterfont',
      borderColor: 'black',

    },

    designerTransactions: {

      color: 'white',
      fontFamily: 'punchstarterfont',
      fontSize: 20,
      position: 'absolute',
      top: 950,
      left: 50,
      borderWidth: 3,
      borderColor: 'pink',
      borderStyle: 'solid',
      borderRadius: 10,
      width: 400,
      overflowWrap: 'break-word',
      padding: 10,


    }

  }




























  function LoginPage() {

    const navigate = useNavigate();
    const adminEmailRef = useRef(null);
    const adminPasswordRef = useRef(null);
    const designerEmailRef = useRef(null);
    const designerPasswordRef = useRef(null);
    const supporterEmailRef = useRef(null);
    const supporterPasswordRef = useRef(null);


    const navigateTopage = (url) => {
      navigate(url);
    }

    useEffect(() => {
      if (cookies.Role) {
        console.log(cookies.Role)
        if (logout) {
          window.location.reload()
          // logout = false;
        } else {
          let role = cookies.Role;
          if (role === "ADMIN") {
            navigateTopage('/admin');
            model.user = new Admin(cookies.email);
          } else if (role === "SUPPORTER") {
            navigateTopage('/supporter');
            model.user = new Supporter(cookies.email);
          } else if (role === "DEVELOPER") {
            navigateTopage('/designer');
            model.user = new Developer(cookies.email, null, 0);
          }
        }
        // window.location.reload();
      }
    }, [])

    const handleAdminSignIn = event => {
      if (!adminEmailRef.current.value) { return; }
      if (!adminPasswordRef.current.value) { return; }

      let password = adminPasswordRef.current.value;
      let email = adminEmailRef.current.value;

      let msg = {}
      msg["Email_ID"] = email;
      msg["Password"] = password;
      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/loginAdmin', data).then((response) => {
        if (response.data.statusCode === 200) {
          navigateTopage('/admin');
          model.user = new Admin(email);
          handleNewCookie(email, "ADMIN");
          logout = false;
        } else {
          console.log(response.data.error);
          adminEmailRef.current.value = response.data.error;
          adminPasswordRef.current.value = "";
        }
      })
    }

    const handleSupporterSignIn = event => {
      if (!supporterEmailRef.current.value) { return; }
      if (!supporterPasswordRef.current.value) { return; }

      let password = supporterPasswordRef.current.value;
      let email = supporterEmailRef.current.value;

      if (cookies.Email_ID) {

      }

      let msg = {}
      msg["Email_ID"] = email;
      msg["Password"] = password;
      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/loginSupporter', data).then((response) => {
        if (response.data.statusCode === 200) {
          navigateTopage('/supporter');
          model.user = new Supporter(email);
          handleNewCookie(email, "SUPPORTER");
          logout = false;
        } else {
          console.log(response.data.error);
          supporterEmailRef.current.value = response.data.error;
          supporterPasswordRef.current.value = "";
        }
      })
    }

    const handleDesignerSignIn = event => {
      if (!designerEmailRef.current.value) { return; }
      if (!designerPasswordRef.current.value) { return; }
      let password = designerPasswordRef.current.value;
      let email = designerEmailRef.current.value;

      let msg = {}
      msg["Email_ID"] = email;
      msg["Password"] = password;
      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/loginDesigner', data).then((response) => {
        if (response.data.statusCode === 200) {
          navigateTopage('/designer');
          model.user = new Developer(email, null, 0);
          handleNewCookie(email, "DEVELOPER");
          GetPageDesigner("", null)
          logout = false;
        } else {
          console.log(response.data.error);
          designerEmailRef.current.value = response.data.error;
          designerPasswordRef.current.value = "";
        }
      })
    }

    const handleAdminCreateAccount = event => {
      if (!adminEmailRef.current.value) { return; }
      if (!adminPasswordRef.current.value) { return; }

      let password = adminPasswordRef.current.value;
      let email = adminEmailRef.current.value;

      let msg = {}
      msg["Email_ID"] = email;
      msg["Password"] = password;
      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/regAdmin', data).then((response) => {
        if (response.data.statusCode === 200) {
          navigateTopage('/admin');
          model.user = new Admin(email);
          handleNewCookie(email, "ADMIN");
          logout = false;
        } else {
          console.log(response.data.error);
          adminEmailRef.current.value = response.data.error;
          adminPasswordRef.current.value = "";
        }
      })
    }

    const handleSupporterCreateAccount = event => {
      if (!supporterEmailRef.current.value) { return; }
      if (!supporterPasswordRef.current.value) { return; }

      let password = supporterPasswordRef.current.value;
      let email = supporterEmailRef.current.value;

      let msg = {}
      msg["Email_ID"] = email;
      msg["Password"] = password;
      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/regSupporter', data).then((response) => {
        if (response.data.statusCode === 200) {
          navigateTopage('/supporter');
          model.user = new Supporter(email);
          handleNewCookie(email, "SUPPORTER");
          logout = false;
        } else {
          console.log(response.data.error);
          supporterEmailRef.current.value = response.data.error;
          supporterPasswordRef.current.value = "";
        }
      })
    }

    const handleDesignerCreateAccount = event => {
      if (!designerEmailRef.current.value) { return; }
      if (!designerPasswordRef.current.value) { return; }
      let password = designerPasswordRef.current.value;
      let email = designerEmailRef.current.value;

      let msg = {}
      msg["Email_ID"] = email;
      msg["Password"] = password;
      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/regDesigner', data).then((response) => {
        if (response.data.statusCode === 200) {
          navigateTopage('/designer');
          model.user = new Developer(email, null, 0);
          handleNewCookie(email, "DESIGNER");
          logout = false;
        } else {
          console.log(response.data.error);
          designerEmailRef.current.value = response.data.error;
          designerPasswordRef.current.value = "";
        }
      })
    }

    return (
      // <body className={}>
      <div>
        <img style={layout.psbackground} src={punchstarterbackground} alt="" width="auto" height="auto" />
        <h2 style={layout.punchstarter}>Welcome To</h2>
        <img src = {winky} style={layout.winkyHomeScreen} onClick={handleColorSwitch}></img>
        {/* <button><img src = 'winky' onClick = {handleColorSwitch}></img></button> */}
        <img style={layout.punchstarterdarkmode} src={punchstarterIcon} alt="" />
        <h3 style={layout.loginScreenLogin}>Login</h3>
        <br></br>
        <div>
          <div>
            <h4 style={layout.supporterLogin}>Supporter Login</h4>
            <input style={layout.supporterEmailField} ref={supporterEmailRef} type="text" placeholder="Email..."></input>
            <input style={layout.supporterPasswordField} ref={supporterPasswordRef} type="text" placeholder="Password..."></input>
            <button style={layout.supporterSignInButton} onClick={handleSupporterSignIn}>Sign in</button>
            <button style={layout.supporterCreateAccountButton} onClick={handleSupporterCreateAccount}>Create account</button>
          </div>
        </div>
        <div>
          <div>

            <h4 style={layout.designerLogin}>Designer Login</h4>
            <input style={layout.designerEmailField} ref={designerEmailRef} type="text" placeholder="Email..."></input>
            <input style={layout.designerPasswordField} ref={designerPasswordRef} type="text" placeholder="Password..."></input>
            <button style={layout.designerSignInButton} onClick={handleDesignerSignIn}>Sign in</button>
            <button style={layout.designerCreateAccountButton} onClick={handleDesignerCreateAccount}>Create account</button>
          </div>
        </div>
        <div>

          <div>
            <h4 style={layout.adminLogin}>Admin Login</h4>
            <input style={layout.adminEmailField} ref={adminEmailRef} type="text" placeholder="Email..."></input>
            <input style={layout.adminPasswordField} ref={adminPasswordRef} type="text" placeholder="Password..."></input>
            <button style={layout.adminSignInButton} onClick={handleAdminSignIn}>Sign in</button>
            <button style={layout.adminCreateAccountButton} onClick={handleAdminCreateAccount}>CREATE ACCOUNT</button>
          </div>
        </div>
      </div>
    );
  }




































  async function GetProjectsAdmin(setData) {
    if (!model.user) {
      return;
    }

    let msg = {}
    msg["role"] = model.user.type;

    let dataValue = JSON.stringify(msg);
    let data = { 'body': dataValue }
    instance.post('/getProjectsAdmin', data).then((response) => {
      if (response.data.statusCode === 200) {
        let theJSON = response.data.body;
        CurrentJSON = JSON.parse(theJSON)
      }
      try {
        setData(response.data);
      } catch (error) {

      }

    })
  }

  function AdminPage() {

    const navigate = useNavigate();
    const [Project, setProject] = useState([]);
    const [data, setData] = useState()
    const [loadiing, setloadiing] = useState(true);


    const navigateTopage = (url) => {
      navigate(url);
    }

    const logOut = event => {
      model.user = null
      CurrentJSON = null
      rmCookie()
      navigateTopage('/')
      logout = true;
    }

    const handleDeleteProject = (Project_ID) => {
      let msg = {}
      msg["Project_ID"] = Project_ID;

      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/deleteProjectAdmin', data).then((response) => {
        if (response.data.statusCode === 200) {
        }
        GetProjectsAdmin(setData);
        setData();
      })
      setProject([...Project], Project.Project_ID)
    }

    const handleRefresh = event => {
      GetProjectsAdmin(setData);
      setData()
      setProject([...Project], Project.Project_ID)
    }

    useEffect(() => {
      setData();
      GetProjectsAdmin(setData);
    }, [])

    useEffect(() => {
      setTimeout(() => {
        setloadiing(false)
      }, 1500)
    })

    if (loadiing) {
      if (!cookies.Email_ID) {
        return (
          <div>
            <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>loading</div>
          </div>
        )
      }
      updateAdmin(cookies.Email_ID, setData)
      return (
        <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>
          loading
        </div>
      );
    }

    return (
      <div>
          <img src = {winky} style={layout.winkyAdminHome} onClick={handleColorSwitch}></img>
        <button style={layout.adminLogoutButton} onClick={() => logOut()}>Logout</button>
        <div style={{ position: 'absolute', top: 0, left: 50 }}>
          <img style={layout.projectLandingPageLogoSupporter} src={PunchStarterDarkMode} alt="" />
          <h2 style={layout.projectLandingPageSupporterText}>Admin</h2>
        </div>
        <h3 style={{ textAlign: 'center', padding: 40, fontSize: 40, fontFamily: 'punchstarterfont', color: 'white' }}>Welcome, {model.user.email}</h3>

        <div style={{
          textAlign: 'center', fontFamily: 'punchstarterfont', fontSize: 30, backgroundColor: '#383A38', borderRadius: 10, width: '40%', margin: '0 auto', overflowWrap: 'break-word', paddingTop: '2%', paddingBottom: '2%',
        }}>
          <h4 style={{ color: 'white' }}>Project List : {CurrentJSON.Projects.length}</h4>
          <button style={{
            fontSize: 25,
            width: '25%',
            borderRadius: 10,
            fontFamily: 'punchstarterfont',
            backgroundColor: primaryColor,
            borderColor: 'black',
          }} onClick={handleRefresh}>Refresh</button>

          <div>
            {CurrentJSON.Projects ? CurrentJSON.Projects.map((Project, index) => {
              return (
                <div key={index} style={{ padding: 20, fontSize: 20, backgroundColor: primaryColor, borderRadius: 10, width: '80%', margin: '0 auto', marginTop: '5%' }}>
                  <div>Name: {Project.Project_ID}</div>
                  <p>Description: {Project.Description}</p>
                  <p>Goal: <span style={{ color: '#f2ff00' }}>${Project.Goal}</span></p>
                  <button style={layout.designerDeleteProjectButton} onClick={() => handleDeleteProject(Project.Project_ID)}>Delete Project</button>
                </div>
              );

            }) : null}
          </div>
        </div>
      </div>
    );
  }

  async function GetPageDesigner(searchValue, setData) {
    if (!model.user) {
      return;
    }

    let msg = {}
    msg["Email_ID"] = model.user.email;
    msg["searchValue"] = searchValue;

    let dataValue = JSON.stringify(msg);
    let data = { 'body': dataValue }
    instance.post('/getPageDesigner', data).then((response) => {
      if (response.data.statusCode === 200) {
        let theJSONproject = response.data.body;
        CurrentJSON = JSON.parse(theJSONproject);
        updateCurrentDeveloper();
      }
      try {
        setData(response.data);
      } catch (error) {

      }
    })
    return true;
  }

  function DesignerPage() {
    const navigate = useNavigate();
    const searchProjectsRef = useRef(null);
    const endDateRef = useRef(null);
    const [Project, setProject] = useState([]);
    const [Pledge, setPledge] = useState([]);
    const [searchValue, setsearchValue] = useState("");
    const [loadiing, setloadiing] = useState(true);
    const [data, setData] = useState()


    const navigateTopage = (url) => {
      navigate(url);
    }
    const handleCreateNewPledge = event => {
      navigateTopage('/designer/createpledge');
    }
    const handleCreateNewProject = event => {
      navigateTopage('/designer/createproject');
    }
    const logOut = event => {
      model.user = null
      CurrentJSON = null
      rmCookie()
      navigateTopage('/')
      logout = true;
    }



    const handleDeleteProject = (projectName, userEmail) => {
      let msg = {}
      msg["Project_ID"] = projectName;
      msg["Email_ID"] = userEmail;

      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/deleteProjectDesigner', data).then((response) => {
        if (response.data.statusCode === 200) {
        } else {
          console.log(response.err);
        }
        GetPageDesigner(searchValue, setData);
        setData();
      })
      setPledge([...Pledge], Pledge.Pledge_ID)
    }

    const handleDeletePledge = (projectName, pledgeName, userEmail) => {
      let msg = {}
      msg["Project_ID"] = projectName;
      msg["Email_ID"] = userEmail;
      msg["Pledge_ID"] = pledgeName;

      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/deletePledgeDesigner', data).then((response) => {
        if (response.data.statusCode === 200) {

        } else {
          console.log(response.err);
        }
        GetPageDesigner(searchValue, setData);
        setData();
      })
      setPledge([...Pledge], Pledge.Pledge_ID)
    }
    const handleLaunchProject = (projectName) => {
      let d = document.getElementById(projectName+"launch").value;
      if (!d || isNaN(d) || d <= 0 || d % 1 != 0) {
        document.getElementById("daysError").innerHTML = "invalid input"
        GetPageDesigner(searchValue, setData);
        setData()
        return;
      }

      let msg = {}
      msg["Project_ID"] = projectName;
      msg["Days"] = d

      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/launchProjectDesigner', data).then((response) => {
        if (response.data.statusCode === 200) {
        } else {
          console.log(response.err);
        }
        GetPageDesigner(searchValue, setData);
      })
      setPledge([...Pledge], Pledge.Pledge_ID)
    }

    const handleSearch = () => {
      setsearchValue(searchProjectsRef.current.value)
      GetPageDesigner(searchProjectsRef.current.value, setData);
      setPledge([...Pledge], Pledge.Pledge_ID)
    }

    const handleClearSearch = event => {
      setsearchValue("")
      searchProjectsRef.current.value = ""
      GetPageDesigner("", setData);
      setPledge([...Pledge], Pledge.Pledge_ID)
    }

    useEffect(() => {
      GetPageDesigner(searchValue, setData);
      setPledge([...Pledge], Pledge.Pledge_ID)
    }, [])

    useEffect(() => {
      setTimeout(() => {
        setloadiing(false)
      }, 1500)
    })


    if (loadiing) {
      if (!cookies.Email_ID) {
        return (
          <div>
            <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>loading</div>
          </div>
        )
      }
      updateDeveloper(cookies.Email_ID)
      return (
        <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>
          loading
        </div>
      );
    }

    if (!CurrentJSON) {
      return (
        <div>
          <div style={layout.signInAgainError}>Sign in again</div>
          <button style={layout.signInAgainErrorButton} onClick={() => logOut()}>Login page</button>
        </div>

      )
    }

    return (
      <div>
        <img src = {winky} style={layout.winkyDesignerHome} onClick={handleColorSwitch}></img>
        <img style={layout.designerHomeLogo} src={PunchStarterDarkMode} alt="" width="auto" height="auto" />
        <h2 style={layout.designerIcon}>Designer</h2>
        <h3 style={layout.designerAccountName}>Welcome, {model.user.email}</h3>
        <p style={layout.designerHomeCurrentFunds}>Current Funds: <span style={{ color: '#f2ff00' }}>${model.user.funds}</span></p>
        <h4 style={layout.designerYourProjectList}>Your Project List: {CurrentJSON.Projects.length}</h4>
        <input style={layout.designerSearchProjectField} ref={searchProjectsRef} type="text" placeholder="Search Project..."></input>
        <button style={layout.designerSearchProjectSearchButton} onClick={() => handleSearch()}>Search</button>
        <button style={layout.designerSearchProjectClearButton} onClick={handleClearSearch}>Clear Search</button>
        <p style={layout.designerCurrentSearch}>Current Search : '{searchValue}'</p>
        <button style={layout.designerMakeANewProjectButton} onClick={handleCreateNewProject}>Make a new project</button>

        <div style={layout.designerListProject}>
          {CurrentJSON.Projects.map((Project, index) => {
            let launched = parseInt(Project.IsLaunched)
            if (launched === 0) {
              return (
                <div key={index} style={{
                  backgroundColor: '#383A38', borderRadius: 10, padding: 20, borderColor: 'black',
                  borderWidth: 3,
                  borderStyle: 'solid', marginBottom: 30
                }}>
                  <div style={{
                    backgroundColor: '#383A38', borderRadius: 10, padding: 20, borderColor: 'black',
                    borderWidth: 3,
                    borderStyle: 'solid', marginBottom: 30
                  }}>
                    <Link to={`/designer/${Project.Project_ID}`}>
                      <div style={{ color: primaryColor, fontSize: 40 }}>{Project.Project_ID}</div>
                    </Link>
                    <p>Project not launched yet</p>
                    <input style={layout.amountOfDaysProject} id={Project.Project_ID+"launch"} type="text" placeholder="Project Day Length"></input>
                    <p id='daysError'></p>
                    <button style={layout.designerLaunchProjectButton} onClick={() => handleLaunchProject(Project.Project_ID)}>Launch Project</button>
                    <p>Description: {Project.Description}</p>
                    <p>Tag: {Project.Tag}</p>
                    <p>% Funded: {(Project.CurrentAmount / Project.Goal) * 100}%</p>
                    <p>Made by: {Project.Author}</p>
                    <button style={layout.designerDeleteProjectButton} onClick={() => handleDeleteProject(Project.Project_ID, model.user.email)}>Delete Project</button>
                  </div>
                  <p style={{ fontSize: 40, fontWeight: 'bold', color: primaryColor }}>Pledges: {Project.Pledges.length}</p>
                  {Project.Pledges.map((Pledge, index2) => {
                    return (
                      <div key={index2} style={{
                        backgroundColor: '#383A38', borderRadius: 10, padding: 20, borderColor: 'black',
                        borderWidth: 3,
                        borderStyle: 'solid', marginBottom: 30
                      }}>
                        <p>Name: {Pledge.Name}</p>
                        <p>Description: {Pledge.Description}</p>
                        <p>Cost: <span style={{ color: '#f2ff00' }}>${Pledge.Cost}</span></p>
                        <p>Amount left: {amountLeftHelper(Pledge.MaxSupporters, Pledge.NumberSupporters)}</p>
                        <button style={layout.designerDeletePledgeButton} onClick={() => handleDeletePledge(Project.Project_ID, Pledge.Pledge_ID, model.user.email)}>Delete Pledge</button>

                      </div>
                    );
                  })}

                </div>
              );
            }
            return (
              <div key={index} style={{
                backgroundColor: primaryColor, borderRadius: 10, padding: 20, borderColor: 'black',
                borderWidth: 3,
                borderStyle: 'solid', marginBottom: 30
              }}>
                <Link to={`/designer/${Project.Project_ID}`}>
                  <div style={{ color: '#c43b4a', fontSize: 40 }}>{Project.Project_ID}</div>
                </Link>
                <p>Description: {Project.Description}</p>
                <p>Tag: {Project.Tag}</p>
                <p>% Funded: {(Project.CurrentAmount / Project.Goal) * 100}%</p>
                <p>Project Started on: {Project.StartDate}, Ends on: {Project.EndDate}</p>
                <p>Made by: {Project.Author}</p>
                <p>Pledges: {Project.Pledges.length}</p>
                {/* <button style = {designerDeleteProjectButton} onClick={() => handleDeleteProject(Project.Project_ID, model.user.email)}>Delete Project</button> */}

                {Project.Pledges.map((Pledge, index2) => {
                  return (
                    <div key={index2} style={{ backgroundColor: '#383A38', borderRadius: 10, padding: 20, color: 'white', marginBottom: 10, marginTop: 10, }}>
                      <p style={{ fontSize: 20 }}>Pledge:</p>
                      <p>Name: {Pledge.Name}</p>
                      <p>Description: {Pledge.Description}</p>
                      <p>Cost: <span style={{ color: '#f2ff00' }}>${Pledge.Cost}</span></p>
                      <p>Amount left: {amountLeftHelper(Pledge.MaxSupporters, Pledge.NumberSupporters)}</p>
                      {/* <button style = {designerDeletePledgeButton} onClick={() => handleDeletePledge(Project.Project_ID, Pledge.Pledge_ID, model.user.email)}>Delete Pledge</button> */}

                    </div>
                  );
                })}

              </div>
            );
          })}

        </div>
        <button style={layout.designerLogoutButton} onClick={() => logOut()}>Logout</button>
      </div>
    );
  }



  function DesignerProjectPage() {

    const [state, setState] = useState(false)

    const togglePop = () => {
      setState(!state)
    }


    const navigate = useNavigate();
    const { name } = useParams();
    const [Pledgee, setPledge] = useState([]);
    const nameInputRef = useRef(null);
    const nameDescriptionRef = useRef(null);
    const nameCostRef = useRef(null);
    const nameContributorsRef = useRef(null);
    let currentProject = null
    const [loadiing, setloadiing] = useState(true);
    const [data, setData] = useState()



    if (CurrentJSON) {
      CurrentJSON.Projects.forEach(Project => {
        if (Project.Project_ID === name) {
          currentProject = Project;
        }
      })
    }

    const navigateTopage = (url) => {
      navigate(url);
    }
    const logOut = event => {
      model.user = null
      CurrentJSON = null
      rmCookie()
      navigateTopage('/')
      logout = true;
    }


    const handleDeletePledge = (projectName, pledgeName, userEmail) => {
      //null check
      let msg = {}
      msg["Project_ID"] = projectName;
      msg["Email_ID"] = userEmail;
      msg["Pledge_ID"] = pledgeName;

      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/deletePledgeDesigner', data).then((response) => {
        if (response.data.statusCode === 200) {
        } else {
          console.log(response.err);
        }
        GetPageDesigner("", setData);
        setData();
      })
      setPledge([...Pledgee], Pledgee.Pledge_ID)
    }

    const handleNewPledge = (project_ID, email) => {
      if (!nameInputRef.current.value ||
        !nameDescriptionRef.current.value ||
        !nameCostRef.current.value) {
        return;
      }
      let name = nameInputRef.current.value;
      let description = nameDescriptionRef.current.value;
      let cost = nameCostRef.current.value;
      let contributors = nameContributorsRef.current.value;
      if (contributors === "") {
        contributors = "-1";
      }

      if (name.length < 3) {
        nameInputRef.current.value = "Longer name value"
        GetPageDesigner("", setData);
        setData();
        return;
      }

      if (isNaN(cost) || cost <= 0 || cost % 1 != 0) {
        nameCostRef.current.value = "invalid number"
        GetPageDesigner("", setData);
        setData();
        return;
      }
      if (isNaN(contributors) || (contributors <= 0 && contributors != -1) || contributors % 1 != 0) {
        nameContributorsRef.current.value = "invalid number"
        GetPageDesigner("", setData);
        setData();
        return;
      }

      let msg = {}
      msg["Name"] = name;
      msg["Email_ID"] = email;
      msg["Project_ID"] = project_ID;
      msg["Description"] = description;
      msg["Cost"] = cost;
      msg["MaxSupporters"] = contributors;

      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/createPledgeDesigner', data).then((response) => {
        if (response.data.statusCode === 200) {
          //lol
          nameInputRef.current.value = ""
          nameDescriptionRef.current.value = ""
          nameCostRef.current.value = ""
          nameContributorsRef.current.value = ""

        } else {
          console.log(response.data.error);
          window.alert(response.data.error)
        }
        GetPageDesigner("", setData);
        setData();
      })
      setPledge([...Pledgee], Pledgee.Pledge_ID)
    }

    useEffect(() => {
      GetPageDesigner("", setData)
      setPledge([...Pledgee], Pledgee.Pledge_ID)
    }, [])


    useEffect(() => {
      setTimeout(() => {
        setloadiing(false)
      }, 1500)
    })

    if (loadiing) {
      if (!cookies.Email_ID) {
        return (
          <div>
            <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>loading</div>
          </div>
        )
      }
      updateDeveloper(cookies.Email_ID)
      return (
        <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>
          loading
        </div>
      );
    }

    let laun = "";
    if (CurrentJSON) {

      if (currentProject.IsLaunched === 1) {
        laun = "Launched";
      } else {
        laun = "Not Launched Yet"
      }
    }

    if (!CurrentJSON) {
      return (
        <div>
          <div style={layout.signInAgainError}>Sign in again</div>
          <button style={layout.signInAgainErrorButton} onClick={() => logOut()}>Login page</button>
        </div>
      )
    }

    return (
      <div>
        <div>
          <button style={layout.backtoDesignerHomePageButton} onClick={() => navigateTopage('/designer')}>Back to designer homepage</button>

          <div style={{ position: 'absolute', left: 50 }}>
            <img style={layout.projectLandingPageLogoSupporter} src={PunchStarterDarkMode} alt="" />
            <h2 style={layout.projectLandingPageSupporterText}>Designer</h2>
          </div>

          <div style={{ padding: 50 }}>
            <h2 style={layout.projectLandingPageDesigner}>Project landing page for "{currentProject.Project_ID}"</h2>
          </div>

          <div>
            <h3 style={layout.projectLandingPageSupporterCurrentFunds}>Project funds: <span style={{ color: '#f2ff00' }}>${currentProject.CurrentAmount}</span> | Goal: <span style={{ color: '#f2ff00' }}>${currentProject.Goal}</span></h3>
          </div>
        </div>

        <div style={layout.designerProjectInfoLayout}>
          <p style={layout.projectLandingPageSupporterProjectInfo}>Project Info:</p>
          <div style={{ backgroundColor: primaryColor, borderRadius: 10, padding: 10, marginBottom: 20 }}>
            <p>Discription : {currentProject.Description}</p>
            <p>Tag : {currentProject.Tag}</p>
            <p>Author : {currentProject.Author}</p>
            <p>{laun}</p>
            <p>Started: {currentProject.StartDate} | Ends: {currentProject.EndDate}</p>
          </div>
          <div onClick={() => togglePop()}>
            <button style={layout.editProjectButton}>Edit this Project</button>
          </div>
        </div>
        <div>
          {state ? <NewProjectPopUp toggle={() => togglePop()} /> : null}
        </div>


        <div style={layout.designerTransactions}>
          <p style={{ fontSize: 30 }}>Support History:</p>
          {currentProject.Transactions.length >= 1 ? currentProject.Transactions.map((Transaction, index) => {
            if (!Transaction.Pledge_ID) {
              return (
                <div style={{ color: 'white' }}>
                  <p>'{Transaction.Supporter_ID}' supported with ${Transaction.Amount}</p>
                </div>
              )
            }
            console.log(Transaction.Pledge_ID)
            return (
              <div style={{ color: 'white' }}>
                <p>'{Transaction.Supporter_ID}' bought a pledge worth ${Transaction.Amount}</p>
              </div>
            )
          })
            : <div>
              <p>No Donations Yet :&#x28;</p>
            </div>}
        </div>


        <div style={layout.designerPledges}>
          <p style={{ color: 'white', fontSize: 40 }}>Pledges : {currentProject.Pledges.length}</p>
          {currentProject.Pledges.map((Pledge, index) => {
            let launched = parseInt(currentProject.IsLaunched)
            if (launched === 0) {
              return (
                <div key={index} style={{ backgroundColor: primaryColor, borderRadius: 10, padding: 10, marginBottom: 20 }}>
                  <p style={layout.designerPledgeInfo}>Pledge Info: </p>
                  <p>Name: {Pledge.Name}</p>
                  <p>Description: {Pledge.Description}</p>
                  <p>Cost: <span style={{ color: '#f2ff00' }}>${Pledge.Cost}</span></p>
                  <p>Amount left: {amountLeftHelper(Pledge.MaxSupporters, Pledge.NumberSupporters)}</p>
                  <button style={layout.designerDelPledgeButton} onClick={() => handleDeletePledge(Pledge.Project_ID, Pledge.Pledge_ID, model.user.email)}>Delete Pledge</button>
                </div>

              );
            }
            return (
              <div key={index} style={{ backgroundColor: primaryColor, borderRadius: 10, padding: 10, marginBottom: 20 }}>
                <p style={layout.designerPledgeInfo}>Pledge Info: </p>
                <p>Name: {Pledge.Name}</p>
                <p>Description: {Pledge.Description}</p>
                <p>Cost: <span style={{ color: '#f2ff00' }}>${Pledge.Cost}</span></p>
                <p>Amount left: {amountLeftHelper(Pledge.MaxSupporters, Pledge.NumberSupporters)}</p>
                <button style={layout.designerDelPledgeButton} onClick={() => handleDeletePledge(Pledge.Project_ID, Pledge.Pledge_ID, model.user.email)}>Delete Pledge</button>
              </div>

            );
          })}
          <div>
            <h3 style={layout.createNewProjectText}>Create new pledge</h3>
            <input style={layout.newPledgeTextField} ref={nameInputRef} type="text" placeholder="Name of Pledge"></input><br></br>
            <input style={layout.newPledgeTextField} ref={nameDescriptionRef} type="text" placeholder="Description"></input><br></br>
            <input style={layout.newPledgeTextField} ref={nameCostRef} type="text" placeholder="Cost"></input><br></br>
            <input style={layout.newPledgeTextField} ref={nameContributorsRef} type="text" placeholder="Max contributors"></input><br></br>
            <button style={layout.designerCreatePledgeButton} onClick={() => handleNewPledge(currentProject.Project_ID, model.user.email)}>Create new Pledge</button>
          </div>
        </div>
      </div>
    );
  }

  function CreateProjectPage() {
    const navigate = useNavigate();
    const nameInputRef = useRef(null);
    const nameDescriptionRef = useRef(null);
    const nameGoalRef = useRef(null);
    const nameAuthorRef = useRef(null);
    const nameTagRef = useRef(null);
    const [Pledge, setPledge] = useState([]);

    const [data, setData] = useState()
    const [foo, setfoo] = useState(""); //what does this do?
    const [loadiing, setloadiing] = useState(true);





    const navigateTopage = (url) => {
      navigate(url);
    }
    const logOut = event => {
      model.user = null
      CurrentJSON = null
      rmCookie()
      navigateTopage('/')
      logout = true;
    }

    const handleNewProject = (userEmail) => {
      if (!nameInputRef.current.value
        || !nameDescriptionRef.current.value
        || !nameGoalRef.current.value
        || !nameAuthorRef.current.value
        || !nameTagRef.current.value) {
        return;
      }

      let name = nameInputRef.current.value;
      let description = nameDescriptionRef.current.value;
      let goal = nameGoalRef.current.value;
      let author = nameAuthorRef.current.value;
      let tag = nameTagRef.current.value;

      if (name.length < 3) {
        nameInputRef.current.value = "longer name"
        GetPageDesigner("", setData)
        setData()
        return;
      }

      if (isNaN(goal) || goal <= 0 || goal % 1 != 0) {
        nameGoalRef.current.value = "Invalid Number"
        GetPageDesigner("", setData);
        setData();
        return;
      }

      let msg = {}
      msg["Project_ID"] = name;
      msg["Description"] = description;
      msg["Goal"] = goal;
      // msg["EndDate"] = ds;
      msg["Email_ID"] = userEmail;
      msg["Tag"] = tag;
      msg["Author"] = author;

      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/createProjectDesigner', data).then((response) => {
        if (response.data.statusCode === 200) {
          //lol
          nameInputRef.current.value = ""
          nameDescriptionRef.current.value = ""
          nameGoalRef.current.value = ""
          nameAuthorRef.current.value = ""
          nameTagRef.current.value = ""
          setfoo("You created '" + name + "', go back to Designer page to launch it!");
        } else {
          console.log(response.data.error);
          window.alert("Sorry you already have a project with this name!")
        }
        GetPageDesigner("", setData);
        setData();
      })
      setPledge([...Pledge], Pledge.Pledge_ID)
    }

    useEffect(() => {
      GetPageDesigner("", setData)
      setPledge([...Pledge], Pledge.Pledge_ID)
    }, [])


    useEffect(() => {
      setTimeout(() => {
        setloadiing(false)
      }, 1500)
    })
    if (loadiing) {
      if (!cookies.Email_ID) {
        return (
          <div>
            <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>loading</div>
          </div>
        )
      }
      updateDeveloper(cookies.Email_ID)
      return (
        <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>
          loading
        </div>
      );
    }

    if (!CurrentJSON) {
      return (
        <div>
          <div style={layout.signInAgainError}>Sign in again</div>
          <button style={layout.signInAgainErrorButton} onClick={() => logOut()}>Login page</button>
        </div>
      )
    }

    return (
      <div>
        <button style={layout.backtoDesignerHomePageButton} onClick={() => navigateTopage('/designer')}>Back to designer homepage</button>
        <div style={layout.createNewProjectLayout}>
          <img style={layout.designerHomeLogo} src={PunchStarterDarkMode} alt="" width="auto" height="auto" />
          <h2 style={layout.designerIcon}>Designer</h2>
          <h2 style={layout.createNewProjectText}>Create New Project</h2>
          <input style={layout.nameOfProjectTextField} ref={nameInputRef} type="text" placeholder="Name of Project"></input><br></br>
          <input style={layout.descriptionTextField} ref={nameDescriptionRef} type="text" placeholder="Description"></input><br></br>
          <input style={layout.createProjectGoalTextField} ref={nameGoalRef} type="text" placeholder="Goal amount"></input><br></br>
          <input style={layout.authorTextField} ref={nameAuthorRef} type="text" placeholder="Author"></input><br></br>
          <div style={{ marginTop: 10, fontSize: 22 }}>
            <label style={{ color: 'white', marginTop: 10 }} for="tags">Choose tag:</label>
          </div><div>
            <select style={layout.tagDropDown} ref={nameTagRef} name="tags" id="tags">
              <option value="other">Other</option>
              <option value="entertainment">Entertainment</option>
              <option value="technology">Technology</option>
              <option value="art">Art</option>
              <option value="foodsandcrafts">Foods and Crafts</option>
              <option value="games">Games</option>
            </select><br></br>
            <button style={layout.makeNewProjectButton} onClick={() => handleNewProject(model.user.email)}>Make Project </button>
            {<p style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 20 }}>{foo}</p>}
          </div></div>

      </div>
    );
  }

  async function GetPageSupporter(searchValue, tagSearchString = "", setData) {
    if (!model.user) {
      return;
    }
    if (!searchValue) {
      searchValue = "";
    }

    let msg = {}
    msg["Email_ID"] = model.user.email;
    msg["searchValue"] = searchValue;
    msg["tagSearchValue"] = tagSearchString;

    let dataValue = JSON.stringify(msg);
    let data = { 'body': dataValue }

    instance.post('/getPageSupporter', data).then((response) => {
      if (response.data.statusCode === 200) {
        let theJSONproject = response.data.body;
        CurrentJSON = JSON.parse(theJSONproject);
        updateCurrentDeveloper();
      }
      try {
        setData(response.data);
      } catch (error) {
      }
    })
    return CurrentJSON;
  }

  function SupporterPage() {
    const navigate = useNavigate();
    const searchProjectsRef = useRef(null);
    const addFundsRef = useRef(null);
    const addFundsPasswordRef = useRef(null);
    const [Pledge, setPledge] = useState([]);
    const [searchValue, setsearchValue] = useState("");
    const [data, setData] = useState()
    const [loadiing, setloadiing] = useState(true);


    const navigateTopage = (url) => {
      navigate(url);
    }

    const logOut = event => {
      model.user = null
      CurrentJSON = null
      rmCookie()
      navigateTopage('/');
      logout = true;
    }

    const handleToActivityPage = event => {
      navigateTopage('/supporter/supporteractivity');
    }

    const handleAddFunds = event => {
      if (!addFundsRef.current.value || !addFundsPasswordRef.current.value) {
        addFundsRef.current.value = "enter values"
        GetPageSupporter(searchValue, "", setData);
        setData();
        return;
      }

      let fundsValue = addFundsRef.current.value;
      if (isNaN(fundsValue) || fundsValue <= 0 || fundsValue % 1 != 0) {
        addFundsRef.current.value = "invalid input"
        GetPageSupporter(searchValue, "", setData);
        setData();
        return;
      }

      let msg = {}
      msg["Email_ID"] = model.user.email;
      msg["Password"] = addFundsPasswordRef.current.value;
      msg["Funds"] = addFundsRef.current.value;
      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/addSupporterFunds', data).then((response) => {
        if (response.data.statusCode === 200) {
          //lol
          addFundsRef.current.value = "";
          addFundsPasswordRef.current.value = "";
        } else {
          addFundsPasswordRef.current.value = response.data.error;
          console.log(response.data.error);
        }
        GetPageSupporter(searchValue, "", setData);
        setData();
      })

      setPledge([...Pledge], Pledge.Pledge_ID)
    }

    const handleSearch = () => {
      let otherTag = document.getElementById("other")
      let enterntainTag = document.getElementById("entertainment")
      let techTag = document.getElementById("technology")
      let artTag = document.getElementById("art")
      let fandcTag = document.getElementById("foodsandcrafts")
      let gamesTag = document.getElementById("games")

      let tagSearchString = "";
      if (gamesTag.checked) {
        tagSearchString += "games,";
      }
      if (enterntainTag.checked) {
        tagSearchString += "entertainment,";
      }
      if (otherTag.checked) {
        tagSearchString += "other";
      }
      if (techTag.checked) {
        tagSearchString += "technology";
      }
      if (artTag.checked) {
        tagSearchString += "art";
      }
      if (fandcTag.checked) {
        tagSearchString += "foodsandcrafts";
      }

      if (tagSearchString.endsWith(",")) {
        tagSearchString = tagSearchString.substring(0, tagSearchString.length - 1);
      }

      setsearchValue(searchProjectsRef.current.value)
      GetPageSupporter(searchProjectsRef.current.value, tagSearchString, setData);
      setPledge([...Pledge], Pledge.Pledge_ID)
    }

    const handleClearSearch = event => {
      setsearchValue("")
      searchProjectsRef.current.value = ""
      GetPageSupporter("", "", setData);
      setPledge([...Pledge], Pledge.Pledge_ID)
    }

    useEffect(() => {
      GetPageSupporter(searchValue, setData);
    }, [])

    useEffect(() => {
      setTimeout(() => {
        setloadiing(false)
      }, 1500)
    })

    if (loadiing) {
      if (!cookies.Email_ID) {
        return (
          <div>
            <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>loading</div>
          </div>
        )
      }
      updateSupporter(cookies.Email_ID)
      return (
        <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>
          loading
        </div>
      );
    }

    //sphp
    try {
      return (
        <div>
          <img src={punchstarterbackground} alt="" width="auto" height="auto" />
          <img style={layout.supporterPSlogo} src={PunchStarterDarkMode} alt="" width="auto" height="auto" />
          <h2 style={layout.supporterPSicon}>Supporter</h2>
          <h3 style={layout.supporterAccount} >Welcome, {model.user.email}</h3>
          <div>
            <div>
              <h3 style={layout.supporterFunds}>Your funds: <span style={{ color: '#f2ff00' }}>${model.user.funds}</span></h3>
              <input style={layout.supporterAmountToAdd} ref={addFundsRef} type="text" placeholder="Amount to Add"></input>
              <input style={layout.supporterPassword} ref={addFundsPasswordRef} type="text" placeholder="Account Password"></input>
              <button style={layout.supporterAddFundsButton} onClick={handleAddFunds}>Add Funds to Account</button>
            </div>
            <div>
              <h4 style={layout.currentSupportedItems}>Your Supported Projects: {CurrentJSON.SupportedProjects.length + CurrentJSON.SupportedPledges.length}</h4>
              <button style={layout.viewCurrentActivityButton} onClick={handleToActivityPage}>View Current Activity</button>
            </div>

            <div>
              <h4 style={layout.topFundedProjectsText}>Top Funded Currently Active Projects</h4>
              <div class={"flexclass"} style={layout.topFundedProjects}>
                {CurrentJSON.TopProjectsRN.map((Project, index) => {
                  return (
                    <div key={index} style={layout.hi}>
                      <Link to={`/supporter/${Project.Project_ID}`}>
                        <div style={layout.hi2}>{Project.Project_ID} by '{Project.Author}'</div>
                      </Link>
                      <p>% Funded: {(Project.CurrentAmount / Project.Goal) * 100}%</p>
                      <p>Description: {Project.Description}</p>
                      <p>Tag: {Project.Tag}</p>
                      <p>Started: {Project.StartDate} | Ends: {Project.EndDate}</p>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
          <div style={layout.moveDown}>
            <h4 style={layout.projectList}>Project List : {CurrentJSON.Projects.length}</h4>
            <input style={layout.searchProjectField} ref={searchProjectsRef} type="text" placeholder="Search..."></input>
            <button style={layout.searchProjectButton} onClick={() => handleSearch()}>Search</button>
            <button style={layout.searchProjectClear} onClick={handleClearSearch}>Clear Search</button>
            <p style={layout.supporterCurrentSearch} >Current Search : '{searchValue}'</p>
            <div style={layout.supporterCheckbox}>
              <p>Filter by tag</p>
              <input type="checkbox" id="entertainment" onClick={() => handleSearch()}></input>
              <label for="entertainment"> Entertainment</label><br></br>
              <input type="checkbox" id="technology" onClick={() => handleSearch()}></input>
              <label for="technology"> Technology</label><br></br>
              <input type="checkbox" id="art" onClick={() => handleSearch()}></input>
              <label for="art"> Art</label><br></br>
              <input type="checkbox" id="foodsandcrafts" onClick={() => handleSearch()}></input>
              <label for="foodsandcrafts"> Foods and Crafts</label><br></br>
              <input type="checkbox" id="games" onClick={() => handleSearch()}></input>
              <label for="games"> Games</label><br></br>
              <input type="checkbox" id="other" onClick={() => handleSearch()}></input>
              <label for="other"> Other</label><br></br>
            </div>
          </div>
          <div>
            {CurrentJSON.Projects.map((Project, index) => {
              return (
                <div key={index} style={layout.supporterProjects}>
                  <Link to={`/supporter/${Project.Project_ID}`}>
                    <div style={layout.supporterProjectsName}>{Project.Project_ID} by '{Project.Author}'</div>
                    {/* <span onClick={rmtheCookie("Load")}></span> */}
                  </Link>
                  <p>% Funded: {((Project.CurrentAmount / Project.Goal) * 100).toFixed(2)}%</p>
                  <p>Description: {Project.Description}</p>
                  <p>Tag: {Project.Tag}</p>
                  <p>Started: {Project.StartDate} | Ends: {Project.EndDate}</p>
                  <p>Amount of Pledges: {Project.Pledges.length}</p>

                </div>
              );

            })}
          </div>
          <br></br><br></br>
          <button style={layout.supporterLogout} onClick={() => logOut()}>Logout</button>
        </div>
      );
    } catch (error) {
      return (
        <div>
          <div style={layout.signInAgainError}>Sign in again</div>
          <button style={layout.signInAgainErrorButton} onClick={() => logOut()}>Login page</button>
        </div>
      )
    }

  }

  function ProjectPage() {
    const navigate = useNavigate();
    const { name } = useParams();
    const [Pledge, setPledge] = useState([]);
    const donateDirectlyRef = useRef(null);
    const [data, setData] = useState()
    let currentProject = null;
    const [loadiing, setloadiing] = useState(true);

    const navigateTopage = (url) => {
      navigate(url);
    }
    const logOut = event => {
      // rmtheCookie("Load");
      navigateTopage('/supporter')
      // logout = true;
    }

    const handleDirectDonation = (projectname, projectEmail_ID) => {
      if (!donateDirectlyRef.current.value) {
        donateDirectlyRef.current.value = "enter value"
        GetPageSupporter("", "", setData);
        setData();
        setPledge([...Pledge], Pledge.Pledge_ID)
        return;
      }

      let fundsValue = donateDirectlyRef.current.value;
      if (isNaN(fundsValue) || fundsValue <= 0 || fundsValue % 1 != 0) {
        donateDirectlyRef.current.value = "invalid input"
        GetPageSupporter("", "", setData);
        setData();
        setPledge([...Pledge], Pledge.Pledge_ID)
        return;
      }
      GetPageSupporter("", "", setData)
      if (model.user.funds < parseInt(fundsValue)) {
        donateDirectlyRef.current.value = "Invalid funds amount"
        GetPageSupporter("", "", setData);
        setData();
        setPledge([...Pledge], Pledge.Pledge_ID)
        return;
      }

      let msg = {}
      msg["User_Email_ID"] = model.user.email;
      msg["Project_Designer_Email_ID"] = projectEmail_ID;
      msg["AmountToAdd"] = donateDirectlyRef.current.value;
      msg["Project_ID"] = projectname;

      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/handleDirectDonation', data).then((response) => {
        if (response.data.statusCode === 200) {
          donateDirectlyRef.current.value = ""
          //lol
        } else {
          console.log(response.err);
        }
        GetPageSupporter("", "", setData);
      })
      setPledge([...Pledge], Pledge.Pledge_ID)

    }

    const handlePurchasePledge = (projectname, projectEmail_ID, pledgeName, currentamout) => {

      GetPageSupporter("", "", setData);
      setPledge([...Pledge], Pledge.Pledge_ID)
      let userFunds = model.user.funds;

      let currentProject = null;
      let currPledge = null;

      CurrentJSON.Projects.forEach(Project => {
        if (Project.Project_ID === projectname) {
          currentProject = Project;
          currentProject.Pledges.forEach(Pledge => {
            if (Pledge.Pledge_ID === pledgeName) {
              currPledge = Pledge;
            }
          })
        }
      })

      if (userFunds < currPledge.Cost) {
        window.alert("Not enough money")
        return
      }

      if ((currPledge.NumberSupporters >= currPledge.MaxSupporters) && currPledge.MaxSupporters >= 1) {
        return;
      }

      let msg = {}
      msg["User_Email_ID"] = model.user.email;
      msg["Project_Designer_Email_ID"] = projectEmail_ID;
      msg["AmountToAdd"] = currentamout;
      msg["Project_ID"] = projectname;
      msg["Pledge_ID"] = pledgeName;

      let dataValue = JSON.stringify(msg);
      let data = { 'body': dataValue }
      instance.post('/handleGetPledge', data).then((response) => {
        if (response.data.statusCode === 200) {
          //lol
        } else {
          console.log(response.data.error);
        }
        GetPageSupporter("", "", setData);
      })

      setPledge([...Pledge], Pledge.Pledge_ID)
    }

    useEffect(() => {
      GetPageSupporter("", setData)
      setPledge([...Pledge], Pledge.Pledge_ID)
    }, [])


    useEffect(() => {
      setTimeout(() => {
        setloadiing(false)
      }, 1500)
    })
    if (loadiing) {
      if (!cookies.Email_ID) {
        return (
          <div>
            <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>loading</div>
          </div>
        )
      }
      updateSupporter(cookies.Email_ID, setData)
      return (
        <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>
          loading
        </div>
      );
    }

    if (CurrentJSON) {
      CurrentJSON.Projects.forEach(Project => {
        if (Project.Project_ID === name) {
          currentProject = Project;
        }
      })
    }

    try {
      return (
        <div>
          <img style={layout.projectLandingPageLogoSupporter} src={PunchStarterDarkMode} alt="" />
          <h2 style={layout.projectLandingPageSupporterText}>Supporter</h2>
          <h2 style={layout.projectLandingPageSupporter}>Project landing page for "{currentProject.Project_ID}" by "{currentProject.Author}"</h2>
          <h3 style={layout.projectLandingPageSupporterCurrentFunds}>Current funds : <span style={{ color: '#f2ff00' }}>${currentProject.CurrentAmount}</span> | Goal : <span style={{ color: '#f2ff00' }}>${currentProject.Goal}</span></h3>
          <div>
            <div style={layout.projectLandingPageSupporterInfo}>
              <p style={layout.projectLandingPageSupporterProjectInfo}>Project Info:</p>
              <p>Discription : {currentProject.Description}</p>
              <p>% Funded: {((currentProject.CurrentAmount / currentProject.Goal) * 100).toFixed(2)}%</p>
              <p>Tag : {currentProject.Tag}</p>
              <p>Started : {currentProject.StartDate} | Ends : {currentProject.EndDate}</p>
              <div style={layout.projectLandingPageSupporterPledges}>
                <p style={layout.projectLandingPageSupporterPledgeName}>{currentProject.Project_ID}'s Pledges:</p>
                {currentProject.Pledges.map((Pledge, index) => {
                  return (
                    <div style={layout.projectLandingPageSupporterPledgesOutline} key={index}>
                      <p>Name: {Pledge.Name}</p>
                      <p>Description: {Pledge.Description}</p>
                      <p>Cost: <span style={{ color: '#f2ff00' }}>${Pledge.Cost}</span></p>
                      <p>Amount Claimed: {Pledge.NumberSupporters}</p>
                      <p>Amount of these left: {amountLeftHelper(Pledge.MaxSupporters, Pledge.NumberSupporters)}</p>
                      <button style={layout.projectLandingPageSupporterClaimPledgesButton} disabled={(Pledge.MaxSupporters - Pledge.NumberSupporters <= 0 && Pledge.MaxSupporters != -1)} onClick={() => handlePurchasePledge(Pledge.Project_ID, currentProject.Email_ID, Pledge.Pledge_ID, Pledge.Cost)}>Claim this Pledge</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <h3 style={layout.projectLandingPageDonateText}>Donate Directly</h3>
          <input style={layout.projectLandingPageDonateTextField} ref={donateDirectlyRef} type="text" placeholder="Enter Amount"></input><br></br>
          <button style={layout.projectLandingPageDonateButton} onClick={() => handleDirectDonation(currentProject.Project_ID, currentProject.Email_ID)}>Donate</button>
          <h4 style={layout.projectLandingPageSupporterFunds}>Your Funds: <span style={{ color: '#f2ff00' }}>${model.user.funds}</span></h4>

          <button style={layout.projectLandingPageSupporterBackButton} onClick={() => logOut()}>Back</button>
        </div>
      );
    } catch (error) {
      console.log(error)
      return (
        <div>
          <div style={layout.signInAgainError}>Deleted Project</div>
          <button style={layout.signInAgainErrorButton} onClick={() => logOut()}>Supporter Page</button>
        </div>
      )
    }
  }


  function SupporterActivity() {
    const navigate = useNavigate();
    const searchProjectsRef = useRef(null);
    const [Pledge, setPledge] = useState([]);
    const [searchValue, setsearchValue] = useState("");
    const [data, setData] = useState()
    const [loadiing, setloadiing] = useState(true);


    const navigateTopage = (url) => {
      navigate(url);
    }

    const logOut = event => {
      model.user = null
      CurrentJSON = null
      rmCookie()
      navigateTopage('/');
      logout = true;
    }

    const handleToActivityPage = event => {
      navigateTopage('/supporter');
    }

    useEffect(() => {
      GetPageSupporter(searchValue, setData);
    }, [])

    useEffect(() => {
      setTimeout(() => {
        setloadiing(false)
      }, 1500)
    })
    if (loadiing) {
      if (!cookies.Email_ID) {
        return (
          <div>
            <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>loading</div>
          </div>
        )
      }
      updateSupporter(cookies.Email_ID)
      return (
        <div style={{ color: 'white', fontFamily: 'punchstarterfont', fontSize: 40, textAlign: 'center', padding: 30 }}>
          loading
        </div>
      );
    }

    //spact
    try {
      return (
        <div>
          <div>
            <img src={punchstarterbackground} alt="" width="auto" height="auto" />
            <img style={layout.supporterPSlogo} src={PunchStarterDarkMode} alt="" width="auto" height="auto" />
            <h2 style={layout.psActivity}>Supporter</h2>
            <h3 style={layout.supporterActivity}>{model.user.email}'s Activity</h3>
            <h3 style={layout.supporterActivityFunds}>Your funds: <span style={{ color: '#f2ff00' }}>${model.user.funds}</span></h3>
            <h4 style={layout.supporterActivitySupportedItems}>Your Current Supported Items: {CurrentJSON.SupportedProjects.length + CurrentJSON.SupportedPledges.length}</h4>
            <p style={layout.supportedProjectsText}>Supported Projects:</p>
            <p style={layout.claimedPledgesText}>Claimed Pledges:</p>
            <button style={layout.supporterActivityBackButton} onClick={handleToActivityPage}>Back</button>
            <div>
            </div>
            <div>
              {CurrentJSON.SupportedProjects.map((Project, index2) => {
                return (
                  <div key={index2} style={layout.supportedProjects}>
                    <Link to={`/supporter/${Project.Project_ID}`}>
                      <div style={layout.supportedProjectsList}>Supported: '{Project.Project_ID}' with ${Project.Amount}</div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div>

              {CurrentJSON.SupportedPledges.map((Pledge, index) => {
                return (
                  <div key={index} style={layout.pledgesClaimed}>
                    <Link to={`/supporter/${Pledge.Project_ID}`}>
                      <div style={layout.claimedPledgesList}>Claimed Pledge: '{Pledge.Pledge_ID}' from {Pledge.Project_ID} worth ${Pledge.Amount}</div>
                    </Link>
                  </div>
                );
              })}
            </div></div>
        </div>

      );
    } catch (error) {
      return (
        <div>
          <div style={layout.signInAgainError}>Sign in again</div>
          <button style={layout.signInAgainErrorButton} onClick={() => logOut()}>Login page</button>
        </div>
      )
    }

  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/designer" element={<DesignerPage />}></Route>
        <Route path="/supporter" element={<SupporterPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/designer/:name" element={<DesignerProjectPage />}></Route>
        <Route path="/designer/createproject" element={<CreateProjectPage />}></Route>
        <Route path="/supporter/:name" element={<ProjectPage />}></Route>
        <Route path="/supporter/supporteractivity" element={<SupporterActivity />}></Route>
      </Routes>
    </Router>
  );
}


//cssb
export default App;
