## Bot Platform Implementation
### Instructions for Running Code
1. Save gitex token with something like `export BOTTOKEN="gitex token here"`.
2. You will need to add your **api key** and **run tokens** to our `parseHub.js` file in order for ParseHub (the web scraper we have been using under the hood) to be able to retrieve the necessary examples from GitHub's API documentation. As we are not allowed to check these items into our repo, you will need to contact one of our group members for these materials as was specified by Dr.Ore in [this Piazza post](https://piazza.com/class/ky09haj6kvc533?cid=436).
3. Run `npm install` to get the necessary dependencies.
4. Run `node index.js` & navigate to https://chat.robotcodelab.com/csc510-s22/channels/team-17 to begin communicating with gitex.
5. Enter a command in the form of `gitex [action] [topic]` where action is a verb (i.e. get, list, create, delete) and topic is one of pull(s), issue(s), or repo. You can also specify an additional third argument to receive a code sample or response body as opposed to the API endpoint by including one of the following words - javascript, shell, curl, response. For example, `gitex get issues shell`.

### Implementation Process
Add some details on how stuff was implemented for this iteration.

## Use Cases Refinement

## Testing

## Mocking Infrastructure

## Screencast
