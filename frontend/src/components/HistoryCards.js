import React, { Component } from "react";
import {
  Card,
  Icon,
  Image,
  Statistic,
  Dimmer,
  Loader
} from "semantic-ui-react";
import axios from "axios";
class HistoryCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      history: []
    };
  }

  componentDidMount() {
    this.getHistory();
  }

  getHistory = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getHistory", {
        user_id: localStorage.getItem("cred")
      });
      console.log(response);
      this.setState({
        history: response.data.result,
        loaded: true
      });
    } catch (error) {
      window.alert(error);
      this.setState({
        loaded: true
      });
    }
  };



//   calculateDetections = () => {
// 	  let j=0
// 	  this.state.history.forEach((currEl)=>{
// 		  if(currEl.status.toLowerCase()!=="healthy"){
// 			j=j+1
// 		  }
// 	  })
// 	  return j
//   }

  render() {
	  let obj = {
		  nonHealthy: 0,
		  todaysCount: 0
	  }
	  if(this.state.loaded){
		let nonHealthy=0
		let todaysCount=0
		let a = new Date()
		let dateInString = a.getDate()+'-'+String((parseInt(a.getMonth())+1)).padStart('2','0')+'-'+a.getFullYear()
		this.state.history.forEach((currEl)=>{
			if(currEl.status.toLowerCase()!=="healthy"){
			  nonHealthy=nonHealthy+1
			}
			if(currEl.date===dateInString){
				todaysCount=todaysCount+1
			}
		})
		obj.nonHealthy = nonHealthy
		obj.todaysCount = todaysCount

	  }
    return (
      <>
        <div
          style={{
            display: "flex",
			justifyContent: "space-around",
			alignItems: 'center',
            flexFlow: "wrap"
          }}
        >
          <Dimmer inverted active={!this.state.loaded}>
            <Loader />
          </Dimmer>
          {this.state.loaded && (
            <>
              <Statistic>
                <Statistic.Value>
					{this.state.history.length}
				</Statistic.Value>
                <Statistic.Label>Total Submissions</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
					{obj.nonHealthy}
				</Statistic.Value>
                <Statistic.Label>Detections</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
					{obj.todaysCount}
				</Statistic.Value>
                <Statistic.Label>Submitted Today</Statistic.Label>
              </Statistic>
            </>
          )}
        </div>
        <Card.Group itemsPerRow={4} style={{ marginTop: "20px" }}>
          {this.state.loaded &&
            this.state.history.map((currEl, i) => (
              <Card key={i}>
                <Image
                  src={
                    "data:image/png;base64," +
                    currEl.imgURL.replace(/[']/g, "").slice(1)
                  }
                  ui={true}
                />
                <Card.Content>
                  <Card.Header>{currEl.type}</Card.Header>
                  <Card.Meta>
                    Accuracy: {currEl.percentage.toFixed(2)}%
                  </Card.Meta>
                  <Card.Description>
                    Report: <b>{currEl.status.replace("_", " ")}</b>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <p>
                    <Icon name="calendar alternate outline" />
                    Submitted on {currEl.date}
                  </p>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </>
    );
  }
}

export default HistoryCards;
