# food-truck-challenge
## About

- This repository is an implementation for Microsoft's Commercial Software Engineering team's [Take Home Challenge](https://github.com/timfpark/take-home-engineering-challenge").
- The source code for this implementation can be found at the following [repository](https://github.com/msa2984/food-truck-challenge).

## Execution
This application can run on any environment supporting .NET Framework 5.0 and NPM, but was built and tested on a computer running Windows 10, so that may be the optimal environment. 
- To run, clone the repository and open the .sln file in Microsoft Visual Studio.
- During the initial build, all appropriate packages should be installed automatically.
- In the "Run" dropdown of the UI, select "Microsoft.FoodTruckChallenge".
- The application will start and the page will load in the computer's default browser, at localhost:5001. 

## Implementation Choices
- I chose to build a simple React application because I think that visualizing data is one of the easiest ways to make it accessible to various users and to build views that can satisfy multiple requirements. 
- I did leave out some of the fields from the display as they seemed to be geared towards internal use by the City of San Francisco, such as "computed_region_bh8s_q3mv". If I were to spend more time developing this application, I would likely add an extension to the results table which would allow the user to expand on the record keeping fields if they so desired. For example, one popular Javascript table package, [AG-Grid](https://www.ag-grid.com/) allows the developer to customize the data within individual cells of the grid - I would likely opt to add a button which would display a modal with the additional information if I were to use this library or similar. Additionally, using a library like AG-Grid would allow for advanced filtering of the results after they have been returned, for example, allowing the user to sort addresses alphabetically or to sort by the items sold by the food truck.
- A major improvement to this solution would be to also allow the user to search for food trucks by address. There are some open source libraries, such as [Google React Autocomplete](https://www.npmjs.com/package/react-google-autocomplete) which would enable this functionality, however I did not want to rely on a solution that requires an API key which the reviewers may not have access to at this point in time. 
- Another major improvement which I believe this application would benefit from would be displaying the results on a map. End users are not often versed in latitude and longitude, and don't necessary have the context to understand how far away a location is without a visualization of such. 
- Additionally, it would be prudent to add further filtering fields for the user on the submission form. For example, a user should be able to filter food trucks by their Permit Status, if a user is looking for a place to eat they will likely only want to see food trucks with active permits.
