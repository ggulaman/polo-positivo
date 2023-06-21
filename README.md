## How to Deploy this App Locally
### Requirements
The following resources must be installed:
- GIT: follow the instructions on [GIT download site](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
- Node: download the latest stable version from [Node download site](https://nodejs.org/en/download).
- Yarn: after installing Node, open a terminal and run the following command:
  ```
  ~$ npm install -g yarn
  ```
### Get the latest version
Open a terminal and clone this repo:
```
~$ git clone https://github.com/ggulaman/polo-positivo 
```

### Install the App packages:
Go to `polo-positivo` folder:
```
~$ cd polo-positivo 
```
Install all the required packages:
```
~/polo-positivo$ cd yarn install 
```

### Run the app on a local server:
To run it locally, execute:
```
~$ yarn start
```
After getting a successful message on the terminal, the app will be accessible from a browser on http://localhost:3000 .
