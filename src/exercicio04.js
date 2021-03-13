function main() {

    var scene = new THREE.Scene();    // Create main scene
    var stats = initStats();          // To show FPS information
    var renderer = initRenderer();    // View function in util/utils
    //     var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    //     var position = new THREE.Vector3(30, -30, 15);
    //     camera.position.copy(position);
    //     camera.lookAt(new THREE.Vector3(30, 30, 30)); // or camera.lookAt(0, 0, 0);
    //    // camera.up.set(0, 0, 1); // That's the default value

    // var camera = initCamera(new THREE.Vector3(30, 30, 15));
    var position = new THREE.Vector3(30, 30, 15);
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.copy(position);
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // or camera.lookAt(0, 0, 0);
    camera.up.set(0, 0, 1); // That's the default value

    //  var position = new THREE.Vector3(-30, 40, 30);
    //  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    //  camera.position.copy(position);
    //  camera.lookAt(new THREE.Vector3(0, 0, 15)); // or camera.lookAt(0, 0, 0);
    //  camera.up.set(0, 0, 1); // That's the default value


    // //  Init camera in this position

    var light = initDefaultLighting(scene, new THREE.Vector3(0, 0, 30)); // Use default light
    var clock = new THREE.Clock();

    // Enable mouse rotation, pan, zoom etc.

    var keyboard = new KeyboardState();
    var cameraPosicaoX = 30;
    var cameraPosicaoZ = 15;

    var lookatX = 0;
    var lookatZ = 0;

    var posicaoLookupX = 0;
    var posicaoLookupZ = 1;

    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);
    geometry = new THREE.TorusGeometry(1, 0.5, 16, 50);
    material = new THREE.MeshBasicMaterial({ color: "grey" });
    
    const arcoEsquerdo =new THREE.Mesh(geometry, material);
    scene.add(arcoEsquerdo);
    // Show axes (parameter is size of each axis)
    var axesHelper = new THREE.AxesHelper(12);
    scene.add(axesHelper);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(20, 20);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: "rgba(150, 150, 150)",
        side: THREE.DoubleSide,
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // add the plane to the scene
    scene.add(plane);

    // create a cube
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshNormalMaterial();
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // position the cube
    cube.position.set(0.0, 0.0, 2.0);
    arcoEsquerdo.position.set(0.0, 0.0, 5.0);
    // add the cube to the scene
    scene.add(cube);

    // Use this to show information onscreen
    controls = new InfoBox();
    controls.add("Basic Scene");
    controls.addParagraph();
    controls.add("Use mouse to interact:");
    controls.add("* Left button to rotate");
    controls.add("* Right button to translate (pan)");
    controls.add("* Scroll to zoom in/out.");
    controls.show();
    var projectionMessage = new SecondaryBox("Perspective Projection");
    window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);
    buildInterface();
    render();

    function changeCamera() {

        keyboard.update();
        var speed = 30;
        var moveDistance = speed * clock.getDelta();

        if (keyboard.pressed("left")) cameraPosicaoX -= moveDistance;
        if (keyboard.pressed("right")) cameraPosicaoX += moveDistance;
        if (keyboard.pressed("up")) cameraPosicaoZ += moveDistance;
        if (keyboard.pressed("down")) cameraPosicaoZ -= moveDistance;

        if (keyboard.pressed("A")) lookatX += moveDistance;
        if (keyboard.pressed("D")) lookatX -= moveDistance;
        if (keyboard.pressed("W")) lookatZ += moveDistance;
        if (keyboard.pressed("S")) lookatZ -= moveDistance;

        if (keyboard.down("Q")) {
            posicaoLookupX += moveDistance;
            // if (posicaoLookupX > 0)
            posicaoLookupZ -= moveDistance;
        }
        if (keyboard.down("E")) {
            posicaoLookupZ += moveDistance;
            // if (posicaoLookupZ > 0)
            posicaoLookupX -= moveDistance;

        }
        // posicaoLookupX = 1 - Math.abs(moveDistance)

        var position = new THREE.Vector3(cameraPosicaoX, -30, cameraPosicaoZ);
        camera.position.copy(position);
        camera.lookAt(new THREE.Vector3(lookatX, 0, lookatZ));
        camera.up.set(posicaoLookupX, 0, posicaoLookupZ);



    }
    function restartCamera() {
        // camera.position.x = 30;
        // camera.position.y = -30;
        // camera.position.z = 15;

        // camera.up.x = 0;
        // camera.up.y = 1;
        // camera.up.z = 0;

        cameraPosicaoX = 30;
        cameraPosicaoZ = 15;



        posicaoLookupX = 0;
        posicaoLookupZ = 1;
    }

    function changeProjection() {
        // Store the previous position of the camera
        var pos = new THREE.Vector3().copy(camera.position);

        if (camera instanceof THREE.PerspectiveCamera) {
            var s = 72; // Estimated size for orthographic projection
            camera = new THREE.OrthographicCamera(-window.innerWidth / s, window.innerWidth / s,
                window.innerHeight / s, window.innerHeight / -s, -s, s);
            projectionMessage.changeMessage("Orthographic");
        } else {
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            projectionMessage.changeMessage("Perspective");
        }
        camera.position.copy(pos);
        camera.lookAt(scene.position);
        trackballControls = initTrackballControls(camera, renderer);
        lightFollowingCamera(light, camera) // Makes light follow the camera
    }

    function buildInterface() {
        var controls = new function () {
            this.onChangeProjection = function () {
                changeProjection();
            };
            this.onRestartCamera = function () {
                restartCamera();
            };
        };

        // GUI interface
        var gui = new dat.GUI();
        gui.add(controls, 'onChangeProjection').name("Change Projection");
        gui.add(controls, 'onRestartCamera').name("Restart Camera");
    }

    function render() {
        stats.update(); // Update FPS
        trackballControls.update();
        lightFollowingCamera(light, camera) // Makes light follow the camera
        requestAnimationFrame(render); // Show events
        changeCamera();
        renderer.render(scene, camera) // Render scene
    }
}
