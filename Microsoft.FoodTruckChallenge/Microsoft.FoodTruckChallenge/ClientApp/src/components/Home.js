import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Jumbotron } from "reactstrap";

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>San Francisco Food Truck Tracker</h1>
        <Jumbotron>
          This application is an implementation for Microsoft's Commercial
          Software Engineering team's{" "}
          <a href="https://github.com/timfpark/take-home-engineering-challenge">
            Take Home Challenge
          </a>
          . The source code for this implementation can be found at the
          following{" "}
          <a href="https://github.com/msa2984/food-truck-challenge ">
            repository
          </a>
          .
        </Jumbotron>
        <h2>Usage</h2>
        <div>
          This application has two primary sections which can be accessed
          through the navigation menu on the top of the screen.
          <span className="m-2 d-block">
            Use the <Link to="/search-food-trucks">Search Food Trucks</Link>{" "}
            feature to return food trucks near a provided location.
          </span>
          <span className="m-2 d-block">
            Use the <Link to="/development">Development</Link> section to learn
            more details about the implementation of this site.
          </span>
        </div>
      </div>
    );
  }
}
