import React, { Component } from "react";
import {
  Container,
  Header,
  Card,
  Dimmer,
  Loader,
  Popup
} from "semantic-ui-react";
import axios from "axios";
import UploadService from "../services/upload-files.service";
import { TopRightOrange } from "./Styled";

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
        <div style={{ width: "300px", height: "100vh", overflowY: "scroll" }}>
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
    open: false,
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

    const success = pos => {
      this.getWeatherDetails(pos.coords.latitude, pos.coords.longitude);
    };

    const error = err => {
      this.getWeatherDetails(19.87, 75.34);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    // this.getWeatherDetails(34.1508271, 74.88578749999999);
  }

  getWeatherDetails = async (lat, long) => {
    const res = await axios.get(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        long +
        "&units=metric&appid=2a00655cad7d874448f73fed7f9bac76"
    );
    console.log(res.data);
    this.setState({
      details: res.data,
      loaded: true
    });
  };

  // kelvinToCelsius = _tempInKelvin => {
  //   return _tempInKelvin - 273.15;
  // };

  render() {
    const { loaded, details } = this.state;
    return (
      <>
        <Header as="h3">Weather Forecast</Header>
        <Popup
          trigger={
            <Card className="hoverable">
              <Dimmer inverted active={!loaded}>
                <Loader />
              </Dimmer>
              <Card.Content>
                <Card.Header>
                  {details?.current?.temp.toFixed(1)}
                  &deg; C
                </Card.Header>
                <Card.Meta>
                  Feels Like{" "}
                  {details?.current?.feels_like.toFixed(1)}
                  &deg; C
                </Card.Meta>
                <Card.Description>
                  Humidity: <b>{details?.current?.humidity}%</b>
                </Card.Description>
              </Card.Content>
            </Card>
          }
          inverted
          offset="-50px, 0px"
        >
          <Popup.Header>
            More details for
            <br />
            {new Date(details?.current?.dt * 1000).toDateString().replace("2020", "")}
          </Popup.Header>
          <Popup.Content>
            <img src={`http://openweathermap.org/img/wn/`+details?.current?.weather[0]?.icon+`.png`} alt={details?.current?.weather[0]?.main}/><br/>
            {details?.current?.weather[0]?.main}<br/>
            Cloudiness:{details?.current?.clouds}%<br />
            Wind Speed:{details?.current?.wind_speed}m/s<br/>
            Rain chance:{loaded && (details?.daily[0]?.pop).toFixed(2)} %
          </Popup.Content>
        </Popup>

        {loaded &&
          details.daily.map((currEl, i) => {
            if (i !== 0) {
              return (
                <Popup
                  trigger={
                    <Card key={i} className="hoverable">
                      <Card.Content>
                        <Card.Header>
                          {currEl.temp.day.toFixed(0)}&deg; C
                        </Card.Header>
                        <TopRightOrange>
                          {new Date(currEl.dt * 1000)
                            .toDateString()
                            .replace("2020", "")}
                        </TopRightOrange>
                        <Card.Description>
                          <span className="meta">
                            Humidity: {currEl.humidity}%
                          </span>
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  }
                  inverted
                  offset="-50px, 0px"
                >
                  <Popup.Header>
                    More details for
                    <br />
                    {new Date(currEl.dt * 1000)
                      .toDateString()
                      .replace("2020", "")}
                  </Popup.Header>
                  <Popup.Content>
                    Cloudiness: {currEl.clouds}%<br />
                    Wind Speed: {currEl.wind_speed}m/s
                    <br />
                    Rain chance: {(currEl.pop * 100).toFixed(2)}%
                  </Popup.Content>
                </Popup>
              );
            } else return null;
          })}
      </>
    );
  }
}
