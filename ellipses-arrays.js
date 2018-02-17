circles = [];

function setup() {
	createCanvas(400, 400);
	colorMode(HSB,100)
	for (var i = 0 ; i < 50; i ++){
		circles[i] = {
		x: random(width),
		y: random(height),
		x1: random(width),
		y1: random(height),
		r: random(width),
		r1: random(width),
		d: random(20,100),
		c: color(random(100),255,255)
		}
	}
}

function draw() {
	background(255)
	noStroke();
	for (var i = 0 ; i < 50; i ++){
		circle = circles[i]
		fill(circle.c);
		ellipse(circle.x, circle.y, circle.d);
		fill(255)
		ellipse(circle.x, circle.y, circle.d/1.2,circle.d/3)
		fill(0)
		ellipse(circle.x + circle.d/4 * cos(millis()/circle.d/8), circle.y, circle.d/4,circle.d/4)
		//fill(circle.c)
		//ellipse(circle.x, circle.y + circle.d/5 * cos(millis()/circle.d/4), circle.d/1.2,circle.d/3)

		circle.x = (circle.x1 + circle.r * cos(millis()/circle.r/4)+circle.r1 * cos(millis()/circle.r1/8))
		circle.y = (circle.y1 + circle.r * sin(millis()/circle.r/4)+circle.r1 * cos(millis()/circle.r1/8))
		}
}
