var smokes = [];

function setup() {
  createCanvas(400, 400);
	for ( i = 0; i<200; i++){
		smokes[i] = {
			x: width/2,
			y: random(-150,height),
			r: 0,
			w: random(1,10),
			h: random(10,15),
		}
	}
}
  
function draw() {
  background(0);
 
	

  fill(255);
	
	noStroke();
	for ( i = 0; i<200; i++){
		smoke = smokes[i]
		
		// darker as it gets closer to 0
		push();
		fill(smoke.y);
		translate(smoke.x, smoke.y);
		rotate(smoke.r/smoke.y+15);
		rect(-10, -10, 20, 20);
		smoke.y -= 2;
		smoke.x = smoke.x + smoke.h*90/smoke.y * cos(millis()/smoke.w/20)
		pop();
		
		// up 3 pixels
		smoke.y -= 3;
		 

		// rotate 0.05 radians ~= 2.8 degrees per frame
		smoke.r += 0.2;

		// if reach past the top a bunch
		if (smoke.y < -150) {
			smoke.y = height-100;
			smoke.x = width/2
		}
  }
	stroke(0);
	strokeWeight(1)
	rectMode(CENTER)
  rect(width/2, height, 60, 210);	// draw smokestack
}
