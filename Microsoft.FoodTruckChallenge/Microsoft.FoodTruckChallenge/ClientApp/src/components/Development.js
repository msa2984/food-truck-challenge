import React from "react";
import { Badge, ListGroup, ListGroupItem } from "reactstrap";

export default function Development() {
  return (
    <>
      <h1>About This Application</h1>
      <div className="p-2 bg-light rounded">
        <div>
          <h3>Back-end</h3>
          <span>
            This web application is built using ASP.NET for back-end processing,
            targeting .NET Framework version 5.0.
          </span>
        </div>
        <div>
          <h3>Front-end</h3>
          <span>
            This web application is built using the following primary frameworks
            and libraries for front-end displays and processing.
          </span>
          <ListGroup>
            <ListGroupItem>
              <a href="https://reactjs.org/">React</a>
              <Badge pill className="ml-2">
                16.11.0
              </Badge>
            </ListGroupItem>
            <ListGroupItem>
              <a href="https://reactstrap.github.io/">Reactstrap</a>
              <Badge pill className="ml-2">
                8.9.0
              </Badge>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
      <div className="mt-2 p-2 bg-light rounded">
        <h3>Future Features</h3>
        <ListGroup>
          <ListGroupItem>
            Display schedules for individual food trucks.
          </ListGroupItem>
          <ListGroupItem>
            Allow users to filter food trucks by their open or closed status.
          </ListGroupItem>
          <ListGroupItem>
            Integrate with Google Maps API and allow users to specify an address to search for. 
          </ListGroupItem>
          <ListGroupItem>
            Integrate with Google Maps API and display results on a map.
          </ListGroupItem>
          <ListGroupItem>
            Use toasts to display error messages.
          </ListGroupItem>          
          <ListGroupItem>
            Add method to view all trucks regardless of proximity.
          </ListGroupItem>
        </ListGroup>
      </div>
    </>
  );
}
