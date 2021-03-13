function main() {
    var scene = new THREE.Scene();    // Create main scene
    var stats = initStats();          // To show FPS information

    var renderer = initRenderer();    // View function in util/utils
    renderer.setClearColor("rgb(30, 30, 42)");
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.lookAt(0, 0, 0);
    camera.position.set(3.18, 3., -5.31);
    camera.up.set(0, 1, 0);
    var objColor = "rgb(255,255,255)";
    var objShininess = 200;

    var animationOn = false;
    // To use the keyboard
    var keyboard = new KeyboardState();

    // Enable mouse rotation, pan, zoom etc.
    var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);

    // Listen window size changes
    window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

    var groundPlane = createGroundPlane(4.0, 2.5); // width and height
    groundPlane.rotateX(degreesToRadians(-90));
    scene.add(groundPlane);

    // Show axes (parameter is size of each axis)
    var axesHelper = new THREE.AxesHelper(1.5);
    axesHelper.visible = false;
    scene.add(axesHelper);

    // Show text information onscreen
    showInformation();

    var infoBox = new SecondaryBox("");

    // Teapot
    var geometry = new THREE.TeapotBufferGeometry(0.5);
    var material = new THREE.MeshPhongMaterial({ color: objColor, shininess: "200" });
    material.side = THREE.DoubleSide;
    var obj = new THREE.Mesh(geometry, material);
    obj.castShadow = true;
    obj.position.set(0.0, 0.5, 0.0);
    scene.add(obj);




    var lightIntensity = 1.0;

    //---------------------------------------------------------
    // Default light position, color, ambient color and intensity
    //

    var ambientColor = "rgb(50,50,50)";

    //PRIMEIRA LUZ COM ESFERA
    var lightPosition = new THREE.Vector3(0, 1.8, -1.2);
    var lightColor = "rgb(255,0,0)";
    // Sphere to represent the light
    var lightSphere = createLightSphere(scene, 0.05, 10, 10, lightPosition, 'red');
    var spotLight = new THREE.SpotLight(lightColor);
    setSpotLight(spotLight, lightPosition);

    //SEGUNDA LUZ COM ESFERA
    var lightPosition2 = new THREE.Vector3(0, 1.8, 1.2);
    var lightColor = "rgb(0,0,255)";
    // Sphere to represent the light
    var lightSphere2 = createLightSphere(scene, 0.05, 10, 10, lightPosition2, 'blue');
    var spotLight2 = new THREE.SpotLight(lightColor);
    setSpotLight(spotLight2, lightPosition2);

    //TERCEIRA LUZ COM ESFERA
    var lightPosition3 = new THREE.Vector3(2, 1.8, 0);
    var lightColor = "rgb(0,255,0)";
    // Sphere to represent the light
    var lightSphere3 = createLightSphere(scene, 0.05, 10, 10, lightPosition3, 'green');
    var spotLight3 = new THREE.SpotLight(lightColor);
    setSpotLight(spotLight3, lightPosition3);

    var verifyBlueLight = true;
    var verifyGreenLight = true;
    var verifyRedLight = true;
    //barras
    var geometry = new THREE.CylinderGeometry(0.05, 0.05, 1.7, 32);
    var material = new THREE.MeshBasicMaterial({ color: 'grey' });
    var cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    cylinder.translateX(1.96).translateY(0.86).translateZ(1.2);
    var geometry = new THREE.CylinderGeometry(0.05, 0.05, 1.7, 32);
    var material = new THREE.MeshBasicMaterial({ color: 'grey' });
    var cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    cylinder.translateX(-1.96).translateY(0.86).translateZ(1.2);
    var geometry = new THREE.CylinderGeometry(0.05, 0.05, 1.7, 32);
    var material = new THREE.MeshBasicMaterial({ color: 'grey' });
    var cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    cylinder.translateX(-1.96).translateY(0.86).translateZ(-1.2);
    var geometry = new THREE.CylinderGeometry(0.05, 0.05, 1.7, 32);
    var material = new THREE.MeshBasicMaterial({ color: 'grey' });
    var cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    cylinder.translateX(1.96).translateY(0.86).translateZ(-1.2);
    var geometry = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 32);
    var material = new THREE.MeshBasicMaterial({ color: 'grey' });
    var cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    cylinder.translateX(1.96).translateY(1.7);
    cylinder.rotateX(degreesToRadians(90));


    var geometry = new THREE.CylinderGeometry(0.05, 0.05, 2.5, 32);
    var material = new THREE.MeshBasicMaterial({ color: 'grey' });
    var cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    cylinder.translateX(-1.96).translateY(1.7);
    cylinder.rotateX(degreesToRadians(90));

    var geometry = new THREE.CylinderGeometry(0.05, 0.05, 3.9, 32);
    var material = new THREE.MeshBasicMaterial({ color: 'grey' });
    var cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    cylinder.translateZ(1.2).translateY(1.7);
    cylinder.rotateZ(degreesToRadians(90));

    var geometry = new THREE.CylinderGeometry(0.05, 0.05, 3.9, 32);
    var material = new THREE.MeshBasicMaterial({ color: 'grey' });
    var cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);
    cylinder.translateZ(-1.2).translateY(1.7);
    cylinder.rotateZ(degreesToRadians(90));




    // More info here: https://threejs.org/docs/#api/en/lights/AmbientLight
    var ambientLight = new THREE.AmbientLight(ambientColor);
    scene.add(ambientLight);

    buildInterface();
    render();

    // Set Point Light
    // More info here: https://threejs.org/docs/#api/en/lights/PointLight

    // Set Spotlight
    // More info here: https://threejs.org/docs/#api/en/lights/SpotLight
    function setSpotLight(spotLight, position) {
        spotLight.position.copy(position);
        spotLight.shadow.mapSize.width = 2048;
        spotLight.shadow.mapSize.height = 2048;
        spotLight.shadow.camera.fov = degreesToRadians(20);
        spotLight.castShadow = true;
        spotLight.decay = 2;
        spotLight.penumbra = 0.05;
        spotLight.name = "Spot Light"

        scene.add(spotLight);
    }

    // Set Directional Light
    // More info here: https://threejs.org/docs/#api/en/lights/DirectionalLight


    // Update light position of the current light
    function updateLightPosition(spotLight, lightSphere, lightPosition) {
        spotLight.position.copy(lightPosition);
        lightSphere.position.copy(lightPosition);
        infoBox.changeMessage("Light Position: " + lightPosition.x.toFixed(2) + ", " +
            lightPosition.y.toFixed(2) + ", " + lightPosition.z.toFixed(2));
    }

    // Update light intensity of the current light
    function updateLightIntensity() {
        spotLight.intensity = lightIntensity;
    }


    function keyboardUpdate() {
        keyboard.update();
        if (keyboard.pressed("A")) {
            if (lightPosition2.x > -1.95)
                lightPosition2.x -= 0.05;
            updateLightPosition(spotLight2, lightSphere2, lightPosition2);

        }
        if (keyboard.pressed("D")) {
            if (lightPosition2.x < 1.95)
                lightPosition2.x += 0.05;
            updateLightPosition(spotLight2, lightSphere2, lightPosition2);

        }

        if (keyboard.pressed("Z")) {
            if (lightPosition.x > -1.95)
                lightPosition.x -= 0.05;
            updateLightPosition(spotLight, lightSphere, lightPosition);
        }
        if (keyboard.pressed("C")) {
            if (lightPosition.x < 1.95)
                lightPosition.x += 0.05;
            updateLightPosition(spotLight, lightSphere, lightPosition);
        }

        if (keyboard.pressed("Q")) {
            if (lightPosition3.z > -1.20)
                lightPosition3.z -= 0.05;
            updateLightPosition(spotLight3, lightSphere3, lightPosition3);
        }
        if (keyboard.pressed("E")) {
            if (lightPosition3.z < 1.20)
                lightPosition3.z += 0.05;
            updateLightPosition(spotLight3, lightSphere3, lightPosition3);
        }
        if (animationOn) {
            obj.rotateY(degreesToRadians(1));
        }



    }
    function buildInterface() {
        //------------------------------------------------------------
        // Interface
        var controls = new function () {
            this.viewAxes = false;
            this.color = objColor;
            this.shininess = objShininess;
            this.lightIntensity = lightIntensity;
            this.lightType = 'Spot'
            this.ambientLight = true;

            this.onViewAxes = function () {
                axesHelper.visible = this.viewAxes;
            };
            this.onEnableAmbientLight = function () {
                ambientLight.visible = this.ambientLight;
            };
            this.updateColor = function () {
                material.color.set(this.color);
            };
            this.onUpdateShininess = function () {
                material.shininess = this.shininess;
            };
            this.onUpdateLightIntensity = function () {
                lightIntensity = this.lightIntensity;
                updateLightIntensity();
            };

            this.onChangeAnimation = function () {
                animationOn = !animationOn;
            }
            this.turnOffBlueLight = function () {
                if (verifyBlueLight) {
                    scene.remove(spotLight2);
                    verifyBlueLight = false;
                }
                else {
                    scene.add(spotLight2);
                    verifyBlueLight = true;
                }
            }
            this.turnOffGreenLight = function () {
                if (verifyGreenLight) {
                    scene.remove(spotLight3);
                    verifyGreenLight = false;
                }
                else {
                    scene.add(spotLight3);
                    verifyGreenLight = true;
                }
            }
            this.turnOffRedLight = function () {
                if (verifyRedLight) {
                    scene.remove(spotLight);
                    verifyRedLight = false;
                }
                else {
                    scene.add(spotLight);
                    verifyRedLight = true;
                }
            }



        };

        var gui = new dat.GUI();
        gui.addColor(controls, 'color')
            .name("Obj Color")
            .onChange(function (e) { controls.updateColor() });
        gui.add(controls, 'shininess', 0, 1000)
            .name("Obj Shininess")
            .onChange(function (e) { controls.onUpdateShininess() });
        gui.add(controls, 'viewAxes', false)
            .name("View Axes")
            .onChange(function (e) { controls.onViewAxes() });
        // gui.add(controls, 'lightIntensity', 0, 5)
        //     .name("Light Intensity")
        //     .onChange(function (e) { controls.onUpdateLightIntensity() });
        gui.add(controls, 'ambientLight', true)
            .name("Ambient Light")
            .onChange(function (e) { controls.onEnableAmbientLight() });
        gui.add(controls, 'onChangeAnimation', false).name("Animation On/Off");
        gui.add(controls, 'turnOffBlueLight', false).name("Blue");
        gui.add(controls, 'turnOffRedLight', false).name("Red");
        gui.add(controls, 'turnOffGreenLight', false).name("Green");
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
        stats.update();
        trackballControls.update();
        keyboardUpdate();
        requestAnimationFrame(render);
        renderer.render(scene, camera)
    }
}
