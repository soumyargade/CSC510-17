<h2><b> General Instructions for running GitEx:</b></h2>
Start by opening up your Mattermost account and navigating to the channel “Team-17”. 

<img width="630" alt="Screen Shot 2022-04-13 at 8 34 29 PM" src="https://media.github.ncsu.edu/user/23443/files/ec9319ed-65bd-4ee0-a99e-2c1e3170cc3a">

From here you can begin communication with the bot. The GitEx bot works by formatting a string with the content you would like an example for. In order to communicate with the bot you type your desired example into the chat. 

<img width="630" alt="Screen Shot 2022-04-13 at 8 35 10 PM" src="https://media.github.ncsu.edu/user/23443/files/feb0b460-a7e1-4993-9c47-3ede7abb0247">

All strings are formatted in the following manner:

`gitex [action] [feature] [optional]`

All requests must start with the word “gitex” followed by any combination of valid action, feature, or optional words.<br> (Note: <b>case does matter</b>, “Gitex”, “GitEx”, “gitEx” will not be recognized)
Example of valid choices:

`gitex [create / get / list / update / edit / delete / retrieve] [pull[s] / repo[s] / issue[s]] [javascript / js / shell / response]`

(Note: <b>case does not matter</b> for the action, feature, or optional words. For Ex: “Javascript”, “javascript”, “JS”, “js” would all be recognized)

<h2> <b>Instructions for running use case tests: </b> </h2>

The checklists below provide a helpful guide of code snippets you can copy and paste to test each use case. The “Input” column contains lines of code that can be copied and pasted directly into the chat on Mattermost. The “Expected Output” contains what our Bot should respond with. The “Actual Output” column can be used to note if the Bot returns something that differs from the expected output. The last column can be used to note if the test overall passes or fails.

<b> UC1 Tests - Retrieve HTTP method and API endpoint </b>
| Input   | Expected Output  |  Actual Output  | ✅/  🆇
| ------------- | ------------  |  ------------ | ------------- |
`gitex get repo` | get /repos/{owner}/{repo} | get /repos/{owner}/{repo} |
`gitex get repository` | get /repos/{owner}/{repo} | get /repos/{owner}/{repo} |
`gitex create repo` | post /orgs/{org}/repos | post /orgs/{org}/repos |
`gitex update repo` | get /orgs/{org}/repos | get /orgs/{org}/repos |
`gitex list repo` | patch /repos/{owner}/{repo} | patch /repos/{owner}/{repo} |
`gitex create ewqew` | Invalid feature. Please select one of the following features: Pulls, Repos, Issues | Invalid feature. Please select one of the following features: Pulls, Repos, Issues |
`gitex throw issue` | Invalid action entered. Please make sure it maps to a CRUD keyword. | Invalid action entered. Please make sure it maps to a CRUD keyword. |

<b> UC2 Tests - Retrieve Shell command or JavaScript code </b> <br>
The following commands can be used to test UC2.
The first few tests check the Javascript response. The next set of tests check Shell response. 
The remaining tests should return error messages. Key points to verify for this use case are that Gitex should recognize that “js” and “javascript” are equivalent. It is also important to verify that Gitex only responds to properly formatted requests. Gitex shouldn’t respond to invalid actions and features even if a “javascript” or “shell” option is included.

| Input   | Expected Output  |  Actual Output  | ✅/  🆇
| ------------- | ------------  |  ------------ | ------------- |
`gitex get repo js` <br> or <br> `gitex get repo javascript` | await octokit.request('GET /repos/{owner}/{repo}', { owner: 'octocat', repo: 'hello-world' }) | await octokit.request('GET /repos/{owner}/{repo}', { owner: 'octocat', repo: 'hello-world' }) |
`gitex create repo js` <br> or <br> `gitex create repo javascript` | await octokit.request('POST /orgs/{org}/repos', { org: 'org', name: 'name' }) | await octokit.request('POST /orgs/{org}/repos', { org: 'org', name: 'name' }) |
`gitex get repo shell` | curl \ -H "Accept: application/vnd.github.v3+json" \ https://api.github.com/repos/octocat/hello-world | curl \ -H "Accept: application/vnd.github.v3+json" \ https://api.github.com/repos/octocat/hello-world |
`gitex get something js` <br> or <br> `gitex get something javascript` | Invalid feature. Please select one of the following features: Pulls, Repos, Issues | Invalid feature. Please select one of the following features: Pulls, Repos, Issues |
`gitex get something shell` | Invalid feature. Please select one of the following features: Pulls, Repos, Issues | Invalid feature. Please select one of the following features: Pulls, Repos, Issues |
`gitex something something js` <br> or <br> `gitex something something javascript` | Invalid action entered. Please make sure it maps to a CRUD keyword. | Invalid action entered. Please make sure it maps to a CRUD keyword. |
`gitex something something shell`| Invalid action entered. Please make sure it maps to a CRUD keyword. | Invalid action entered. Please make sure it maps to a CRUD keyword. |

<b> UC3 Tests - Retrieve Response status and body </b>
| Input   | Expected Output  |  Actual Output  | ✅/  🆇
| ------------- | ------------  |  ------------ | ------------- |
