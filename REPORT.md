# Report

## Problem GitEx Solved
  Chat services, like Mattermost or Slack, are used regularly by software engineers to collaborate during the software development lifecycle. Collaboration between software engineers in chat sometimes leads to updates needed in GitHub for a variety of reasons; such as, version control, issue management, documentation, etc. Prior to GitEx, GitHub users could choose to make updates to GitHub via the graphical user interface (GUI), which requires more clicking around than our second option - making the update to GitHub via their REST API, which requires searching through GitHub API documentation to find the necessary information if it's not memorized. While the GitHub API has the opportunity to be much more efficient than the GitHub GUI, it is impeded by the requirement of needing to review GitHub API documentation every time it's used unless the user has had significant practice that allowed them to memorize the needed endpoints and scripts.

  GitEx solves this issue by providing GitHub endpoints to Mattermost users for the features [pulls](https://docs.github.com/en/rest/pulls/pulls), [issues](https://docs.github.com/en/rest/issues/issues), and [repositories](https://docs.github.com/en/rest/repos/repos) on demand, overall reducing valuable time and increasing efficiency during the software development lifecycle. The bot goes further by being able to provide examples of shell commands or javascript code when requested; allowing users to effortlessly use the GitHub API in a command line interface (CLI). Another area GitEx solves for is the ability to present examples of successful response bodies, which is helpful for developers looking to use GitHub's API within an application and eliminates the need to tediously reference the API documentation throughout development.

## Primary Features
  The GitEx bot focuses on providing examples to the user for frequently used GitHub commands. For this project we centered our work around 3 API’s which are commonly used for software development: the Pulls, Repositories, and Issues API. A few key features of the GitEx bot include : 
<li>The ability to retrieve HTTP methods and API endpoints </li>
<li>The ability to retrieve Shell commands or javascript code </li>
<li>The ability to retrieve the Response status </li><br>
The screenshots below provide examples of the features of GitEx. The first screenshot provides various examples of GitEx returning http endpoints and javascript / shell commands:<br>

 ![2022-04-19 (2)](https://media.github.ncsu.edu/user/23443/files/fcd2d82d-d6b5-4835-ab65-ea9bef9c8ad3)

The second screenshot showcases a response status:

 ![2022-04-19 (3)](https://media.github.ncsu.edu/user/23443/files/14d7101d-8cb7-4ba8-b110-4589d2535c20)

  Another key feature we implemented was the ability for GitEx to recognize synonyms within commands. This allows users to type commands that mimic how they might naturally speak. This also allows for greater flexibility regarding the types of commands that can be recognized. For example, if a user doesn’t quite remember the exact word to use when searching for how to delete a repo they could substitute the word “delete” for any synonym. GitEx would respond by attempting to check for synonyms and if it finds a match will return the example. This helps to minimize frustration among users if they ask for an example that doesn’t quite match the static base command. GitEx will do its best to understand what the user is intending to ask for. The examples below demonstrate GitEx’s ability to recognize synonyms. Here 8 different synonyms for the word “delete” are shown, all of which are still recognized and return the same result:<br>
  
  ![2022-04-21](https://media.github.ncsu.edu/user/23443/files/6e1d034d-2013-4557-a182-43a729f87d0b)

## Reflections on Process
Our team had a very smooth development process overall. The only period of time that was a bit stressful was prior to the submission of the `DESIGN` milestone but that was mostly because we wrongly believed we needed to have the entire webscraper functionality working by then & didn't realize that the mock data was sufficient for that period of time. There were also a few hiccups early on as we needed to make pretty large modifications to our use cases during the preliminary stages of design. However, investing a good amount of effort in planning things out helped a great deal during the actual implementation that took place during the two sprints that followed as our team had a clear understanding of each of the components of our bot. This was useful when we needed to assist each other with certain tasks. For example, Alex was able to help Dibya with validation for the Merriam-Webster Dictionary API component & Soumya was able to help Kim in writing tests for the web scraper functionality.
 
Throughout the development process many of the techniques that our team incorporated into our practice served us tremendously overall. For instance, the daily scrum meetings helped us hold each other accountable for our work. It also allowed for reflection into what we had accomplished that day or updated the team as to what troubles any of us had. Even if our updates were small or if we didn’t have time to work on the project, touching base helped us all stay organized and strengthened our team's bond. Another invaluable development tool we utilized was peer programming. This experience was useful in sharing the workload as each team member got experience with writing code. It also aided us in debugging as well helped strengthen our collaboration and communication skills.

We utilized <a href="https://github.ncsu.edu/csc510-s2022/CSC510-17/projects?query=is%3Aclosed" target="_blank">multiple Kanban boards</a> for each sprint which helped us remember what tasks we needed to accomplish by each deadline. The Kanban board was a great way for us to visualize the progress our team had made. It also simplified splitting up tasks as we could assign others or even assign ourselves to a particular task. If one of us finished our work early we could then assign ourselves to something else. It also prevented us from stepping on anyones toes as we could see if a task was currently being worked on. Our team also made use of GitHub's ability for kanban boards to <a href="https://github.ncsu.edu/csc510-s2022/CSC510-17/issues?q=is%3Aissue+is%3Aclosed" target="_blank">link to issues</a>. Many of the issues that we created were also tasks on the board so when a task was finished the issue could be closed. This was a helpful reminder to not only continue creating issues but also helped us to know what issues to work on. The kanban board served as a very valuable tool that had many practical applications.

In terms of utilizing branches our team made sure to keep the main branch clean with only the most up-to-date code. We made a second dev branch for any work in progress task as taught in class. Using the dev branch we each made sub branches off of it whenever we started working on a new task. For instance when we started working on testing a test branch was created off of dev. Our team made sure to only merge a branch after the <a href="https://github.ncsu.edu/csc510-s2022/CSC510-17/pulls?q=is%3Apr+is%3Aclosed" target="_blank">PR review process</a>. When ever someone had changes to merge they created a PR request and we only merged after everyone on the team had a chance to look over it and approve. This was also a great place for teamates to give any feedback or last minute suggestions. Our team was cautious at first with making PR requests because we didn't want to merge any unfinished or broken code, but as the sprints continued we learned not to inlude too much in a single PR request and to break things up more as we work.

We believe the project in its entirety was structured very well as it took us through each major stage present in the development of a product with the five milestones we to complete over the course of the semester. We were able to learn about good scrum practices in lecture & given the chance to utilize them during the project by taking advantage of GitHub project boards, issue creation, PR approvals, daily standup meetings, etc. The lecture material did a good job at complementing the project materials which reinforced learning as we were able to put into action the topics we had just learned about. We also appreciated Dr. Ore providing reminders & pointing out things that we could be doing better as a team as the project progressed. For example, during the `PROCESS` milestone he left an issue that mentioned the need for more frequency & conversation around PRs which we incorporated moving forwards. Overall, our team did a great job with daily scheduled scrum meetings, which allowed us to assign issues to team members on an ongoing basis and led to us always moving these issues acros the Kanban board from 'Not Started' to 'In Progress' to Complete.'

## Limitations & Future Work
One limitation that our team faced when starting this project was finding an appropriate web scraping tool. Many popular tools required accounts and paid subscription services before we could use their products. As students working on a budget many options were not realistic for a semester long project. Another limitation associated with this was the fact that many free web scraping tools had limits to the number of calls that could be placed within certain time frames and per account. While this was a blocker at first we eventually found a free web scraping tool that worked well for this project. We utilized a service called ParseHub which has a free version that we were able to retrieve the necessary information from.
 
When designing GitEx we programmed in such a way that would easily allow for an extension of functionality. The team made sure to make use of good programming practices and refactored along the way to avoid code smells. In terms of the future, if our team were to continue developing this project other things we would work on include: 

<li>Expanding into other GitHub REST APIs - there were many APIs to choose from and for the scope of this project we limited ourselves to just 3 to ensure we could properly finish on time. Other APIs that we could include within GitEx include but are not limited to:  Commits, Branches, Activity, or Collaborators API.</li>
<li>Another future endeavor includes continuing to develop natural language processing. We could expand upon our use of the Merriam-Webster dictionary API and work on processing user requests that don’t follow a set format. This would include GitEx pulling the key request information directly from a string and determining what the action, feature, and optional choices are. This would involve investigating some type of machine learning or AI to understand user commands but would allow for a more personalized user experience. This would also reduce the learning curve associated with knowing the proper format of a GitEx command.</li>
 

## Link to Presentation Video
