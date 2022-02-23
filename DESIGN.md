## Problem Statement
Software engineers often collaborate in a chat service such as Mattermost or Slack over the course of the software development life cycle. Some of the conversations that occur in these chats lead to changes required on GitHub to track action items and updates. For example, an engineer may inquire about whether a problem they ran into is a bug or a configuration issue. Another engineer may respond with “that looks like a bug, please create an issue on GitHub for it.” Our first engineer may then take the time to create the issue directly in GitHub, or search online for the correct API endpoint necessary to make the change as they cannot remember it off the top of their head. The problem is that having to resort to looking up examples for API endpoints whenever a case arises requiring action on GitHub can become quite cumbersome for developers to have to go through on a regular basis. It is important to resolve this problem as being able to make updates to GitHub as quickly & efficiently as possible would save time, an irreplaceable asset for developers and a costly expense for businesses.

## Bot Description
#### "GitEx: Bringing GitHub to Your Fingertips"
Our bot will return GitHub REST API endpoint examples to Mattermost users when they state in a chat that they'd like to perform a certain action on GitHub. The bot will listen for specific keywords to determine if the user needs to create or manage a repository, pull request, or issue. In response, this bot will provide an example that consists of the HTTP method necessary in order for the user to perform the action as well as a template for the API endpoint. This is a conversation bot that listens and responds to messages from the user, with its objective being to automatically return examples of desired actions to increase efficiency of the software development lifecycle.

Our bot is a good solution to this problem as it will decrease the amount of time required to perform the necessary actions on GitHub identified by conversation. Rather than having to make corrections directly in GitHub or having to remember what parameters are needed for a REST API call, the bot can provide an example in seconds, which the user can utilize to quickly make changes to GitHub via the correct REST API call. This bot eliminates the need for programmers to memorize or research the HTTP methods and endpoints for what they would like to accomplish, saving an invaluable amount of time and energy in their development process.


### Use Cases
1. Retrieve examples related to GitHub's ["Pulls" API](https://docs.github.com/en/enterprise-server@3.3/rest/reference/pulls).
```
1.1 Preconditions
    User must be logged into their MatterMost account.
1.2 Main Flow
    This use case begins when a user states the need to perform an action related to creating or managing pull requests on GitHub [S1].
    This use case ends when the bot returns an example API call pertinent to the user’s initial request for information [S2].
1.3 Subflows
    [S1 Request Example] Request example [S2, E1, E2, E3]. User submits a chat message with the word "GitEx" as well as with keywords including the term “pull request” along with an action verb such as “create”, “retrieve”, “update”, or “delete”.
    [S2 Return Example] Bot will return the HTTP method & API endpoint used by GitHub’s “Pulls” API for the action that has been stated by the user.
1.4 Alternative Flows
    [E1 Action Unspecified] Action verb such as “create”, “retrieve”, “update”, or “delete” was not specified. Bot prompts the user to provide an action verb.
    [E2 Action or Path Unclear] Request keywords provided by the user could pertain to multiple API endpoints or HTTP verbs. Bot prompts the user to delineate between the potential endpoints or verbs in order to return the correct example.
    [E3 Message Not Understood] The message submitted by the user includes “GitEx” but a keyword was not found to determine if the request is to create or manage a pull request.
```
2. Retrieve examples related to GitHub's ["Repositories" API](https://docs.github.com/en/enterprise-server@3.3/rest/reference/repos).
```
2.1 Preconditions
    User must be logged into their Mattermost account.
2.2 Main Flow
    This use case begins when a user states the need to perform an action related to creating or managing a repository on GitHub [S1].
    This use case ends when the bot returns an example API call pertinent to the user’s initial request for information [S2].
2.3 Subflows
    [S1 Request Example] Request example [S2, E1, E2, E3]. User submits a chat message with the word “GitEx” as well as with keywords such as “repo,” “repository,” or “repositories” and action keywords such as “create”, “retrieve”, “update”, or “delete”.
    [S2 Return Example] Bot will return the HTTP method & API endpoint used by GitHub’s “Repositories” API for the action that has been stated by the user.
2.4 Alternative Flows
    [E1 Action Unspecified] Action verb such as “create”, “retrieve”, “update”, or “delete” was not specified. Bot prompts the user to provide an action verb.
    [E2 Action or Path Unclear] Request keywords provided by the user could pertain to multiple API endpoints or HTTP verbs. Bot prompts the user to delineate between the potential endpoints or verbs in order to return the correct example.
    [E3 Message Not Understood] The message submitted by the user includes “GitEx” but a keyword was not found to determine if the request is to create or manage a repository.
```
3. Retrieve examples related to GitHub's ["Issues" API](https://docs.github.com/en/enterprise-server@3.3/rest/reference/issues).
```
3.1 Preconditions
    User must be logged into their Mattermost account.
3.2 Main Flow
    This use case begins when a user states the need to perform an action related to creating or managing an issue on GitHub [S1].
    This use case ends when the bot returns an example API call pertinent to the user’s initial request for information [S2].
3.3 Subflows
    [S1 Request Example] Request example [S2, E1, E2, E3]. User submits a chat message with the word “GitEx” as well as with keywords including the term "issue(s)" and action keywords such as “create”, “retrieve”, “update”, or “delete”.
    [S2 Return Example] Bot will return the HTTP method & API endpoint used by GitHub’s “Issues” API for the action that has been stated by the user.
3.4 Alternative Flows
    [E1 Action Unspecified] Action verb such as “create”, “retrieve”, “update”, or “delete” was not specified. Bot prompts the user to provide an action verb.
    [E2 Action or Path Unclear] Request keywords provided by the user could pertain to multiple API endpoints or HTTP verbs. Bot prompts the user to delineate between the potential endpoints or verbs in order to return the correct example.
    [E3 Message Not Understood] The message submitted by the user includes “GitEx” but a keyword was not found to determine if the request is to create or manage an issue.
```

### Wireframes
<img src="https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/main/designSketches/wireframeM1.png">
<img src="https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/main/designSketches/wireframeE1.png">
<img src="https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/main/designSketches/wireframeE2.png">
<img src="https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/main/designSketches/wireframeE3.png">

### Storyboard

## Architecture Design
