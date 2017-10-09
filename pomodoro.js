const display = document.querySelector("#display");

let time = 1500000;

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

const x = setInterval(function(){toTime(time)}, 1000);