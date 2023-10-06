# Welcome to Sinking Ducks!

Dive into the lake and help our ducks (Quaxly & Psyduck) stay afloat amidst the tangles of seaweed from above and below, reminiscent of the classic Flappy Bird experience. 

Test your skills solo or team up in 2-Player mode, where points are doubled, but both ducks must survive. Best experienced on PC but mobile play is supported for 1-Player mode as well. For an extra challenge, take on dual control of both ducks in 2-Player mode.

:duck: Have fun! :duck:

## Screenshots

Mobile-friendly display with smaller font & narrower game box:

<img src="/assets/images/mobileIOS.png" width="600">

- - - -

2-Player mode on PC:

![Screenshot of 2-Player mode on PC](/assets/images/twoplayer_onpc.png "Screenshot of 2-Player mode on PC")
- - - -
Game over with high score achieved:

![Screenshot of a game over with high score achieved](/assets/images/gameover_highscore.png "Screenshot of a game over with high score achieved")

## Technologies Used

JavaScript, CSS, HTML, GitHub

requestAnimationFrame to loop the game

localStorage to retrieve high score

## Getting Started

Game link: https://xsijin.github.io/Sinking-Ducks/

Help the duck(s) stay afloat and avoid all obstacles!

Select from available game modes (with corresponding instructions) to begin.

Mobile Player | Player 1 | Player 2
| :---: | :---: | :---:
Tap on the screen to flap your wings; Left-click on the mouse to flap your wings.  | Press "W" on the keyboard to flap your wings. | Press "Up Arrow" on the keyboard to flap your wings.
<img src="/assets/images/p1.png" width="28">  | <img src="/assets/images/p1.png" width="28"> | <img src="/assets/images/p2.png">

Click on "Reset Game" to restart the game. Game mode can be reselected upon restart.

[Presentation deck](https://docs.google.com/presentation/d/1eDLX1H5AnUJsffW_WhMXYnyJ19-zv8V0m_Gsfsy8WB4/edit?usp=sharing)

## Your High Score

As the saying goes, your greatest competition is yourself! Your high score is saved and displayed for you to beat.

<details>

<summary>However, if you wish to reset the high score, follow the steps below:</summary>

1. On Google Chrome browser, right-click on the game page.

2. Click on 'Inspect'

3. Click on 'Console'

4. Paste below code in:

```ruby
localStorage.removeItem("highScore");
```

5. Press <kbd>Enter</kbd> on the keyboard

</details>

## Next Steps

- [ ] Enhance user optimization: option to use spacebar key (or any key of choice) to flap the duck's wings.
- [ ] Vary game difficulty: options for faster speed, more varied flapping styles, etc. Could be added in as booster items to be collected in-game as well.
- [ ] Bonus points: add coins collection for bonus points.
- [ ] User personalization: allow player(s) to choose their preferred duck avatar.
- [ ] Page enhancement: Add favicon to iPhone safari tab

## Resources

- Duck images (Pokemon Quaxly & Psyduck) from: https://www.serebii.net/
- Colour palette from: https://coolors.co/
- Disable double-tap zoom on mobile (better playability): [Stack Overflow](https://stackoverflow.com/questions/10614481/disable-double-tap-zoom-option-in-browser-on-touch-devices)
- Utilizing localStorage: [Stack Overflow](https://stackoverflow.com/questions/63634765/making-a-high-score-best-time-localstorage-in-javascript)