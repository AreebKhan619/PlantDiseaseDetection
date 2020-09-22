import React, { Component } from "react";
import { Container, Header, Card, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";
import UploadService from "../services/upload-files.service"
import {TopRightOrange} from "./Styled"


export default class RightBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: {
        day: "",
        month: "",
        year: ""
      }
    };
  }



  render() {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    return (
      <>
        <div style={{ width: "200px", height: "100vh" }}>
          <Container style={{ margin: "20px", padding: "5px 20px" }}>
            <div>
              <Header
                textAlign="center"
                as="h1"
                style={{ fontSize: "3em", marginBottom: "0", color: "#83c692" }}
              >
                {date.getDate()}
              </Header>
              <Header
                textAlign="center"
                as="h3"
                style={{ marginTop: "0", color: "#83c692" }}
              >
                {month} {date.getFullYear()}
              </Header>
            </div>

            <WeatherCard />
          </Container>
        </div>
      </>
    );
  }
}

class WeatherCard extends Component {
  state = {
    details: {},
    loaded: false
  };

  componentDidMount() {

	//   navigator.geolocation.watchPosition((position)=> {
	// 	console.log("i'm tracking you!");
	//   },
	//   (error)=> {
	// 	if (error.code == error.PERMISSION_DENIED)
	// 	  console.log("you denied me :-(");
	//   });



	  var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	  };
	  

	  const success = (pos) => {
		  this.getWeatherDetails(pos.coords.latitude, pos.coords.longitude)
	  }

	  const error = (err) => {
		this.getWeatherDetails(19.87, 75.34)
	  }
	  
	  navigator.geolocation.getCurrentPosition(success, error, options);



    // this.getWeatherDetails(34.1508271, 74.88578749999999);
  }

  getWeatherDetails = async (lat, long) => {
    const res = await axios.get(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=2a00655cad7d874448f73fed7f9bac76"
    );
    console.log(res.data);
    this.setState({
      details: res.data,
      loaded: true
    });
  };

  kelvinToCelsius = _tempInKelvin => {
    return _tempInKelvin - 273.15;
  };

  render() {
    const { loaded, details } = this.state;
    return (
      <>
        <Header as="h3">Weather Forecast</Header>
        <Card className="hoverable">
          <Dimmer active={!loaded}>
            <Loader />
          </Dimmer>
          <Card.Content>
            <Card.Header>
              {details?.current?.temp
                ? this.kelvinToCelsius(details.current.temp).toFixed(1)
                : ""}
              &deg; C
            </Card.Header>
            <Card.Meta>Feels Like {details?.current?.feels_like ? this.kelvinToCelsius(details.current.feels_like).toFixed(1) : ""}&deg; C</Card.Meta>
            <Card.Description>
              Humidity: <b>{details?.current?.humidity}%</b>
            </Card.Description>
          </Card.Content>
        </Card>

        {loaded &&
          details.daily.map((currEl, i) => {
            if (i !== 0) {
              return (
                <Card key={i} className="hoverable">
                  <Card.Content>
                    <Card.Header>
                      {this.kelvinToCelsius(currEl.temp.day).toFixed(0)}&deg; C
                    </Card.Header>
                    {/* <Card.Meta> */}
                    <TopRightOrange>{new Date(currEl.dt * 1000).toDateString().replace("2020","")}</TopRightOrange>

                    {/* <p>{new Date(currEl.dt * 1000).toDateString()}</p> */}
                    {/* </Card.Meta> */}
                    <Card.Description>
			  <span className="meta">Humidity: {currEl.humidity}%</span>
						</Card.Description>
                  </Card.Content>
                </Card>
              );
            }
          })}
      </>
    );
  }
}
