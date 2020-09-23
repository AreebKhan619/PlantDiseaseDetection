import React, {Component} from "react";
import "./App.css";
import Sidebar from "./SemanticComponents/Sidebar";
import MiddleSegment from "./SemanticComponents/Segment";
// import UploadFiles from "./components/upload-files.component";
import RightBar from "./components/RightBar"
import Login from "./Auth/Login"
import LoginContext from "./loginContext"

class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      isAtHistory: false,
      loginSuccess: this.loginSuccess
    }
  }

  loginSuccess = () => {
    this.setState({
      loggedIn: true
    })
  }

  switchToHistory = (bool) => {
    this.setState({
      isAtHistory: bool
    })
  }

  logoutFn = () => {
    this.setState({
      loggedIn: false
    })
    localStorage.removeItem("cred")
  }

  componentDidMount(){
    if(localStorage.getItem("cred")){
      this.setState({
        loggedIn: true
      })
    }
  }


  render(){
    if(this.state.loggedIn)
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar functions={{logoutFn: this.logoutFn, switchToHistory: (bool)=>this.switchToHistory(bool)}} history={this.state.isAtHistory}/>
        <MiddleSegment isAtHistory={this.state.isAtHistory}/>
        <RightBar />
      </div>
    );
    else{
      return (
        <LoginContext.Provider value={this.state}>
        <Login/>
        </LoginContext.Provider>
      )
    }
  }
}


export default App;
