using Microsoft.FoodTruckChallenge.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace Microsoft.FoodTruckChallenge
{
    public class FoodTruckService : IFoodTruckService
    {
        private const string SF_FOOD_TRUCK_API_ENDPOINT = "https://data.sfgov.org/resource/rqzj-sfat.json";
        private readonly HttpClient _client;
        private static IEnumerable<FoodTruck> _allFoodTrucks;

        public FoodTruckService(HttpClient client)
        {
            _client = client;
            Task.Run(() => GetTrucksFromApi()).Wait();
        }

        /// <inheritdoc>
        public IEnumerable<FoodTruck> GetAll() => _allFoodTrucks;

        /// <inheritdoc>
        public IEnumerable<FoodTruck> GetFoodTrucksByProximity(double latitude, double longitude, int maxResultCount)
        {
            var measuredLocations = new List<(double distance, FoodTruck truck)>();
            foreach (var foodTruck in _allFoodTrucks)
            {
                var truckDistance = GetDistanceBetweenPoints(latitude, longitude, foodTruck.Latitude, foodTruck.Longitude);
                measuredLocations.Add((truckDistance, foodTruck));
            }

            measuredLocations.Sort((x, y) =>
            {
                return x.distance.CompareTo(y.distance);
            });

            return measuredLocations.Take(Math.Min(maxResultCount, measuredLocations.Count)).Select(ml => ml.truck);
        }

        private async Task GetTrucksFromApi()
        {
            var trucks = new List<FoodTruck>();
            var response = await _client.GetAsync(SF_FOOD_TRUCK_API_ENDPOINT);
            if (response.IsSuccessStatusCode)
            {
                var contentStream = await response.Content.ReadAsStreamAsync();
                var trimCharacters = new char[] { '[', ']', ',' };

                StreamReader streamReader = new StreamReader(contentStream);

                while (!streamReader.EndOfStream)
                {
                    var truckDetails = streamReader.ReadLine();

                    // The last and first lines will have '[' and ']' preventing the lines from being valid JSON.
                    // This is due to the way the JSON is formmatted and how the FoodTruck is configured - JSON to C#
                    // conversion expects "named" objects in the JSON when deserializing, however this JSON is formatted as a series of unnamed arrays.
                    truckDetails = truckDetails.TrimStart(trimCharacters).TrimEnd(trimCharacters);

                    try
                    {
                        var truck = JsonConvert.DeserializeObject<FoodTruck>(truckDetails);
                        trucks.Add(truck);
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine($"Couldn't deserialize the following {truckDetails} due to error: {e}. Skipping to the next truck.");
                    }
                }
            }

            _allFoodTrucks = trucks;
        }

        /// <summary>
        /// Implementation of the Haversine formula (https://en.wikipedia.org/wiki/Haversine_formula)
        /// to calculate the distance between two points in kilometers.
        /// </summary>
        /// <param name="latitudeOne">Latitude of the first point.</param>
        /// <param name="longitudeOne">Longitude of the first point.</param>
        /// <param name="latitudeTwo">Latitude of the second point.</param>
        /// <param name="longitudeTwo">Longitude of the second point.</param>
        /// <returns>The distance between the two points in kilometers.</returns>
        private double GetDistanceBetweenPoints(double latitudeOne, double longitudeOne, double latitudeTwo, double longitudeTwo)
        {
            var radius = 6371; // Radius of the earth in km
            var latitudeDifference = ConvertDegreesToRadians(latitudeTwo - latitudeOne);  // deg2rad below
            var longitudeDifference = ConvertDegreesToRadians(longitudeTwo - longitudeOne);
            var a =
              Math.Sin(latitudeDifference / 2) * Math.Sin(latitudeDifference / 2) +
              Math.Cos(ConvertDegreesToRadians(latitudeOne)) * Math.Cos(ConvertDegreesToRadians(latitudeTwo)) *
              Math.Sin(longitudeDifference / 2) * Math.Sin(longitudeDifference / 2)
              ;
            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            var distance = radius * c; // Distance in km
            return distance;
        }

        /// <summary>
        /// Convert degrees to radians
        /// </summary>
        /// <param name="degrees">Degree value to convert</param>
        /// <returns>The equivalent number of radians.</returns>
        private double ConvertDegreesToRadians(double degrees) => degrees * (Math.PI / 180);

    }
}
