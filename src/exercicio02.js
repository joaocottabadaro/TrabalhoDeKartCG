function main() {
  var stats = initStats();          // To show FPS information
  var scene = new THREE.Scene();    // Create main scene
  var renderer = initRenderer();    // View function in util/utils
  var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position

  // Enable mouse rotation, pan, zoom etc.
  var trackballControls = new THREE.TrackballControls(camera, renderer.domElement);

  // Show axes (parameter is size of each axis)
  // var axesHelper = new THREE.AxesHelper(12);
  // scene.add(axesHelper);

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
  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 10, 15);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const cylinder = new THREE.Mesh(cylinderGeometry, material);
  scene.add(cylinder);

  // position the cube
  cylinder.position.set(0.0, 0.0, 1);
  // add the cube to the scene
  scene.add(cylinder);


  // create a cube
  const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);
  // position the cube
  sphere.position.set(7, -3, 2);
  // add the cube to the scene


  // create a cube
  var cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  var cubeMaterial = new THREE.MeshBasicMaterial({
    color: 'green'    // red (can also use a CSS color string here)
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // position the cube
  cube.position.set(-5, 2.0, 1);
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

  // Listen window size changes
  window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

  render();
  function render() {
    stats.update(); // Update FPS
    trackballControls.update(); // Enable mouse movements
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
  }
}
