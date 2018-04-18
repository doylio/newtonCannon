let HEIGHT = window.innerHeight - 20;
let WIDTH = window.innerWidth - 20;

const canvas = document.querySelector('canvas');
const velocity = document.querySelector('#velocityInput');
const fireButton = document.querySelector('#fireBtn');
const errorMsg = document.querySelector('#error');

const colorPallette = {
	black: "#0D0D0D",
	blue: "#3134A1",
	indigo: "#03D1AB",
	brown: "#F8550D",
	white: "#FAFAFA",
}

//Handles Canvas Size
canvas.width = WIDTH;
canvas.height = HEIGHT;
window.addEventListener('resize', () => {
	WIDTH = window.innerWidth - 20;
	HEIGHT = window.innerHeight - 20;
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	xOfEarth = canvas.width / 2;
	yOfEarth = canvas.height / 2;
	radOfEarth = 170;
	cannonX = xOfEarth;
	cannonY = yOfEarth - radOfEarth - 50;
	init();
});

let xOfEarth = canvas.width / 2;
let yOfEarth = canvas.height / 2;
let radOfEarth = 170;
let cannonX = xOfEarth;
let cannonY = yOfEarth - radOfEarth - 50;
let gravitationalConstant = 1000;

let ball;
let continueAnimation = false;


const c = canvas.getContext('2d');

function getDistance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
}

function getAngle(x1, y1, x2, y2) {

}


function init() {
	//Cannon Legs
	c.beginPath();
	c.moveTo(xOfEarth - 30, yOfEarth - radOfEarth + 10);
	c.lineTo(xOfEarth, yOfEarth - radOfEarth - 50);
	c.lineTo(xOfEarth + 30, yOfEarth - radOfEarth + 10)
	c.fillStyle = colorPallette.brown;
	c.fill();

	//Earth
	c.beginPath();
	c.arc(xOfEarth, yOfEarth, radOfEarth, 0, Math.PI * 2, false);
	c.fillStyle = colorPallette.indigo;
	c.fill();

	//Cannon
	c.beginPath();
	c.arc(cannonX, cannonY, 20, Math.PI * 0.5, Math.PI * 1.5);
	c.moveTo(cannonX, cannonY - 20);
	c.lineTo(cannonX + 40, cannonY - 10);
	c.lineTo(cannonX + 40, cannonY + 10);
	c.lineTo(cannonX, cannonY + 20);
	c.fillStyle = colorPallette.black;
	c.fill();
}


const animate = () => {
	c.clearRect(0, 0, WIDTH, HEIGHT);
		//Cannon Legs
	c.beginPath();
	c.moveTo(xOfEarth - 30, yOfEarth - radOfEarth + 10);
	c.lineTo(xOfEarth, yOfEarth - radOfEarth - 50);
	c.lineTo(xOfEarth + 30, yOfEarth - radOfEarth + 10)
	c.fillStyle = colorPallette.brown;
	c.fill();

	//Earth
	c.beginPath();
	c.arc(xOfEarth, yOfEarth, radOfEarth, 0, Math.PI * 2, false);
	c.fillStyle = colorPallette.indigo;
	c.fill();

	//Cannon
	c.beginPath();
	c.arc(cannonX, cannonY, 20, Math.PI * 0.5, Math.PI * 1.5);
	c.moveTo(cannonX, cannonY - 20);
	c.lineTo(cannonX + 40, cannonY - 10);
	c.lineTo(cannonX + 40, cannonY + 10);
	c.lineTo(cannonX, cannonY + 20);
	c.fillStyle = colorPallette.black;
	c.fill();

	ball.update();

	if(continueAnimation) {
		requestAnimationFrame(animate);
	}
}

function cannonBall(x, y, dx, dy) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;

	this.draw = () =>{
		c.beginPath();
		c.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
		c.fillStyle = colorPallette.black;
		c.fill();
	}

	this.update = () => {
		if(getDistance(this.x, this.y, xOfEarth, yOfEarth) < radOfEarth) {
			continueAnimation = false;
			return;
		}

		this.y += this.dy;
		this.x += this.dx;

		let r = getDistance(this.x, this.y, xOfEarth, yOfEarth);
		let acc = gravitationalConstant / r**2;
		
		this.dx += acc * (xOfEarth - this.x) / r;
		this.dy += acc * (yOfEarth - this.y) / r;

		console.log(this.dx, this.dy);
		this.draw();
	}
}


fireButton.addEventListener('click', () => {
	continueAnimation = false;
	if(velocity.value){
		continueAnimation = true;
		ball = new cannonBall(cannonX, cannonY, Number(velocity.value / 200), 0);
		animate();
	}
});


init();