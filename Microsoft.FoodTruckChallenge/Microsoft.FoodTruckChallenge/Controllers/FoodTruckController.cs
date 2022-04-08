using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.FoodTruckChallenge.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Microsoft.FoodTruckChallenge.Controllers
{
    public class FoodTruckController : ControllerBase
    {

        private readonly ILogger<FoodTruckController> _logger;
        private readonly IFoodTruckService _foodTruckService;

        public FoodTruckController(ILogger<FoodTruckController> logger, IFoodTruckService foodTruckService)
        {
            _logger = logger;
            _foodTruckService = foodTruckService;
        }

        [HttpGet]
        public IEnumerable<FoodTruck> GetAllFoodTrucks()
        {
            _logger.LogInformation("Getting all food trucks from API.");
            return _foodTruckService.GetAll();
        }

        /// <summary>
        /// Gets food trucks by their proximity to the provided location.
        /// </summary>
        /// <param name="maxResultCount">The maximum number of trucks to show.</param>
        /// <param name="latitude">The latitude of the location to compare to.</param>
        /// <param name="longitude">The longitude of the location to compare to.</param>
        /// <returns>A collection of FoodTruck objects.</returns>
        [HttpGet]
        public IEnumerable<FoodTruck> GetFoodTrucksByProximity(int maxResultCount, double latitude, double longitude)
        {
            _logger.LogInformation($"Retrieving up to {maxResultCount}, sorted by proximity to {latitude} latitude and {longitude}");
            return _foodTruckService.GetFoodTrucksByProximity(latitude, longitude, maxResultCount);
        }
    }
}
