## React Virtualized List

The goal of this exercise, is to render every word in the English language in a single, scrollable, performant list.

In our `App.tsx` file, there's a hook already written for `useDictionary()`. This hook will fetch the entire dictionary and return it in a nice array.

This dictionary has nearly 400K words in it, far too many elements to write to the DOM at once. In fact, it will almost certainly crash your web browser. For this reason, there's a component called `<SafelyRenderChildren/>`. This component will put an artificial limit on the amount of children you can render at once, to ensure that there's no chance of crashing the interview :)

### What is virtualization?

Virtualization in client-side development, deals with the concept of only rendering elements that are critical for providing a seamless user experience, and culling every element that is off the screen.

So instead of rendering 500K list items, we might start with only rendering 500 items, and then progressively adding/removing list items as the user scrolls.

The goal is to deliver a user experience that feels as seamless as possible.

### Goals

1. When loading the page, we should see a list that is filled with words, the scrollbar should be as long as the entirety of the dictionary, appearing as if every word is already present in the list.
2. Scrolling using the mousewheel should feel completely seamless. The elements should stay positioned correctly and not jump around as elements load/unload.
3. We should be able to drag the scrollbar to any position in the list and have the correct items be visible.

### Stretch Goals

1. Add a search box to the list.


### Parameters

- Each list item has a known height (30px)
- `<SafelyRenderChildren/>` limits the maximum list items to 2,500
- The amount of items you render at one time is completely up to you, and should be tuned for a balance of performance and usibility (we want no visual evidence of loading when mousewheel scrolling, and minimal evidence of loading when scrolling large distances at one time)
- There is an optional included `useScrollPosition` hook that you can use to quickly get the current scroll position.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
