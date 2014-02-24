$(document).ready(function() {
    // ---------------------- Animation Frame ---------------------- //
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
        };
    })();

    // -------------------- Box2D Definitions ---------------------- //
    var b2Vec2 = Box2D.Common.Math.b2Vec2;
    var b2AABB = Box2D.Collision.b2AABB;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2World = Box2D.Dynamics.b2World;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

    // -------------------- Joint Definitions ---------------------- //
    var b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
    var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef

    // ---------------------- Initialize Graphics ---------------------- //
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    // -------------------- Create World ---------------------- //
    var world = new b2World(
        new b2Vec2(2, 10), // gravity
        true // allow sleep
    );

    // -------------------- Body & Fixture Definitions ---------------------- //
    var fixDef = new b2FixtureDef;
    fixDef.density = 1.0;
    fixDef.friction = 0.5;
    fixDef.restitution = 0.2;
    var bodyDef = new b2BodyDef;

    // ---------------------- Generate Boundary --------------------- //
    bodyDef.type = b2Body.b2_staticBody;
    fixDef.shape = new b2PolygonShape;
    fixDef.shape.SetAsBox(20, 2);
    bodyDef.position.Set(10, 400 / 30 + 1.8);
    ground = world.CreateBody(bodyDef);
    ground.CreateFixture(fixDef);
    bodyDef.position.Set(10, -1.8);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    fixDef.shape.SetAsBox(2, 14);
    bodyDef.position.Set(-1.8, 13);
    world.CreateBody(bodyDef).CreateFixture(fixDef);
    bodyDef.position.Set(21.8, 13);
    world.CreateBody(bodyDef).CreateFixture(fixDef);

    // ---------------------- Generate Tree Parts ---------------------- //
    // var stump = TreeTrunk(10, 12);
    // var trunk1 = TreeTrunk(10, 10);
    // var trunk2 = TreeTrunk(10, 8);
    // var trunk3 = TreeTrunk(10, 6);
    // var trunk4 = TreeTrunk(10, 4);

    // ---------------------- Generate Tree Joints ---------------------- //
    // tree_joint_1 = TreeJoint(ground, stump);
    // tree_joint_2 = TreeJoint(stump, trunk1);
    // tree_joint_3 = TreeJoint(trunk1, trunk2);
    // tree_joint_4 = TreeJoint(trunk2, trunk3);
    // tree_joint_5 = TreeJoint(trunk3, trunk4);

    // ---------------------- Setup Debug Drawing ---------------------- //
    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(30.0);
    debugDraw.SetFillAlpha(0.5);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    // ---------------------- Initialize Update Loop ---------------------- //
    requestAnimFrame(update);

    // ---------------------- Mouse Joint --------------------- //
    var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
    var canvasPosition = getElementPosition(document.getElementById("canvas"));
    document.addEventListener("mousedown", function(e) {
        isMouseDown = true;
        handleMouseMove(e);
        document.addEventListener("mousemove", handleMouseMove, true);
    }, true);
    document.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", handleMouseMove, true);
        isMouseDown = false;
        mouseX = undefined;
        mouseY = undefined;
    }, true);

    function handleMouseMove(e) {
        mouseX = (e.clientX - canvasPosition.x) / 30;
        mouseY = (e.clientY - canvasPosition.y) / 30;
    };

    function getBodyAtMouse() {
        mousePVec = new b2Vec2(mouseX, mouseY);
        var aabb = new b2AABB();
        aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
        aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
        // Query the world for overlapping shapes.
        selectedBody = null;
        world.QueryAABB(getBodyCB, aabb);
        return selectedBody;
    }

    function getBodyCB(fixture) {
        if (fixture.GetBody().GetType() != b2Body.b2_staticBody) {
            if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                selectedBody = fixture.GetBody();
                return false;
            }
        }
        return true;
    }

    function grassBlade(x) {
        // Define an array to store the joints of this blade
        var blade = [];

        // === Define Shapes === //
        // -- Base --
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(0.05, 0.25);
        bodyDef.position.Set(x, 12.5);
        var base = world.CreateBody(bodyDef);
        base.CreateFixture(fixDef);
        // -- Mid --
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(0.05, 0.25);
        bodyDef.position.Set(x, 12);
        var mid = world.CreateBody(bodyDef);
        mid.CreateFixture(fixDef);
        // -- Top --
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(0.05, 0.25);
        bodyDef.position.Set(x, 11.5);
        var top = world.CreateBody(bodyDef);
        top.CreateFixture(fixDef);

        // === Define Joints === //
        var DEGTORAD = 3.14 / 180;

        // -- Base Joint --
        var jointDef = new b2RevoluteJointDef();
        jointDef.bodyA = window.ground;
        jointDef.bodyB = base;
        jointDef.localAnchorA.Set(-10 + x, -2);
        jointDef.localAnchorB.Set(0, 0.25);
        jointDef.enableLimit = true;
        jointDef.lowerAngle = -90 * DEGTORAD;
        jointDef.upperAngle = 90 * DEGTORAD;
        jointDef.enableMotor = true;
        blade[0] = world.CreateJoint(jointDef);

        // -- Mid Joint --
        var jointDef = new b2RevoluteJointDef();
        jointDef.bodyA = base;
        jointDef.bodyB = mid;
        jointDef.localAnchorA.Set(0, -0.25);
        jointDef.localAnchorB.Set(0, 0.25);
        jointDef.enableLimit = true;
        jointDef.lowerAngle = -80 * DEGTORAD;
        jointDef.upperAngle = 80 * DEGTORAD;
        jointDef.enableMotor = true;
        blade[1] = world.CreateJoint(jointDef);

        // -- Top Joint --
        var jointDef = new b2RevoluteJointDef();
        jointDef.bodyA = mid;
        jointDef.bodyB = top;
        jointDef.localAnchorA.Set(0, -0.25);
        jointDef.localAnchorB.Set(0, 0.25);
        jointDef.enableLimit = true;
        jointDef.lowerAngle = -70 * DEGTORAD;
        jointDef.upperAngle = 70 * DEGTORAD;
        jointDef.enableMotor = true;
        blade[2] = world.CreateJoint(jointDef);

        return blade;
    }

    window.grass = [];

    for (var i = 1; i < 39; i++) {
        x = 0.5 * i;
        window.grass[i] = grassBlade(x);
    }

    // ---------------------- Screen Update ---------------------- //
    function update() {
        if (isMouseDown && (!mouseJoint)) {
            var body = getBodyAtMouse();
            if (body) {
                var md = new b2MouseJointDef();
                md.bodyA = world.GetGroundBody();
                md.bodyB = body;
                md.target.Set(mouseX, mouseY);
                md.collideConnected = true;
                md.maxForce = 300.0 * body.GetMass();
                mouseJoint = world.CreateJoint(md);
                body.SetAwake(true);
            }
        }
        if (mouseJoint) {
            if (isMouseDown) {
                mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
            } else {
                world.DestroyJoint(mouseJoint);
                mouseJoint = null;
            }
        }

        context.beginPath();
        context.rect(0, 385, 20 * 30, 385);
        context.fillStyle = 'green';
        context.fill();

        for (var i = 1; i < 39; i++) {
            FlexJoint(window.grass[i][0], 1);
            FlexJoint(window.grass[i][1], 1);
            FlexJoint(window.grass[i][2], 1);

            // Real Blade //
            context.save();
            context.strokeStyle = '#007547';
            context.lineWidth = 3;
            context.beginPath();
            context.moveTo(window.grass[i][1].GetBodyA().GetPosition().x * 30, window.grass[i][1].GetBodyA().GetPosition().y * 30);
            context.lineTo(window.grass[i][1].GetBodyB().GetPosition().x * 30, window.grass[i][1].GetBodyB().GetPosition().y * 30);
            context.stroke();
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(window.grass[i][2].GetBodyA().GetPosition().x * 30, window.grass[i][2].GetBodyA().GetPosition().y * 30);
            context.lineTo(window.grass[i][2].GetBodyB().GetPosition().x * 30, window.grass[i][2].GetBodyB().GetPosition().y * 30);
            context.stroke();
            context.restore();

            // Reverse Blade
            context.save();
            context.strokeStyle = '#007547';
            context.lineWidth = 3;
            context.beginPath();
            x1 = window.grass[i][1].GetBodyA().GetPosition().x * 30;
            y1 = window.grass[i][1].GetBodyA().GetPosition().y * 30;
            x2 = window.grass[i][1].GetBodyB().GetPosition().x * 30;
            y2 = window.grass[i][1].GetBodyB().GetPosition().y * 30;
            x3 = window.grass[i][2].GetBodyA().GetPosition().x * 30;
            y3 = window.grass[i][2].GetBodyA().GetPosition().y * 30;
            x4 = window.grass[i][2].GetBodyB().GetPosition().x * 30;
            y4 = window.grass[i][2].GetBodyB().GetPosition().y * 30;
            context.moveTo(x1 + 5, y1);
            context.lineTo(x2 + 5 - 2 * (x2 - x1), y2);
            context.stroke();
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(x3 + 5 - 2 * (x2 - x1), y3);
            context.lineTo(x4 + 5 - 2 * (x4 - x1), y4);
            context.stroke();
            context.restore();

            // Real Blade Clone
            context.save();
            context.strokeStyle = '#098d42';
            context.lineWidth = 3;
            context.beginPath();
            x1 = window.grass[i][1].GetBodyA().GetPosition().x * 30;
            y1 = window.grass[i][1].GetBodyA().GetPosition().y * 30;
            x2 = window.grass[i][1].GetBodyB().GetPosition().x * 30;
            y2 = window.grass[i][1].GetBodyB().GetPosition().y * 30;
            x3 = window.grass[i][2].GetBodyA().GetPosition().x * 30;
            y3 = window.grass[i][2].GetBodyA().GetPosition().y * 30;
            x4 = window.grass[i][2].GetBodyB().GetPosition().x * 30;
            y4 = window.grass[i][2].GetBodyB().GetPosition().y * 30;
            context.moveTo(x1 + 10, y1);
            context.lineTo(x2 + 10 + 0.5 * (x2 - x1), y2);
            context.stroke();
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(x3 + 10 + 0.5 * (x2 - x1), y3);
            context.lineTo(x4 + 10 + 0.5 * (x4 - x1), y4);
            context.stroke();
            context.restore();

            // Reverse Blade Clone
            context.save();
            context.strokeStyle = '#098d42';
            context.lineWidth = 3;
            context.beginPath();
            x1 = window.grass[i][1].GetBodyA().GetPosition().x * 30;
            y1 = window.grass[i][1].GetBodyA().GetPosition().y * 30;
            x2 = window.grass[i][1].GetBodyB().GetPosition().x * 30;
            y2 = window.grass[i][1].GetBodyB().GetPosition().y * 30;
            x3 = window.grass[i][2].GetBodyA().GetPosition().x * 30;
            y3 = window.grass[i][2].GetBodyA().GetPosition().y * 30;
            x4 = window.grass[i][2].GetBodyB().GetPosition().x * 30;
            y4 = window.grass[i][2].GetBodyB().GetPosition().y * 30;
            context.moveTo(x1 - 5, y1);
            context.lineTo(x2 - 5 - 1.5 * (x2 - x1), y2);
            context.stroke();
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(x3 - 5 - 1.5 * (x2 - x1), y3);
            context.lineTo(x4 - 5 - 1.5 * (x4 - x1), y4);
            context.stroke();
            context.restore();

            // Real Blade Clone2
            context.save();
            context.strokeStyle = '#41a54f';
            context.lineWidth = 3;
            context.beginPath();
            x1 = window.grass[i][1].GetBodyA().GetPosition().x * 30;
            y1 = window.grass[i][1].GetBodyA().GetPosition().y * 30;
            x2 = window.grass[i][1].GetBodyB().GetPosition().x * 30;
            y2 = window.grass[i][1].GetBodyB().GetPosition().y * 30;
            x3 = window.grass[i][2].GetBodyA().GetPosition().x * 30;
            y3 = window.grass[i][2].GetBodyA().GetPosition().y * 30;
            x4 = window.grass[i][2].GetBodyB().GetPosition().x * 30;
            y4 = window.grass[i][2].GetBodyB().GetPosition().y * 30;
            context.moveTo(x1 + 15, y1);
            context.lineTo(x2 + 15 + 0.25 * (x2 - x1), y2);
            context.stroke();
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(x3 + 15 + 0.25 * (x2 - x1), y3);
            context.lineTo(x4 + 15 + 0.25 * (x4 - x1), y4);
            context.stroke();
            context.restore();

            // Reverse Blade Clone2
            context.save();
            context.strokeStyle = '#41a54f';
            context.lineWidth = 3;
            context.beginPath();
            x1 = window.grass[i][1].GetBodyA().GetPosition().x * 30;
            y1 = window.grass[i][1].GetBodyA().GetPosition().y * 30;
            x2 = window.grass[i][1].GetBodyB().GetPosition().x * 30;
            y2 = window.grass[i][1].GetBodyB().GetPosition().y * 30;
            x3 = window.grass[i][2].GetBodyA().GetPosition().x * 30;
            y3 = window.grass[i][2].GetBodyA().GetPosition().y * 30;
            x4 = window.grass[i][2].GetBodyB().GetPosition().x * 30;
            y4 = window.grass[i][2].GetBodyB().GetPosition().y * 30;
            context.moveTo(x1 - 10, y1);
            context.lineTo(x2 - 10 - 1.25 * (x2 - x1), y2);
            context.stroke();
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(x3 - 10 - 1.25 * (x2 - x1), y3);
            context.lineTo(x4 - 10 - 1.25 * (x4 - x1), y4);
            context.stroke();
            context.restore();

            // Real Blade Clone2
            context.save();
            context.strokeStyle = '#8dc059';
            context.lineWidth = 3;
            context.beginPath();
            x1 = window.grass[i][1].GetBodyA().GetPosition().x * 30;
            y1 = window.grass[i][1].GetBodyA().GetPosition().y * 30;
            x2 = window.grass[i][1].GetBodyB().GetPosition().x * 30;
            y2 = window.grass[i][1].GetBodyB().GetPosition().y * 30;
            x3 = window.grass[i][2].GetBodyA().GetPosition().x * 30;
            y3 = window.grass[i][2].GetBodyA().GetPosition().y * 30;
            x4 = window.grass[i][2].GetBodyB().GetPosition().x * 30;
            y4 = window.grass[i][2].GetBodyB().GetPosition().y * 30;
            context.moveTo(x1 + 15, y1);
            context.lineTo(x2 + 15 + 0.125 * (x2 - x1), y2);
            context.stroke();
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(x3 + 15 + 0.125 * (x2 - x1), y3);
            context.lineTo(x4 + 15 + 0.125 * (x4 - x1), y4);
            context.stroke();
            context.restore();

            // Reverse Blade Clone2
            context.save();
            context.strokeStyle = '#8dc059';
            context.lineWidth = 3;
            context.beginPath();
            x1 = window.grass[i][1].GetBodyA().GetPosition().x * 30;
            y1 = window.grass[i][1].GetBodyA().GetPosition().y * 30;
            x2 = window.grass[i][1].GetBodyB().GetPosition().x * 30;
            y2 = window.grass[i][1].GetBodyB().GetPosition().y * 30;
            x3 = window.grass[i][2].GetBodyA().GetPosition().x * 30;
            y3 = window.grass[i][2].GetBodyA().GetPosition().y * 30;
            x4 = window.grass[i][2].GetBodyB().GetPosition().x * 30;
            y4 = window.grass[i][2].GetBodyB().GetPosition().y * 30;
            context.moveTo(x1 - 10, y1);
            context.lineTo(x2 - 10 - 1.125 * (x2 - x1), y2);
            context.stroke();
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(x3 - 10 - 1.125 * (x2 - x1), y3);
            context.lineTo(x4 - 10 - 1.125 * (x4 - x1), y4);
            context.stroke();
            context.restore();

        }

        // FlexJoint(tree_joint_1, 1000);
        // FlexJoint(tree_joint_2, 800);
        // FlexJoint(tree_joint_3, 600);
        // FlexJoint(tree_joint_4, 400);
        // FlexJoint(tree_joint_5, 200);

        world.Step(1 / 60, 10, 10);
        world.DrawDebugData();
        world.ClearForces();
        requestAnimFrame(update);
    };

    // ---------------------- Helper Functions ---------------------- //
    function getElementPosition(element) {
        var elem = element,
            tagname = "",
            x = 0,
            y = 0;
        while ((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
            y += elem.offsetTop;
            x += elem.offsetLeft;
            tagname = elem.tagName.toUpperCase();
            if (tagname == "BODY") elem = 0;
            if (typeof(elem) == "object") {
                if (typeof(elem.offsetParent) == "object") elem = elem.offsetParent;
            }
        }
        return {
            x: x,
            y: y
        };
    }

    function FlexJoint(joint, multiplier) {
        joint_angle = joint.GetJointAngle() * (180 / 3.14);
        if (Math.abs(joint_angle) > 0.2) {
            joint.SetMaxMotorTorque(multiplier * Math.abs(joint_angle / 30));
            joint.SetMotorSpeed(-joint_angle / 30);
        }
    }

    function TreeJoint(bodyA, bodyB) {
        var DEGTORAD = 3.14 / 180;
        var jointDef = new b2RevoluteJointDef();
        jointDef.bodyA = bodyA;
        jointDef.bodyB = bodyB;
        jointDef.localAnchorA.Set(0, -1);
        if (bodyA == ground) {
            jointDef.localAnchorA.Set(0, -2)
        };
        jointDef.localAnchorB.Set(0, 1);
        jointDef.enableLimit = true;
        jointDef.lowerAngle = -30 * DEGTORAD;
        jointDef.upperAngle = 30 * DEGTORAD;
        jointDef.enableMotor = true;
        return world.CreateJoint(jointDef);
    }

    function TreeTrunk(x, y) {
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(0.25, 1);
        bodyDef.position.Set(x, y);
        trunk = world.CreateBody(bodyDef);
        trunk.CreateFixture(fixDef);
        return trunk;
    }
});