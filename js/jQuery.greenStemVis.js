;
(function($, window, document, undefined) {

	var pluginName = "greenStemVis",
		defaults = {
			gravityX: 10,
			gravityY: 10,
			width: 1024,
			height: 500,
			scale: 20
		};

	// The actual plugin constructor
	function GreenStemVis(element, options) {
		this.element = element;

		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	GreenStemVis.prototype = {
		init: function() {
			console.log('init');
			var me = this,
				settings = me.settings,
				$element = $(this.element),
				$canvas = $('<canvas width="' + settings.width + '" height="' + settings.height + '"></canvas>')
					.appendTo($element),
				canvas = $canvas[0];

			var b2Vec2 = Box2D.Common.Math.b2Vec2,
				b2BodyDef = Box2D.Dynamics.b2BodyDef,
				b2Body = Box2D.Dynamics.b2Body,
				b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
				b2Fixture = Box2D.Dynamics.b2Fixture,
				b2World = Box2D.Dynamics.b2World,
				b2MassData = Box2D.Collision.Shapes.b2MassData,
				b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
				b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
				b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


			var Physics = window.Physics = function(element, scale) {
				var me = this,
					gravity = new b2Vec2(settings.gravityX, settings.gravityY);

				me.world = new b2World(gravity);
				me.context = element.getContext("2d");
				me.scale = scale || settings.scale;
				me.dtRemaining = 0;
				me.stepAmount = 1 / 60;
			};

			Physics.prototype.debug = function() {
				this.debugDraw = new b2DebugDraw();
				this.debugDraw.SetSprite(this.context);
				this.debugDraw.SetDrawScale(this.scale);
				this.debugDraw.SetFillAlpha(0.3);
				this.debugDraw.SetLineThickness(1.0);
				this.debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
				this.world.SetDebugDraw(this.debugDraw);
			};

			var i = 0;
			Physics.prototype.step = function(dt) {
				this.dtRemaining += dt;
				while (this.dtRemaining > this.stepAmount) {
					this.dtRemaining -= this.stepAmount;
					this.world.Step(this.stepAmount,
						10, // velocity iterations
						10); // position iterations
				}

				if (this.debugDraw) {
					this.world.DrawDebugData();
				}
				// console.log(i);
				// if (i > 100) {
				// 	var newGravity = Math.floor((Math.random() * 20) + 1);
				// 	newGravity = newGravity - Math.floor((Math.random() * 10) + 1);
				// 	this.world.SetGravity(new b2Vec2(newGravity, 0));
				// 	i = 0;
				// }
				// else if ( i >= 50) {
				// 	this.world.SetGravity(new b2Vec2(0, 0));	
				// }
				// i++;
			}


			var Body = function(physics, details) {
				this.details = details = details || {};

				// Create the definition
				this.definition = new b2BodyDef();

				// Set up the definition
				for (var k in this.definitionDefaults) {
					this.definition[k] = details[k] || this.definitionDefaults[k];
				}
				this.definition.position = new b2Vec2(details.x || 0, details.y || 0);
				this.definition.linearVelocity = new b2Vec2(details.vx || 0, details.vy || 0);
				this.definition.userData = this;
				this.definition.type = details.type == "static" ? b2Body.b2_staticBody :
					b2Body.b2_dynamicBody;

				// Create the Body
				this.body = physics.world.CreateBody(this.definition);

				// Create the fixture
				this.fixtureDef = new b2FixtureDef();
				for (var l in this.fixtureDefaults) {
					this.fixtureDef[l] = details[l] || this.fixtureDefaults[l];
				}


				details.shape = details.shape || this.defaults.shape;

				switch (details.shape) {
					case "circle":
						details.radius = details.radius || this.defaults.radius;
						this.fixtureDef.shape = new b2CircleShape(details.radius);
						break;
					case "polygon":
						this.fixtureDef.shape = new b2PolygonShape();
						this.fixtureDef.shape.SetAsArray(details.points, details.points.length);
						break;
					case "block":
					default:
						details.width = details.width || this.defaults.width;
						details.height = details.height || this.defaults.height;

						this.fixtureDef.shape = new b2PolygonShape();
						this.fixtureDef.shape.SetAsBox(details.width,
							details.height);
						break;
				}

				this.body.CreateFixture(this.fixtureDef);
			};

			var bodyDef = new b2BodyDef(),
				fixDef = new b2FixtureDef();

			var FlexJoint = function(joint, multiplier) {
				joint_angle = joint.GetJointAngle() * (180 / 3.14);
				if (Math.abs(joint_angle) > 0.2) {
					joint.SetMaxMotorTorque(multiplier * Math.abs(joint_angle / 30));
					joint.SetMotorSpeed(-joint_angle / 30);
				}
			}

			var TreeJoint = function(bodyA, bodyB) {
				var DEGTORAD = 3.14 / 180,
					jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();

				jointDef.bodyA = bodyA;
				jointDef.bodyB = bodyB;
				jointDef.localAnchorA.Set(0, -1);
				if (bodyA == ground) {
					jointDef.localAnchorA.Set(0, -2);
				}
				jointDef.localAnchorB.Set(0, 1);
				jointDef.enableLimit = true;
				jointDef.lowerAngle = -30 * DEGTORAD;
				jointDef.upperAngle = 30 * DEGTORAD;
				jointDef.enableMotor = true;
				return physics.world.CreateJoint(jointDef);
			}

			var FixedRectangle = function(x, y, width, height) {
				var rect;

				bodyDef.type = b2Body.b2_staticBody;
				fixDef.shape = new b2PolygonShape();
				fixDef.shape.SetAsBox(width, height);
				bodyDef.position.Set(x, y);
				rect = physics.world.CreateBody(bodyDef);
				rect.CreateFixture(fixDef);
				
				return rect;
			}

			var TreeTrunk = function(x, y) {
				bodyDef.type = b2Body.b2_dynamicBody;
				fixDef.shape = new b2PolygonShape();
				fixDef.shape.SetAsBox(0.25, 1);
				bodyDef.position.Set(x, y);
				trunk = physics.world.CreateBody(bodyDef);
				trunk.CreateFixture(fixDef);
				return trunk;
			}

			Body.prototype.defaults = {
				shape: "block",
				width: 2,
				height: 2,
				radius: 1
			};

			Body.prototype.defaults = {
				shape: "line",
				width: 0.5,
				height: 1,
				radius: 1
			};

			Body.prototype.fixtureDefaults = {
				density: 1,
				friction: 0.5,
				restitution: 0.2
			};

			Body.prototype.definitionDefaults = {
				active: true,
				allowSleep: true,
				angle: 0,
				angularVelocity: 0,
				awake: true,
				bullet: false,
				fixedRotation: false
			};


			var physics,
				lastFrame = new Date().getTime();

			physics = window.physics = new Physics(canvas);
			// physics.debug();

			// Create some walls
			// new Body(physics, {
			// 	type: "static",
			// 	x: 0,
			// 	y: 0,
			// 	height: 25,
			// 	width: 0.5
			// });
			// new Body(physics, {
			// 	type: "static",
			// 	x: 51,
			// 	y: 0,
			// 	height: 25,
			// 	width: 0.5
			// });
			// new Body(physics, {
			// 	type: "static",
			// 	x: 0,
			// 	y: 0,
			// 	height: 0.5,
			// 	width: 60
			// });
			// var ground = new Body(physics, {
			// 	type: "static",
			// 	x: 0,
			// 	y: 25,
			// 	height: 0.5,
			// 	width: 60
			// });

			var testBody = new Body(physics, {
				x: 12.5,
				y: 14,
				width: 0.25,
				height: 1,
				angle: 2.6
			});
			var tree = new Body(physics, {
				type: 'static',
				x: 10,
				y: 12,
				width: .1,
				height: 12
			});
			// new Body(physics, {
			// 	x: 13,
			// 	y: 8,
			// 	width: 0.25,
			// 	height: 1
			// });
			// new Body(physics, {
			// 	x: 8,
			// 	y: 3,
			// 	width: 0.25,
			// 	height: 1
			// });

			// var tree = FixedRectangle(10, 12, 1, 12);

			var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();

			jointDef.Initialize(tree.body, testBody.body,
				new b2Vec2(11.5, 12.5));

			var DEGTORAD = 3.14 / 180;
			jointDef.enableLimit = true;
			jointDef.lowerAngle = -30 * DEGTORAD;
			jointDef.upperAngle = 30 * DEGTORAD;
			jointDef.enableMotor = true;

			var joint = physics.world.CreateJoint(jointDef);

			// bodyDef.type = b2Body.b2_staticBody;
			// fixDef.shape = new b2PolygonShape();
			// fixDef.shape.SetAsBox(20, 2);
			// bodyDef.position.Set(10, 400 / 30 + 1.8);
			// ground = physics.world.CreateBody(bodyDef);
			// ground.CreateFixture(fixDef);

			// var stump = TreeTrunk(10, 12);
			// var trunk1 = TreeTrunk(10, 10);
			// var trunk2 = TreeTrunk(10, 8);
			// var trunk3 = TreeTrunk(10, 6);
			// var trunk4 = TreeTrunk(10, 4);

			// var tree_joint_1 = TreeJoint(ground, stump);
			// var tree_joint_2 = TreeJoint(stump, trunk1);
			// var tree_joint_3 = TreeJoint(trunk1, trunk2);
			// var tree_joint_4 = TreeJoint(trunk2, trunk3);
			// var tree_joint_5 = TreeJoint(trunk3, trunk4);

			window.gameLoop = function() {
				var ctx = physics.context;
				var tm = new Date().getTime();

				requestAnimationFrame(gameLoop);
				var dt = (tm - lastFrame) / 1000;
				if (dt > 1 / 15) {
					dt = 1 / 15;
				}

				physics.step(dt);
				lastFrame = tm;

				var body = testBody.body;
				var angle = body.GetAngle();
				var x = body.GetPosition().x;
				var y = body.GetPosition().x;

				var canvasRotationCenterX = settings.width / 2;
				var canvasRotationCenterY = settings.height / 2;

				var img = new Image;				
				img.onload = function(){ 
					var objectRotationCenterX = img.width / 2;
					var objectRotationCenterY = img.height / 2;

					ctx.save();
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.setTransform(1, 0, 0, 1, 0, 0);
					ctx.restore();

					ctx.save();
					ctx.translate( canvasRotationCenterX, canvasRotationCenterY );
					ctx.rotate( angle );
					ctx.translate( -objectRotationCenterX, -objectRotationCenterY );
					ctx.drawImage(img, x, y, 20, 20 * img.height / img.width); 
					ctx.restore();
				};
				img.src = "resources/leaf-green.svg";
				// img.width = 250;
				// img.height = 250;
				debugger
				
				// debugger

				// FlexJoint(joint, 200);
				// FlexJoint(tree_joint_2, 800);
				// FlexJoint(tree_joint_3, 600);
				// FlexJoint(tree_joint_4, 400);
				// FlexJoint(tree_joint_5, 200);
			};

			requestAnimationFrame(gameLoop);
		}
	}
	/*
			me.gameElements = [];
			me.gameElements.lines = [];
			me.drawContext = {};
			me.b2 = {};

			me.b2 = {
				vec2: Box2D.Common.Math.b2Vec2,
				bodyDef: Box2D.Dynamics.b2BodyDef,
				body: Box2D.Dynamics.b2Body,
				fixtureDef: Box2D.Dynamics.b2FixtureDef,
				fixture: Box2D.Dynamics.b2Fixture,
				world: Box2D.Dynamics.b2World,
				massData: Box2D.Collision.Shapes.b2MassData,
				polygonShape: Box2D.Collision.Shapes.b2PolygonShape,
				circleShape: Box2D.Collision.Shapes.b2CircleShape,
				debugDraw: Box2D.Dynamics.b2DebugDraw
			};

			me.b2.world = new me.b2.world(
				new me.b2.vec2(settings.gravityX, settings.gravityY) //gravity
				, true //allow sleep
			);

			var fixDef = me.b2.fixDef = new me.b2.fixtureDef;
			fixDef.density = 1.0;
			fixDef.friction = 0.5;
			fixDef.restitution = 0.2;

			var bodyDef = me.b2.bodyDef = new me.b2.bodyDef;

			//create ground
			bodyDef.type = me.b2.body.b2_staticBody;
			bodyDef.position.x = 1;
			bodyDef.position.y = (settings.height / settings.scale) - 10;
			console.log('bodyDef.position.y', (settings.height / settings.scale) - 10);
			fixDef.shape = new me.b2.polygonShape;
			fixDef.shape.SetAsBox(10, 1);
			me.b2.world.CreateBody(bodyDef).CreateFixture(fixDef);

			//create some objects
			me.createSomeObjects();

			//setup debug draw
			var debugDraw = new me.b2.debugDraw();
			// debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
			debugDraw.SetSprite(canvas.getContext("2d"));
			debugDraw.SetDrawScale(settings.scale);
			// debugDraw.SetFillAlpha(0.3);
			// debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(me.b2.debugDraw.e_shapeBit | me.b2.debugDraw.e_jointBit);
			me.b2.world.SetDebugDraw(debugDraw);

			// window.setInterval(me.update, 1000 / 60);
			window.setInterval(function() {
				var lastElement = me.gameElements.lines.pop(),
					lastElementPosition, newLength;
				console.log('Step');

				me.b2.world.Step(
					1 / 60 //frame-rate
					, 10 //velocity iterations
					, 10 //position iterations
				);
				me.b2.world.DrawDebugData();
				// me.b2.world.ClearForces();

				// me.createSomeObjects();
			}, 1000 / 60);


		},
		createSomeObjects: function() {
			console.log('createSomeObjects');
			var me = this;

			var fixDef = me.b2.fixDef;

			var bodyDef = me.b2.bodyDef;
			bodyDef.type = me.b2.body.b2_dynamicBody;

			for (var i = 0; i < 10; ++i) {
				if (Math.random() > 0.5) {
					fixDef.shape = new me.b2.polygonShape;
					fixDef.shape.SetAsBox(
						Math.random() + 0.1 //half width
						, Math.random() + 0.1 //half height
					);
				} else {
					fixDef.shape = new me.b2.circleShape(
						Math.random() + 0.1 //radius
					);
				}
				bodyDef.position.x = Math.random() * 10;
				bodyDef.position.y = Math.random() * 10;
				me.b2.world.CreateBody(bodyDef).CreateFixture(fixDef);
			}
			*/


	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
		this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new GreenStemVis(this, options));
			}
		});

		// chain jQuery functions
		return this;
	};

})(jQuery, window, document);