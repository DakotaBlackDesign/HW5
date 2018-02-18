//Wobble Machine 
//use keys A,S,D,F,G,H,J,K to change the key
//use Q to go down 1 octave and W to go up one octave
//use the mouse to modulate pitch and wobbles 
//this is a basic example of using a low frequency oscilator to modulate the frequency of a LowPass filter cutoff.
var attackLevel = 0.01;
var releaseLevel = 0;
var attackTime = 0.001
var decayTime = 0.2;
var susPercent = 0.5;
var releaseTime = 0.5;

var freqA = 77.78;
var oct = 1;
var netfreq = 77.78;
var freqB = 10;
var freqC = 32.7;
var freqD = 38.89;
var fft, filter;

function setup() {
  createCanvas(800,500)
  colorMode(HSB,100)
	
	env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  filter = new p5.LowPass(); // filter for taking out high frequencies
	filter.amp(0.4)
  amplitude = new p5.Amplitude(); // amplitude of the lowfrequency oscillator
	amp2 = new p5.Amplitude();
	reverb = new p5.Reverb();
	
// low frequency oscillator for modulation
  oscB = new p5.Oscillator();
  oscB.setType('sine');
  oscB.freq();
  oscB.amp(env);
  oscB.disconnect()
  oscB.connect(amplitude) 
  oscB.start();
  amplitude.setInput(oscB) 

// oscillators for sound 
  oscA = new p5.Oscillator();
  oscA.setType('sawtooth');
  oscA.freq(netfreq);
  oscA.amp(env);
  oscA.disconnect();
  oscA.connect(filter);
  oscA.start();
	
  oscC = new p5.Oscillator();
  oscC.setType('triangle');
  oscC.freq(freqC);
  oscC.amp(env);
  oscC.disconnect();
  oscC.connect(filter);
  oscC.start();
	
  oscD = new p5.Oscillator();
  oscD.setType('square');
  oscD.freq(freqD);
  oscD.amp(env);
  oscD.disconnect();
  oscD.connect(filter);
  oscD.start();
	
	reverb.process(filter, 2, 1);
	
  fft = new p5.FFT(); // spectrum analyzer  
}


function draw() {
  background(0);
  netfreq = freqA*oct
// Map varibles to mouse coordinates
  var freqA1 = map(mouseX, 0, width, 1/10, 1); // pitch factor according to mouse up/down 
  var freqB = map(mouseY, height, 0, 1/8, 2); // wobble factor
  var wob = map(mouseY, height, 0, 1, 50); // wobble range sellector
  var raz = map(mouseX, 0, width, 0, 5); // resolution range sellector
  oscB.freq(freqB)
  oscD.freq(netfreq*freqA1) //pitch the oscillator frequency up and down acording to factor freqA1
  oscA.freq(netfreq*freqA1)
	
  var level = amplitude.getLevel(); //get the amplitude of oscillator oscB
  var resolution = map(level, 0, 1, 0, raz); //remap ocsilator amplitude to a range acceptable for modulating LowPass filter resolution
  var wobble = map(level, 0, 1, wob, 300*wob); //remap ocsilator amplitude to a range acceptable for modulating LowPass filter frequency
  filter.freq(wobble)
  filter.res(resolution);
  
 // draw filtered spectrum
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i < spectrum.length; i++) {
    var y = map(i, 0, spectrum.length, 0, 100);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    var x = map(y, 0, 10, 0, width);
		var w = map(spectrum[i], 0, 255,0,5);
		var centroid = fft.getEnergy(300)
		var cent = map(centroid,0,255,0,100)
		fill(cent,255,255)
    ellipse(x, height/2, w, h);
		print(centroid)
  }
	
}

function trigger() {
   env.triggerAttack();
}

function restart() {
	oscA.start();
	oscC.start();
	oscD.start();
	oscB.start();	
}

function keyPressed() { // change the key 
  print("got key press for ", key);
	if (key == 'E') {
		restart()
	}
  if (key == 'A') {
    freqA = 77.78
		trigger()
	}
	if (key == 'S') {
    freqA = 87.31
		trigger()
	}
	if (key == 'D') {
    freqA = 92.50
		trigger()
	}
	if (key == 'F') {
    freqA = 103.83
		trigger()
	}
	if (key == 'G') {
    freqA = 110.00
		trigger()
	}
	if (key == 'H') {
    freqA = 123.47
		trigger()
	}
	if (key == 'J') {
    freqA = 130.81
		trigger()
	}
	if (key == 'K') {
    freqA = 146.83
		trigger()
	}
  if (key == 'W') {
    oct = oct*2
	}
  if (key == 'Q') {
    oct = oct/2
	}
	
    print (netfreq)
}	
function keyReleased() {
	if (key == 'A') {
   env.triggerRelease();
	}
	if (key == 'S') {
    env.triggerRelease();
	}
	if (key == 'D') {
    env.triggerRelease();
	}
	if (key == 'F') {
    env.triggerRelease();
	}
	if (key == 'G') {
    env.triggerRelease();
	}
	if (key == 'H') {
    env.triggerRelease();
	}
	if (key == 'J') {
    env.triggerRelease();
	}
	if (key == 'K') {
    env.triggerRelease();
	}
}
	
