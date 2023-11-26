import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    // Call the server
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      window.location.replace("/");

      // console.log(jwt);
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.username = "Username or password is not valid.";
        this.setState({ errors });
      }
      // else if (ex.response && ex.response.status === 200){

      // }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
