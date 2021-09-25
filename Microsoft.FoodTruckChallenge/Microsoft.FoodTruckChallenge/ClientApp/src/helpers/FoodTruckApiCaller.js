export class FoodTruckApiCaller {
 static async getAll() {
     
    const url = `/api/FoodTruck/GetAll`;
    const callOptions = { method: "GET", "Content-Type": "application/json" };
    return fetch(url, callOptions);
 }

  static async getFoodTrucksByProximity(latitude, longitude, resultCount) {
    const url = `/api/FoodTruck/GetFoodTrucksByProximity?maxResultCount=${resultCount}&latitude=${latitude}&longitude=${longitude}`;
    const callOptions = { method: "GET", "Content-Type": "application/json" };
    return fetch(url, callOptions);
  }
}
