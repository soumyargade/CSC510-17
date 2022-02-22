## Problem Statement
Software engineers often collaborate in a chat service such as Mattermost or Slack over the course of the software development life cycle. Some of the conversations that occur in these chats lead to changes required on GitHub to track action items and updates. For example, an engineer may inquire about whether a problem they ran into is a bug or a configuration issue. Another engineer may respond with “that looks like a bug, please create an issue on GitHub for it.” Our first engineer may then take the time to create the issue directly in GitHub, or search online for the correct API endpoint necessary to make the change as they cannot remember it off the top of their head. The problem is that having to resort to looking up examples for API endpoints whenever a case arises requiring action on GitHub can become quite cumbersome for developers to have to go through on a regular basis. It is important to resolve this problem as being able to make updates to GitHub as quickly & efficiently as possible would save time, an irreplaceable asset for developers and a costly expense for businesses.

## Bot Description
#### "Example Overflow: Never Wonder"
This bot would return Github REST API examples to Mattermost users when they state in a chat that a Github action needs to be performed. The bot will listen for certain keywords to determine whether the Mattermost user needs to create or manage a repository, pull request, or issue. In response, this bot will provide an example that consists of the HTTP method and a template for the API endpoint. This is a conversation bot that listens and responds to user messages, with an objective to automatically return examples when needed to make the software development life cycle more efficient.

A bot is a good solution to this problem as it will decrease the time required to perform necessary actions in Github identified by conversation. Rather than having to make changes directly in Github or having to remember what is needed for a REST API call, the bot can provide an example in seconds, which the user can use to quickly make changes to Github via the REST API. This bot eliminates the need for users to remember or research the HTTP methods and endpoints for what they would like to accomplish, saving an invaluable amount of time and energy.


### Use Cases
1. Retrieve examples related to GitHub's ["Pulls" API](https://docs.github.com/en/enterprise-server@3.3/rest/reference/pulls).
```
1.1 Preconditions
    User must be logged into their MatterMost account.
1.2 Main Flow
    This use case begins when a user states the need to perform an action related to creating or managing pull requests on GitHub [S1].
    This use case ends when the bot returns an example pertinent to the user’s initial request for information [S2].
1.3 Subflows
    [S1 Request Example] Request example [S2, E1, E2]. User submits a chat message with keywords including the term “pull request” along with an action verb such as “create”, “retrieve”, “update”, or “delete”.
    [S2 Return Example] Bot will return the HTTP method & API endpoint used by GitHub’s “Pulls” API for the action that has been stated by the user.
1.4 Alternative Flows
    [E1 Action Unspecified] Action verb such as “create”, “retrieve”, “update”, or “delete” was not specified. Bot prompts the user to provide an action verb.
    [E2 Path Unclear] Request keywords provided by the user could pertain to multiple API endpoints. Bot prompts the user to delineate between the potential endpoints in order to return the correct example.
```
2. Retrieve examples related to GitHub's ["Repositories" API](https://docs.github.com/en/enterprise-server@3.3/rest/reference/repos).
```
Insert Here.
```
3. Retrieve examples related to GitHub's ["Issues" API](https://docs.github.com/en/enterprise-server@3.3/rest/reference/issues).
```
Insert Here.
```

### Design Sketches

## Architecture Design
