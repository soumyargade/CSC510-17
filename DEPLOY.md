# Deployment

## Deployment
### Screencast
Can be viewed [here](https://youtu.be/eRT7tGrxscs).

### Instructions to Run Script
1. Make sure the following variables have been added to the local environment. Replace `<provided_value>` with the token values provided by the team in the Google Form filled out & sent to the teaching staff as part of this milestone.
```
export GITHUB_TOKEN="<provided_value>"
export BOTTOKEN="<provided_value>"
export MERRIAMWEBSTERTOKEN="<provided_value>"
export CSC510APIKEY="<provided_value>"
export CSC510ISSUESTOKEN="<provided_value>"
export CSC510PULLSTOKEN="<provided_value>"
export CSC510REPOSTOKEN="<provided_value>"
```
2. Run the script: `ansible-playbook -i hosts -k gitex-bot-deploy.yml`.
3. Login to the vm & kill the process that was started (this is necessary because in order for the env variables to be set in the vm the user must login & logout prior to running the app). Thus, we will kill the process & re-run the app with the variables now registered. The list of running processes can be viewed with `forever list` & then killed with `kill <forever id>`.
4. Re-run script with the variables now set on the remote host: `ansible-playbook -i hosts -k gitex-bot-deploy.yml`.

*Note*: update IP address & user in `hosts` file as necessary **if provisioning a new server** by replacing the `<new_ip_address>` & `<your_username>` values on line 2 of the `hosts` file as seen below:
```
local ansible_host=<new_ip_address> ansible_connection=ssh ansible_user=<your_username>
```

### Summary
The [deployment script](gitex-bot-deploy.yml) uses an Ansible playbook to do the following:
* **`setting env variables on remote`:** tokens necessary for GitEx found in the local machine's env are stored on the remote machine's env as a block within the `etc/environment` file.
* **`install nodejs & npm`:** ensures the `npm` package manager is installed.
* **`install forever`:** ensures `forever` is installed globally in order for the process to stay up & running.
* **`clone repo`:** clones the team's private GitHub repo using the personal access token found in the local machine's env.
* **`install node modules`:** installs node modules within the `gitex` repo created on the remote machine.
* **`check list of running apps`:** checks the list of running apps to verify whether or not the app is running (useful later on).
* **`start app`:** starts the GitEx bot using `forever` only if the app isn't already currently running (achieving idempotency).

## Acceptance Testing

### General Instructions for Running the GitEx Bot:
Start by opening up your Mattermost account and navigating to the channel “Team-17”. 

<img width="630" alt="Screen Shot 2022-04-13 at 8 34 29 PM" src="https://media.github.ncsu.edu/user/23443/files/ec9319ed-65bd-4ee0-a99e-2c1e3170cc3a">

From here, you can begin communication with the bot. The GitEx bot works by listening to user commands and replying with the appropriate response. In order to communicate with the bot, you type your desired command into the chat.

<img width="630" alt="Screen Shot 2022-04-13 at 8 35 10 PM" src="https://media.github.ncsu.edu/user/23443/files/feb0b460-a7e1-4993-9c47-3ede7abb0247">

All strings are formatted in the following manner:

`gitex [action] [feature] [optional]`

All requests must start with the word “gitex” followed by any combination of valid action, feature, or optional words.<br> (Note: <b>case does matter</b>, “Gitex”, “GitEx”, “gitEx” will not be recognized)
Example of valid choices:

`gitex [create / get / list / update / edit / delete / retrieve] [pull[s] / repo[s] / issue[s]] [javascript / js / shell / response]`

(Note: <b>case does NOT matter</b> for the action, feature, or optional words. For Ex: “Javascript”, “javascript”, “JS”, “js” would all be recognized)

### Instructions for Running Use Case Tests:

The acceptance tests below provide a helpful guide of user commands you can copy and paste to test each use case. The "TestID" column contains a description of what is being tested. The “Input” column contains user commands that can be copied and pasted directly into the Mattermost client. The “Expected Output” contains what the GitEx bot should respond with. The “Actual Output” returns the actual output delivered by the bot. This column should match the Expected Output.

<b> UC1 Tests - Retrieve HTTP method and API endpoint </b>

The following commands can be used to test UC1. UC1 involves the case when a user wants the HTTP method and API endpoint returned for a particular action in the Repositories, Pulls, or Issues Github APIs. For example, if a user wants to get the API call for retrieving the list of repositories, they would input `gitex get repo/repository` and the bot will return the associated API call. The following acceptance tests check for both valid and invalid user inputs.
TestID | Input   | Expected Output  |  Actual Output  
| ------------- | ------------  |  ------------ | ------------- |
testValidGetRepoCommandShortened | `gitex get repo` | get /repos/{owner}/{repo} | get /repos/{owner}/{repo} 
testValidGetRepoCommand | `gitex get repository` | get /repos/{owner}/{repo} | get /repos/{owner}/{repo} 
testValidCreateRepoCommand| `gitex create repo` | post /orgs/{org}/repos | post /orgs/{org}/repos 
testValidUpdateRepoCommand| `gitex update repo` | get /orgs/{org}/repos | get /orgs/{org}/repos 
testValidSynonymRepoCommand | `gitex catalog repos` | get /orgs/{org}/repos | get /orgs/{org}/repos
testInvalidFeatureCommand | `gitex create ewqew` | Invalid feature. Please select one of the following features: Pulls, Repos, Issues | Invalid feature. Please select one of the following features: Pulls, Repos, Issues 
testInvalidActionCommand | `gitex throw issue` | Invalid action entered. Please make sure it maps to a CRUD keyword. | Invalid action entered. Please make sure it maps to a CRUD keyword. 
testInvalidOptionalCommand | `gitex update repo eqweqwewq` | Invalid optional command. Please select one of the following optional commands: Javascript, Shell, Response | Invalid optional command. Please select one of the following optional commands: Javascript, Shell, Response
testTooManyActionSpecifiers | `gitex update repo shell eqwewqe` | Invalid number of action specifiers. | Invalid number of action specifiers.

<b> UC2 Tests - Retrieve Shell command or JavaScript code </b> <br> <br>
The following commands can be used to test UC2. UC2 involves the case where the user wants an example of a javascript or shell command performing an API call in the Pulls, Repositories, or Issues Github API's.
The first few tests check the Javascript response. The next set of tests check the Shell response. 
The remaining tests focus on invalid user commands. Key point to verify for this use case is that the Gitex bot should recognize that “js” and “javascript” are equivalent. It is also important to verify that Gitex only responds to properly formatted requests. Gitex shouldn’t respond to invalid actions and features even if a “javascript” or “shell” option is included in the command.

TestID | Input   | Expected Output  |  Actual Output  
| ------------- | ------------  |  ------------ | ------------- |
testGetCommandOptionalJS | `gitex get repo js` <br> or <br> `gitex get repo javascript` | await octokit.request('GET /repos/{owner}/{repo}', { owner: 'octocat', repo: 'hello-world' }) | await octokit.request('GET /repos/{owner}/{repo}', { owner: 'octocat', repo: 'hello-world' }) |
testCreateCommandOptionalJS | `gitex create repo js` <br> or <br> `gitex create repo javascript` | await octokit.request('POST /orgs/{org}/repos', { org: 'org', name: 'name' }) | await octokit.request('POST /orgs/{org}/repos', { org: 'org', name: 'name' }) |
testGetCommandOptionalShell | `gitex get repo shell` | curl \ -H "Accept: application/vnd.github.v3+json" \ https://api.github.com/repos/octocat/hello-world | curl \ -H "Accept: application/vnd.github.v3+json" \ https://api.github.com/repos/octocat/hello-world |
testInvalidFeatureOptionalJS | `gitex get something js` <br> or <br> `gitex get something javascript` | Invalid feature. Please select one of the following features: Pulls, Repos, Issues | Invalid feature. Please select one of the following features: Pulls, Repos, Issues |
testInvalidFeatureOptionalShell | `gitex get something shell` | Invalid feature. Please select one of the following features: Pulls, Repos, Issues | Invalid feature. Please select one of the following features: Pulls, Repos, Issues |
testInvalidActionOptionalJS | `gitex something something js` <br> or <br> `gitex something something javascript` | Invalid action entered. Please make sure it maps to a CRUD keyword. | Invalid action entered. Please make sure it maps to a CRUD keyword. |
testInvalidActionOptionalShell | `gitex something something shell`| Invalid action entered. Please make sure it maps to a CRUD keyword. | Invalid action entered. Please make sure it maps to a CRUD keyword. |

<b> UC3 Tests - Retrieve Response status and body </b>
<br>
<br> The following commands can be used to test UC3. UC3 involves the case where a user wants the response status and body related to GitHub's "Pulls" API, "Repositories" API, or "Issues" API. The following acceptance tests check for both valid and invalid user inputs.
<br>(Note: The output for the "response" optional command returns a large text output. For the purpose of this chart the output has been truncated to save space. When running the optional command in Mattermost expect a larger output)
TestID | Input   | Expected Output  |  Actual Output  
| ------------- | ------------  |  ------------ | ------------- |
testValidPullsResponse | `gitex list pulls response` | [ <br>{ <br>"url": "https://api.github.com/repos/octocat/Hello-World/pulls/1347", <br>"id": 1, <br>"node_id": "MDExOlB1bGxSZXF1ZXN0MQ==", <br>"html_url": "https://github.com/octocat/Hello-World/pull/1347", <br>"diff_url": "https://github.com/octocat/Hello-World/pull/1347.diff", <br>"patch_url": "https://github.com/octocat/Hello-World/pull/1347.patch", <br>…. <br>] | [ <br>{ <br>"url": "https://api.github.com/repos/octocat/Hello-World/pulls/1347", <br>"id": 1, <br>"node_id": "MDExOlB1bGxSZXF1ZXN0MQ==", <br>"html_url": "https://github.com/octocat/Hello-World/pull/1347", <br>"diff_url": "https://github.com/octocat/Hello-World/pull/1347.diff", <br>"patch_url": "https://github.com/octocat/Hello-World/pull/1347.patch", <br>…. <br>]
testValidRepoResponse | `gitex get repo response` | {<br>"id": 1296269,<br>"node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",<br>"name": "Hello-World",<br>"full_name":<br>"octocat/Hello-World",<br>"owner": {<br>"login": "octocat",<br>"id": 1,<br>…<br>}| {<br>"id": 1296269,<br>"node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",<br>"name": "Hello-World",<br>"full_name":<br>"octocat/Hello-World",<br>"owner": {<br>"login": "octocat",<br>"id": 1,<br>…<br>}
testValidUpdatePullResponse | `gitex update pull response` | {<br>"url": "https://api.github.com/repos/octocat/Hello-World/pulls/1347",<br>"id": 1,<br>"node_id":<br>"MDExOlB1bGxSZXF1ZXN0MQ==",<br>"html_url": "https://github.com/octocat/Hello-World/pull/1347",<br>"diff_url": "https://github.com/octocat/Hello-World/pull/1347.diff",<br>…<br>} | {<br>"url": "https://api.github.com/repos/octocat/Hello-World/pulls/1347",<br>"id": 1,<br>"node_id":<br>"MDExOlB1bGxSZXF1ZXN0MQ==",<br>"html_url": "https://github.com/octocat/Hello-World/pull/1347",<br>"diff_url": "https://github.com/octocat/Hello-World/pull/1347.diff",<br>…<br>} |
testInvalidFeatureResponse | `gitex update lorem response` | Invalid feature. Please select one of the following features: Pulls, Repos, Issues | Invalid feature. Please select one of the following features: Pulls, Repos, Issues |
testInvalidActionResponse | `gitex lorem pulls response` | Invalid action entered. Please make sure it maps to a CRUD keyword. | Invalid action entered. Please make sure it maps to a CRUD keyword. |

## Final Code
Our final code consists of the following files:
* **[`index.js`](index.js):** Handles starting the GitEx bot. `index.js` listens for the word 'gitex' in a Mattermost message to invoke code. Once 'gitex' is heard in a message, several validations are run to ensure if the message entered matches the expected format. If validations pass, index.js parses the message that is followed by the 'gitex' keyword and invokes `processing.js`. If not, a message is returned to the user specifying what needs to be corrected in the message.
* **[`processing.js`](processing.js):** Uses parsed message provided by `index.js` to determine which example from GitHub documentation should be returned. Once the example needed is determined, `processing.js` makes a call to `parseHub.js` to retrieve the example from GitHub documentation. The example retrieved is sent in a message to the Mattermost user. If the example is not able to be determined, a message is returned to the Mattermost user to indicate this.
* **[`thesaurus.js`](thesaurus.js):** `thesaurus.js` is called by `processing.js` when the action used in the Mattermost message does not match any of the following verbs: **`create`**, **`get`**, **`retrieve`**, **`update`**, **`edit`**, **`delete`**, or **`list`**. `thesaurus.js` makes an API call to Merriam-Webster's collegiate thesaurus to identify whether one of the verbs listed previously is a synonym for the word the Mattermost user used when calling GitEx. If so, it returns the verb that is matched from the previous list. If a synonym does not match a verb in the previous list, a message is returned to the user to try again using an action that matches a CRUD keyword.
* **[`parseHub.js`](parseHub.js):** Uses ParseHub API to utilize webscraping to find example requested by `processing.js`.
