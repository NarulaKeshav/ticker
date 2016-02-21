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
    var a;

    /* Resets all the timers to 0 when tab is switched */
    var clickedTab = false;
    function tabClickHandler() {
        clickedTab = true;
        // Resets all values to 0
        stopwatchTime.innerHTML = "00:00:00";
        stopwatchMilli.innerHTML = "00";
        clearTimeout(t);
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

        //SIMPLIFY THIS CODE
        stopwatchTime.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        stopwatchMilli.innerHTML = (milliseconds > 9 ? milliseconds : "0" + milliseconds);
        $(".progress-bar").css("background", "#FF4D89");
        $(".progress-made").css("color", "#FF4D89");
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
        clearTimeout(t);
        $("#start-stopwatch").prop("disabled", false);
        $(".progress-bar").css("background", "#F5F5F5");
        $(".progress-made").css("color", "#BBB");
    };

    /* Resets the stopwatch time on button click */
    stopwatchReset.onclick = function() {
        stopwatchTime.innerHTML = "00:00:00";
        stopwatchMilli.innerHTML = "00";
        $(".progress-bar").css("background", "#F5F5F5");
        $(".progress-made").css("color", "#BBB");
        hours = minutes = seconds = milliseconds = 0;
        clearTimeout(t);
        $("#start-stopwatch").prop("disabled", false);
    };

    /* Displays a error message box if any errors */
    function displayMessageBox(error, type) {
        $(".message-box").css("display", type);
        message.innerHTML = error;
        $(".message-box").addClass("wow bounceInUp");
    }

    // TIMER OPERATIONS

    /* Starts the timer if the button is clicked */
    timerStart.onclick = function() {
        var testArr = input.value.split(":");
        if(input.value === "") { displayMessageBox("Don't leave input blank. Type something.", "block"); }
        else {
            if(!isNumber(testArr[0])) {
                displayMessageBox("Don't try to trick. I have a test case for that.", "block");
                input.value = "";
            }
            else {
                var arr = input.value.split(":");
                for(var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].replace("0", "");
                }
                hours = parseInt(arr[0]);
                minutes = parseInt(arr[1]);
                seconds = parseInt(arr[2]);
                if(hours > 23 || minutes > 60 || seconds > 60) {
                    displayMessageBox("Please enter time in right format.", "block");
                    input.value = "";
                }
                else {
                    convertInputToTime(hours, minutes, seconds);
                    $("#start-timer").prop("disabled", true);
                }
            }
        }
    };

    function isNumber(n) { 
        return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
    } 

    /* Stops the timer time when button is clicked */
    timerStop.onclick = function() {
        // timerStart.setAttribute("disabled", "false");
        clearTimeout(t);
        $("#start-timer").prop("disabled", false);
        audio.pause();
        audio.currentTime = 0;
        if(a) { clearInterval(a); }
    };

    /* Resets the timer time when button is clicked */
    timerReset.onclick = function() {
        input.value = "";
        $("#timer-count").css("display", "none");
        $("#input").css("display", "block");
        $("#start-timer").prop("disabled", false);
        $(".progress-bar").css("width", "0%");
        hours = minutes = seconds = milliseconds = 0;
        audio.pause();
        audio.currentTime = 0;
        clearInterval(a);
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
        // timerStart.setAttribute("disabled", "true");

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
            clearTimeout(t);
            a = setInterval(timeIsUp, 500);
            if (typeof audio.loop == 'boolean') { audio.loop = true; }
            else {
                audio.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }
            audio.play();
        }
        else timerTimeElapsed();
    }

    /* Blinks the timer when time is up */
    function timeIsUp() {
        $("#timer-count").fadeOut(500);
        $("#mili").fadeOut(500);
        $("#timer-count").fadeIn(500);
        $("#mili").fadeIn(500);
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