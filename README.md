# Pictionary Game

Made with React, Node, Express, Socket.io

To install dependencies:

```
npm install
```

To run developer mode:

```
npm start
```

## Game Rules:

- Join one of two game rooms, you must make a username to enter.
- When there are two or more players, pressing 'Start Game' button begins game.
- Game chooses drawer at random. Drawer can choose Easy, Medium, or Hard word.
- Drawer then has 10 seconds to become familiar with word.
- Guessers have two minutes to guess the word based on what is drawn on white board.
- Drawer can click on chat messages that are close to the answer. That message will change color
  indicating to everyone it is close.
- Round ends when two minutes are up, or drawer clicks 'End Round' button.
- Drawer can pick who gets the round point, or no one if timer ran out.
