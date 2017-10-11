//selectors
const   display     = document.querySelector("#display"),
        startBtn    = document.querySelector("#start"),
        pauseBtn    = document.querySelector("#pause"),
        resetBtn    = document.querySelector("#reset"),
        message		= document.querySelector("#message"),
        workTime	= document.querySelector("#work"),
        breakTime	= document.querySelector("#break"),
        workPlus	= document.querySelector("#workPlus"),
        workMinus	= document.querySelector("#workMinus"),
        breakPlus	= document.querySelector("#breakPlus"),
        breakMinus	= document.querySelector("#breakMinus");

let time,
	m,
	s,
    x,
    isBreak = false;
//set up chime sound    
const pinwheel = new Howl({
        src: ['assets/sounds/pinwheel.mp3']
      });

//initialize timer    
resetTimer();

function isNum(num){
	if(!isNaN(num)) {
	    time = Number(num) * 60000;
    } else {
    	return alert("Numbers only!");
    }
}

function toTime (ms) {
	m = Math.floor(ms/60000);
	if (m < 10) {
		m = "0" + m;
	}
	s = Math.floor((ms%60000)/1000);
	if (s < 10) {
		s = "0" + s;
	}
	showTime();
}

function showTime() {	
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
		pauseTimer();
		isBreak = true;
		isNum(breakTime.value);
		setTimeout(function(){
		  message.textContent = "It's break time!";
		startTimer();
		}, 1000);
    } else if (isBreak) {
    	pinwheel.play();
		pauseTimer();
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
	changeTime();
    isBreak = false;
    message.textContent = "Get to work!";
}

function pauseTimer() {
    clearInterval(x);
}

function changeTime() {
	pauseTimer();
	isNum(workTime.value);
	toTime(time);
}

workTime.addEventListener("change", function(){
	changeTime();
});
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
workPlus.addEventListener("click", function(){
	pauseTimer();
	workTime.value++;
	isNum(workTime.value);
	toTime(time);
});
workMinus.addEventListener("click", function(){
	pauseTimer();
	workTime.value--;
	isNum(workTime.value);
	toTime(time);
});
breakPlus.addEventListener("click", function(){
	breakTime.value++;
});
breakMinus.addEventListener("click", function(){
	breakTime.value--;
});