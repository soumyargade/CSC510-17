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
**M1**: Example of S1, S2 for Use Case 1 where user activates bot by callling out "GitEx" & then specifies action word "creating" and key phrase "pull request" so GitEx is able to return the proper HTTP verb and API endpoint.

<img src="https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/main/designSketches/wireframeM1.png">

**E1**: Example of E1 for Use Case 3 where user activates bot by calling out "GitEx" but then fails to specify an action verb that the bot can tie with an HTTP verb for a REST API endpoint example. Thus, the bot prompts the user for this additional info before being able to process the request in accordance with S2.

<img src="https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/main/designSketches/wireframeE1.png">

**E2**: Example of E2 for Use Case 2 where user activates bot by calling out "GitEx" but submits request keywords that could pertain to multiple API endpoints (ex. he could be asking to retrieve info on teams in a repository or tags in a repository, etc). Thus, the bot prompts the user for this additional info before being able to process the request in accordance with S2.

<img src="https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/main/designSketches/wireframeE2.png">

**E3**: Example of E3 for Use Case 1 where user activates bot by calling out "GitEx" but doesn't include any keywords that would allow the bot to figure out if he is trying to access an endpoint in GitHub's Pull, Repositories, or Issues API. Thus, the the bot prompts the user for this additional info before being able to process the request in accordance with S2.

<img src="https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/main/designSketches/wireframeE3.png">

### Storyboard
![Story Board](https://media.github.ncsu.edu/user/23443/files/23aa675e-c479-4934-8739-8fe38860db94)

## Architecture Design
#### 1. Diagram
![ComponentsDiagram](https://media.github.ncsu.edu/user/23472/files/434a7bed-6131-4fdf-a173-0f40c73a1d71)  
[Diagram 1 - Gives an overview of the main components of the Bot and their interactions with each other]  
Inside gitex: Notification service, keyword processing service (utilizing synonym api)

#### 2. Components
**The main components of our bot will be as follows:**  
* **GitEx Bot:** Conversation bot created to provide HTTP verbs and sample endpoints to use with the Github REST API in response to user requests.  
* **Mattermost:** Chat service primarily used for collaboration during the software development life cycle. The GitEx bot will be embedded within Mattermost.

**3rd Party services that our bot may use are as follows:**  
* **Merriam-Webster Dictionary API:** A collection of dictionary and thesaurus content available for use by developers. The GitEx bot will communicate with the Merriam-Webster Dictionary API specifically for its thesaurus content to identify the correct HTTP verb based on the content of the Mattermost user’s message. This API will be useful in making sure we can properly respond to different types of requests made by users. For example, if a user enters a valid request but uses a synonym of an allowed verb, this API will make sure that the bot understands this and still process their response regardless.  
* **Web scraper tool:** Based on suggestions from Dr. Ore we plan to initially hardcode our responses. We will do this to ensure that the functionality of our bot is correct. Afterwards we will work on adding a web scraping tool to dynamically collect the API responses from Github.com. Web scraping will make our bot more extendable for future use.  
* **GitHub Documentation:** After ensuring that our bot is functioning properly we will add in web scraping tools which will rely on GitHub documentation to retrieve the proper API response the user has requested.

#### 3. Constraints and/or Guidelines
* **Account necessary:** Users will need to have an account with MatterMost in order to access our Bot as we plan to embed GitEx within MatterMost.  
* **Limitations for Dictionary API:** free as long as it is for non-commercial use, usage does not exceed 1000 queries per day per API key, and use is limited to two reference APIs.  
* **Keyword necessary:** Within Mattermost chat, users must state the keyword “gitex” before any communication with the GitEx bot. This will be an indication that the user is wishing to make a request for an example.  
* **English:** Conversation in Mattermost must be in English to communicate with the GitEx bot. An error message will be displayed if a request is made in another language.  
* **3 key requests:** A requested GitEx example from a Mattermost user must pertain to creating or managing a repository, issue, or pull request. 

#### 4. Relevant Additional Design Patterns

