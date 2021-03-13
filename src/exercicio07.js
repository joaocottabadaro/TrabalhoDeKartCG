function main() {

    var stats = initStats();          // To show FPS information
    var scene = new THREE.Scene();    // Create main scene
    var renderer = initRenderer();    // View function in util/utils
    var camera = initCamera(new THREE.Vector3(0, -20, 30)); // Init camera in this position
    var light = initDefaultLighting(scene, new THREE.Vector3(0, 0, 15));
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);

    // Show text information onscreen


    var posicaoX = 0;
    var posicaoY = 0;
    var posicaoZ = 1;

    var posicaoXNova = 0;
    var posicaoYNova = 0;
    var posicaoZNova = 0;

    var speed = 0.05;
    var animationOn = true; // control if animation is on or of

    // To use the keyboard


    // Enable mouse rotation, pan, zoom etc.
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);

    // Show axes (parameter is size of each axis)
    var axesHelper = new THREE.AxesHelper(12);
    scene.add(axesHelper);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(25, 25);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
    var planeMaterial = new THREE.MeshBasicMaterial({
        color: "rgb(150, 150, 150)",
        side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // add the plane to the scene
    scene.add(plane);

    // create a cube
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    // position the cube
    sphere.translateX(1.0).translateY(1.0).translateZ(1.0);


    // Listen window size changes
    window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);
    buildInterface();
    render();


    function move() {

        sphere.matrixAutoUpdate = false;
        if (animationOn) {
            if (posicaoX < posicaoXNova)
                posicaoX += speed;
            if (posicaoY < posicaoYNova)
                posicaoY += speed;
            if (posicaoZ < posicaoZNova)
                posicaoZ += speed;


            var mat4 = new THREE.Matrix4();


            sphere.matrix.identity();

            sphere.matrix.multiply(mat4.makeTranslation(posicaoX, posicaoY, posicaoZ)); // T1
        }
    }

    function restartCamera() {
        posicaoX = 0;
        posicaoY = 0;
        posicaoZ = 1;
        posicaoXNova = 0;
        posicaoYNova = 0;
        posicaoZNova = 0;

        sphere.matrix.identity();
       
        
        sphere.matrix.multiply(mat4.makeTranslation(posicaoX, posicaoY, posicaoZ)); 
    }

    function buildInterface() {
        var controls = new function () {

            this.onChangeAnimation = function () {
                animationOn = !animationOn;
            };

            this.posicaoXNova = 0;
            this.posicaoYNova = 0;
            this.posicaoZNova = 0;


            this.mudarPosicao = function () {
                posicaoXNova = this.posicaoXNova;
                posicaoYNova = this.posicaoYNova;
                posicaoZNova = this.posicaoZNova;
                animationOn = true;
            };
            this.onRestartCamera = function () {
                restartCamera();
                animationOn = false;

            };
        };

        // GUI interface
        var gui = new dat.GUI();
        gui.add(controls, 'onChangeAnimation', true).name("Animation On/Off");

        gui.add(controls, 'posicaoXNova', 0, 25)
            .onChange(function (e) { })
            .name("Mudar Posicao X");
        gui.add(controls, 'posicaoYNova', 0, 25)
            .onChange(function (e) { })
            .name("Mudar Posicao Y");
        gui.add(controls, 'posicaoZNova', 0, 25)
            .onChange(function (e) { })
            .name("Mudar Posicao Z");
        gui.add(controls, 'mudarPosicao').name("Ok");
        gui.add(controls, 'onRestartCamera').name("Restart sphere");
    }

    function render() {
        stats.update(); // Update FPS
        trackballControls.update();
        move();
        lightFollowingCamera(light, camera);
        requestAnimationFrame(render);
        renderer.render(scene, camera) // Render scene
    }


}
