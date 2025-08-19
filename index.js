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
let kmh = 0;
const arrowSpeed = 30; //kmh per sec;
const q = setInterval(() =>
{
	kmh += 10;
	if (kmh > 180) kmh = 0;
	const kmhDelta = 10;
	const angle = kmhToAngle(kmh);
	arrow.style.transform = `rotate(${angle}deg)`;
	arrow.style.transitionDuration = `${kmhDelta / arrowSpeed}s`;
	console.log(kmh, angle);
}, 1000);
setTimeout(() =>
{
	clearInterval(q);
}, 40000);

function kmhToAngle(kmh)
{
	return (kmh - 150) * 1.5;
}