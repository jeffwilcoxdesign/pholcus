require("../../css/preloader/style.css");
var PhysicsParticle = require("./PhysicsParticle");
var Vector2 = require("./Vector2");

//var createjs = require("../../../node_modules/createjs-combined/createjs-2015.11.26.min");
//var createjsInst = require("../../../node_modules/createjs-combined/createjs-2015.11.26.min");

//import createjs from 'createjs-combined';
//import React from 'react';

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
	
	// start loading animation framework here?
	// need to configure webpack to bundle a secondary js file for site assets above...
	
}

document.addEventListener('DOMContentLoaded', init);

function handleFileComplete(event) {
  //console.log('cheers!');
  // animate here?
  /*
  TweenMax.to(canvas, .4, 
  	{
  		width:(window.innerWidth*2), 
  		height:(window.innerHeight*2), 
  		x:(window.innerWidth/-2), 
  		y:(window.innerHeight/-2)
  	});
	*/

	// need to animate elements within particles array here
	particles.forEach(function(el){
		console.log(el);
		console.log(el.pos);

		// need to also tween pos.x and pos.y properties on el...
		//el.drag = 0.7;
		
		//el.force.reset(0,0);
		//el.pos.reset((window.innerWidth*Math.random()), (window.innerHeight*Math.random()))
		//el.pos.reset(window.innerWidth, window.innerHeight);
		var randomNum = Math.random();
		//particle.vel.reset(1,0);
		// make TweenMax call a function particle.pos.reset() for each step of animaiton...
		TweenMax.to(el, 1.6, 
	  	{
	  		radius: 50,
	  		onUpdate: function(val){
	  			var prog = this.target;
	  			console.log('onUpdate() val:'+prog);
	  			console.log(prog);

	  			// this is where we need to update the particle position?
	  		},
	  		//particle.pos.reset(HALF_WIDTH, HALF_HEIGHT)
	  		
	  	});
	});

}
function handleProgress(event) {
	console.log('img load progress.. '+Math.round(event.progress*100));
	var prcnt = Math.round(event.progress*20);
	//console.log('now adding some circles... '+Math.round(prcnt - particles.length));
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
MAX_PARTICLES = 100;


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
			//repelstrength = 50-mag;
			repelstrength = 550-mag;// jw edit
			//console.log('repelstrength: '+repelstrength);// tween these values with the radius?
			
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
