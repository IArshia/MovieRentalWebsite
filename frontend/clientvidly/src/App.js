import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import httpService from "./services/httpService";
import Movies from "./components/movies";
import MovieFormFunc from "./components/movieFormFunc";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

class App extends Component {
  state = {};

  async componentDidMount() {
    try {
      const [user, jwt] = auth.getCurrentUser();
      const result = await httpService.get("/auth/users/" + user.user_id, {
        headers: {
          Authorization: "JWT " + jwt,
        },
      });
      this.setState({
        user: {
          username: result.data.username,
          id: result.data.id,
        },
      });
      // console.log(result);
      // console.log(user);
    } catch (ex) {}
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/movies/:id" element={<MovieFormFunc />} />
            <Route path="/movies" element={<Movies user={this.state.user} />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/not-found" element={<NotFound />} />
            {/* <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" /> */}
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
