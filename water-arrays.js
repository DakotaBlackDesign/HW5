
var drops = [];

function setup() {
  createCanvas(400, 400);
  colorMode(HSB)
	for (var index = 0; index < 6; index = index + 1){
		drops[index] = {
			x: 230,
			y: 220,
			yspeed: 3*random(1,1.4),
			xspeed: 1*random(-1,2),
			t:1 
		}
	}
	
}
  
function draw() {
  background(0);
  noStroke();

  // draw pipe
  rect(0, 200, 230, 20);
  
	for (var index = 0; index < 6; index = index + 1) {
		var drop = drops[index]

  // draw drip
  ellipse(drop.x, drop.y, 10);
  
  // down 3 pixels each frame, but maybe should be accelerating?
  drop.y = drop.y + drop.yspeed*drop.t
	drop.t = drop.t + 0.04
	drop.x = drop.x + drop.xspeed
	drop.xspeed = drop.xspeed  
		
  print(drop.y)
  // if invisible for a full “height” amount…
  if (drop.y > height*2) {
    // reset
    drop.y = 220;
		drop.t = 1
		drop.x = 230
		
	}
  }
}
