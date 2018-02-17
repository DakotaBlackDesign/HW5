var drops = []; //create array of drop objects

function setup() {
  createCanvas(400, 400);
  colorMode(HSB)
  for (var index = 0; index < 100; index = index + 1){// add drops to array
    drops[index] = {
      x: 100,  //starting x
      y: random(height), //starting y
      Ya: random(0,20),
      Xa: random(-0.2,3), //starting x velocity
      t: millis(), //current time 
      t1:0, //starting time 
			d: random(5,10), // diameter
    }
  }
}

function draw() {
  background(0);
  noStroke();
  rect(0, 50, 100, 20);// draw pipe

  for (var index = 0; index < 100; index = index + 1) {
    var drop = drops[index]
    
    ellipse(drop.x, drop.y, drop.d,drop.d*drop.t/1000);// draw drip

    drop.t = millis() - drop.t1 // time drop has been falling 
		drop.Ya =map(drop.d,5,15,1,1.5)*(1/2 * 8.9 * sq(drop.t/1000))
		drop.y = drop.y+ drop.Ya
    drop.x = drop.x + drop.Xa

    if (drop.y > height) { // reset
      drop.y = 60;       // set to pipe location
      drop.x = 100       
      drop.t1 = millis() // set t1 to current time elapsed
    }
  }
}
