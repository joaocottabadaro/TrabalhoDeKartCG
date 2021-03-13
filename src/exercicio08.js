function main() {
    var scene = new THREE.Scene();    // Create main scene
    var clock = new THREE.Clock();
    var stats = initStats();          // To show FPS information
    var light = initDefaultLighting(scene, new THREE.Vector3(25, 30, 20)); // Use default light
    var renderer = initRenderer();    // View function in util/utils
    renderer.setClearColor("rgb(30, 30, 42)");
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.lookAt(0, 0, 0);
    camera.position.set(5, 15, 40);
    camera.up.set(0, 1, 0);

    // To use the keyboard
    var angle = 0;
    var speed = 0.05;
    var animationOn = true;
    // Enable mouse rotation, pan, zoom etc.
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);

    // Listen window size changes
    window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

    var groundPlane = createGroundPlane(40, 35); // width and height
    groundPlane.rotateX(degreesToRadians(-90));
    scene.add(groundPlane);

    // Show axes (parameter is size of each axis)
    var axesHelper = new THREE.AxesHelper(12);
    axesHelper.visible = false;
    scene.add(axesHelper);

    var geometry = new THREE.CylinderGeometry(0, 0.3, 4, 0.6, 0.2, false, 0, 8);
    var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    var cylinder = new THREE.Mesh(geometry, material);
    var cylinder2 = new THREE.Mesh(geometry, material);;
    var cylinder3 = new THREE.Mesh(geometry, material);


    var geometry = new THREE.BoxGeometry(1, 1, 3);
    var material = new THREE.MeshPhongMaterial({ color: 'blue' });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.translateZ(0.5);
    cube.translateY(7);
    // Object Material
    var objectMaterial = new THREE.MeshPhongMaterial({ color: "rgb(255,0,0)" });
    objectMaterial.side = THREE.DoubleSide; // Show front and back polygons

    var geometry = new THREE.CylinderGeometry( 2, 2, 0.1, 5 );
    var material = new THREE.MeshPhongMaterial( {color: 'green'} );
    var base = new THREE.Mesh( geometry, material );
    scene.add( base );
    base.translateY(0.09);
    
    //----------------------------------
    // Create Lathe Geometry
    //----------------------------------
    // First, create the point vector to be used by the Lathe algorithm
    var points = generatePoints();
    // Set the main properties of the surface
    var segments = 20;
    var phiStart = 0;
    var phiLength = 2 * Math.PI;
    var latheGeometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
    var support = new THREE.Mesh(latheGeometry, objectMaterial);
    support.castShadow = true;
    scene.add(support);

    var objColor = "rgb(200, 129, 0)";
   
    var objectMaterial = new THREE.MeshPhongMaterial({ color: objColor });
    objectMaterial.side = THREE.DoubleSide; 

 
    var extrudeSettings =
    {
        depth: 2,
        bevelEnabled: false,
    };

    var extrudeGeometry = new THREE.ExtrudeGeometry(createCircle(), extrudeSettings);
    var object = new THREE.Mesh(extrudeGeometry, objectMaterial);
    object.castShadow = true;
    scene.add(object);

    object.add(cylinder);
    object.add(cylinder2);
    object.add(cylinder3);


    buildInterface();
    render();

    function generatePoints() {
        var points = [];
        var numberOfPoints = 8;
        for (var i = 0; i < numberOfPoints; i++) {
            points.push(new THREE.Vector2(0.5, i));
        }
        // material for all points
        spGroup = new THREE.Object3D();
        scene.add(spGroup);
        return points;
    }

    function createCircle() {
        var circle = new THREE.Shape();
        circle.absarc(0.0, 0.0, 0.5, 0, Math.PI * 2, false);

        return circle;
    }


    function rotatePropeller() {
        
        cylinder.matrixAutoUpdate = false;
        cylinder2.matrixAutoUpdate = false;
        cylinder3.matrixAutoUpdate = false;
        object.matrixAutoUpdate = false;
       
        var mat4 = new THREE.Matrix4();
        object.matrix.identity();
        cylinder.matrix.identity();  
        cylinder2.matrix.identity();  
        cylinder3.matrix.identity();  
    

        object.matrix.multiply(mat4.makeTranslation(0, 7.0, 1.3));
        object.matrix.multiply(mat4.makeRotationZ(angle));


        cylinder.matrix.multiply(mat4.makeTranslation(-1.5, -0.6, 1.3));
        cylinder.matrix.multiply(mat4.makeRotationZ(90)); 


        cylinder2.matrix.multiply(mat4.makeTranslation(1.7, -0.8, 1.3)); 
        cylinder2.matrix.multiply(mat4.makeRotationZ(-90));

        cylinder3.matrix.multiply(mat4.makeTranslation(-0, 2, 1.3));
        if (animationOn) {
            angle += speed;
      
        }
    }


    function buildInterface() {
        var controls = new function () {
            this.onChangeAnimation = function () {
                animationOn = !animationOn;
            };
            this.speed = 0.05;

            this.changeSpeed = function () {
                speed = this.speed;
            };
        };

        // GUI interface
        var gui = new dat.GUI();
        gui.add(controls, 'onChangeAnimation', true).name("Animation On/Off");
        gui.add(controls, 'speed', 0.05, 0.5)
            .onChange(function (e) { controls.changeSpeed() })
            .name("Change Speed");
    }


    function render() {
        stats.update();
        trackballControls.update();
        rotatePropeller();
        requestAnimationFrame(render);
        renderer.render(scene, camera)
    }
}
