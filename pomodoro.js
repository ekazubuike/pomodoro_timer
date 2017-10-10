//selectors
const   display     = document.querySelector("#display"),
        startBtn    = document.querySelector("#start"),
        pauseBtn    = document.querySelector("#pause"),
        resetBtn    = document.querySelector("#reset"),
        message		= document.querySelector("#message");

let time,
    x,
    isBreak = false;
//set up chime sound    
const pinwheel = new Howl({
        src: ['assets/sounds/pinwheel.mp3']
      });

//initialize timer    
resetTimer();

function toTime (ms) {
	let m = Math.floor(ms/60000);
	if (m < 10) {
		m = "0" + m;
	}
	let s = Math.floor((ms%60000)/1000);
	if (s < 10) {
		s = "0" + s;
	}
	
	display.textContent = m + ":" + s;
	if (time > 0) {
	  time-= 1000;
	} else {
		switchMode();
	}
}

function switchMode() {
    if (isBreak === false) {
		pinwheel.play();
		clearInterval(x);
		isBreak = true;
		time = 300000;
		setTimeout(function(){
		  message.textContent = "It's break time!";
		startTimer();
		}, 1000);
    } else if (isBreak) {
    	pinwheel.play();
		clearInterval(x);
		isBreak = false;
		
		setTimeout(function(){
		resetTimer();
		startTimer();
		}, 1000);
    }
}

function startTimer() {
    x = setInterval(function(){toTime(time)}, 1000);
}

function resetTimer() {
    clearInterval(x);
    time = 1500000;
    display.textContent = "25:00";
    isBreak = false;
    message.textContent = "Get to work!";
}

function pauseTimer() {
    clearInterval(x);
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);