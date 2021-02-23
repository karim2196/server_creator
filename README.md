# Typescript Express.js Template

[![Dependency Status](https://david-dm.org/tuanlc/typescript-expressjs-template.svg)](https://david-dm.org/tuanlc/typescript-expressjs-template) [![Build Status](https://travis-ci.org/tuanlc/typescript-expressjs-template.svg?branch=master)](https://travis-ci.org/tuanlc/typescript-expressjs-template) 


The main purpose of this repository is to quickly create a template for Resful project which uses Typescript and Express.js framework.

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [Typescript] (https://www.typescriptlang.org/index.html#download-links)

# Getting started
```
cd <project_name>
npm install
```
- Build and run the project
```
npm run build
npm start
```

- Run in development mode

```
npm run dev
```

# To do list
* [ ] Talk with Marti before implementing the CLI tool. The main option that I have thought of is:
    1. the root folder could be a "templates" folder where every leaf is a whole new project (a express server,
    a microservice,etc.). Therefore, we would implement a whole CLI capable of creating different type of projects.
    Note that this implementation would have a lot of different thata between folders, such as different package.json,
    different config files, different docker files... could lead to chaos.
* [ ] Implement cli scripts (npm inquirer -> command line interface)
* [ ] Docker compose files 
* [ ] Dockerfile
* [ ] Deploy scripts

