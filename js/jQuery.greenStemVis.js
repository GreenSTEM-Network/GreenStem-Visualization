;
(function($, window, document, undefined) {

	var pluginName = "greenStemVis",
		defaults = {
			gravityX: 3,
			gravityY: 10,
			width: 1024,
			height: 750,
			scale: 20,
			host: 'https://solarsunflower.herokuapp.com',
			treeImg: 'resources/tree-12branches.svg',
			treeWidth: 400,
			treeHeight: 550,
			branches: 6,
			leaves: [{
				x: 7.1,
				y: 12,
				a: 0.5,
				size: 16,
				mirrorX: true,
				siteId: 1
			},{
				x: 5.4,
				y: 11.45,
				a: 4.5,
				size: 16,
				siteId: 1
			},{
				x: 5.13,
				y: 12.68,
				a: 3.9,
				size: 16,
				siteId: 1
			},{
				x: 3.325,
				y: 12.6,
				a: 4.8, 
				size: 16,
				mirrorX: true,
				siteId: 1
			},{
				x: 2.85,
				y: 12.45,
				a: 5.91,
				size: 16,
				mirrorX: true,
				siteId: 1
			},{
				x: 1.65,
				y: 11.78,
				a: 6,
				size: 25,
				mirrorX: true,
				siteId: 1
			},{
				x: 5.7,
				y: 8.2,
				a: .9, 
				size: 16,
				mirrorX: true,
				siteId: 2
			},{
				x: 4.43,
				y: 6.84,
				a: 4.9, 
				size: 16,
				siteId: 2
			},{
				x: 5.25,
				y: 9.15,
				a: 4.2, 
				size: 16,
				siteId: 2
			},{
				x: 3.63,
				y: 8.09,
				a: 5, 
				size: 16,
				mirrorX: true,
				siteId: 2
			},{
				x: 3.23,
				y: 7.82,
				a: 5.9, 
				size: 16,
				mirrorX: true,
				siteId: 2
			},{
				x: 2.6,
				y: 6.7,
				a: 0, 
				size: 25,
				mirrorX: true,
				siteId: 2
			},{
				x: 7.45,
				y: 4.7,
				a: 0.3, 
				size: 16,
				mirrorX: true,
				siteId: 3
			},{
				x: 6.82,
				y: 2.65,
				a: 4.8, 
				size: 16,
				siteId: 3
			},{
				x: 7.25,
				y: 2,
				a: 5.1, 
				size: 16,
				siteId: 3
			},{
				x: 9.2,
				y: 4.2,
				a: 1.5, 
				size: 16,
				mirrorX: true,
				siteId: 3
			},{
				x: 9.76,
				y: 5.91,
				a: 5.7, 
				size: 16,
				siteId: 3
			},{
				x: 8.2,
				y: 2.8,
				a: 1.4, 
				size: 25,
				mirrorX: true,
				siteId: 3
			},{
				x: 12.11,
				y: 6,
				a: 1.2, 
				size: 16,
				mirrorX: true,
				siteId: 4
			},{
				x: 13.15,
				y: 5.2,
				a: 5.4, 
				size: 16,
				siteId: 4
			},{
				x: 15.1,
				y: 5.3,
				a: 2.2, 
				size: 16,
				mirrorX: true,
				siteId: 4
			},{
				x: 15.42,
				y: 6.42,
				a: 2, 
				size: 16,
				mirrorX: true,
				siteId: 4
			},{
				x: 12.75,
				y: 8.05,
				a: 0.3, 
				size: 16,
				siteId: 4
			},{
				x: 15.1,
				y: 4.1,
				a: 6, 
				size: 25,
				siteId: 4
			},{
				x: 14.6,
				y: 8.62,
				a: 5.8, 
				size: 16,
				siteId: 5
			},{
				x: 15.35,
				y: 8.11,
				a: 1.3,
				size: 16,
				mirrorX: true,
				siteId: 5
			},{
				x: 16.89,
				y: 8.6,
				a: 2.8, 
				size: 16,
				mirrorX: true,
				siteId: 5
			},{
				x: 17.58,
				y: 8.25,
				a: 1.2, 
				size: 16,
				siteId: 5
			},{
				x: 17.85,
				y: 7.85,
				a: .1, 
				size: 16,
				siteId: 5
			},{
				x: 17.58,
				y: 7,
				a: 1.6, 
				size: 25,
				mirrorX: true,
				siteId: 5
			},{
				x: 15.6,
				y: 11.4,
				a: 2, 
				size: 16,
				mirrorX: true,
				siteId: 6
			},{
				x: 16.91,
				y: 12.47,
				a: 1.2, 
				size: 16,
				siteId: 6
			},{
				x: 16.6,
				y: 12.67,
				a: 3.6, 
				size: 16,
				mirrorX: true,
				siteId: 6
			},{
				x: 14.9,
				y: 12.72,
				a: 1, 
				size: 16,
				siteId: 6
			},{
				x: 13.55,
				y: 12.8,
				a: 1.5, 
				size: 16,
				siteId: 6
			},{
				x: 18.2,
				y: 12.1,
				a: 2.7, 
				size: 25,
				mirrorX: true,
				siteId: 6
			},{
				x: 4.22,
				y: 5.2,
				a: 4, 
				size: 16,
				siteId: 7
			},{
				x: 3.8,
				y: 4.35,
				a: 0, 
				size: 16,
				mirrorX: true,
				siteId: 7
			},{
				x: 5.35,
				y: 4,
				a: 5.1, 
				size: 16,
				siteId: 7
			},{
				x: 5.7,
				y: 4.25,
				a: 5.8, 
				size: 16,
				siteId: 7
			},{
				x: 6.45,
				y: 5.45,
				a: .8, 
				size: 16,
				mirrorX: true,
				siteId: 7
			},{
				x: 3.8,
				y: 2.6,
				a: 4.7, 
				size: 25,
				siteId: 7
			},{
				x: 10.9,
				y: 4.2,
				a: 5.2, 
				size: 16,
				siteId: 8
			},{
				x: 11.62,
				y: 1,
				a: 5, 
				size: 16,
				siteId: 8
			},{
				x: 12.2,
				y: 1.6,
				a: 1.3, 
				size: 16,
				mirrorX: true,
				siteId: 8
			},{
				x: 13.4,
				y: 2.2,
				a: 2.5, 
				size: 16,
				mirrorX: true,
				siteId: 8
			},{
				x: 12.95,
				y: 3.25,
				a: 1.9, 
				size: 16,
				mirrorX: true,
				siteId: 8
			},{
				x: 13.5,
				y: .95,
				a: 2.1, 
				size: 25,
				mirrorX: true,
				siteId: 8
			},{
				x: 15,
				y: 10,
				a: 0, 
				size: 16,
				siteId: 9
			},{
				x: 16.2,
				y: 9.9,
				a: 1.1, 
				size: 16,
				mirrorX: true,
				siteId: 9
			},{
				x: 16.6,
				y: 9.9,
				a: 1.8, 
				size: 16,
				mirrorX: true,
				siteId: 9
			},{
				x: 17.25,
				y: 11.1,
				a: 1.1, 
				size: 16,
				siteId: 9
			},{
				x: 13.5,
				y: 11.2,
				a: 2.4, 
				size: 16,
				mirrorX: true,
				siteId: 9
			},{
				x: 18,
				y: 10.5,
				a: 2.6, 
				size: 25,
				mirrorX: true,
				siteId: 9
			},{
				x: 5.7,
				y: 10.5,
				a: 3.8, 
				size: 16,
				siteId: 10
			},{
				x: 3.85,
				y: 10.5,
				a: 5.6, 
				size: 16,
				mirrorX: true,
				siteId: 10
			},{
				x: 2,
				y: 10.35,
				a: 5.3, 
				size: 16,
				mirrorX: true,
				siteId: 10
			},{
				x: 1.9,
				y: 9.1,
				a: 4.7, 
				size: 16,
				siteId: 10
			},{
				x: 4,
				y: 9.3,
				a: 4.3, 
				size: 16,
				siteId: 10
			},{
				x: 1.5,
				y: 9.9,
				a: 6, 
				size: 25,
				mirrorX: true,
				siteId: 10
			},{
				x: 14.2,
				y: 13.9,
				a: 2.2, 
				size: 16,
				mirrorX: true,
				siteId: 11
			},{
				x: 15.7,
				y: 14.15,
				a: 1.9, 
				size: 16,
				mirrorX: true,
				siteId: 11
			},{
				x: 14.45,
				y: 14.9,
				a: 1.2, 
				size: 16,
				siteId: 11
			},{
				x: 13.1,
				y: 14.2,
				a: 3.5, 
				size: 16,
				mirrorX: true,
				siteId: 11
			},{
				x: 12.4,
				y: 14.3,
				a: 3.7, 
				size: 16,
				mirrorX: true,
				siteId: 11
			},{
				x: 16.6,
				y: 14.7,
				a: .6, 
				size: 25,
				siteId: 11
			},{
				x: 8.25,
				y: 15.21,
				a: 2.6, 
				size: 16,
				siteId: 12
			},{
				x: 7.7,
				y: 15.3,
				a: 5.2, 
				size: 16,
				mirrorX: true,
				siteId: 12
			},{
				x: 5,
				y: 15.84,
				a: 3.6, 
				size: 16,
				siteId: 12
			},{
				x: 5.7,
				y: 15,
				a: 4.9, 
				size: 16,
				siteId: 12
			},{
				x: 6.4,
				y: 14,
				a: 4.4, 
				size: 16,
				siteId: 12
			},{
				x: 4.2,
				y: 14.75,
				a: 4, 
				size: 25,
				siteId: 12
			}]
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
			var me = this,
				settings = me.settings,
				stage = new Kinetic.Stage({
					width: settings.width,
					height: settings.height,
					container: me.element
				}),
				layer = new Kinetic.Layer(),
				$element = $(me.element),
				canvas = layer.getCanvas(),
				testLeaf = true,
				b2BodyDef = Box2D.Dynamics.b2BodyDef,
				b2Body = Box2D.Dynamics.b2Body,
				b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
				b2Fixture = Box2D.Dynamics.b2Fixture,
				b2JointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
				b2World = Box2D.Dynamics.b2World,
				b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
				b2Vec2 = Box2D.Common.Math.b2Vec2,
				b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
				branchOutlines = [],
				siteNames = [];

			Date.prototype.format = function(format) //author: meizz
			{
				var o = {
					"M+": this.getMonth() + 1, //month
					"d+": this.getDate(), //day
					"h+": this.getHours(), //hour
					"m+": this.getMinutes(), //minute
					"s+": this.getSeconds(), //second
					"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
					"S": this.getMilliseconds() //millisecond
				}

				if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(format))
						format = format.replace(RegExp.$1,
							RegExp.$1.length == 1 ? o[k] :
							("00" + o[k]).substr(("" + o[k]).length));
				return format;
			};

			$.getJSON(settings.host + "/public/summary.json", function(data) {
				$.each(data.readings, function(dataIndex, value) {
					var dateStr = new Date(value.collection_time).format("yyyy-MM-dd h:mm:ss"),
						siteName = value.site_name,
						statusNames = value.status_names;

					siteNames[dataIndex] = siteName;

					$.each(statusNames, function(index, value) {
						if (value == 'GREEN') {
							imgSrc = 'resources/leaf-green.svg';
						} else if (value == 'YELLOW') {
							imgSrc = 'resources/leaf-yellow.svg';
						} else if (value == 'RED') {
							imgSrc = 'resources/leaf-red.svg';
						} else {
							imgSrc = 'resources/leaf-brown.svg';
						}
					});
				});
			});

			var Physics = window.Physics = function(element, scale) {
				var me = this,
					gravity = new b2Vec2(settings.gravityX, settings.gravityY);

				me.world = new b2World(gravity),
				me.context = element.getContext("2d"),
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

			physics.debug();

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

			var initTree = function() {
				var treeImage = new Image;

				treeImage.onload = function() {
					layer.add(new Kinetic.Image({
						x: 0,
						y: -13,
						width: settings.treeWidth,
						height: settings.treeHeight,
						image: treeImage
					}))
				}
				treeImage.src = settings.treeImg;
			};

			var initBranchOutlines = function() {
				var i = 0;

				for (; i < settings.branches; i++) {
					branchOutlines[i] = {
						image: new Image
					}

					branchOutlines[i].image.src = 'resources/outline-branch' + (i + 1) + '.svg';

					branchOutlines[i].kineticImage = new Kinetic.Image({
						x: 0,
						y: -13,
						width: settings.treeWidth,
						height: settings.treeHeight,
						image: branchOutlines[i].image,
						visible: false
					});

					layer.add(branchOutlines[i].kineticImage);
				}
			};

			var setImageForSite = function(siteId, leafImage) {
				for (var i = 0; i < leaves.length; i++) {
					if (leaves[i].siteId == siteId) {
						leaves[i].kineticImage.setImage(leafImage);
					}
				}
			};

			var text = new Kinetic.Text({
				x: 10,
				y: 10 + settings.treeHeight,
				fontFamily: 'Calibri',
				fontSize: 24,
				text: '',
				fill: 'black'
			});

			var initLeaf = function(leaf, isTest) {
				leaf.b = new Body(physics, {
					x: leaf.x,
					y: leaf.y,
					width: 0.2,
					height: 0.2,
					angle: leaf.a
				});

				if (!isTest) {
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

				var outlineLeaf = new Image;
				var greenLeaf = new Image;

				greenLeaf.onload = function() {
					if (leaf.kineticImage) {
						leaf.kineticImage.destroy();
					}
					leaf.kineticImage = new Kinetic.Image({
						x: leaf.x * settings.scale,
						y: leaf.y * settings.scale,
						width: leaf.size,
						height: leaf.size,
						image: greenLeaf,
						offset: {
							x: 0,
							y: leaf.size
						}
					});

					leaf.kineticImage.rotate(leaf.a * (180 / Math.PI));

					// add the shape to the layer
					layer.add(leaf.kineticImage);

					stage.add(layer);

					leaf.kineticImage.cache();
					leaf.kineticImage.filters([Kinetic.Filters.Grayscale]);

					leaf.kineticImage.on('mouseover', function() {
						setImageForSite(leaf.siteId, outlineLeaf);
						branchOutlines[leaf.siteId - 1].kineticImage.show();
						text.setText(siteNames[leaf.siteId - 1] ? siteNames[leaf.siteId - 1] : '');
						layer.draw();
					});

					leaf.kineticImage.on('mouseout', function() {
						setImageForSite(leaf.siteId, greenLeaf);
						branchOutlines[leaf.siteId - 1].kineticImage.hide();
						text.setText('');
						layer.draw();
					});

					outlineLeaf.src = "resources/outlined-leaf-green.svg";
				}

				greenLeaf.src = "resources/leaf-green.svg";
			};

			initTree();
			initBranchOutlines();

			layer.add(text);

			for (var i = 0; i < leaves.length; i++) {
				initLeaf(leaves[i]);
			}

			if (testLeaf) {
				testLeaf = {
					x: parseFloat($('#x').val()),
					y: parseFloat($('#y').val()),
					a: parseFloat($('#angle').val()),
					size: parseFloat($('#size').val()),
					mirrorX: $('#flip').prop('checked')
				};

				initLeaf(testLeaf, true);
			}

			var animateLeaf = function(leaf, ctx) {
				var angle, body, x, y, img, canvasRotationCenterX, canvasRotationCenterY;

				if (leaf.joint) {
					var joint_angle = leaf.joint.GetJointAngle() * (180 / 3.14);

					if (Math.abs(joint_angle) > 0.2) {
						var rando = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
						leaf.joint.SetMaxMotorTorque(rando * Math.abs(joint_angle / 30));
						leaf.joint.SetMotorSpeed(-joint_angle / 30);
					}
					body = leaf.b.body;
					angle = body.GetAngle();
				} else {
					angle = leaf.a;
				}

				img = leaf.img;

				x = leaf.x * settings.scale;
				y = leaf.y * settings.scale;

				if (leaf.kineticImage) {
					leaf.kineticImage.rotation(angle * (180 / Math.PI));
					if (leaf.mirrorX) {
						leaf.kineticImage.scale({
							x: -1,
							y: 1
						});
					}
				}
			}

			$('#controls').find('input').change(function() {
				initLeaf(testLeaf, true);
			});

			window.gameLoop = function() {
				var ctx = physics.context;
				var tm = new Date().getTime();
				var dt = (tm - lastFrame) / 1000;
				var body, angle, canvasRotationCenterX, canvasRotationCenterY, img;

				if (dt > 1 / 15) {
					dt = 1 / 15;
				}

				physics.step(dt);
				lastFrame = tm;

				for (var i = 0; i < leaves.length; i++) {
					animateLeaf(leaves[i], ctx);
				}

				if (testLeaf) {
					testLeaf.x = parseFloat($('#x').val());
					testLeaf.y = parseFloat($('#y').val());
					testLeaf.a = parseFloat($('#angle').val());
					testLeaf.size = parseFloat($('#size').val());
					testLeaf.mirrorX = $('#flip').prop('checked');

					animateLeaf(testLeaf, ctx);
				}

				layer.draw();

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