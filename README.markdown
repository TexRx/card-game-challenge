# Contents

## Prerequisites
* react + react addons (for className)
* JSX tranformer ( for client-side transforms during development)
* lodash (for helper methods)

## Getting Started

Once you clone the repo, navigate to the repo directory in your terminal and
type ```npm install```

```
> npm install
```

After this command completes, you will have all of the prerequisites installed,
and you will be ready to go.


## Folder Structure

### node_modules
Contains app dependencies
* react.js - the react library.
* JSXTransformer.js - translates the JSX syntax. Only included here for demo purposes. In production, JSX files should be compiled
* lodash.js - not necessary, but used to make some code tasks simpler


### src
The source folder contains all of the files that we've created for our react components


### index.html
A simple HTML file for bootstrapping our application.

## Important React Concepts

### Render
Each React component implements a render() method. This method takes in input data, and returns what to display, via the aforementioned render() method. Although it is not required, React has an optional XML-like syntax called JSX, which is used to write intermediate JavaScript according to the React idiom. React's JSX compiler turns your React code into vanilla JavaScript.


### this.props


### this.state
A component can maintain internal state data (accessed via this.state -- where ```this``` is a lexical reference to the defined component).

When a component's state data changes, the component's render() method is automatically invoked, causing an update to the rendered markup.

