import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import LoginContext from "../loginContext";
import axios from "axios";
class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: [],
    loading: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({
        errors: errors.concat(error)
      });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({
        errors: errors.concat(error)
      });
      return false;
    } else {
      return true;
    }
  };

  isPasswordValid = ({ password }) => {
    if (password.length < 6) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, password }) => {
    return !username.length || !password.length;
  };

  displayErrors = errors =>
    errors.map((err, i) => <p key={i}>{err.message}</p>);

  handleInputError = (errors, inputName) => {
    return errors.some(err => err.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  handleSubmit = async event => {
    event.preventDefault();

    if (this.isFormValid()) {
      this.setState({
        // errors: [],
        loading: true
      });

      try {
        const response = await axios.post("http://localhost:5000/login", {
          username: this.state.username.toLowerCase(),
          password: this.state.password
        });
        console.log(response, response.status);
        if(response.status===200){
          localStorage.setItem("cred",response.data.userId)
          this.context.loginSuccess()
        }
      } catch (error) {
        console.log(error.response.status, error.response.data.message);
        let t = [];
        t.push({
          message: error.response.data.message
        });
        this.setState({
          errors: t
        });
      }
      this.setState({
        loading: false
      });
    }
  };

  componentDidMount() {
    console.log(this.context);
  }

  render() {
    const { username, password, errors, loading } = this.state;
    return (
      <LoginContext.Consumer>
        {stateObj => (
          <Grid
            className="login-bg"
            textAlign="center"
            verticalAlign="middle"
            style={{ height: "100vh" }}
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" icon color="black" textAlign="center">
                <Icon name="leaf" />
                B.E Plant Disease Detection Project
              </Header>

              <Form onSubmit={this.handleSubmit} size="large">
                <Segment stacked>
                  <Form.Input
                    fluid
                    name="username"
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    value={username}
                    onChange={this.handleChange}
                    type="text"
                  />

                  <Form.Input
                    fluid
                    name="password"
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    className={this.handleInputError(errors, "password")}
                    value={password}
                    onChange={this.handleChange}
                    type="password"
                  />

                  <Button
                    disabled={loading}
                    className={loading ? "loading" : ""}
                    color="green"
                    fluid
                    size="large"
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              {errors.length > 0 && (
                <Message error>
                  <h3>Error</h3>
                  {this.displayErrors(errors)}
                </Message>
              )}
            </Grid.Column>
          </Grid>
        )}
      </LoginContext.Consumer>
    );
  }
}

Login.contextType = LoginContext;

export default Login;
