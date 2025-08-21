'use strict';

let isGeoError = false;
const geoError = document.getElementById('geo-error');
const arrow = document.getElementById('arrow');
const kmhElement = document.querySelector('#values > span:first-child');
const skmElement = document.querySelector('#values > span:last-child');

const arrowSpeed = 180; //kmh per sec;

const geoId = navigator.geolocation.watchPosition((position) => {
	if (isGeoError)
	{
		isGeoError = false;
		removeGeoError();
	}
	if (position.coords.speed)
	{
		const kmh = position.coords.speed * 3.6;
		//const kmh = 1;
		let skm = kmh > 0 ? 3600 / kmh : Infinity;
		if (skm > 3600) skm = Infinity;
		moveArrow(kmh);
		//Showing speed as text
		const kmh_r = kmh.toFixed(0);
		const skm_r = skm === Infinity ? '∞' : toThreeSignificantDigits(skm);
		kmhElement.innerText = kmh_r;
		skmElement.innerText = skm_r;
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

let prevKmh = 0;
function moveArrow(kmh)
{
	if (kmh > 180) kmh = 180;
	if (Math.round(kmh) !== Math.round(prevKmh))
	{
		const kmhDelta = Math.abs(kmh - prevKmh);
		const angle = kmhToAngle(kmh);
		arrow.style.transform = `rotate(${angle}deg)`;
		arrow.style.transitionDuration = `${kmhDelta / arrowSpeed}s`;
	}
	prevKmh = kmh;
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
	kmhElement.innerText = '-';
	skmElement.innerText = '-';
}

function kmhToAngle(kmh)
{
	return (kmh - 150) * 1.5;
}

function toThreeSignificantDigits(value)
{
	const intValue = value.toFixed(0)
	const intLength = intValue === '0' ? 0 : intValue.length;
	const frac = 3 - intLength;
	const result = (Math.round(value * Math.pow(10, frac)) / Math.pow(10, frac));
	return result.toString().replace('.', ',')
}