const   display     = document.querySelector("#display"),
        startBtn    = document.querySelector("#start"),
        pauseBtn    = document.querySelector("#pause"),
        resetBtn    = document.querySelector("#reset");

let time,
    x;
    
resetTimer();

function toTime (ms) {
	let m = Math.floor(ms/60000);
	let s = Math.floor((ms%60000)/1000);
	if (s < 10) {
		s = "0" + s;
	}
	display.textContent = m + ":" + s;
	if (time >= 1000) {
	  time-= 1000;
	} else if (time < 1000) {
	  clearInterval(x);
	}
}

function startTimer() {
    x = setInterval(function(){toTime(time)}, 1000);
}

function resetTimer() {
    time = 1500000;
    display.textContent = "25:00";
}

function pauseTimer() {
    clearInterval(x);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);