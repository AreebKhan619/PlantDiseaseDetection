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
class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
	passwordConfirmation: "",
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

	  if(this.isFormEmpty(this.state)){
		error = {message: "Fill in all fields"}
		this.setState({
			errors: errors.concat(error)
		})
		return false
	  }else if(!this.isPasswordValid(this.state)){
		error = {message: "Passwords are invalid"}
		this.setState({
			errors: errors.concat(error)
		})
		return false
	  }
	  else{
		  return true
	  }
  }

  isPasswordValid = ({password, passwordConfirmation}) => {
	  if(password.length < 6 || passwordConfirmation.length <6){
		  return false
	  }else if(password !== passwordConfirmation){
		return false
	  }
	  else{
		  return true
	  }
  }


  isFormEmpty = ({username, email, password, passwordConfirmation}) => {
	return !username.length || !email.length || !password.length || !passwordConfirmation.length
  }

  displayErrors = (errors) =>  errors.map((err, i)=>  <p key={i}>{err.message}</p>)
  


  handleInputError = (errors, inputName) => {
	  return errors.some((err)=>err.message.toLowerCase().includes(inputName)) ? "error": ""
  }


  handleSubmit = event => {
	event.preventDefault();

	if(this.isFormValid()){
		this.setState({
			errors: [],
			loading: true
		})
		
	}
  };
  

  render() {
	const { username, password, errors, loading } = this.state;
    return (
      <Grid className="login-bg" textAlign="center" verticalAlign="middle" style={{height: '100vh'}}>
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
				className={this.handleInputError(errors,"password")}
                value={password}
                onChange={this.handleChange}
                type="password"
              />

              <Button disabled={loading} className={loading ? 'loading' : ''} color="green" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
		  {
			  errors.length > 0 && (
				  <Message error>
					  <h3>Error</h3>
					  {this.displayErrors(errors)}
				  </Message>
			  )
		  }
       
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
