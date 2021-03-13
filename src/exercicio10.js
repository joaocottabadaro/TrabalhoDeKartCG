function main() {
    var stats = initStats();          // To show FPS information
    var scene = new THREE.Scene();    // Create main scene
    var renderer = initRenderer();    // View function in util/utils
    var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position
    var clock = new THREE.Clock();

    // Show text information onscreen
    showInformation();
    var angle = 0;
    var angle2 = 0;
    var speed = 0.05;
    var animationOn = true;
    // To use the keyboard
    var keyboard = new KeyboardState();

    // Enable mouse rotation, pan, zoom etc.
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);

    // Show axes (parameter is size of each axis)
    var axesHelper = new THREE.AxesHelper(12);
    scene.add(axesHelper);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(30, 30);
    planeGeometry.translate(0.0, 0.0, -0.5); // To avoid conflict with the axeshelper
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: "rgb(150, 150, 150)",
        side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // add the plane to the scene
    scene.add(plane);

    //cubo
    var geometrycuboFace1 = new THREE.PlaneGeometry(5, 5);
    var material = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide });
    var cuboFace1 = new THREE.Mesh(geometrycuboFace1, material);
    scene.add(cuboFace1);
    var geometrycuboFace2 = new THREE.PlaneGeometry(5, 5);
    var material = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide });
    var cuboFace2 = new THREE.Mesh(geometrycuboFace2, material);
    cuboFace1.add(cuboFace2);
    var geometrycuboFace3 = new THREE.PlaneGeometry(5, 5);
    var material = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide });
    var cuboFace3 = new THREE.Mesh(geometrycuboFace3, material);
    cuboFace1.add(cuboFace3);
    var geometrycuboFace4 = new THREE.PlaneGeometry(5, 5);
    var material = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide });
    var cuboFace4 = new THREE.Mesh(geometrycuboFace4, material);
    cuboFace1.add(cuboFace4);
    var geometrycuboFace5 = new THREE.PlaneGeometry(5, 5);
    var material = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide });
    var cuboFace5 = new THREE.Mesh(geometrycuboFace5, material);
    cuboFace1.add(cuboFace5);
    var geometrycuboFace6 = new THREE.PlaneGeometry(5, 5);
    var material = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide });
    var cuboFace6 = new THREE.Mesh(geometrycuboFace6, material);
    cuboFace1.add(cuboFace6);


    //cilindro
    var geometry = new THREE.CylinderGeometry(2, 2, 6, 30, 30, true);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    var geometry = new THREE.CircleGeometry(2, 30);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00,side: THREE.DoubleSide  });
    var circle = new THREE.Mesh(geometry, material);
    cylinder.add(circle);
    var geometry = new THREE.CircleGeometry(2, 30);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00,side: THREE.DoubleSide  });
    var circle2 = new THREE.Mesh(geometry, material);
    cylinder.add(circle2);

   
    
    setTextura();

    window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);
    buildInterface();
    render();

    function keyboardUpdate() {

        keyboard.update();

        if (animationOn) {
            angle += speed;
            cuboFace1.matrixAutoUpdate = false;
            cuboFace2.matrixAutoUpdate = false;
            cuboFace3.matrixAutoUpdate = false;
            cuboFace4.matrixAutoUpdate = false;
            cuboFace5.matrixAutoUpdate = false;
            cuboFace6.matrixAutoUpdate = false;

            cylinder.matrixAutoUpdate = false;
            circle.matrixAutoUpdate = false;
            circle2.matrixAutoUpdate = false;


            var mat4 = new THREE.Matrix4();
            cuboFace1.matrix.identity(); 
            cuboFace2.matrix.identity(); 
            cuboFace3.matrix.identity(); 
            cuboFace4.matrix.identity(); 
            cuboFace5.matrix.identity(); 
            cuboFace6.matrix.identity(); 

            cylinder.matrix.identity(); 
            circle.matrix.identity(); 
            circle2.matrix.identity(); 

            circle.matrix.multiply(mat4.makeTranslation(0, 3, 0));
            circle.matrix.multiply(mat4.makeRotationX(degreesToRadians(-90)));
            circle2.matrix.multiply(mat4.makeTranslation(0, -3, 0));
            circle2.matrix.multiply(mat4.makeRotationX(degreesToRadians(-90)));
          

            cylinder.matrix.multiply(mat4.makeRotationX(degreesToRadians(90))); // R1
            cylinder.matrix.multiply(mat4.makeTranslation(8, 6, 8));
            cylinder.matrix.multiply(mat4.makeRotationY(angle));


            
            cuboFace1.matrix.multiply(mat4.makeRotationZ(angle));

            cuboFace6.matrix.multiply(mat4.makeRotationY(Math.PI / 2)); // R1
            cuboFace6.matrix.multiply(mat4.makeTranslation(-2.5, 0, 2.5));

            cuboFace4.matrix.multiply(mat4.makeRotationY(Math.PI / 2)); // R1
            cuboFace4.matrix.multiply(mat4.makeTranslation(-2.5, 0, -2.5));

            cuboFace2.matrix.multiply(mat4.makeTranslation(0, 0, 5)); // T1


            cuboFace3.matrix.multiply(mat4.makeRotationX(Math.PI / 2)); // R1
            cuboFace3.matrix.multiply(mat4.makeTranslation(0, 2.5, 2.5));

            cuboFace5.matrix.multiply(mat4.makeRotationX(Math.PI / 2)); // R1
            cuboFace5.matrix.multiply(mat4.makeTranslation(0, 2.5, -2.5));

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
    
    function setTextura(){
        var textureLoader = new THREE.TextureLoader();
        var floor = textureLoader.load('../assets/textures/marble.png');
    
        cuboFace2.material.map = floor;
        cuboFace3.material.map = floor;
        cuboFace4.material.map = floor;
        cuboFace5.material.map = floor;
        cuboFace6.material.map = floor;
    
        var textureLoader = new THREE.TextureLoader();
        var wood = textureLoader.load('../assets/textures/wood.png');
    
        cylinder.material.map = wood;
    
        var textureLoader = new THREE.TextureLoader();
        var woodTop = textureLoader.load('../assets/textures/woodtop.png');
    
        circle.material.map = woodTop
        circle2.material  .map = woodTop;
    }
  
    function showInformation() {
        // Use this to show information onscreen
        controls = new InfoBox();
        controls.add("Lighting - Types of Lights");
        controls.addParagraph();
        controls.add("Use the WASD-QE keys to move the light");
        controls.show();
    }

    function render() {
        stats.update(); // Update FPS
        requestAnimationFrame(render); // Show events
        keyboardUpdate();
        trackballControls.update();
        renderer.render(scene, camera) // Render scene
    }
}
