'use strict';
// navigator.geolocation.getCurrentPosition(location =>
// {
// 	// console.log(location.coords.latitude);
// 	// console.log(location.coords.longitude);
// 	// console.log(location.coords.accuracy);
// 	console.log(location);
// });
// navigator.geolocation.watchPosition(position => {
// 	console.log(position);
// });
const arrow = document.getElementById('arrow');
let speed = 0;
const arrowSpeed = 10; //deg per sec;
const q = setInterval(() =>
{
	speed += 10;
	if (speed > 180) speed = 0;
	const speedDelta = 10;
	arrow.style.transform = `rotate(${speed}deg)`;
	arrow.style.transitionDuration = `${speedDelta / arrowSpeed}s`;
	//console.log(speed);
}, 1000);
setTimeout(() =>
{
	clearInterval(q);
}, 10000);