# Contributing Guide 🤝
Hi!, thanks for reading this.

### Requirements :grey_question:
```java
node.js V16.8.0 or above
npm V7.21.0 or above
discord.js V13.0.0 or above
```
<details>
<summary><i>requirements guide</i></summary>
    
> - for node.js check by `nodejs -v` / `node -v`
> - for discord.js check by `npm list discord.js`
> - to download node v16, go [here](https://nodejs.org/en/download/current/)
> - if your node is up to date now, update discord.js
> - to install discord.js v13, go [here](https://discordjs.guide/additional-info/changes-in-v13.html#before-you-start)
</details>

---

### Issues :grey_question:

<details>
<summary><b>Create a new issue</b> (<i>click to expand</i>)</summary>
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If you spot a problem with the codes, [search if an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/ASEAN-Build-The-Earth/Merlion/issues/new/choose). Feature request, code-enhancing and other problem can me make as issue too!
</details>

<details>
<summary><b>Solve an issue</b> (<i>click to expand</i>)</summary>
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scan through our [existing issues](https://github.com/ASEAN-Build-The-Earth/Merlion/issues) to find one that interests you. You can narrow down the search using `labels` as filters. 
</details>

---

### Make Changes :grey_question:

<details>
<summary><b>Make changes locally</b> (<i>click to expand</i>)</summary>

  1. Fork the repository.
      - Using GitHub Desktop:
        - [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
        - Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!
      - Using the command line:
        - [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.
      - GitHub Codespaces:
      - [Fork, edit, and preview](https://docs.github.com/en/free-pro-team@latest/github/developing-online-with-codespaces/creating-a-codespace) using [GitHub Codespaces](https://github.com/features/codespaces) without having to install and run the project locally.

  2. Check our Requirements!, your project'll problably gets error if it aint match the requirement. scroll up to see requirements guide.

  3. Create a working branch and start with your changes!
</details>

  ---
  
### Commit your update :grey_question:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Commit the changes once you are happy with them.
<details><summary><b>Our Commit Template (Optional)</b></summary>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to make commit looks universal can be look to our commit template, we commit by typing commit prefixes and comment after. commit should be short but understandable.
  if the changes is very long, more info of commit can be put in the description

prefix | description
------------ | ---------
feat: | features added
fix: | bug fixed (link to issue/PR that said the bugs is appreciated)
edit: | file edited (we do appreciated if file edited is specified)
critical: | feature edited is  critical to the source file ex. index.js change
typo: | white space fix or typo
delete: | file deleted
added: | file added

  <blockquote><details><summary><b>example:</b></summary>

  ![commitTemplate_ex](https://user-images.githubusercontent.com/77855014/136971254-2f400403-84b4-4276-b392-053aa044d5e2.png)
  </blockquote></details>
</details>
  
---

### Pull Request :grey_question:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When you're finished with the changes to submit it to our source project(main), create a pull request, also known as a PR.
<details>
  <summary><b>Pull Requesting Guide</b></summary>
  
- Fill the pre template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request. 
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
Once you submit your PR, a Docs team member will review your proposal. We may ask questions or request for additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://lab.github.com/githubtraining/managing-merge-conflicts) to help you resolve merge conflicts and other issues.
</details>

---

### Your PR is merged :grey_exclamation:

Congratulations :tada::tada: The GitHub team thanks you :sparkles:. 

Once your PR is merged, your contributions will be publicly visible on this Github, for this repos your changes will be host on Merlion bot(`Merlion#0572`) at our discord server(might not update the bot too frequency). 

---

### Helps Section :grey_question:
<details>
  <summary><b>Q & A</b></summary>
  
#### Q what type of contribute do you accept
  we accept all type of contribute(for hacktoberfest, it gotta be pull request) even if its stupid or not.
  BUT we wont accept spam request and toxic PR.
#### Q help idk what to contribute here
  we are sorry we dont have that many issue to assign to all contributor rn. <br/>
  but some tip to contribute is to join our [discord](https://discord.gg/JZEyX4qHNT) server, see what is it about, think of what discord bot should do in here, and make new bot command out of it 
  
#### Q I'm not sure is it ok to do {this}
  you can create an issue to tell us what you are gonna do first, we'll hellp our best
 
</details>

<details>
  <summary><b>Recommended Work</b></summary>
  
  - **create new discord bot command**, *bot command can be everything. not limited to moderation stuff fun stuff will do too!*
  - **find bugs and issue**, *im sure theres many bugs and issue in this project but we havent found it yet.*
  - **review our code**, *our code isnt perfect. we'd like if you can review and make some improvement out of it.*
</details>

---

<h2 align="center">
    <p>
        Hey dont forget to star this repo :> 🌟
    </p>
</h2>
