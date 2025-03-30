# Bloggies

## Description

We have built a CRM model based blogging website where users can upload blogs, edit them and like.This site uses [React](https://react.dev/) for frontend. 

- The motivation behind our project was to create a dynamic and engaging platform for users to access and interact with high-quality blog content. We wanted to provide a space where users could easily discover, consume, and engage with content on topics of interest to them, while also fostering a sense of community and interaction among users.

-  Our goal was to create a platform where users could easily discover, consume, and engage with high-quality blog content on topics of interest to them.

<img src="./frontend/public/screen.png" />

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

Change the JWT_SECRET to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.

## License

The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

---

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="35" alt="react logo"  />
  <img width="15" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="35" alt="javascript logo"  />
  <img width="15" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" height="35" alt="figma logo"  />
  <img width="15" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="35" alt="html5 logo"  />
  <img width="15" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="35" alt="css3 logo"  />
  <img width="15" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" height="35" alt="firebase logo"  />
  <img width="15" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="35" alt="vscode logo"  />
  <img width="15" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="35" alt="mongodb logo"  />
  <img width="15" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="35" alt="nodejs logo"  />
  <img width="15" />
  <img src="https://cdn.sanity.io/images/bj34pdbp/migration/9f64bd2c0bc7662e57c0179621069f44a8185011-1608x656.jpg?w=3840&q=100&fit=clip&auto=format" height="35" alt="replit logo"  />
  <img width="15" />
  <img width="15" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg" height="35" alt="tailwindcss logo"  />
  <img width="15" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="35" alt="git logo"  />
  <img width="15" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="35" alt="github logo"  />
</div>

## Features

- Integrating login options from Gmail streamlines the registration process for users, reducing friction and increasing the likelihood of user adoption.

- The filtering feature allows users to customize their content preferences, enhancing their overall experience by delivering relevant content tailored to their interests.

-  We are adding a text to speech functionality in out website for the user. Some users prefer listening to content rather than reading it, especially when they're multitasking or on the go.


## How to Contribute

If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.

## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them here.


# Easy_Type
