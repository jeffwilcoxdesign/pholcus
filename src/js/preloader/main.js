require("../../css/preloader/style.css");
var PhysicsParticle = require("./PhysicsParticle");
var Vector2 = require("./Vector2");

function init() {
	// CANVAS SETUP
	document.body.appendChild(canvas); 
	canvas.width = SCREEN_WIDTH; 
	canvas.height = SCREEN_HEIGHT;
	setInterval(loop, 1000 / 30);

	var preload = new createjs.LoadQueue();
	preload.addEventListener("fileload", handleFileComplete);
	preload.addEventListener("progress", handleProgress);
	preload.loadFile("img/2016_03_14_Checkout_Flow_Vis_D-Desktop_RD5.png");// simulate content download
	
	// need to configure webpack to bundle a secondary js file for site assets above...
	
}

document.addEventListener('DOMContentLoaded', init);

function handleFileComplete(event) {
	// need to animate elements within particles array here
	particles.forEach(function(el){
		
		// enlarge the jelly dots!
		TweenLite.to(el, 1.2, 
	  	{
	  		radius: 50,
	  		onUpdate: function(){
	  			repelBase = 50+(this.ratio*500);
	  			// consider having a radius var that is also tweened?
	  		},
	  		ease:Power1.easeInOut,
	  	});

	});

}
function handleProgress(event) {
	console.log('img load progress.. '+Math.round(event.progress*100));
	var prcnt = Math.round(event.progress*20);
	makeParticle(Math.round(prcnt - particles.length));
}

// screen size variables
var SCREEN_WIDTH = window.innerWidth,
SCREEN_HEIGHT = window.innerHeight,
HALF_WIDTH = window.innerWidth / 2,
HALF_HEIGHT = window.innerHeight / 2,

// canvas element and 2D context
canvas = document.createElement( 'canvas' ),
context = canvas.getContext( '2d' ),

particles = [],
MAX_PARTICLES = 100,
repelBase = 50;


function loop() {

	var repelforce = new Vector2(0,0),
		mag, 
		repelstrength; 
	
	for (i=0; i<particles.length; i++)
	{
		var p1 = particles[i]; 
		
		repelforce.copyFrom(p1.pos);
		repelforce.x-=HALF_WIDTH;
		repelforce.y-=HALF_HEIGHT;
		//
		mag = repelforce.magnitude();
		repelstrength = (mag - 200) *-0.1;
		//console.log('repelstrength: '+repelstrength);
		repelforce.divideEq(mag);
		repelforce.multiplyEq(repelstrength);

		if(repelstrength<0) 	p1.force.plusEq(repelforce); 

		for(j=i+1; j<particles.length; j++)
		{
			var p2 = particles[j];

			repelforce.copyFrom(p2.pos);
			repelforce.minusEq(p1.pos);
			mag = repelforce.magnitude();
			repelstrength = repelBase-mag;// jw mod

			if(repelstrength>0)
			{
				repelforce.divideEq(mag);
				repelforce.multiplyEq(repelstrength*0.025);
			
				p1.force.minusEq(repelforce);
				p2.force.plusEq(repelforce);
			}
		}	
	}
	
	context.fillStyle="rgb(0,0,25)";
	context.fillRect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT);

	// clear the canvas
	context.strokeStyle = '#fff'; 
	context.lineWidth =1;
	
  	// iteratate through each particle
	for (i=0; i<particles.length; i++)
	{
		var particle = particles[i]; 
		// and then update. We always render first so particle
		// appears in the starting point.
		particle.update();
		
		// render it
		particle.render(context); 
	}
	
	// Keep taking the oldest particles away until we have 
	// fewer than the maximum allowed.
	while(particles.length>MAX_PARTICLES)
		particles.shift(); 
	
}

function makeParticle(particleCount) {
	//console.log('makeParticle() : '+particleCount);
	for(var i=0; i<particleCount;i++)
	{
		// create a new particle in the middle of the stage
		var particle = new PhysicsParticle(HALF_WIDTH, HALF_HEIGHT); 
		particle.pos.reset(HALF_WIDTH, HALF_HEIGHT); 
		particle.vel.reset(1,0);
		particle.vel.rotate(Math.random()*360);
		//particle.drag = 0.98;
		particle.drag = 0.86;
			
		// add it to the array
		particles.push(particle);
		loop();// jw edit
	}
}
