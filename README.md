# Welcome to Sinking Ducks!

Dive into the lake and help our ducks (Quaxly & Psyduck) stay afloat amidst the tangles of seaweed from above and below, reminiscent of the classic Flappy Bird experience. 

Test your skills solo or team up in 2-Player mode, where points are doubled, but both ducks must survive. Best experienced on PC but mobile play is supported for 1-Player mode as well. For an extra challenge, take on dual control of both ducks in 2-Player mode.

## Screenshots

Mobile-friendly display with smaller font & narrower game box:

<img src="/assets/images/mobileIOS.png" width="600">

2-Player mode on PC:

![Screenshot of 2-Player mode on PC](/assets/images/twoplayer_onpc.png)

Game over with high score achieved:

![Screenshot of a game over with high score achieved](/assets/images/gameover_highscore.png)

## Technologies Used

JavaScript, CSS, HTML, GitHub

requestAnimationFrame to loop the game

Local storage for retrieving high score

## Getting Started

Game link: https://xsijin.github.io/Sinking-Ducks/

Help the duck(s) stay afloat and avoid all obstacles!

Select from available game modes (with corresponding instructions) to begin.

Click on "Reset Game" in order to play again.

## Your High Score

As the saying goes, your greatest competition is yourself! Your high score is saved and displayed for you to beat. However, if you wish to reset the high score, follow the steps below:
```
1. On Google Chrome browser, right-click on the game page.
2. Click on 'Inspect'
3. Click on 'Console'
4. Paste below code in without the single quotation marks(')
'localStorage.removeItem("highScore");'
5. Press 'Enter' on the keyboard
```

## Next Steps

- Enhance user optimization: option to use spacebar key (or any key of choice) to flap the duck's wings.
- Vary game difficulty: options for faster speed, more varied flapping styles, etc. Could be added in as booster items to be collected in-game as well.
- Bonus points: add coins collection for bonus points.
- User personalization: allow player(s) to choose their preferred duck avatar.

## Resources

- Duck images (Pokemon Quaxly & Psyduck) from: https://www.serebii.net/
- Colour palette from: https://coolors.co/
- Disable double-tap zoom on mobile (better playability): [Stack Overflow](https://stackoverflow.com/questions/10614481/disable-double-tap-zoom-option-in-browser-on-touch-devices)
- Utilizing localStorage: [Stack Overflow](https://stackoverflow.com/questions/63634765/making-a-high-score-best-time-localstorage-in-javascript)