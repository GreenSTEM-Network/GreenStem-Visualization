;
(function($, window, document, undefined) {

	var pluginName = "greenStemVis",
		defaults = {
			gravityX: 3.5,
			gravityY: 3.5,
			width: 1024,
			height: 750,
			scale: 20,
			host: 'https://solarsunflower.herokuapp.com',
			treeImg: 'resources/tree-6branches.svg',
			treeWidth: 400,
			treeHeight: 400,
			leaves: [{
				x: 7.2,
				y: 11.9,
				a: 5,
				size: 16,
				siteId: 1
			},{
				x: 5.3,
				y: 11.57,
				a: 4.8,
				size: 16,
				siteId: 1
			}/*,{
				x: 5.5,
				y: 7.4,
				a: 2.1,
				size: 15
			},{
				x: 7.5,
				y: 7.4,
				a: 2.8,
				size: 15
			},{
				x: 9.5,
				y: 7.2,
				a: 1.3,
				size: 20
			}
*/]
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
				canvas = $canvas[0],
				testLeaf = true;

			Date.prototype.format = function(format) //author: meizz
				{
				  var o = {
				    "M+" : this.getMonth()+1, //month
				    "d+" : this.getDate(),    //day
				    "h+" : this.getHours(),   //hour
				    "m+" : this.getMinutes(), //minute
				    "s+" : this.getSeconds(), //second
				    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
				    "S" : this.getMilliseconds() //millisecond
				  }

				  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
				    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
				  for(var k in o)if(new RegExp("("+ k +")").test(format))
				    format = format.replace(RegExp.$1,
				      RegExp.$1.length==1 ? o[k] :
				        ("00"+ o[k]).substr((""+ o[k]).length));
				  return format;
				};

			// $.getJSON( settings.host + "/public/summary.json", function( data ) {
   //              $.each(data.readings, function( index, value ) {
			// 		var dateStr = new Date(value.collection_time).format("yyyy-MM-dd h:mm:ss"),
			// 			siteName = value.site_name,
			// 			statusNames = value.status_names,
			// 			$siteContainer = $('<div>' + siteName + '</div>'),
			// 			$readingsContainer = $('<table></table>'),
			// 			imgSrc, $readingsRow;

			// 		$readingsRow = $readingsContainer.append('<tr></tr>');

			// 		$.each(statusNames, function( index, value ) {
			// 			if(value == 'GREEN') {
			// 				imgSrc = 'resources/leaf-green.svg';
			// 			}
			// 			else if(value == 'YELLOW') {
			// 				imgSrc = 'resources/leaf-yellow.svg';
			// 			}
			// 			else if(value == 'RED') {
			// 				imgSrc = 'resources/leaf-red.svg';
			// 			}
			// 			else {
			// 				imgSrc = 'resources/leaf-brown.svg';
			// 			}
			// 			// $siteContainer.append('<img src="' + imgSrc + '" width="50"></img>');
			// 			$readingsRow.append('<td><img src="' + imgSrc + '" width="50"></img></td>');
			// 		});

			// 		$readingsContainer.append($readingsRow);
			// 		$siteContainer.append($readingsContainer);
			// 		$textContainer.append($siteContainer);
			// 	});	
   //          });
			
			var b2Vec2 = Box2D.Common.Math.b2Vec2,
				b2BodyDef = Box2D.Dynamics.b2BodyDef,
				b2Body = Box2D.Dynamics.b2Body,
				b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
				b2Fixture = Box2D.Dynamics.b2Fixture,
				b2JointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
				b2World = Box2D.Dynamics.b2World,
				// b2MassData = Box2D.Collision.Shapes.b2MassData,
				b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
				// b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
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
				fixDef = new b2FixtureDef(),
				jointDef = new b2JointDef();

			// var FlexJoint = function(joint, multiplier) {
			// 	joint_angle = joint.GetJointAngle() * (180 / 3.14);
			// 	if (Math.abs(joint_angle) > 0.2) {
			// 		joint.SetMaxMotorTorque(multiplier * Math.abs(joint_angle / 30));
			// 		joint.SetMotorSpeed(-joint_angle / 30);
			// 	}
			// }

			// var TreeJoint = function(bodyA, bodyB) {
			// 	var DEGTORAD = 3.14 / 180,
			// 		jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();

			// 	jointDef.bodyA = bodyA;
			// 	jointDef.bodyB = bodyB;
			// 	jointDef.localAnchorA.Set(0, -1);
			// 	if (bodyA == ground) {
			// 		jointDef.localAnchorA.Set(0, -2);
			// 	}
			// 	jointDef.localAnchorB.Set(0, 1);
			// 	jointDef.enableLimit = true;
			// 	jointDef.lowerAngle = -30 * DEGTORAD;
			// 	jointDef.upperAngle = 30 * DEGTORAD;
			// 	jointDef.enableMotor = true;
			// 	return physics.world.CreateJoint(jointDef);
			// }

			// var FixedRectangle = function(x, y, width, height) {
			// 	var rect;

			// 	bodyDef.type = b2Body.b2_staticBody;
			// 	fixDef.shape = new b2PolygonShape();
			// 	fixDef.shape.SetAsBox(width, height);
			// 	bodyDef.position.Set(x, y);
			// 	rect = physics.world.CreateBody(bodyDef);
			// 	rect.CreateFixture(fixDef);
				
			// 	return rect;
			// }

			// var TreeTrunk = function(x, y) {
			// 	bodyDef.type = b2Body.b2_dynamicBody;
			// 	fixDef.shape = new b2PolygonShape();
			// 	fixDef.shape.SetAsBox(0.25, 1);
			// 	bodyDef.position.Set(x, y);
			// 	trunk = physics.world.CreateBody(bodyDef);
			// 	trunk.CreateFixture(fixDef);
			// 	return trunk;
			// }

			// Body.prototype.defaults = {
			// 	shape: "block",
			// 	width: 2,
			// 	height: 2,
			// 	radius: 1
			// };

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

			var tree = new Body(physics, {
				type: 'static',
				x: settings.treeWidth / 2 / settings.scale,
				y: 1,
				width: .1,
				height: 1
			});
			
			var leaves = settings.leaves, 
				jointDef,
				DEGTORAD;

			var initLeaf = function(leaf, isTest) {
				leaf.b = new Body(physics, {
					x: leaf.x,
					y: leaf.y,
					width: 0.25,
					height: 1,
					angle: leaf.a
				});

				if(!isTest) {
					jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
					jointDef.Initialize(tree.body, leaf.b.body, 
						new b2Vec2(leaf.x + 0.5, leaf.y - 0.5));
					jointDef.enableLimit = true;
					jointDef.enableMotor = true;
					DEGTORAD = 3.14 / 180;
					// DEGTORAD = leaves[i].a / 180;
					jointDef.lowerAngle = -50 * DEGTORAD;
					jointDef.upperAngle = 50 * DEGTORAD;

					leaf.joint = physics.world.CreateJoint(jointDef);
				}

				leaf.img = new Image;
				leaf.img.src = "resources/leaf-green.svg";
			}
 
			for(var i = 0; i < leaves.length; i++) {
				initLeaf(leaves[i]);
			}

			if(testLeaf) {
				testLeaf = {
					x: parseFloat($('#x').val()),
					y: parseFloat($('#y').val()),
					a: parseFloat($('#angle').val()),
					size: parseFloat($('#size').val())
				};

				initLeaf(testLeaf, true);
			}

			var treeImg = new Image;
			treeImg.src = settings.treeImg;

			var animateLeaf = function(leaf, ctx) {
				var angle, body, x, y, img, canvasRotationCenterX, canvasRotationCenterY;

				if(leaf.joint) {
					var joint_angle = leaf.joint.GetJointAngle() * (180 / 3.14);

					if( Math.abs(joint_angle) > 0.2 ) {
						var rando = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
				        leaf.joint.SetMaxMotorTorque( rando * Math.abs( joint_angle / 30 ) );
				        leaf.joint.SetMotorSpeed( -joint_angle / 30 );
				    }
				    body = leaf.b.body;
				    angle = body.GetAngle();
				}
				else {
					angle = leaf.a;
				}

				img = leaf.img;

				x = leaf.x * settings.scale;
				y = leaf.y * settings.scale;

				canvasRotationCenterX = 0 + x;
				canvasRotationCenterY = 0 + y + (img.height * 2.2);

				ctx.save();
				ctx.translate( canvasRotationCenterX, canvasRotationCenterY);
				ctx.rotate( angle );
				ctx.translate( -canvasRotationCenterX, -canvasRotationCenterY );
				ctx.drawImage(img, x, y, leaf.size, leaf.size * img.height / img.width); 
				ctx.restore();

				//Show rotation point
				// ctx.fillRect(canvasRotationCenterX, canvasRotationCenterY, 5, 5);
			}

			$('#controls').find('input').change(function() {
				console.log('leaf changed');
				initLeaf(testLeaf, true);
			});

			window.gameLoop = function() {

				var ctx = physics.context;
				var tm = new Date().getTime();
				var dt = (tm - lastFrame) / 1000;
				var body, angle, canvasRotationCenterX, canvasRotationCenterY, img;
			    
			    if(dt > 1/15) { 
			    	dt = 1/15; 
			    }
			    
			    physics.step(dt);
			    lastFrame = tm;

			    ctx.save();
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(treeImg, 0, 0, settings.treeWidth, settings.treeHeight * treeImg.height / treeImg.width); 
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.restore();

				for(var i = 0; i < leaves.length; i++) {
					animateLeaf(leaves[i], ctx);
				}

				if(testLeaf) {
					testLeaf.x = parseFloat($('#x').val());
					testLeaf.y = parseFloat($('#y').val());
					testLeaf.a = parseFloat($('#angle').val());
					testLeaf.size = parseFloat($('#size').val());

					animateLeaf(testLeaf, ctx);
				}

				/*
				var body = testBody.body;
				// var angle = body.GetAngle() + parseFloat($('#angle').val());
				var angle = parseFloat($('#angle').val());
				// var x = body.GetPosition().x;
				var x = parseFloat($('#x').val());
				// var y = body.GetPosition().y;
				var y = parseFloat($('#y').val());

				var canvasRotationCenterX = 0 + x;
				var canvasRotationCenterY = 0 + y + (img.height * 2.2);
				*/
				requestAnimationFrame(gameLoop);
			};

			requestAnimationFrame(gameLoop);
		}
	}

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