
var lottery_animation = {
	stage: '',
	ball: '',
	anim: '',
	tween: '',
	background: '',
	initialize: function() {
		//created canvas
		this.stage = new Kinetic.Stage({
			container: 'lottery_animation',
			width: 200,
			height: 200
		});
		var layer = new Kinetic.Layer();
		this.stage.add(layer);
		//create element	
		this.background = new Kinetic.Image({
			x: this.stage.getWidth() / 2,
			y: this.stage.getHeight() / 2,
			image: $('#img_cached').find('img[name=background]')[0],
			width: this.stage.getWidth(),
			height: this.stage.getHeight(),
			offset: {
				x: this.stage.getWidth() / 2,
				y: this.stage.getHeight() / 2
			},
		});
		layer.add(this.background);
		this.ball = new Kinetic.Image({
			x: this.stage.getWidth() / 2 - 25,
			y: 25,
			image: $('#img_cached').find('img[name=ball]')[0],
			width: 50,
			height: 50,
			offset: {
				x: 50 / 2,
				y: 50 / 2
			},
		});
		layer.add(this.ball);
		// var x = 25;
		// for(var i = 0; i<10; i++)
		// {
		// 	var balls  = new Kinetic.Image({
		// 			x: x*i,
		// 		y: 25,
		//          	image: $('#img_cached').find('img[name=ball]')[0],
		//          	width: 50,
		//          	height: 50,
		//          	rotation: x * i,
		//          	offset: { x: 50/2, y:50/2},
		// 	});	
		// 	layer.add(balls);
		// }
		//draw
		this.stage.draw();
		//created animation
		this.tween = new Kinetic.Tween({
			node: this.ball,
			y: this.stage.getHeight() - this.ball.getHeight() + this.ball.getOffset().y,
			rotation: 360,
			easing: Kinetic.Easings['BounceEaseOut'],
			duration: 3
		});
		// var amplitude = 150;
		// var period = 2000;
		// // var centerY = stage.height()/2;
		// this.anim = new Kinetic.Animation(function(frame) {
		// 	//ball.setY(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerY);	
		// 	lottery_animation.background.setRotation(lottery_animation.background.getRotation()+1);	
		//    }, layer);
		//    this.anim.start();
	},
	buy_ball: function() {
		this.tween.reset();
		this.tween.reverse();
		//anim.start();
		this.tween.play();
	}
};