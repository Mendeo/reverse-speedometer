'use strict';

let isGeoError = false;
const geoError = document.getElementById('geo-error');
const arrow = document.getElementById('arrow');

const arrowSpeed = 180; //kmh per sec;
let prevKmh = 0;

const geoId = navigator.geolocation.watchPosition((position) => {
	if (isGeoError)
	{
		isGeoError = false;
		removeGeoError();
	}
	//console.log(position);
	if (true || position.coords.speed)
	{
		const rndSpeed = Math.random() * 50;
		console.log(rndSpeed);
		//moveArrow(position.speed);
		moveArrow(rndSpeed);
	}
	else
	{
		showGeoError('Скорость пока недоступна.');
		isGeoError = true;
	}
}, (err) =>
{
	isGeoError = true;
	switch (err.code)
	{
		case GeolocationPositionError.TIMEOUT:
		showGeoError('Время получения геолокации истекло.');
		break;
	case GeolocationPositionError.PERMISSION_DENIED:
		showGeoError('Вы запретили отслеживание своей геопозиции.');
		break;
	case GeolocationPositionError.POSITION_UNAVAILABLE:
		showGeoError('Получить местоположение не удалось.');
		break;
	}
}, {
	maximumAge: 0,
	enableHighAccuracy: true
});

function moveArrow(geolocationSpeed)
{
	const kmh = geolocationSpeed * 3.6;
	if (kmh > 180) kmh = 180;
	const kmhDelta = Math.abs(kmh - prevKmh);
	prevKmh = kmh;
	const angle = kmhToAngle(kmh);
	arrow.style.transform = `rotate(${angle}deg)`;
	arrow.style.transitionDuration = `${kmhDelta / arrowSpeed}s`;
}

function removeGeoError()
{
	geoError.style.display = 'none';
	arrow.style.display = 'block';
}
function showGeoError(text)
{
	geoError.innerText = text;
	geoError.style.display = 'inline-block';
	arrow.style.display = 'none';
}



let kmh = 0;

const q = setInterval(() =>
{
	kmh += 10;
	let kmhDelta = 10;
	if (kmh > 180)
	{
		kmh = 0;
		kmhDelta = 180;
	}
	

}, 1000);



function kmhToAngle(kmh)
{
	return (kmh - 150) * 1.5;
}