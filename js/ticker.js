$(document).ready(function() {

    
    
    // Getting HTML Elements by ID
    var d = document;
    var content = d.getElementById("timer-content");
    var message = d.getElementById("message");
    var closeMessage = d.getElementById("close-message");

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

    // Adding EventHandler to listen for click on Tabs
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

    // Stopwatch Operations

    // Starts the stopwatch count
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
        timeElapsed();
    }

    // Updates the time every 15 milliseconds
    function timeElapsed() {
        t = setTimeout(startStopwatch, 15);
    }
    stopwatchStart.onclick = startStopwatch;

    // Stops the stopwatch time
    stopwatchStop.onclick = function() {
        clearTimeout(t);
        $("#start-stopwatch").prop("disabled", false);
    };

    // Resets the time
    stopwatchReset.onclick = function() {
        stopwatchTime.innerHTML = "00:00:00";
        stopwatchMilli.innerHTML = "00";
        hours = minutes = seconds = milliseconds = 0;
        clearTimeout(t);
        $("#start-stopwatch").prop("disabled", false);
    };

    function displayMessageBox(error, type) {
        $(".message-box").css("display", type);
        message.innerHTML = error;
    }

    // Timer
    timerStart.onclick = function() {
        if(input.value === "") { displayMessageBox("Please enter some time.", "block"); }
        else convertInputToTime();
        $("#start-timer").prop("disabled", true);
    };

    timerStop.onclick = function() {
        // timerStart.setAttribute("disabled", "false");
        clearTimeout(t);
        $("#start-timer").prop("disabled", false);
    };

    timerReset.onclick = function() {
        input.value = "";
        $("#timer-count").css("display", "none");
        $("#input").css("display", "block");
        $("#start-timer").prop("disabled", false);
    };

    // Updates the time every 15 milliseconds
    function timerTimeElapsed() {
        t = setTimeout(updateTimer, 15);
    }

    function updateProgressBar() {
        p = setTimeout(progressTheBar, 1);
    }

    function convertInputToTime() {
        var time = input.value;
        var arr = time.split(":");
        for(var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace("0", "");
        }

        // Assigning Properties
        timerCount.setAttribute("id", "timer-count");
        timerMilli.setAttribute("id", "mili");

        timerClock.innerHTML = arr[0] + ":" + arr[1] + ":" + arr[2];  
        timerMilli.innerHTML = "60";

        timerCount.appendChild(timerClock);
        timerCount.appendChild(timerMilli);
        content.appendChild(timerCount);

        $("#timer-count").css("display", "block");
        $("#input").css("display", "none");
        // timerStart.setAttribute("disabled", "true");

        hours = arr[0];
        minutes = arr[1];
        seconds = arr[2];

        progressTheBar();
        updateTimer();
    }

    function updateTimer() {
        milliseconds--;
        if(milliseconds <= 0) {
            milliseconds = 60;
            seconds--;
            if(seconds <= 0) { 
                seconds = 59; 
                minutes--; 
                if(minutes <= 0) {
                    minutes = 59;
                    hours--;
                }
            }
        }

        //SIMPLIFY THIS CODE
        timerClock.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        timerMilli.innerHTML = milliseconds > 9 ? milliseconds : "0" + milliseconds;
        timerTimeElapsed();
    }

    function isValidInput(input) {
        var regex = "[\D\g]";
        if(input.match(regex)) {
            return false;
        }
        input.value = "";
        return true;
    }

    function progressTheBar() {
        var splitTime = timerClock.innerHTML.split(":");
        var currentTimeInSeconds = (splitTime[0] * 3600) + (splitTime[1] * 60) + splitTime[2];

        var mainTime = input.value.split(":");
        var totalTime = (mainTime[0] * 3600) + (mainTime[1] * 60) + mainTime[2];

        var elapsedTime = totalTime - currentTimeInSeconds;

        var progress = (elapsedTime / totalTime) * 100;
        var percent = progress * 100;
        console.log("Percentage: " + percent + "%");

        $(".progress-bar").css("width", percent + "%");
        updateProgressBar();
    }

    // Closes the message box if the "x" is clicked
    closeMessage.onclick = function() {
        displayMessageBox("", "none");
    };

});