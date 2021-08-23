# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# **React Spider Solitaire**

Spider Solitaire game built in React.

# [Live Demo](https://react-spider-solitaire-myrepo.herokuapp.com/)

# One Suit Spider Solitaire

![One Suit](https://raw.githubusercontent.com/gokberkotlu/reversed-spider-solitaire/main/public/one-suite.png "One Suit")


**Spider Solitaire**  

The game is played with two packs of playing cards. After thoroughly shuffling both decks together, 4 rows of 10 face down cards are dealt to form the tableau columns. 4 more cards are dealt face down to the 4 leftmost columns and then a face up card is dealt to the end of each column. The remaining cards are placed face down to form the stock.

**Objective**  

The object of the game is to build cards of ascending suit sequence from Ace to King within the tableau columns. When such a sequence has been formed, it is automatically removed to one of the 8 foundations. When all 104 cards have been played to the foundations as eight separate Ace to King sequences then the game is won.


**Rules**  

 - The top cards of tableau piles are available to play.
 - You may build tableau piles down , ending at the King.
 - You cannot build a King on an Ace.
 - One card or group of cards in sequence downwards may be moved from pile to pile.
 - When any tableaus are empty you can fill the space with any card.
 - When you have made all the moves initially available, click on the stock pile to deal one card onto each tableau pile.
 - Game starts with 500 points.
 - Every 10 seconds, player loses 2 points.
 - Player loses 1 point for every move he/she makes.
 - Player loses 1 point for each undo.
 - Player earns 100 points for each Ace to King ascending suit sequence cards he/she build.

## How to Play:

- **_Drag and Drop_**: Drag and Drop the card or set of cards to desired location

![Drag and Drop"](https://raw.githubusercontent.com/gokberkotlu/reversed-spider-solitaire/main/public/drag%20and%20drop.gif "Drag and Drop")

## Finish Screen

![Drag and Drop"](https://raw.githubusercontent.com/gokberkotlu/reversed-spider-solitaire/main/public/ending.gif "Finish Screen")