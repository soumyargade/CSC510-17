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
### Bot Components Diagram
This diagram provides an overview of the main components of our GitEx Bot & their interactions with each other as well as the third party services that are being used (each of which is described in detail underneath the diagram). Within GitEx, there are listener, validator, processing, & scraping services (all described in more detail under our GitEx Sequence Diagram [Diagram 2] located further down in the [Relevant Additional Design Patterns](#additional-patterns) section).

<img src="https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/main/architectureDesign/botComponents.jpg" width=795 height=600>
[Diagram 1 - Gives an overview of the main components of the Bot and their interactions with each other.]

### Description of Components
The main components of our design are **GitEx Bot** & **Mattermost**:
* **GitEx Bot:** Conversation bot created to provide HTTP verbs and example REST API endpoints to use with the GitHub REST API in response to user requests within their Mattermost chat channel. GitEx will be comprised of four services (listener, validator, processing, & scraping), each of which is discussed in greater detail in the description that follows our sequence diagram near the end of this README.
* **Mattermost:** Open source chat solution primarily used for collaboration during the software development life cycle. Our GitEx bot will be embedded within Mattermost using the course provided website at https://chat.robotcodelab.com. The user will be able to interact with GitEx through Mattermost by addressing requests with the phrase "GitEx" at the beginning of their call.

The third party services our bot will use are **Merriam-Webster Dictionary API**, a **web scraper**, & **GitHub's API docs**:
* **Merriam-Webster Dictionary API:** A collection of dictionary and thesaurus content available for use by developers. The GitEx bot will communicate with the Merriam-Webster Dictionary API specifically for its thesaurus content to identify the correct HTTP verb based on the content of the Mattermost user’s message. This API will be useful in making sure we can properly respond to different types of requests made by users. For example, if a user enters a valid request but uses a synonym of an allowed verb, this API will make sure that the bot understands this and is still able to process their response regardless.
* **Web scraper tool:** Based on suggestions from Dr. Ore, we plan to initially hardcode our responses to ensure that the functionality of our bot is correct. However, after we are able to get that working, we plan to incorporate a web scraping tool to *dynamically* collect the API endpoint examples from Github.com. Web scraping will make our bot more extendable for future use.
* **GitHub API Docs:** After ensuring that our bot is functioning properly, we will add in web scraping tools which will rely on GitHub's API documentation (specifically documentation from their Pulls, Repositories, & Issues APIs) to retrieve the proper API endpoint examples the user has requested.

### Constraints & Guidelines
* **Account Necessary:** Users need to have a Mattermost account to access GitEx as we plan for it to be implemented within Mattermost.
* **Dictionary API Limitations:** Free as long as it is for non-commercial use, usage does not exceed 1000 queries per day per API key, and usage is limited to a maximum of two reference APIs.
* **Keyword Necessary:** Within Mattermost, users must state the keyword “GitEx” before any communication with the GitEx Bot can commence. The use of this keyword will be an indication that the user is wishing to make a request to GitEx Bot for an example.
* **English:** Conversation in Mattermost must be in English to communicate with GitEx. We plan to display an error message if a request is made in another language that GitEx is unable to process.
* **3 Key Requests:** A requested GitEx example from a Mattermost user must pertain to creating or managing a repository, issue, or pull request as GitEx will only have information on endpoints from GitHub's Repositories, Issues, & Pulls APIs.
#additional-patterns
### Relevant Additional Design Patterns
*  Behavioral Pattern 
    * Chain of Responsibility → way of passing request between a chain of objects.
    * This may be a relevant design pattern for our bot since we will be dealing with responses from the user that will need to be processed. The initial request will be processed through a series of functions before reaching an answer to respond to the user’s initial request.
    * A more detailed description of our planned functions will be provided in Diagram 2, which highlights the intended methods we plan on implementing and how the initial request will be processed to ultimately get an answer for the user.

* Sequence Diagram
<img src="https://github.ncsu.edu/csc510-s2022/CSC510-17/blob/main/architectureDesign/Seq_diagram.PNG">
[Diagram 2 - shows the sequence of function calls that will be made when a user asks the bot a question.]  
<br><br>
The flow of data begins with the Mattermost client. A user will send a phrase containing the phrase “gitex” and the GitHub API call that they are requesting an example for. The client passes this phrase to the Listener Service. This service listens for requests sent to the GitEx server, stores them in a queue, and sends them to the Validator Service one-by-one. The Validator Service performs initial validation of the phrase. If a phrase is invalid, for example if the phrase contains multiple CRUD operations or is missing a CRUD operation, the Validator Service will return false which will return an error to the Client. If the phrase is valid, the phrase gets sent to the Processing Service which acts as the central command unit of the application. It is responsible for parsing the phrase and returning the example of the API call to the Client. If the phrase does not contain a CRUD keyword (**C**reate, **R**ead, **U**pdate, **D**elete), the Processing Service calls the Merriam-Webster Dictionary API to check if one of the keywords the user entered is a synonym of one of the CRUD keywords. If it is, the processing service constructs the API search string which will be searched for within the Github REST API documentation. If no such keyword exists, an error will be sent to the client. The Scraping Service is responsible for scraping the Github REST API documentation for the search string that was requested. Once it finds the requested string, it returns an example API call back to the Processing Service which sends it to the Client (Mattermost).
