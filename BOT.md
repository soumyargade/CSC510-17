## Bot Platform Implementation
### Instructions for Running Code
1. Save gitex token with something like `export BOTTOKEN="gitex token here"`.
2. You'll need to add your **api key** & **run tokens** to the `parseHub.js` file in order for ParseHub (the web scraper we have been using under the hood) to be able to retrieve the necessary examples from GitHub's API documentation. As we are not allowed to check these items into our repo, you will need to contact one of our group members for these materials as was specified by Dr.Ore in [this Piazza post](https://piazza.com/class/ky09haj6kvc533?cid=436).
3. Run `npm install` to get the necessary dependencies.
4. Run `node index.js` & navigate to https://chat.robotcodelab.com/csc510-s22/channels/team-17 to begin communicating with gitex.
5. Enter a command in the form of `gitex [action] [topic]` where action is a verb (i.e. get, list, create, delete) and topic is one of pull(s), issue(s), or repo. You can also specify an additional third argument to receive a code sample or response body as opposed to the API endpoint by including one of the following words - javascript, shell, curl, response. For example, `gitex get issues shell`.

### Implementation Process
Implemented hooks into **Mattermost** platform such that gitex is able to respond to basic commands from the user. We've supported the ability for the user to fully have an interaction with gitex as defined by all three of our use cases by working with ParseHub's web scraper. Requests made to ParseHub's API retrieve data from "runs" that were performed on specific pages from GitHub's API documentation. This data is then filtered based off the command that was made by the user such that the necessary endpoint, code sample, or response body is retrieved. We also have a `mock.json` file that we've used in our testing suite for mocking the responses expected to be received from the web scraper's API.

## Use Cases Refinement
After [discussion with Dr.Ore](https://github.ncsu.edu/csc510-s2022/CSC510-17/issues/11), we went back to the drawing board and completely revised our second & third use cases. Whereas previously each use case pertained to retrieving a different section of GitHub's API endpoints, 

## Testing

## Mocking Infrastructure

## Screencast
