# ASEAN BTE MERLION DISCORD BOT
Asean BTE Merlion Discord bot 

[![Build Status](https://app.travis-ci.com/ASEAN-Build-The-Earth/Merlion.svg?branch=main)](https://app.travis-ci.com/ASEAN-Build-The-Earth/Merlion)
[![Known Vulnerabilities](https://snyk.io/test/github/ASEAN-Build-The-Earth/Merlion/badge.svg)](https://snyk.io/test/github/ASEAN-Build-The-Earth/Merlion)
[![GitHub license](https://img.shields.io/github/license/ASEAN-Build-The-Earth/Merlion)](https://github.com/ASEAN-Build-The-Earth/Merlion/blob/main/LICENSE)


For Contributors please see [Our Code Of Conduct](https://github.com/ASEAN-Build-The-Earth/Merlion/blob/main/CODE_OF_CONDUCT.md) and [Our Contributing guide](https://github.com/ASEAN-Build-The-Earth/Merlion/blob/main/CONTRIBUTING.md)

> Authors: Association of Southeast Asian Nations Build The Earth
> 
> This discord bot was originally made for Asean build the earth. 
> Bot had many basic features such as. Getting covid data and getting info if a mc server is online or not

---

# Guide 

### How to install this project?
<details>
    <summary><i>Follow this steps</i></summary>
    
> 1. clone this repository to your pc/laptop
> 2. cd to the folder
> 3. run `npm ci`, then `npm start`.
</details>

### How to Config?
<details>
<summary><i>Follow this steps</i></summary>

<blockquote>
<!-- template: gist.github.com/ImminentFate/931bd780de7fb2aecc376e7af446c5df -->
<table><tbody><tr><td><sub><b>
 1. for this repos only, you'll need to create your discord bot to test out the code. (to create add new bot at <a href="https://discord.com/developers/applications">discord devs portal</a>)
    
</td></tr></tbody></table>
<table><tbody><tr><td><sub><b>
2. run <code>npm ci</code>, then <code>npm start</code>. to initialize project
     
</td></tr></tbody></table>
    
<table ><tbody ><tr><td><details ><summary><sub><b>3. see <a href="https://github.com/tintinkung/Merlion/blob/v1.2/.env.example.js">.env.example.js</a>, create a copy of it with the name `.env`. and convert to .env syntax and fill the data listed</b></sub><h6> .env.example.js </h6>

```javascript
const env = {
    // discord bot token 
    "TOKEN":"YOUR_BOT_TOKEN",
    
    // database auths
    "DB_USER":"USERNAME",
    "DB_PASS":"PASSWORD",
    "DB_NAME":"abase",
}
```
</summary><hr>
<h6>.env</h6>

 ```txt
# discord bot token 
TOKEN = tHIsiIexAMpLeDisCodEboT.TokEn
    
# database auths
DB_USER = Herbol
DB_PASS = iLovePizza
DB_NAME = MyDatabase
```
</details></td></tr></tbody>
</table>

<table><tbody><tr><td><sub><b>
4. invite the bot to your private discord server or whatever

</td></tr></tbody></table>
<table><tbody><tr><td><sub><b>
5. run the bot (by `node .` in the console)

</td></tr></tbody></table>
<table><tbody><tr><td><sub><b>
6. now you can try out your bot's code and do any edit you want!

</td></tr></tbody></table>
</blockquote>
</details>

### Requirements:
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
# Project Hierarchy
<table><tbody><tr><td><b><sub>
    
```py
 /home/me/my-bot
 ├─ 📁assets
 ├─ 📂commands
 │  └─ 📁category
 │     └─ my_command.js
 │
 ├─ 📂src
 │  ├─ 📁data
 │  ├─ 📁lib
 │  ├─ 📁listeners
 │  ├─ 📁preconditions
 │  └─ index.js
 │  
 ├─ 📂utility
 └─ 🔒package.json
```
</sub>
<h6>Project Hierarchy Overview,<br/>these folders shown should not be edited or moved</h6>
</td></tr></tbody></table>

### 📁assets
<blockquote><details>
  <summary>non-code storage folder</summary>

  _\<wip\>_
  </details></blockquote>
    
### 📁commands
<blockquote><details>
  <summary>discord interaction commands directory</summary>

  _\<wip\>_
  </details></blockquote>
  
<h3> 📁<code>src</code></h3>
<blockquote><details>
  <summary>directory of internal stuff</summary>

  _\<wip\>_
  </details></blockquote>
  
<h3> 📁<sub><code>src/</code></sub>data</h3>
<blockquote><details>
  <summary>non-code storage folder</summary>

  _\<wip\>_
  </details></blockquote>
  
<h3> 📁<sub><code>src/</code></sub>lib</h3>
<blockquote><details>
  <summary>utility library</summary>

  _\<wip\>_
  </details></blockquote>
  
<h3> 📁<sub><code>src/</code></sub>listeners</h3>
<blockquote><details>
  <summary>global interaction manager</summary>

  _\<wip\>_
  </details></blockquote>
  
<h3> 📁<sub><code>src/</code></sub>preconditions</h3>
<blockquote><details>
  <summary>command condition detector</summary>

  _\<wip\>_
  </details></blockquote>
  
### 📁utility
<blockquote><details>
  <summary>utility function/logic</summary>

  _\<wip\>_
  </details></blockquote>

---

## Our Social Medias

Join our discord! [here](https://discord.com/invite/tat2uggfeX)

See our Instragram [here](https://www.instagram.com/bte.asean/)

See our Youtube [here](https://www.youtube.com/channel/UCXgXXpOh3xyuNj7PRz_tDwQ)

---


<h2 align="center">
    <p>
        Q and A
    </p>
</h2>

### Who we are?
- Developer team of ASEAN BTE Discord
### What even is Asean BTE
- ASEAN BTE is team of Southeast Asian Countries thats part of the [Build The Earth project](https://www.youtube.com/c/BuildTheEarth)
### What is this
- We develop discord bot named Merlion here. This bot helps organize the discord server and such
### Why should I help
- We need help ;w;

### 🧑‍🤝‍🧑 Contributors 
<br>
<a href="https://github.com/ASEAN-Build-The-Earth/Merlion/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ASEAN-Build-The-Earth/Merlion" />
</a>

---

<h2 align="center">
    <p>
        Also dont forget to star this repo :> 🌟
    </p>
</h2>
