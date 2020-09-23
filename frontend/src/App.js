import React, {Component} from "react";
import "./App.css";
import Sidebar from "./SemanticComponents/Sidebar";
import MiddleSegment from "./SemanticComponents/Segment";
// import UploadFiles from "./components/upload-files.component";
import RightBar from "./components/RightBar"
import Login from "./Auth/Login"


class App extends Component{

  state = {
    loggedIn: false
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
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <MiddleSegment />
        <RightBar />
        {/* <UploadFiles /> */}
  
        {/* <div className="container" style={{ width: "200px" }}>
        <div style={{ margin: "20px" }}>
          <h3>Disease Detection System</h3>
          <h4>Upload image file</h4>
        </div>
        <UploadFiles />
      </div> */}
      </div>
    );
    else{
      return (
        <Login/>
      )
    }
  }
}


export default App;
