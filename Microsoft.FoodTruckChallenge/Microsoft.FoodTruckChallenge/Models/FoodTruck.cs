namespace Microsoft.FoodTruckChallenge.Models
{
    public class FoodTruck
    {
        public int ObjectId { get; set; }

        public string Applicant { get; set; }

        public string Address { get; set; }

        public string LocationDescription { get; set; }

        public string FoodItems { get; set; }

        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public StatusEnum Status { get; set; }
    }
}
