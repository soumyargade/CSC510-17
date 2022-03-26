## Process
### Iteration Worksheets
`WORKSHEET.md` can be found [here](https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/dev/WORKSHEET.md).

### Story Creation & Assignment
#### Iteration One
At the beginning of this iteration we divided each of our three use cases into stories & assigned story points as well as a developer to each of the tasks (as can be seen in the screenshot of our GitHub Project board below). For this iteration we plan to focus our efforts on fine tuning our web scraper's implementation as it is a foundational piece to the working of each of our use cases.

<img src="https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/dev/img/iterationOne.png">

#### Iteration Two

## Practices
### Core & Corollary Practices
A core practice we have integrated into our software development is **pair programming**.

A corollary practice we have integrated into our software development is **incremental deployment**, or in other words, gradually deploying functionality. This is a beneficial practice as in industry big deployment is high risk & can have high human and economic costs (slide 33 of Process_and_Git_Branches). For example, in our first sprint we deployed functionality for retrieving GitHub API documentation from our web scraper, ParseHub's, API as can be seen in the PR [here](https://github.ncsu.edu/csc510-s2022/CSC510-17/pull/43). After we were able to confirm that this was working we began working on functionality for integrating the Merriam-Webster dictionary API to map words in a user's request to the proper HTTP verbs. This functionality can be seen in the PR [here](https://github.ncsu.edu/csc510-s2022/CSC510-17/pull/49). This was deployed after the team was able to confirm that it was passing the required tests.

### Scrum Meeting Notes
#### Iteration One
| Date   | Progress & Blockers   |  Next Steps
| ------------- | ------------  |  ------------
| Sunday, March 20 | The team discussed work that will need to be completed for this sprint, created the necessary user stories, & added them to the project's Kanban board. | Soumya & Alex to research if there is a more viable alternative to ParseHub to use as the web scraper tool for scraping GitHub REST API documentation. Potential alternatives include the Cheerio library or Webscraper.io.
| Monday, March 21      | Soumya found Webscraper.io to be a better option than ParseHub due to ease of use with regards to its selector. However, there is a hefty price tag of $100/month in order to access the scraped data in a JSON format & use their API to programmatically retrieve data from scraping jobs. Dibya & Kim added user stories to the Kanban. |  <ul><li>**Kim**: Add story points + convert user stories in Kanban to GitHub issues. Assign each issue to a person.</li><li>**Dibya**: Merriam-Webster API integration.</li><li>**Alex**: Mattermost message handling & error handling.</li><li>**Soumya**: work on POC for Webscraper.io to determine if it can replace ParseHub.</li></ul>
| Tuesday, March 22      | <ul><li>**Kim**: Finished adding story points to each user story & converted them into issues.</li><li>**Dibya**: Created skeleton code for Merriam-Webster API.</li><li>**Alex**: Began error handling for invalid commands sent by the user for any of the use cases.</li><li>**Soumya**: Confirmed Webscraper.io is not a feasible option as parsing jobs aren't working when run from within the cloud, a feature that is necessary in order to access scraped data via API calls.</li></ul>             | <ul><li>**Dibya**: Continue working on logic to pull correct HTTP verb based on the synonyms of the action the user chooses. </li><li>**Alex**: Continue to work on error handling. </li><li>**Soumya**: Work on improving ParseHub implementation from what was accomplished during the `BOT` milestone.</li></ul>
| Wednesday, March 23      | <ul><li>**Dibya**: Added logic to parse Merriam-Webster API response to compile synonym list. </li><li>**Alex**: Made progress on error handling logic. </li><li>**Soumya**: Figured out how to modify use of the selector on ParseHub in order to reference retrieved data by key value. Created scraping jobs for each of the necessary APIs & generated tokens. </li></ul> | <ul><li>**Kim**: Pair programming with Soumya to help build out ParseHub logic. </li><li>**Dibya**: Work on logic to pull correct HTTP verb from synonym list. </li><li>**Alex**: Continue to work on error handling.</li><li>**Soumya**: Pair programming with Kim to build out ParseHub logic based off the new structure of the retrieved JSON files from calls to ParseHub's API. </li></ul>
| Thursday, March 24      | <ul><li>**Kim**: Finished ParseHub implementation changes with Soumya. PR reviewed & merged. </li><li>**Dibya**: Completed connecting and parsing response for Merriam-Webster API. PR in review. </li><li>**Alex**: Completed message & error handling on Mattermost. PR reviewed & merged. </li><li>**Soumya**: Finished ParseHub implementation changes with Kim. PR reviewed & merged. </li></ul>             | <ul><li>**Kim**: Begin modifying tests based off the changes made to the format of the data retrieved from ParseHub. </li><li>**Dibya**: Plan thesaurus API integration into existing code & tests for sprint 2. </li><li>**Alex**: Review tests for sprint 2 and identify gaps in code logic to patch in sprint 2.  </li><li>**Soumya**: Help Kim modify tests & add documentation for the sprint to `PROCESS.md`. </li></ul>
| Friday, March 25      | The team reviewed modifications Alex made to Mattermost validation to ensure the general flow of users entering proper commands is working & merged this PR (which also included Dibya's Merriam-Webster API additions). The team also reviewed & merged Kim's PR addressing changes to our testing suite. We also added necessary documentation to wrap up this sprint (iteration worksheet, process reflection, etc). | We plan to discuss issues that remain leading into sprint 2 & also review tests that would be good additions to our current suite with regards to command validation, formatting of GitEx responses, etc. We will also think on how we can improve our overall software development process to be more effective as a team.

#### Iteration Two
| Date   | Progress & Blockers   |  Next Steps
| ------------- | ------------  |  ------------
| Monday, March 28      |           | <ul><li>**Kim**: </li><li>**Dibya**: </li><li>**Alex**: </li><li>**Soumya**: </li></ul>
| Tuesday, March 29      |              | <ul><li>**Kim**: </li><li>**Dibya**: </li><li>**Alex**: </li><li>**Soumya**: </li></ul>
| Wednesday, March 30      |              | <ul><li>**Kim**: </li><li>**Dibya**: </li><li>**Alex**: </li><li>**Soumya**: </li></ul>
| Thursday, March 31      |              | <ul><li>**Kim**: </li><li>**Dibya**: </li><li>**Alex**: </li><li>**Soumya**: </li></ul>
| Friday, April 1      |        | <ul><li>**Kim**: </li><li>**Dibya**: </li><li>**Alex**: </li><li>**Soumya**: </li></ul>
