$(document).ready(function() {

    // Initializing WOW JS and Tooltip
    new WOW().init();
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    
    // Getting HTML Elements by ID
    var d = document;
    var content = d.getElementById("timer-content");
    var message = d.getElementById("message");
    var closeMessage = d.getElementById("close-message");
    var audio = d.getElementById("audio"); 
    var percent = d.getElementById("percent");

    // Tags for Timer
    var timerStart = d.getElementById("start-timer");
    var timerStop = d.getElementById("stop-timer");
    var timerReset = d.getElementById("reset-timer");
    var input = d.getElementById("input");

    // Tags for Stopwatch
    var stopwatchTime = d.getElementById("stopwatch-clock");
    var stopwatchMilli = d.getElementById("mili");
    var stopwatchStart = d.getElementById("start-stopwatch");
    var stopwatchStop = d.getElementById("stop-stopwatch");
    var stopwatchReset = d.getElementById("reset-stopwatch");
    var stopwatchLap = d.getElementById("lap-stopwatch");
    var stopHour = d.getElementById("hr");
    var stopMin = d.getElementById("min");
    var stopSec = d.getElementById("sec");

    // Creating Basic Time element
    var timerCount = d.createElement("p");
    var timerClock = d.createElement("span");
    var timerMilli = d.createElement("span");

    /* Getting time for the timer and stopwatch */
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
    var t;
    var p;

    /* Resets all the timers to 0 when tab is switched */
    var clickedTab = false;
    function tabClickHandler() {
        clickedTab = true;
        // Resets all values to 0
        stopwatchTime.innerHTML = "00:00:00";
        stopwatchMilli.innerHTML = "00";
        clearInterval(t);
        hours = minutes = seconds = milliseconds = 0;
        displayMessageBox("", "none");

    }
    var tab = d.getElementById("main-tab");
    tab.addEventListener("click", tabClickHandler);

    // STOPWATCH OPERATIONS

    /* Starts the stopwatch timer and displays it in necessary format */
    function startStopwatch() {
        milliseconds++;
        if(milliseconds >= 60) {
            milliseconds = 0;
            seconds++;
            if(seconds >= 60) { 
                seconds = 0; 
                minutes++; 
                if(minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
        }

        $("#start-stopwatch").prop("disabled", true);

        // Updates the stopwatch timer by appending necessary 0
        stopwatchTime.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        stopwatchMilli.innerHTML = (milliseconds > 9 ? milliseconds : "0" + milliseconds);

        // Changes progress bar width and background and color of progress-made class
        $(".progress-bar").css("width", "100%");
        $(".progress-bar").css("background", "#FF4D89");
        $(".progress-made").css("color", "#FF4D89");

        // Setting values for the stopwatch timer from main stopwatch
        stopHour.innerHTML = hours + "h ";
        stopMin.innerHTML = minutes + "m ";
        stopSec.innerHTML = seconds + "s ";
        timeElapsed();
    }

    /* Updates the time every 15 milliseconds */
    function timeElapsed() {
        t = setTimeout(startStopwatch, 15);
    }
    
    /* Starts the stopwatch on button click */
    stopwatchStart.onclick = startStopwatch;

    /* Stops the stopwatch time on button click */
    stopwatchStop.onclick = function() {
        // Stops the stopwatch time and changes necessary color schemes
        clearInterval(t);
        $("#start-stopwatch").prop("disabled", false);
        $(".progress-bar").css("background", "#F5F5F5");
        $(".progress-made").css("color", "#BBB");
    };

    /* Resets the stopwatch time on button click */
    stopwatchReset.onclick = function() {
        // Stopwatch time and millisecond is set to 0
        stopwatchTime.innerHTML = "00:00:00";
        stopwatchMilli.innerHTML = "00";

        // Color of progress bar is changed
        $(".progress-bar").css("background", "#F5F5F5");
        $(".progress-made").css("color", "#BBB");

        // hour, minute, second, millisecond variables are set to 0
        hours = minutes = seconds = milliseconds = 0;
        clearInterval(t);

        // Sets the default values for the stopwatch time
        $("#start-stopwatch").prop("disabled", false);
        stopHour.innerHTML = "0h ";
        stopMin.innerHTML = "0m ";
        stopSec.innerHTML = "0s ";
    };

    /* Displays a error message box if any errors */
    function displayMessageBox(error, type) {
        $(".message-box").css("display", type);
        message.innerHTML = error;
        $(".message-box").addClass("wow bounceInUp");
    }

    // TIMER OPERATIONS
    var stopThenStart = false;

    /* Starts the timer if the button is clicked */
    timerStart.onclick = function() {
        // Splits the input by ":"
        var testArr = input.value.split(":");

        // If input is empty, show the message
        if(input.value === "") { displayMessageBox("Don't leave input blank. Type something.", "block"); }
        else {

            // If the arr is not a number, show message and input.value is empty string
            if(!isNumber(testArr[0]) || !isNumber(testArr[1]) || !isNumber(testArr[2])) {
                displayMessageBox("Really? I have a test case for that.", "block");
                input.value = "";
            }
            else {
                // Remove all the excessive 0s
                var arr = input.value.split(":");
                for(var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].replace("0", "");
                }

                // Parse int the values from the array and store to time variables
                hours = parseInt(arr[0]);
                minutes = parseInt(arr[1]);
                seconds = parseInt(arr[2]);

                // If time format is incorrect, show this error and set input entry to blank
                if(hours > 23 || minutes > 60 || seconds > 60) {
                    displayMessageBox("Please enter time in right format.", "block");
                    input.value = "";
                }
                else {

                    // If the timer was stopped before, continue from where it was left off
                    if(stopThenStart) {
                        var split = timerClock.innerHTML.split(":");
                        hours = parseInt(split[0]);
                        minutes = parseInt(split[1]);
                        seconds = parseInt(split[2]);
                        convertInputToTime(hours, minutes, seconds);
                    }

                    // Otherwise convert the input to time and update timer
                    else { convertInputToTime(hours, minutes, seconds); }

                    // Make start button disabled and change progress bar color
                    $("#start-timer").prop("disabled", true);
                    $(".progress-bar").css("background", "#FF4D89");
                }
            }
        }
    };

    function isNumber(n) { 
        return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
    }

    /* Stops the timer time when button is clicked */
    timerStop.onclick = function() {
        // Enables the start button
        $("#start-timer").prop("disabled", false);

        // If audio is playing, stops the audio and changes time to 0
        audio.pause();
        audio.currentTime = 0;
        stopThenStart = true;
    };

    /* Resets the timer time when button is clicked */
    timerReset.onclick = function() {

        // Progress is set to 0 and time is set to 0 and percentage is set to 0;
        progress = 0;
        hours = minutes = seconds = milliseconds = 0;
        percent.innerHTML = "0%";

        // Updates progress bar width, color, and color of percentage counter
        $(".progress-bar").css("width", progress + "%");
        $(".progress-bar").css("background", "#F5F5F5");
        $(".progress-made").css("color", "#BBB");
        
        // Stops the audio and reset its time
        audio.pause();
        audio.currentTime = 0;

        // Input is displayed and timer counter is hidden
        $("#timer-count").css("display", "none");
        $("#input").css("display", "block");
        input.value = "";

        // Start button is enabled
        $("#start-timer").prop("disabled", false);
    };

    /* Updates the time every 15 milliseconds */
    function timerTimeElapsed() {
        t = setTimeout(updateTimer, 15);
    }

    /* Updates the progress bar every millisecond */
    function updateProgressBar() {
        p = setTimeout(progressTheBar, 1);
    }

    /* Grabs the input data and converts it to a string, which is displayed and input is hidden*/
    function convertInputToTime(hr, mn, sc) {
        $(".progress-bar").css("width", "0%");

        // Assigning Properties
        timerCount.setAttribute("id", "timer-count");
        timerMilli.setAttribute("id", "mili");

        timerClock.innerHTML = hr + ":" + mn + ":" + sc;  
        timerMilli.innerHTML = "60";

        timerCount.appendChild(timerClock);
        timerCount.appendChild(timerMilli);
        content.appendChild(timerCount);

        $("#timer-count").css("display", "block");
        $("#input").css("display", "none");

        progressTheBar();
        updateTimer();
    }

    /* Updates the timer time and converts to necessary format */
    function updateTimer() {
        milliseconds--;
        if(milliseconds < 0) {
            milliseconds = 59;
            seconds--;
            if(seconds < 0) { 
                seconds = 59; 
                minutes--; 
                if(minutes < 0) {
                    minutes = 59;
                    if(hours < 0) hours = 0;
                    else hours--;
                }
            }
        }
        timerClock.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        timerMilli.innerHTML = milliseconds > 9 ? milliseconds : "0" + milliseconds;
        if(hours == 0 && minutes == 0 && seconds == 0 && milliseconds == 0) {
            clearInterval(t);
            if (typeof audio.loop == 'boolean') { audio.loop = true; }
            else {
                audio.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }
            audio.play();
            timerClock.innerHTML = "Time is up!";
            timerMilli.innerHTML = "";
        }
        else timerTimeElapsed();
    }

    /* Progresses the progress bar by taking elapsed time / totalTime */
    function progressTheBar() {
        var splitTime = timerClock.innerHTML.split(":");
        var currentTimeInSeconds = (parseInt(splitTime[0] * 3600)) + (parseInt(splitTime[1] * 60)) + parseInt(splitTime[2]);

        var mainTime = input.value.split(":");
        var totalTime = (parseInt(mainTime[0] * 3600)) + (parseInt(mainTime[1] * 60)) + parseInt(mainTime[2]);

        var elapsedTime = totalTime - currentTimeInSeconds;

        var progress = (elapsedTime / totalTime ) * 100;

        percent.innerHTML = parseInt(progress) + "%";
        $("#percent").css("color", "#FF4D89");
        $(".progress-bar").css("width", progress + "%");
        updateProgressBar();
    }

    /* Closes the message box if the "x" is clicked */
    closeMessage.onclick = function() {
        displayMessageBox("", "none");
        $(".message-box").removeClass("wow bounceInUp");
    };
});