<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [A Practical Start with React](#a-practical-start-with-react)
  - [Should You React?](#should-you-react)
    - [Smart DOM Updates](#smart-dom-updates)
    - [The React Element Tree](#the-react-element-tree)
    - [Separation of Concerns](#separation-of-concerns)
    - [Tree Reconciliation](#tree-reconciliation)
    - [JSX](#jsx)
    - [The React UI Workflow](#the-react-ui-workflow)
    - [Components](#components)
    - [Alternatives to React](#alternatives-to-react)
  - [Getting Ready](#getting-ready)
    - [Production Mode](#production-mode)
    - [VS Code](#vs-code)
  - [Structuring the Application](#structuring-the-application)
    - [The Public Folder](#the-public-folder)
    - [The src Folder](#the-src-folder)
    - [React's Entry Point](#reacts-entry-point)
    - [Modules](#modules)
    - [The Top-level Component](#the-top-level-component)
    - [Importing External Modules](#importing-external-modules)
    - [Placing Components in Folders](#placing-components-in-folders)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# A Practical Start with React

> My notes from [this Pluralsight course](https://app.pluralsight.com/library/courses/react-practical-start/table-of-contents).

## Should You React?

### Smart DOM Updates

[Markup](smart-dom-updates/index.html) | [Script](smart-dom-updates/script.js)

Comparing plain js and react for updating DOM.

The react method of creating a DOM element and rendering it looks more complicated than the plain js version, however, notice the DOM updates - plain js version is updating the entire div whereas react version only updates what's changing (the date in this example), even though the code tells react to update the entire div. This makes it impossible to type in text in the plain version, but can do in react:

![dom update html](doc-images/dom-update-html.png "dom update html")

![dom update](doc-images/dom-update.png "dom update")

### The React Element Tree

React does not use HTML directly, rather it uses a tree of JavaScript objects to define UI, where each is created via `React.createElement`:

```html
<div class="split">
  <input />
  <p>Sunday 4:00pm</p>
</div>
```

```javascript
Rreact.createElement(
  'div',
  { className: 'split' },
  React.createElement('input'),
  React.createElement(
    'p',
    null,
    'Sunday 4:00pm'
  )
);
```

The tree is used to create HTML for browser. This means UI is written in js instead of html...

### Separation of Concerns

react-dom library (containing everything needed for browser support, including object tree transformation) is intentionally separate from core react engine. Benefit is open ended, eg: react-native renders an object tree to mobile controls for different mobile platforms.

Object tree is not the UI, it's instructions for how UI should be rendered. React passes tree to DOM library for rendering.

Philosophy: What's displayed in the browser is a reflection of the state of the application.

### Tree Reconciliation

In simple demo, object tree changes every second due to date change, eg:

```javascript
React.createElement(
  'div',
  { className: 'split' },
  React.createElement('input'),
  React.createElement(
    'p',
    null,
    'Sunday 4:01pm' // only this changed
  )
);
```

Every time a change occurs, a new object tree is created, but old one is kept. React compares the new to old object trees and only redraws elements where a change was detected. In above example, its the `<p>` element containing the date string. Then the old tree is disposed of.

However, creating every DOM element with `createElement` API is tedious, this is where JSX comes in.

### JSX

Seems like HTML but is actually js. Notice `className` instead of `class` for css:

```jsx
<div className="split">
  <input />
  <p>
    Sunday 4:01 pm
  </p>
</div>
```

JSX syntax is translated to `React.createElement(...)` syntax by Babel.

### The React UI Workflow

- Write JSX to define UI
- JSX translated to JS with React.createElement statements using Babel
- Each time app needs to be renderd to browser, react-dom uses react elements to generate actual DOM, but only updated elements are rendered.

![react ui workflow](doc-images/react-ui-workflow.png "react ui workflow")

### Components

Philosophy: React is a JavaScript library to create and compose components.

Each component has the following:

1. A name.
1. Accepts inputs from other components using `props`. In jsx, these are written as html attributes.
1. Can maintain an internal `state`.
1. Knows how to render itself by calling `render()` function. This process may involve other components.

App will be building in this course - note components such as header, search, featured house:

![final app](doc-images/final-app.png "final app")

**Composition**

React app is a composition of components. Typically top level component is named `app`. App renders other components, eg: Header, FeaturedHouse, SearchResults. Each component can further render other components, eg: FeaturedHouse will render HouseDetail.

![composition](doc-images/composition.png "composition")

Each component maintains its own internal state, and can pass input to its child components using `props`.

### Alternatives to React

Angular and Vue are most popular other choices. All are good products, choice depends on personal preference or that of your team.

If don't like the fact that UI is written in JS, and prefer to write in separate html file, consider Angular.

![comparison table](doc-images/comparison-table.png "comparison table")

Note: Writing HTML in JS may feel strange at first, but Angular and Vue write JS expressions in HTML which is also weird, and more difficult to debug.

## Getting Ready

Will be using [create-react-app](https://github.com/facebook/create-react-app) for scaffolding.

- Install latest LTS Node
- `npx create-react-app globomantics`, output:

```shell
Success! Created globomantics at /path/to/globomantics
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!
```

- `cd globomantics`
- `BROWSER="Firefox Developer Edition" npm start` (or just `npm start` to use default Chrome)

create-react-app installs tools needed for development. Especially important:

- webpack: smart bundler to package components that are in modules within the app
- babel: transpiles jsx into javascript, also transpiles ES2015+ to ES5

### Production Mode

`npm run build` generates an optimized build in `build` dir.

### VS Code

Good support for React. Install a few extensions:

- Debugger for Chrome
- Simple React Snippets

Use View -> Integrated Terminal, then can run `npm start` from within VS Code terminal rather than switching to a separate terminal app.

To setup debugging:
- Click debug button in sidebar
- Click run icon (green caret)
- Select `Chrome` environment
- Opens `launch.json` - config file for vs code
- Change port from `8080` to `3000` (port used by create-react-app dev server) and save
- Click run icon again, this time, a separate instance of Chrome is launched
- Open App.js and set a breakpoint in render function
- Refresh browser (Chrome instance launched by VS Code)
- This will hit breakpoint
- Can also set breakpoints on JSX lines such as `<header...>`
- Press stop button from debug controls -> didn't work for me, browser went away
- Make some change to App.js such as changing a text value -> browser will update to reflect the change -> didn't work for me, browser went away

Can also turn on File -> Autosave in VS Code to avoid having to manually save file changes.

Also install [React dev tools for chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related)

New React tab in dev tools shows JSX, can click on components to inspect props and state of component.

## Structuring the Application

### The Public Folder

Files in `public` dir are NOT processed by Webpack, they are just copied there untouched such as favicon.ico and manifest.json.

[public/index.html](public/index.html) is a template. It has `%PUBLIC_URL%` which is replaced with public url when build is run.

`index.html` can only reference files in public folder. Notice there are no js files referenced.

### The src Folder

This contains js and css files, and also logo.svg. All files in `src` dir are processed by Webpack.

When running `npm start`, it adds script reference to `bundle.js` in index.html.

All files in `src` folder are bundled in `bundle.js`. Contains all JSX syntax translated to JavaScript. Also all styles from .css files in src folder are incorporated in the bundle.

### React's Entry Point

[index.js](src/index.js) in src root folder is the entrypoint. All other files could be renamed or deleted but index.js and index.html are required.

Most files in src folder are modules. Normally a module can only import another module but Babel supports also importing css into a moudle.

`index.js`:

```javascript
// import react engine - no ./ prefix means webpack will look in node_modules for this module
import React from 'react';
// import react dom support
import ReactDOM from 'react-dom';
// we can also import css
import './index.css';
// import a custom module - file extension is ommitted, ./ means search local file system in src folder
import App from './App';

// react entrypoint
// first argument to render specifies top level component of App - note this is jsx syntax
// second argument is html element where component should be rendered into (this element must exist in index.html)
ReactDOM.render(<App />, document.getElementById('root'));
```

### Modules

To make a js file a module, need to `export` something from it, eg:

```javascript
// module.js
class component {
  doSomething() {
    // ...
  }
}
export component;
```

Now another module can import it:

```javascript
// anotherModule.js
import {component} from './module';
component.doSomething();
```

Can export multiple members (classes, functions, variables) by separating with commas `export something, somethingElse`.

Importing module must request what it wants by name, using braces `{thingToBeImported}`.

Exporting module can also export one `default`, eg: `export default component;`. Then importing module does not need braces `import comp from './module';`. Note in this case the importing module can name it anything it wants, eg `comp` instead of `component`.

Can combine default and others:

```javascript
// module.js
class component {
  doSomething() {
    // ...
  }
}
const x = 10;
export default component, x;
```

```javascript
// anotherModule.js
import comp, {x} from './module';
comp.doSomething();
console.log(x); // 10
```

### The Top-level Component

Entrypoint [index.js](globomantics/src/index.js) renders a component named `App` via `ReactDOM.render(<App />, document.getElementById('root'));`. App is the top level (i.e. root) component. The import statement `import App from './App`;` indicates it comes from local filesystem because path starts with `.`, and it's a default export because no curly braces.

[App](globomantics/src/App.js) extends React Component. Each component must have a `render` function, which usually returns jsx. Note the `img` jsx:

```javascript
import logo from './logo.svg';
...
<img src={logo} className="App-logo" alt="logo" />
```

`src` is a prop - something component receives as an arument. Being enclosed in curly braces in jsx makes it an *expression*. Webpack will replace this with actual location of logo.

Also note braces around jsx:

```javascript
return (
  <div classname="App">
    ...
  </div>
);
```

Because jsx gets converted to javascript, if there was nothing on the line, js would assume forgot semicolon if there was nothing after return keyword, and add it at end of line, and everything else after return would be ignored.

### Importing External Modules

Will be adding Bootstsrap to project for positioning items with its grid system and using some of its built-in css classes. Install it:

```shell
npm install bootstrap@4 --save
```

Then import it in [index.js](globomantics/src/index.js), which makes it available to *all* child components:

```javascript
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
```

### Placing Components in Folders

Restructure files to be clear what's used for the main page and what's needed for root level:

- Create `main-page` folder under `src` and move `App.css`, `App.js` and `logo.svg` to it.
- Rename `App.js` to `index.js`.
- Change import path on `src/index.js` from `import App from './App';` to `import App from './main-page';` (this is the folder, but Webpack will understand it should load index.js from main-page folder).
- Rename `App.css` to `main-page.css` for clarity and update import in `src/main-page/index.js`.

