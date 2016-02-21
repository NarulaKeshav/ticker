# Ticker - time for success
Ticker is a timer application that does basic time countdown and stopwatch operation. The progress bar updates when the timer is running to let you know the progress.
<br><br>
Try out the application here: [Working on input validation.](#)
<br><br>
![Screenshot](http://i.imgur.com/xCuP1L9.png)

# How it Works
To get the times to work, I used `setInterval` in order to callback the `update` function and update the time every `n` times. I created variables for `hours`, `minutes`, `seconds`, and `milliseconds` and increment/decrement it. When the timer hits `00:00:00`, an alarm rings, letting you know the time is up. 
<br><br>
I also used Bootstrap's progress bar and updated its width by doing:
```
var elapsedTime = totalTime - currentTimeInSeconds;
var progress = (elapsedTime / totalTime ) * 100;
```

# What I Used
* Jade
* Sass
* JavaScript
* jQuery
* Bootstrap
* FontAwesome
* animate.css, wow.js, hover.css

#Design
I tried to keep the design as simple as possible, with bright and hot pink color. The hexcode for the pink is `#FF4D89`. I used Bootstrap tabs in order to allow users to switch between Timer and Stopwatch.

# Credits
I DO NOT have the rights to the `alarm`. The alarm is from [Sleep Cycle](http://www.sleepcycle.com/) application called 'Warm Breeze'. Rights to audio reserves to them.

# What did I Learn
I realized how hard is it to manage and use time. When I first started, I thought this was going to be easy, but it certainly was challenging. Understanding how `setInterval()` and `clearTimeout()` worked was kind of hard to grasp in the beginning. After this project, I feel comfortable with working with them. 
<br><br>
The application seems simple and easy, but it was kind of rough man. But I'm satisfied with the final product.
