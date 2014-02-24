(function() {
  var b2Vec2 = Box2D.Common.Math.b2Vec2;
  var b2BodyDef = Box2D.Dynamics.b2BodyDef;
  var b2Body = Box2D.Dynamics.b2Body;
  var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
  var b2Fixture = Box2D.Dynamics.b2Fixture;
  var b2World = Box2D.Dynamics.b2World;
  var b2MassData = Box2D.Collision.Shapes.b2MassData;
  var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
  var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
  var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;


  var Physics = window.Physics = function(element,scale) {
    var gravity = new b2Vec2(0,9.8);
    this.world = new b2World(gravity, true);
    this.context = element.getContext("2d");
    this.scale = scale || 20;
    this.dtRemaining = 0;
    this.stepAmount = 1/60;
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
    while(this.dtRemaining > this.stepAmount) {
      this.dtRemaining -= this.stepAmount;
      this.world.Step(this.stepAmount, 
                      10, // velocity iterations
                      10);// position iterations
    }
    if(this.debugDraw) {
      this.world.DrawDebugData();
    }
  }


  var Body = window.Body = function(physics,details) {
    this.details = details = details || {};

    // Create the definition
    this.definition = new b2BodyDef();

    // Set up the definition
    for(var k in this.definitionDefaults) {
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
    for(var l in this.fixtureDefaults) {
      this.fixtureDef[l] = details[l] || this.fixtureDefaults[l];
    }


    details.shape = details.shape || this.defaults.shape;

    switch(details.shape) {
      case "circle":
        details.radius = details.radius || this.defaults.radius;
        this.fixtureDef.shape = new b2CircleShape(details.radius);
        break;
      case "polygon":
        this.fixtureDef.shape = new b2PolygonShape();
        this.fixtureDef.shape.SetAsArray(details.points,details.points.length);
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

  Body.prototype.defaults = {
    shape: "block",
    width: 2,
    height: 2,
    radius: 1
  };

  Body.prototype.fixtureDefaults = {
    density: 2,
    friction: 1,
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

  window.gameLoop = function() {
    var tm = new Date().getTime();
    requestAnimationFrame(gameLoop);
    var dt = (tm - lastFrame) / 1000;
    if(dt > 1/15) { dt = 1/15; }
    physics.step(dt);
    lastFrame = tm;
  };

  function init() {
    physics = window.physics = new Physics(document.getElementById("b2dCanvas"));
    physics.debug();

    // Create some walls
    new Body(physics, { type: "static", x: 0, y: 0, height: 25,  width: 0.5 });
    new Body(physics, { type: "static", x:51, y: 0, height: 25,  width: 0.5});
    new Body(physics, { type: "static", x: 0, y: 0, height: 0.5, width: 60 });
    new Body(physics, { type: "static", x: 0, y:25, height: 0.5, width: 60 });

    window.bdy = new Body(physics, { x: 5, y: 8 });
    new Body(physics, { x: 13, y: 8 });
    new Body(physics, { x: 8, y: 3 });

    requestAnimationFrame(gameLoop);
  }

  window.addEventListener("load",init);
}());




// Lastly, add in the `requestAnimationFrame` shim, if necessary. Does nothing 
// if `requestAnimationFrame` is already on the `window` object.
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
 
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());


