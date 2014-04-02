;
(function($, window, document, undefined) {
	var pluginName = "greenStemVis",
		defaults = {
			gravityX: 3,
			gravityY: 25,
			width: 1024,
			height: 750,
			scale: 20,
			host: 'https://solarsunflower.herokuapp.com',
			soilGrassImgSrc: 'img/soil-grass.svg',
			treeWidth: 400,
			treeHeight: 550,
			treeGroundStartPct: 0.745,
			treeGrassStartPct: 0.715,
			cloudImgSrc: ['img/cloud1.svg', 'img/cloud2.svg', 'img/cloud3.svg'],
			cloudCount: 6,
			cloudSpeedDivisor: 15,
			cloudMinX: 0,
			cloudMaxX: 300,
			cloudMinY: 0,
			cloudMaxY: 150,
			sunImgSrc: 'img/sun.svg',
			sunWidth: 300,
			sunHeight: 125,
			idealVoltage: 3200,
			textMargin: 5,
			branches: [
				//Branch 1
				[{
					x: 1.65,
					y: 11.78,
					a: 6,
					size: 25,
					mirrorX: true
				},{
					x: 2.85,
					y: 12.45,
					a: 5.91,
					size: 16,
					mirrorX: true
				},{
					x: 3.325,
					y: 12.6,
					a: 4.8,
					size: 16,
					mirrorX: true
				},{
					x: 5.13,
					y: 12.68,
					a: 3.9,
					size: 16
				},{
					x: 5.4,
					y: 11.45,
					a: 4.5,
					size: 16
				},{
					x: 7.1,
					y: 12,
					a: 0.5,
					size: 16,
					mirrorX: true
				}],
				//Branch 2
				[{
					x: 2.6,
					y: 6.7,
					a: 0,
					size: 25,
					mirrorX: true
				}, {
					x: 3.23,
					y: 7.82,
					a: 5.9,
					size: 16,
					mirrorX: true
				}, {
					x: 3.63,
					y: 8.09,
					a: 5,
					size: 16,
					mirrorX: true
				}, {
					x: 4.43,
					y: 6.84,
					a: 4.9,
					size: 16
				}, {
					x: 5.25,
					y: 9.15,
					a: 4.2,
					size: 16
				}, {
					x: 5.7,
					y: 8.2,
					a: .9,
					size: 16,
					mirrorX: true
				}],
				//Branch 3
				[{
					x: 8.2,
					y: 2.8,
					a: 1.4,
					size: 25,
					mirrorX: true
				}, {
					x: 7.25,
					y: 2,
					a: 5.1,
					size: 16
				}, {
					x: 6.82,
					y: 2.65,
					a: 4.8,
					size: 16
				}, {
					x: 9.2,
					y: 4.2,
					a: 1.5,
					size: 16,
					mirrorX: true
				}, {
					x: 7.45,
					y: 4.7,
					a: 0.3,
					size: 16,
					mirrorX: true
				}, {
					x: 9.76,
					y: 5.91,
					a: 5.7,
					size: 16
				}],
				//Branch 4
				[{
					x: 15.1,
					y: 4.1,
					a: 6,
					size: 25
				}, {
					x: 15.1,
					y: 5.3,
					a: 2.2,
					size: 16,
					mirrorX: true
				}, {
					x: 15.42,
					y: 6.42,
					a: 2,
					size: 16,
					mirrorX: true
				}, {
					x: 13.15,
					y: 5.2,
					a: 5.4,
					size: 16
				}, {
					x: 12.11,
					y: 6,
					a: 1.2,
					size: 16,
					mirrorX: true
				}, {
					x: 12.75,
					y: 8.05,
					a: 0.3,
					size: 16
				}],
				//Branch 5
				[{
					x: 17.58,
					y: 7,
					a: 1.6,
					size: 25,
					mirrorX: true
				}, {
					x: 17.85,
					y: 7.85,
					a: .1,
					size: 16
				}, {
					x: 17.58,
					y: 8.25,
					a: 1.2,
					size: 16
				}, {
					x: 16.89,
					y: 8.6,
					a: 2.8,
					size: 16,
					mirrorX: true
				}, {
					x: 14.6,
					y: 8.62,
					a: 5.8,
					size: 16
				}, {
					x: 15.35,
					y: 8.11,
					a: 1.3,
					size: 16,
					mirrorX: true
				}],
				//Branch 6
				[{
					x: 18.2,
					y: 12.1,
					a: 2.7,
					size: 25,
					mirrorX: true
				}, {
					x: 16.79,
					y: 12.35,
					a: .9,
					size: 16
				}, {
					x: 16.6,
					y: 12.5,
					a: 3.6,
					size: 16,
					mirrorX: true
				}, {
					x: 15.6,
					y: 11.4,
					a: 2,
					size: 16,
					mirrorX: true
				}, {
					x: 14.9,
					y: 12.72,
					a: 1,
					size: 16
				}, {
					x: 13.55,
					y: 12.8,
					a: 1.5,
					size: 16
				// }],
				// [{
				// 	x: 4.22,
				// 	y: 5.2,
				// 	a: 4,
				// 	size: 16
				// }, {
				// 	x: 3.8,
				// 	y: 4.35,
				// 	a: 0,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 5.35,
				// 	y: 4,
				// 	a: 5.1,
				// 	size: 16
				// }, {
				// 	x: 5.7,
				// 	y: 4.25,
				// 	a: 5.8,
				// 	size: 16
				// }, {
				// 	x: 6.45,
				// 	y: 5.45,
				// 	a: .8,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 3.8,
				// 	y: 2.6,
				// 	a: 4.7,
				// 	size: 25
				// }],
				// [{
				// 	x: 10.9,
				// 	y: 4.2,
				// 	a: 5.2,
				// 	size: 16
				// }, {
				// 	x: 11.62,
				// 	y: 1,
				// 	a: 5,
				// 	size: 16
				// }, {
				// 	x: 12.2,
				// 	y: 1.6,
				// 	a: 1.3,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 13.4,
				// 	y: 2.2,
				// 	a: 2.5,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 12.95,
				// 	y: 3.25,
				// 	a: 1.9,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 13.5,
				// 	y: .95,
				// 	a: 2.1,
				// 	size: 25,
				// 	mirrorX: true
				// }],
				// [{
				// 	x: 15,
				// 	y: 10,
				// 	a: 0,
				// 	size: 16
				// }, {
				// 	x: 16.2,
				// 	y: 9.9,
				// 	a: 1.1,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 16.6,
				// 	y: 9.9,
				// 	a: 1.8,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 17.25,
				// 	y: 11.1,
				// 	a: 1.1,
				// 	size: 16
				// }, {
				// 	x: 13.5,
				// 	y: 11.2,
				// 	a: 2.4,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 18,
				// 	y: 10.5,
				// 	a: 2.6,
				// 	size: 25,
				// 	mirrorX: true
				// }],
				// [{
				// 	x: 5.7,
				// 	y: 10.5,
				// 	a: 3.8,
				// 	size: 16
				// }, {
				// 	x: 3.85,
				// 	y: 10.5,
				// 	a: 5.6,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 2,
				// 	y: 10.35,
				// 	a: 5.3,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 1.9,
				// 	y: 9.1,
				// 	a: 4.7,
				// 	size: 16
				// }, {
				// 	x: 4,
				// 	y: 9.3,
				// 	a: 4.3,
				// 	size: 16
				// }, {
				// 	x: 1.5,
				// 	y: 9.9,
				// 	a: 6,
				// 	size: 25,
				// 	mirrorX: true
				// }],
				// [{
				// 	x: 14.2,
				// 	y: 13.9,
				// 	a: 2.2,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 15.7,
				// 	y: 14.15,
				// 	a: 1.9,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 14.45,
				// 	y: 14.9,
				// 	a: 1.2,
				// 	size: 16
				// }, {
				// 	x: 13.1,
				// 	y: 14.2,
				// 	a: 3.5,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 12.4,
				// 	y: 14.3,
				// 	a: 3.7,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 16.6,
				// 	y: 14.7,
				// 	a: .6,
				// 	size: 25
				// }],
				// [{
				// 	x: 8.25,
				// 	y: 15.21,
				// 	a: 2.6,
				// 	size: 16
				// }, {
				// 	x: 7.7,
				// 	y: 15.3,
				// 	a: 5.2,
				// 	size: 16,
				// 	mirrorX: true
				// }, {
				// 	x: 5,
				// 	y: 15.84,
				// 	a: 3.6,
				// 	size: 16
				// }, {
				// 	x: 5.7,
				// 	y: 15,
				// 	a: 4.9,
				// 	size: 16
				// }, {
				// 	x: 6.4,
				// 	y: 14,
				// 	a: 4.4,
				// 	size: 16
				// }, {
				// 	x: 4.2,
				// 	y: 14.75,
				// 	a: 4,
				// 	size: 25
				}]
			]
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
				bgLayer = new Kinetic.Layer(),
				overlayLayer = new Kinetic.Layer(),
				leafLayer = new Kinetic.Layer(),
				textLayer = new Kinetic.Layer(),
				$element = $(me.element),
				canvas = layer.getCanvas(),
				testLeaf = false,
				branches = settings.branches,
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
				siteData = [],
				cloudLayers = [],
				jointDef,
				DEGTORAD;

			cloudLayers[0] = new Kinetic.Layer();
			cloudLayers[1] = new Kinetic.Layer();

			bgLayer.clip({
				x: 0,
				y: 0,
				width: settings.treeWidth,
				height: settings.treeHeight
			});

			settings.treeImg = 'img/tree-' + branches.length + 'branches.svg';
			settings.cloudSpeed = settings.gravityY / settings.cloudSpeedDivisor;

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

			var convertStatusNameToImgCfg = function(statusName) {
				if (statusName == 'GREEN') {
					return {normalSrc: 'img/leaf-green.svg', outlineSrc: 'img/outlined-leaf-green.svg'};
				} else if (statusName == 'YELLOW') {
					return {normalSrc: 'img/leaf-yellow.svg', outlineSrc: 'img/outlined-leaf-yellow.svg'};
				} else if (statusName == 'RED') {
					return {normalSrc: 'img/leaf-red.svg', outlineSrc: 'img/outlined-leaf-red.svg'};
				} 
			}

			var Physics = window.Physics = function(element, scale) {
				var me = this,
					gravity = new b2Vec2(settings.gravityX, settings.gravityY);

				me.world = new b2World(gravity),
				me.context = element.getContext("2d"),
				me.scale = scale || settings.scale;

				me.dtRemaining = 0;
				me.stepAmount = 1 / 60;
			};

			Physics.prototype.setGravity = function(x, y) {
				var gravity = new b2Vec2(settings.gravityX, settings.gravityY);
				this.world.SetGravity(gravity);
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

			var tree = new Body(physics, {
				type: 'static',
				x: settings.treeWidth / 2 / settings.scale,
				y: 1,
				width: .1,
				height: 1
			});

			$.getJSON(settings.host + "/public/summary.json", function(data) {
				$.each(data.readings, function(dataIndex, value) {
					var dateStr = new Date(value.collection_time).format("yyyy-MM-dd h:mm:ss"),
						siteName = value.site_name,
						statusNames = value.status_names;

					siteData[dataIndex] = {
						name: siteName,
						readings: [ value.soil1, value.soil2, value.soil3 ],
						temp: value.temp,
						voltage: value.voltage
					};

					branches[dataIndex][0].imgCfg = convertStatusNameToImgCfg(value.average_status_name);
					//Set Sensor 1, Sensor 2 and Sensor 3 Reading
					branches[dataIndex][1].imgCfg = convertStatusNameToImgCfg(statusNames[0]);
					branches[dataIndex][2].imgCfg = convertStatusNameToImgCfg(statusNames[1]);
					branches[dataIndex][3].imgCfg = convertStatusNameToImgCfg(statusNames[2]);
					//Set Voltage Reading
					branches[dataIndex][4].imgCfg = convertStatusNameToImgCfg(value.voltage < settings.idealVoltage ? 'RED' : 'GREEN');
					//Set Temp Reading
					branches[dataIndex][5].imgCfg = convertStatusNameToImgCfg(value.temp ? 'GREEN' : 'RED');
				});

				for (var i = 0; i < branches.length; i++) {
					for (var j = 0; j < branches[i].length; j++) {
						initLeaf(branches[i][j], i);
					}
				}

				settings.gravityY = data.weather[0].currently.windSpeed * 2;
				physics.setGravity(settings.gravityX, settings.gravityY );
				settings.cloudSpeed = settings.gravityY / settings.cloudSpeedDivisor;
			});
			
			var initTree = function() {
				var treeImage = new Image;

				treeImage.onload = function() {
					layer.add(new Kinetic.Image({
						x: 0,
						y: -13,
						width: settings.treeWidth,
						height: settings.treeHeight,
						image: treeImage
					}));

					layer.draw();
				}
				treeImage.src = settings.treeImg;
			};

			var initSky = function() {
				var clouds = [], i = 0,
					skyGradient = new Kinetic.Rect({
						x: 0,
						y: 0,
						width: settings.treeWidth,
						height: settings.treeHeight * settings.treeGroundStartPct,
						fillLinearGradientStartPoint: {x:0, y:0},
			          	fillLinearGradientEndPoint: {x:0,y:200},
			          	fillLinearGradientColorStops: [0, '#92c8e7', 1, '#e3eaf6']
					}),
					sunImg = new Image;

				var initCloud = function(cloud, i, cloudLayer) {
					cloud.img.onload = function() {
						cloud.KineticImage = new Kinetic.Image({
							x: (Math.random() * settings.cloudMaxX) + settings.cloudMinX,
							y: (Math.random() * settings.cloudMaxY) + settings.cloudMinY,
							width: 150,
							height: 50,
							image: cloud.img
						});
						cloudLayer.add(cloud.KineticImage);
					}
				}

				for(; i < settings.cloudCount; i++) {
					for(var j = 0; j < 2; j++) {
						var cloudSrcIndex = Math.floor((Math.random() * 3));

						clouds[i] = { img: new Image };
						initCloud(clouds[i], i, cloudLayers[j]);
						clouds[i].img.src = settings.cloudImgSrc[cloudSrcIndex];
					}
				}

				cloudLayers[1].move({
					x: settings.treeWidth * -1,
					y: 0
				})

				sunImg.onload = function() {
					bgLayer.add(new Kinetic.Image({
						x: settings.treeWidth - settings.sunWidth + 25,
						y: 0,
						width: settings.sunWidth,
						height: settings.sunHeight,
						image: sunImg
					}))

					bgLayer.draw();
				}

				sunImg.src = settings.sunImgSrc;

				bgLayer.add(skyGradient);
			};

			var initGround = function() {
				var groundGradient = new Kinetic.Rect({
		          x: 0,
		          y: settings.treeHeight * settings.treeGroundStartPct,
		          width: settings.treeWidth,
		          height: 125,
		          fillLinearGradientStartPoint: {x:0, y:0},
		          fillLinearGradientEndPoint: {x:0, y:100},
		          fillLinearGradientColorStops: [0, '#604526', 1, '#9c7644']
		        });

				var soilGrassImg = new Image;
				soilGrassImg.onload = function() {
		        	var groundGrassSpecs = new Kinetic.Image({
	        			x: 0,
		          		y: settings.treeHeight * settings.treeGrassStartPct,
			        	width: settings.treeWidth,
			        	height: 145,
			         	image: soilGrassImg
			         });

		        	bgLayer.add(groundGrassSpecs);
		        	bgLayer.draw();
		        };

				soilGrassImg.src = settings.soilGrassImgSrc;

		        bgLayer.add(groundGradient);
			};

			var initBranchOutlines = function() {
				var i = 0;

				for (; i < branches.length; i++) {
					branchOutlines[i] = {
						image: new Image
					}

					branchOutlines[i].image.src = 'img/outline-branch' + (i + 1) + '.svg';

					branchOutlines[i].kineticImage = new Kinetic.Image({
						x: 0,
						y: -13,
						width: settings.treeWidth,
						height: settings.treeHeight,
						image: branchOutlines[i].image,
						visible: false
					});

					overlayLayer.add(branchOutlines[i].kineticImage);
				}
			};

			var setNormalImageForSite = function(branchIndex) {
				for (var i = 0; i < branches[branchIndex].length; i++) {
					branches[branchIndex][i].kineticImage.setImage(branches[branchIndex][i].imgCfg.normalImg);
				}
			};

			var setOutlineImageForSite = function(branchIndex) {
				for (var i = 0; i < branches[branchIndex].length; i++) {
					branches[branchIndex][i].kineticImage.setImage(branches[branchIndex][i].imgCfg.outlineLeafImg);
				}
			};

			var text = {sensor: []};
			var createText = function(y) {
				return new Kinetic.Text({
					x: settings.textMargin,
					y: y + settings.textMargin + settings.treeHeight,
					fontFamily: 'Calibri',
					fontSize: 24,
					text: '',
					fill: 'black'
				});
			};

			text.site = createText(0);

			for(i = 0; i < 3; i++) {
				text.sensor[i] = createText((text.site.height() * (i + 1)));
			}			
			text.voltage = createText(text.site.height() * 4);
			text.temp = createText(text.site.height() * 5);
			

			var initLeaf = function(leaf, branchIndex, isTest) {
				var branchEnabled = leaf.imgCfg;

				if(!branchEnabled) {
					leaf.imgCfg = {
						normalSrc: 'img/leaf-gray-75.svg', 
						outlineSrc: 'img/leaf-gray-75.svg',
						disabled: true
					};
				}
				
				leaf.imgCfg.normalImg = new Image;
				leaf.imgCfg.outlineLeafImg = new Image;

				leaf.branchIndex = branchIndex;

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

				leaf.imgCfg.normalImg.onload = function() {
					if (leaf.kineticImage) {
						leaf.kineticImage.destroy();
					}

					leaf.kineticImage = new Kinetic.Image({
						x: leaf.x * settings.scale,
						y: leaf.y * settings.scale,
						width: leaf.size,
						height: leaf.size,
						image: leaf.imgCfg.normalImg,
						offset: {
							x: 0,
							y: leaf.size
						}
					});

					leaf.kineticImage.rotate(leaf.a * (180 / Math.PI));

					// add the shape to the layer
					leafLayer.add(leaf.kineticImage);

					if(branchEnabled) {
						leaf.imgCfg.outlineLeafImg.onload = function() {
							leaf.kineticImage.on('mouseover', function() {
								setOutlineImageForSite(leaf.branchIndex);
								branchOutlines[leaf.branchIndex].kineticImage.show();
								text.site.setText(siteData[branchIndex].name ? siteData[branchIndex].name : '');
								for(i = 0; i < 3; i++) {
									text.sensor[i].setText('Soil Sensor ' + (i + 1) + ': ' + siteData[branchIndex].readings[i]);
								}
								text.voltage.setText(siteData[branchIndex].voltage ?
									'Voltage: ' + siteData[branchIndex].voltage :
									'');
								text.temp.setText(siteData[branchIndex].temp ? 
									'Temp: ' + siteData[branchIndex].temp :
									'');
								leafLayer.draw();
								overlayLayer.draw();
								textLayer.show();
								textLayer.draw();
							});

							leaf.kineticImage.on('mouseout', function() {
								setNormalImageForSite(leaf.branchIndex);
								branchOutlines[branchIndex].kineticImage.hide();
								textLayer.hide();
								leafLayer.draw();
								overlayLayer.draw();
							});
						}
					}

					leaf.imgCfg.outlineLeafImg.src = leaf.imgCfg.outlineSrc;
				}

				leaf.imgCfg.normalImg.src = leaf.imgCfg.normalSrc;
			};

			initTree();
			initBranchOutlines();

			textLayer.add(text.site);
			for(i = 0; i < 3; i++) {
				textLayer.add(text.sensor[i]);
			}
			textLayer.add(text.voltage);
			textLayer.add(text.temp);
			textLayer.hide();

			stage.add(bgLayer);
			stage.add(cloudLayers[0]);
			stage.add(cloudLayers[1]);
			stage.add(layer);
			stage.add(overlayLayer);
			stage.add(leafLayer);
			stage.add(textLayer);

			if (testLeaf) {
				testLeaf = {
					x: parseFloat($('#x').val()),
					y: parseFloat($('#y').val()),
					a: parseFloat($('#angle').val()),
					size: parseFloat($('#size').val()),
					mirrorX: $('#flip').prop('checked')
				};

				initLeaf(testLeaf, -1, true);
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

			var animateCloudLayer = function(cloudLayer, dt) {
				var cloudX = cloudLayer.getPosition().x;

				cloudLayer.move({
					x: 1 * settings.cloudSpeed,
					y: 0
				});
				if(cloudX >= settings.treeWidth) {
					cloudX = settings.treeWidth * -2.5;
					cloudLayer.move({
						x: cloudX,
						y: 0
					});
				}

				if((Math.floor(settings.treeWidth - cloudX) - 1) > 0) {
					cloudLayer.clip({
						x: 0,
						y: 0,
						width: Math.floor(settings.treeWidth - cloudX) - 1,
						height: settings.treeHeight
					});
				}

				cloudLayer.draw();
			}

			$('#controls').find('input').change(function() {
				initLeaf(testLeaf, true);
			});

			initGround();
			initSky();
			layer.draw();

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

				for (var i = 0; i < branches.length; i++) {
					for (var j = 0; j < branches[i].length; j++) {
						animateLeaf(branches[i][j], ctx);
					}
				}

				if (testLeaf) {
					testLeaf.x = parseFloat($('#x').val());
					testLeaf.y = parseFloat($('#y').val());
					testLeaf.a = parseFloat($('#angle').val());
					testLeaf.size = parseFloat($('#size').val());
					testLeaf.mirrorX = $('#flip').prop('checked');

					animateLeaf(testLeaf, ctx);
				}
				for(i = 0; i < 2; i++) {
					animateCloudLayer(cloudLayers[i], dt);
				}

				leafLayer.draw();

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