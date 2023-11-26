import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { email: "", username: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    // Call the server

    try {
      const { data } = this.state;
      await userService.register(this.state.data);
      await auth.login(data.username, data.password);
      window.location.replace("/");
      // console.log(response);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        for (const key in ex.response.data) {
          errors[key] = ex.response.data[key];
        }
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
