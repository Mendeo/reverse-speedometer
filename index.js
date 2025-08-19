'use strict';
navigator.geolocation.getCurrentPosition(location =>
{
	// console.log(location.coords.latitude);
	// console.log(location.coords.longitude);
	// console.log(location.coords.accuracy);
	console.log(location);
});
// navigator.geolocation.watchPosition(position => {
// 	console.log(position);
// });