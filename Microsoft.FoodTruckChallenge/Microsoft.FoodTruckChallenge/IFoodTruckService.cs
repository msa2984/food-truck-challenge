using Microsoft.FoodTruckChallenge.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Microsoft.FoodTruckChallenge
{
    public interface IFoodTruckService
    {
        /// <summary>
        /// Get all of the Food Trucks available from the external service.
        /// </summary>
        /// <param name="ct">Cancellation Token.</param
        public IEnumerable<FoodTruck> GetAll();

        /// <summary>
        /// Gets a specific number of Food Trucks by their proximity to the provided coordinates.
        /// </summary>
        /// <param name="latitude">The latitude to compare to.</param>
        /// <param name="longitude">The longitude to compare to.</param>
        /// <param name="maxResultCount">The maximum number of results to return.</param>
        /// <returns>A collection of FoodTruck objects.</returns>
        public IEnumerable<FoodTruck> GetFoodTrucksByProximity(double latitude, double longitude, int maxResultCount);
    }
}
