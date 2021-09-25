import React, { useEffect, useState } from "react";
import { Label, Table } from "reactstrap";
import { FoodTruckApiCaller } from "../helpers/FoodTruckApiCaller";

export default function SearchFoodTrucks() {
  // set to five to satisfy requirements from challenge.
  const defaultResultCount = 5;
  // set to 1000 as the current dataset has 629 entries.
  const [maxResultCount, setMaxResultCount] = useState(1000);
  const [foodTrucks, setFoodTrucks] = useState(null);
  const [sortedResults, setSortedResults] = useState(null);
  const [resultDisplayCount, setResultsDisplayCount] =
    useState(defaultResultCount);
  const [latitude, setLatitude] = useState(90);
  const [longitude, setLongitude] = useState(180);
  const [message, setMessage] = useState("Waiting for form submission.");
  const [errorMessage, setErrorMessage] = useState(null);

  const ConvertStatusToString = (status) => {
    switch (status) {
      case 0:
        return <span className="text-warning">Requested</span>;
      case 1:
        return <span className="text-success">Approved</span>;
      case 2:
        return <span className="text-danger">Expired</span>;
      case 3:
        return <span className="text-danger">Suspended</span>;
      case 4:
        return <span className="text-success">Suspended</span>;
      default:
        return <span className="text-warning">Unknown</span>;
    }
  };

  const onLatitudeChange = (e) => {
    const { value } = e.target;
    if (validateLatitude(value)) {
      setLatitude(value);
      setErrorMessage(null);
    } else {
      setErrorMessage("Please provide a latitude value between -90 and 90.");
    }
  };

  const validateLatitude = (value) => {
    return value <= 90 && value >= -90;
  };

  const onLongitudeChange = (e) => {
    const { value } = e.target;
    if (validateLongitude(value)) {
      setLongitude(value);
      setErrorMessage(null);
    } else {
      setErrorMessage("Please provide a longitude value between -180 and 180.");
    }
  };

  const validateLongitude = (value) => {
    return value <= 180 && value >= -180;
  };

  const onResultCountChange = (e) => {
    const { value } = e.target;
    if (validateResultCount(value)) {
      setResultsDisplayCount(value);
      setErrorMessage(null);
    } else {
      setErrorMessage(
        `Please provide a truck count between ${defaultResultCount} and ${maxResultCount}.`
      );
    }
  };

  const validateResultCount = (value) => {
    return value <= maxResultCount && value >= defaultResultCount;
  };

  const onSubmitFormSortResults = async (e) => {
    // don't reload the page.
    e.preventDefault();
    if (
      !validateLatitude(latitude) ||
      !validateLongitude(longitude) ||
      !validateResultCount(resultDisplayCount)
    ) {
      setErrorMessage(
        `Please ensure latitude is between -90 and 90, longitude is between -180 and 180, and the result count is between ${defaultResultCount} and ${maxResultCount}`
      );
    } else {
      setMessage("Please wait, loading results...");
      const foodTruckResponse =
        await FoodTruckApiCaller.getFoodTrucksByProximity(
          latitude,
          longitude,
          resultDisplayCount
        );
      if (foodTruckResponse && foodTruckResponse.ok) {
        const sortedFoodTrucks = await foodTruckResponse.json();

        setSortedResults(sortedFoodTrucks);
        setMessage(`The following trucks are the closest in proximity to ${latitude}
      latitude and ${longitude}`);
        setErrorMessage(null);
      } else {
        setErrorMessage(
          "Failed to receive a response from the server with food truck information."
        );
      }
    }
  };

  useEffect(() => {
    async function getAllFoodTrucks() {
      var response = await FoodTruckApiCaller.getAll();
      if (response && response.ok) {
        const trucks = await response.json();
        setFoodTrucks(trucks);
        setMaxResultCount(trucks.length);
      }
    }

    if (foodTrucks == null) {
      getAllFoodTrucks();
    }
  }, [foodTrucks, setFoodTrucks, setMaxResultCount]);

  return (
    <div className="w-100 h-50">
      <h1>Search for Nearby Food Trucks</h1>
      <form className="bg-light rounded p-2" onSubmit={onSubmitFormSortResults}>
        <Label className="font-weight-bold mt-2 mb-2 d-block">
          Provide a latitude:
          <input
            type="number"
            id="latitude"
            name="latitude"
            className="ml-2"
            value={latitude}
            onChange={onLatitudeChange}
          />
        </Label>
        <Label className="font-weight-bold mt-2 d-block">
          Provide a longitude:
          <input
            type="number"
            id="longitude"
            name="longitude"
            className="ml-2"
            value={longitude}
            onChange={onLongitudeChange}
          />
        </Label>
        <Label className="font-weight-bold mt-2 d-block">
          Provide the number of results to display:
          <input
            type="number"
            id="max-result-count"
            name="max-result-count"
            className="ml-2"
            value={resultDisplayCount}
            onChange={onResultCountChange}
          />
          <small className="d-block text-info mt-2">
            Provide a value between {defaultResultCount} and {maxResultCount}
          </small>
        </Label>
        <div className="d-block">
          <div className="d-flex flex-row-reverse">
            <button
              type="submit"
              id="submit-form"
              name="submit-form"
              className="ml-2 btn btn-primary"
            >
              Submit Form
            </button>
            <button
              type="reset"
              id="reset-form"
              name="reset-form"
              className="btn btn-danger"
            >
              Reset Form
            </button>
          </div>
        </div>
      </form>
      <h1>Current Status</h1>
      <div className="d-flex justify-content-center w-100 bg-light rounded p-2 mt-2">
        <div>
          {message && (
            <span className="mt-2 text-danger d-block">{errorMessage}</span>
          )}
          {message && <span className="mt-2 text-info d-block">{message}</span>}
          {sortedResults && (
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Food</th>
                  <th>Address</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedResults.map((value, key) => {
                  return (
                    <tr key={key}>
                      <td>{value.objectId}</td>
                      <td>{value.applicant}</td>
                      <td>{value.foodItems}</td>
                      <td>{value.address}</td>
                      <td>{value.latitude}</td>
                      <td>{value.longitude}</td>
                      <td>{ConvertStatusToString(value.status)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
