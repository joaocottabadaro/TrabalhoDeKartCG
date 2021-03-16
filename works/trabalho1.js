function main() {
  var stats = initStats(); // To show FPS information
  var scene = new THREE.Scene(); // Create main scene
  var renderer = initRenderer(); // View function in util/utils
  var camera = changeCamera(new THREE.Vector3(0, -15, 5)); // Init camera in this position
  var dirLight = new THREE.DirectionalLight(lightColor);
  var light = setDirectionalLighting(scene, new THREE.Vector3(200, 50, 50));
  var spotLight = new THREE.SpotLight(lightColor);
  var trackballControls = new THREE.TrackballControls(
    camera,
    renderer.domElement
  );
  var MatrixGlobal = new THREE.Matrix4();
  var group = new THREE.Group();
  var lightColor = "rgb(255,255,255)";
  var luzPoste08;
  var luzPoste07;
  var luzPoste06;
  var luzPoste05;
  var luzPoste04;
  var luzPoste03;
  var luzPoste02;
  var luzPoste01;
  var modoCamera = 2;
  // Show text information onscreen
  showInformation();
  const geometryCamera = new THREE.BoxGeometry(1, 1, 1);
  const materialCamera = new THREE.MeshPhongMaterial({ color: 0xdcdcdc });
  const cubeCamera = new THREE.Mesh(geometryCamera, materialCamera);
  // To use the keyboard
  var keyboard = new KeyboardState();
  //var plane = criarPlano(700.0, 700.5);

  var gcolor = "rgb(200,200,200)";
  var planeGeometry = new THREE.PlaneGeometry(700.0, 700.5, 400, 400);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: gcolor,
    side: THREE.DoubleSide,
  });
  //  var planeMaterial = new THREE.MeshLambertMaterial({color:"rgb(255,0,0)", side:THREE.DoubleSide});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  scene.add(plane);
  var gcolor = "rgb(255,255,255)";
  var planeGeometry = new THREE.PlaneGeometry(1400, 1401, 400, 400);
  var planeMaterial = new THREE.MeshLambertMaterial({
    color: gcolor,
    side: THREE.DoubleSide,
  });
  //  var planeMaterial = new THREE.MeshLambertMaterial({color:"rgb(255,0,0)", side:THREE.DoubleSide});
  var plane2 = new THREE.Mesh(planeGeometry, planeMaterial);
  plane2.receiveShadow = true;
  scene.add(plane2);
  plane.translateZ(0.1);
  /*var wireframe = new THREE.WireframeGeometry(planeGeometry);
    var line = new THREE.LineSegments(wireframe);
    line.material.color.setStyle("rgb(0, 0, 0)");
    scene.add(line);*/

  // Enable mouse rotation, pan, zoom etc.
  /*var planeGeometry = new THREE.PlaneGeometry(400.0, 200.5, 10, 10);
    planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
    var planeMaterial = new THREE.MeshPhongMaterial({
        color: "rgb(200,200,200)",
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
    });
    scene.add(plane);
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    scene.add(plane);
 
    var wireframe = new THREE.WireframeGeometry(planeGeometry);
    var line = new THREE.LineSegments(wireframe);
    line.material.color.setStyle("rgb(180, 180, 180)");
    scene.add(line);*/

  //scene.add(ambientLight);

  // cabine e parte central do carro
  const chassi = cubo(2, 4.7, 0.5, "rgb(255,255,255)");
  const cabine = cubo(1.5, 2, 0.2, "rgb(92,88,88)");
  var geometryTorus = new THREE.TorusGeometry(1.6, 0.25, 30, 3, 3);
  var materialTorus = new THREE.MeshPhongMaterial({ color: "white" });
  const arcoEsquerdo = new THREE.Mesh(geometryTorus, materialTorus);
  const arcoDireito = new THREE.Mesh(geometryTorus, materialTorus);
  const ponteCentral = cubo(1.5, 3.9, 0.4, "blue");
  materialVolante = new THREE.MeshPhongMaterial({ color: "black" });
  geometryVolante = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 25);
  const volante = new THREE.Mesh(geometryVolante, materialVolante);
  geometryApoioVolante = new THREE.CylinderGeometry(0.1, 0.1, 1, 10);
  const apoioVolante = new THREE.Mesh(geometryApoioVolante, materialVolante);
  const banco = cubo(0.1, 0.7, 0, "rgb(0,255,0)");
  const apoioBanco = cubo(0, 0.7, 0.1, "rgb(0,255,0)");

  //peças da frente do carro
  const frenteDoCarro = cubo(1, 4.7, 0.5, "rgb(255,255,255)");
  const conexaoFrontal = cubo(0.8, 3.49, 0.7, "rgb(0,0,255)");
  const asaEsquerdafrontal = cubo(0.7, 1, 0.1, "rgb(0,255,0)");
  const asaDireitoFrontal = cubo(0.7, 1, 0.1, "rgb(0,255,0)");

  // aerofolio do carro
  const wing = cubo(4, 0.6, 0.2, "rgb(0,0,255)");
  const leftWing = cubo(0.5, 0.8, 0.05, "rgb(0,255,0)");
  const rightWing = cubo(0.5, 0.8, 0.05, "rgb(0,255,0)");
  var geometrySuporte = new THREE.CylinderGeometry(0.1, 0.19, 1.6, 3, 5);
  var materialSuporte = new THREE.MeshPhongMaterial({ color: "black" });
  const suporteEsquerdoWing = new THREE.Mesh(geometrySuporte, materialSuporte);
  const suporteDireitoWing = new THREE.Mesh(geometrySuporte, materialSuporte);

  //rodas  e eixos do carro
  const rodaDianteiraDireita = roda();
  const rodaTraseiraDireita = roda();
  const rodaDianteiraEsquerda = roda();
  const rodaTraseiraEsquerda = roda();

  var geometrycuboFace1 = new THREE.PlaneGeometry(0.82, 3.49);
  var material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  const texturaConexaoFrontal = new THREE.Mesh(geometrycuboFace1, material);
  const texturaConexaoFrontalInferior = new THREE.Mesh(
    geometrycuboFace1,
    material
  );

  var geometrycuboFace1 = new THREE.PlaneGeometry(0.72, 3.496);
  var material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  const texturaConexaoFrontalEsquerda = new THREE.Mesh(geometrycuboFace1, material);

  var geometrycuboFace1 = new THREE.PlaneGeometry(0.72, 3.496);
  var material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  const texturaConexaoFrontalDireita = new THREE.Mesh(geometrycuboFace1, material);

  var geometrycuboFace1 = new THREE.PlaneGeometry(0.82, 0.71);
  var material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  const texturaConexaoFrontalFrente = new THREE.Mesh(geometrycuboFace1, material);

  var geometrycuboFace1 = new THREE.PlaneGeometry(0.81, 0.8);
  var material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  const texturaConexaoFrontalVolante = new THREE.Mesh(geometrycuboFace1, material);

  var geometrycuboFace1 = new THREE.PlaneGeometry(4, 0.6);
  var material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  const texturaAsaCima = new THREE.Mesh(geometrycuboFace1, material);

  const texturaAsaBaixo = new THREE.Mesh(geometrycuboFace1, material);

  var geometrycuboFace1 = new THREE.PlaneGeometry(4, 0.25);
  var material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  const texturaAsaLateral = new THREE.Mesh(geometrycuboFace1, material);
  const texturaAsaLateralTraseira = new THREE.Mesh(geometrycuboFace1, material);

  var geometrycuboFace1 = new THREE.PlaneGeometry(2.05, 4.75);
  var material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  const texturaChassi = new THREE.Mesh(geometrycuboFace1, material);
  const texturaChassiInferior = new THREE.Mesh(geometrycuboFace1, material);

  var geometrycuboFace1 = new THREE.PlaneGeometry(2.02, 0.51);
  var material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  const texturaChassiFrontal = new THREE.Mesh(geometrycuboFace1, material);

  const texturaChassiTraseira = new THREE.Mesh(geometrycuboFace1, material);

  var geometrycuboFace1 = new THREE.PlaneGeometry(0.5, 4.75);
  var material = new THREE.MeshBasicMaterial({
    color: "white",
    side: THREE.DoubleSide,
  });
  const texturaChassiLateralEsquerda = new THREE.Mesh(
    geometrycuboFace1,
    material
  );
  const texturaChassiLateralDireita = new THREE.Mesh(
    geometrycuboFace1,
    material
  );

  var mat42 = new THREE.Matrix4();
  //constrói os postes da tela
  const poste08 = poste();
  poste08.matrix.multiply(mat42.makeTranslation(-330, 250, 0));
  poste08.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-270)));
  luzPoste08 = poste08.getObjectByName("LuzPoste");
  scene.add(poste08);

  const poste07 = poste();
  poste07.matrix.multiply(mat42.makeTranslation(-175, 20, 0));
  poste07.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-270)));
  luzPoste07 = poste07.getObjectByName("LuzPoste");
  scene.add(poste07);

  const poste06 = poste();
  poste06.matrix.multiply(mat42.makeTranslation(45, 175, 0));
  poste06.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-270)));
  luzPoste06 = poste06.getObjectByName("LuzPoste");
  scene.add(poste06);

  const poste05 = poste();
  poste05.matrix.multiply(mat42.makeTranslation(315, 250, 0));
  poste05.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-90)));
  luzPoste05 = poste05.getObjectByName("LuzPoste");
  scene.add(poste05);

  const poste04 = poste();
  poste04.matrix.multiply(mat42.makeTranslation(110, -280, 0));
  poste04.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-180)));
  luzPoste04 = poste04.getObjectByName("LuzPoste");
  scene.add(poste04);

  const poste03 = poste();
  poste03.matrix.multiply(mat42.makeTranslation(10, -280, 0));
  poste03.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-180)));
  luzPoste03 = poste03.getObjectByName("LuzPoste");
  scene.add(poste03);

  const poste02 = poste();
  poste02.matrix.multiply(mat42.makeTranslation(-90, -280, 0));
  poste02.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-180)));
  luzPoste02 = poste02.getObjectByName("LuzPoste");
  scene.add(poste02);

  const poste01 = poste();
  poste01.matrix.multiply(mat42.makeTranslation(-190, -280, 0));
  poste01.matrix.multiply(mat42.makeRotationZ(degreesToRadians(-180)));
  luzPoste01 = poste01.getObjectByName("LuzPoste");
  scene.add(poste01);

  const eixoFrontal = eixo();
  const eixoTraseiro = eixo();
  var cylinderGeometry = new THREE.CylinderGeometry(0.07, 0.07, 1.5, 10);
  var cylinderMaterial = new THREE.MeshPhongMaterial({
    color: "rgb(255,255,0)",
  });
  const suporteEixoFrontalDireito = new THREE.Mesh(
    cylinderGeometry,
    cylinderMaterial
  );
  const suporteeixoFrontalEsquerdo = new THREE.Mesh(
    cylinderGeometry,
    cylinderMaterial
  );

  //escapamentos do carro
  geometryEscapamento = new THREE.CylinderGeometry(0.1, 0.19, 1.6, 15, 5);
  materialEscapamento = new THREE.MeshPhongMaterial({ color: "black" });
  const escapamentoEsquerdo = new THREE.Mesh(
    geometryEscapamento,
    materialEscapamento
  );
  const escapamentoDireito = new THREE.Mesh(
    geometryEscapamento,
    materialEscapamento
  );
  chassi.castShadow = true;

  chassi.matrix.identity();

  scene.add(chassi);

  // inicializa os filhos da chassi
  createCarChild();

  // desliga o autoUpdate das matrizes
  desligarAutoUpdate();

  //liga a sombra nas partes do carro
  ligarSombraCarro();

  //configura a luz que segue o carro
  setSpotLight();

  var mat4 = new THREE.Matrix4();

  // chama o identify para todas as matrizes
  resetMatrix();

  // posiciona o carro na posicao inicial
  carInicialPosition();
  chassi.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-90)));
  chassi.matrix.multiply(mat42.makeTranslation(230, -35, 0));

  //rotaciona os angulos das pecas
  rotate();

  setTextura();
  // Listen window size changes
  window.addEventListener(
    "resize",
    function () {
      onWindowResize(camera, renderer);
    },
    false
  );
  render();
  //variáveis que guardam qual foi última direção(frente ou trás) que o carro andou.
  var flagDesaceleracaoAutomatica = 0;
  var flagDesaceleracaoManual = 0;
  var flagVirandoparaEsquerda = 0;
  var flagVirandoparaDireita = 0;

  // variavel que controla o angulo de rotacao das rodas para elas nao girarem 360* tambem direciona o angulo de rotacao do eixo X
  var anguloX = 0;

  // uma constante para multiplicar o angulo do carro para rotacionar as rodas
  const anguloPadrao = 1.3;

  //flag para verificar se esta no modo de inspecao
  var inspect = false;
  //velocidade que o carro movimento no eixo Y
  var speed = 0.01;
  //informa qual a rotação máxima das rodas  dianteiras.
  var anguloEsquerdoMaximo = -0.4067366430758069;
  var anguloDireitoMaximo = 0.30192189559966865;

  // Object Material
  var mountainColor = "rgb(100,70,20)";
  var objectMaterial = new THREE.MeshLambertMaterial({
    color: mountainColor,
    opacity: 1,
  });

  var convexGeometry = null;
  var convexGeometry2 = null;
  var convexGeometry3 = null;

  var montanha = null;
  var montanhaLadoDireito = null;
  var montanhaPequena = null;

  var pontosMontanha = [];
  var pontosMontanhaLadoDireito = [];
  var pontosMontanhaPequena = [];

  createPoints();
  var skybox = skyBox();
  scene.add(skybox);
  skybox.rotation.x = degreesToRadians(90);
  //   skybox.rotation.x = degreesToRadians(90);
  //funcao que cria as montanhas
  updateConvexObject();
  render();



  function skyBox() {
    const materialArray = [];
    const texture_ft = new THREE.TextureLoader().load(
      "./assets/skybox/bluecloud_ft.jpg"
    );
    const texture_bk = new THREE.TextureLoader().load(
      "./assets/skybox/bluecloud_bk.jpg"
    );
    const texture_up = new THREE.TextureLoader().load(
      "./assets/skybox/bluecloud_dn.jpg"
    );
    const texture_dn = new THREE.TextureLoader().load(
      "./assets/skybox/bluecloud_dn.jpg"
    );
    const texture_rt = new THREE.TextureLoader().load(
      "./assets/skybox/bluecloud_rt.jpg"
    );
    const texture_lf = new THREE.TextureLoader().load(
      "./assets/skybox/bluecloud_lf.jpg"
    );

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

    for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

    const skyboxGeo = new THREE.BoxGeometry(1400, 1400, 1400);
    const skybox = new THREE.Mesh(skyboxGeo, materialArray);

    return skybox;
  }
  //Estatua do Lobo
  loadOBJFile("assets/", "estatua", true, 70, -140, 210, 9);
  loadOBJFile("assets/", "statueHorse", true, 50, -200, -100, 0);
  var statue = null;
  var statueHorse = null;

  function loadOBJFile(
    modelPath,
    modelName,
    visibility,
    desiredScale,
    positionX,
    positionY,
    positionZ
  ) {
    currentModel = modelName;

    var manager = new THREE.LoadingManager();

    var mtlLoader = new THREE.MTLLoader(manager);
    mtlLoader.setPath(modelPath);
    mtlLoader.load(modelName + ".mtl", function (materials) {
      materials.preload();

      var objLoader = new THREE.OBJLoader(manager);
      objLoader.setMaterials(materials);
      objLoader.setPath(modelPath);
      objLoader.load(
        modelName + ".obj",
        function (obj) {
          obj.name = modelName;
          obj.visible = visibility;
          // Set 'castShadow' property for each children of the group
          obj.traverse(function (child) {
            child.castShadow = false;
          });

          obj.traverse(function (node) {
            if (node.material) node.material.side = THREE.DoubleSide;
          });

          var obj = normalizeAndRescaleStatue(obj, desiredScale);
          var obj = fixStatuePosition(obj, positionX, positionY, positionZ, 360, 90);
          statue = obj;
          scene.add(statue);
        },
        onProgress,
        onError
      );
    });
  }

  function onError() { }

  function onProgress(xhr, model) {
    if (xhr.lengthComputable) {
      var percentComplete = (xhr.loaded / xhr.total) * 100;
    }
  }

  function normalizeAndRescaleStatue(obj, newScale) {
    var scale = getMaxSize(obj); // Available in 'utils.js'
    obj.scale.set(
      newScale * (1.0 / scale),
      newScale * (1.0 / scale),
      newScale * (1.0 / scale)
    );
    return obj;
  }

  function fixStatuePosition(obj, positionX, positionY, positionZ, rotationZ, rotationX) {
    // Fix position of the object over the ground plane
    var box = new THREE.Box3().setFromObject(obj);
    obj.position.x = positionX;
    obj.position.y = positionY;
    obj.position.z = positionZ;
    obj.rotateZ(degreesToRadians(rotationZ));
    obj.rotateX(degreesToRadians(rotationX));
    return obj;
  }

  //funcao que cria os pontos do convexBuffer geometry
  function createPoints() {
    // //base

    var maxSize = 50;

    // //base da montanha
    pontosMontanha.push(new THREE.Vector3(20, 20, 0));
    pontosMontanha.push(new THREE.Vector3(0, -40, 0));
    pontosMontanha.push(new THREE.Vector3(0, 40, 0));
    pontosMontanha.push(new THREE.Vector3(-4, 10, 0));
    pontosMontanha.push(new THREE.Vector3(-10, 40, 0));
    pontosMontanha.push(new THREE.Vector3(-30, 40, 0));
    pontosMontanha.push(new THREE.Vector3(40, 40, 0));
    pontosMontanha.push(new THREE.Vector3(-20, -10, 0));
    pontosMontanha.push(new THREE.Vector3(0, 70, 0));
    pontosMontanha.push(new THREE.Vector3(55, -45, 0));

    pontosMontanha.push(new THREE.Vector3(-55, -45, 0));

    //topo da montanha
    pontosMontanha.push(new THREE.Vector3(0, 0, maxSize + 50));
    pontosMontanha.push(new THREE.Vector3(-10, -30, maxSize + 20));
    pontosMontanha.push(new THREE.Vector3(-10, -70, 0));
    pontosMontanha.push(new THREE.Vector3(-15, 20, maxSize));
    pontosMontanha.push(new THREE.Vector3(-15, 50, maxSize));

    pontosMontanhaLadoDireito.push(new THREE.Vector3(0, 30, maxSize + 50));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(0, 20, maxSize + 50));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(0, 10, maxSize + 30));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(15, 80, maxSize + 10));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(40, 80, maxSize - 20));

    pontosMontanhaLadoDireito.push(new THREE.Vector3(0, 120, 0));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(30, 140, 0));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(-20, 120, 0));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(-20, 100, 0));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(-70, 0, 0));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(-70, -20, 0));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(40, 110, 0));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(40, 60, 0));
    pontosMontanhaLadoDireito.push(new THREE.Vector3(20, 30, 0));



    pontosMontanhaPequena.push(new THREE.Vector3(310, 90, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(320, 100, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(280, 40, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(305, -10, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(340, 30, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(340, 55, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(310, 40, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(310, 50, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(290, 65, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(300, 80, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(315, 70, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(310, 90, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(290, 95, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(300, 100, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(295, 80, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(280, 80, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(290, 80, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(300, 110, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(295, 100, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(250, 60, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(300, 30, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(290, 140, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(280, 120, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(310, 140, 0));
    pontosMontanhaPequena.push(new THREE.Vector3(270, 140, 0));

    pontosMontanhaPequena.push(new THREE.Vector3(300, 60, maxSize + 30));
    pontosMontanhaPequena.push(new THREE.Vector3(305, 70, maxSize + 25));
    pontosMontanhaPequena.push(new THREE.Vector3(310, 80, maxSize + 10));
    pontosMontanhaPequena.push(new THREE.Vector3(310, 100, maxSize - 10));
    pontosMontanhaPequena.push(new THREE.Vector3(290, 120, maxSize));
    pontosMontanhaPequena.push(new THREE.Vector3(310, 40, maxSize + 10));
    pontosMontanhaPequena.push(new THREE.Vector3(315, 70, maxSize - 20));
    pontosMontanhaPequena.push(new THREE.Vector3(290, 70, maxSize - 10));

  }

  function updateConvexObject() {
    if (montanha) scene.remove(montanha);
    if (convexGeometry) convexGeometry.dispose();
    if (montanhaLadoDireito) scene.remove(montanhaLadoDireito);
    if (montanhaPequena) scene.remove(montanhaPequena);
    if (convexGeometry2) convexGeometry2.dispose();
    if (convexGeometry3) convexGeometry3.dispose();

    convexGeometry = new THREE.ConvexBufferGeometry(pontosMontanha);
    montanha = new THREE.Mesh(convexGeometry, objectMaterial);

    scene.add(montanha);

    convexGeometry2 = new THREE.ConvexBufferGeometry(pontosMontanhaLadoDireito);
    montanhaLadoDireito = new THREE.Mesh(convexGeometry2, objectMaterial);

    scene.add(montanhaLadoDireito);

    convexGeometry3 = new THREE.ConvexBufferGeometry(pontosMontanhaPequena);
    montanhaPequena = new THREE.Mesh(convexGeometry3, objectMaterial);

    scene.add(montanhaPequena);
  }

  function ligarSombraCarro() {
    //frente do carro
    arcoEsquerdo.castShadow = true;
    arcoDireito.castShadow = true;
    ponteCentral.castShadow = true;
    cabine.matrix.castShadow = true;
    volante.matrix.castShadow = true;
    apoioVolante.castShadow = true;

    //frente do carro
    frenteDoCarro.castShadow = true;
    conexaoFrontal.castShadow = true;
    asaEsquerdafrontal.castShadow = true;
    asaDireitoFrontal.castShadow = true;
    banco.castShadow = true;
    apoioBanco.castShadow = true;

    //traseira
    wing.castShadow = true;
    leftWing.castShadow = true;
    rightWing.castShadow = true;
    escapamentoEsquerdo.castShadow = true;
    escapamentoDireito.castShadow = true;
    suporteEsquerdoWing.castShadow = true;
    suporteDireitoWing.castShadow = true;

    //rodas e eixos
    rodaDianteiraDireita.castShadow = true;
    rodaTraseiraDireita.castShadow = true;
    rodaDianteiraEsquerda.castShadow = true;
    rodaTraseiraEsquerda.castShadow = true;
    eixoFrontal.matrix.castShadow = true;
    suporteEixoFrontalDireito.castShadow = true;
    suporteeixoFrontalEsquerdo.castShadow = true;
    eixoTraseiro.castShadow = true;

    texturaConexaoFrontal.castShadow = true;
    texturaConexaoFrontalInferior.castShadow = true;
    texturaConexaoFrontalFrente.castShadow = true;
    texturaAsaCima.castShadow = true;
    texturaAsaLateral.castShadow = true;
    texturaAsaLateralTraseira.castShadow = true;
    texturaAsaBaixo.castShadow = true;
    texturaConexaoFrontalVolante.castShadow = true;
    texturaChassi.castShadow = true;
    texturaChassiInferior.castShadow = true;
    texturaChassiFrontal.castShadow = true;
    texturaChassiTraseira.castShadow = true;
    texturaChassiLateralEsquerda.castShadow = true;
    texturaChassiLateralDireita.castShadow = true;
    texturaConexaoFrontalEsquerda.castShadow = true;
    texturaConexaoFrontalDireita.castShadow = true;
  }

  //configura a luz direcional
  function setDirectionalLighting(scene, initialPosition) {
    dirLight.position.copy(initialPosition);
    dirLight.castShadow = false;
    dirLight.intensity = 1;
    scene.add(dirLight);
    return dirLight;
  }

  function setSpotLight() {
    spotLight.position.copy(new THREE.Vector3(0, 0, 15));
    spotLight.distance = 30;
    spotLight.decay = 2;
    //spotLight.penumbra = 0.05;
    spotLight.angle = 2;
    spotLight.penumbra = 0.1;
    spotLight.intensity = 5;
    spotLight.visible = true;
  }

  //funcao principal que movimenta os carros
  function movimentacaoCarro() {
    keyboard.update();
    //rotaciona as rodas
    if (keyboard.pressed("left") && anguloX > anguloEsquerdoMaximo) {
      rodaDianteiraDireita.matrix.multiply(
        mat4.makeRotationZ(degreesToRadians(anguloPadrao))
      );
      rodaDianteiraEsquerda.matrix.multiply(
        mat4.makeRotationZ(degreesToRadians(anguloPadrao))
      );
      anguloX = rodaDianteiraDireita.matrix.elements[0] + 0.1;
      flagVirandoparaEsquerda = 1;
      flagVirandoparaDireita = 0;
    }
    if (keyboard.pressed("right") && anguloX < anguloDireitoMaximo) {
      rodaDianteiraDireita.matrix.multiply(
        mat4.makeRotationZ(degreesToRadians(-anguloPadrao))
      );
      rodaDianteiraEsquerda.matrix.multiply(
        mat4.makeRotationZ(degreesToRadians(-anguloPadrao))
      );
      anguloX = rodaDianteiraDireita.matrix.elements[0] - 0.1;
      flagVirandoparaDireita = 1;
      flagVirandoparaEsquerda = 0;
    }

    if (
      !keyboard.pressed("left") &&
      flagVirandoparaEsquerda == 1 &&
      anguloX <= 0
    ) {
      rodaDianteiraDireita.matrix.multiply(
        mat4.makeRotationZ(degreesToRadians(-anguloPadrao))
      );
      rodaDianteiraEsquerda.matrix.multiply(
        mat4.makeRotationZ(degreesToRadians(-anguloPadrao))
      );
      anguloX = rodaDianteiraDireita.matrix.elements[0] - 0.1;
    }

    if (
      !keyboard.pressed("right") &&
      flagVirandoparaDireita == 1 &&
      anguloX >= 0
    ) {
      rodaDianteiraDireita.matrix.multiply(
        mat4.makeRotationZ(degreesToRadians(anguloPadrao))
      );
      rodaDianteiraEsquerda.matrix.multiply(
        mat4.makeRotationZ(degreesToRadians(anguloPadrao))
      );
      anguloX = rodaDianteiraDireita.matrix.elements[0] + 0.1;
    }

    //altera o modo da câmera
    if (keyboard.down("space")) changeCameraMode();

    //impede a movimentação do carro no modo inspeção.
    if (inspect === false) {
      //console.log("1");

      var position = new THREE.Vector3();
      var quaternion = new THREE.Quaternion();
      var scale = new THREE.Vector3();
      camera.matrixAutoUpdate = true;

      chassi.matrixWorld.decompose(position, quaternion, scale);
      window.addEventListener("wheel", onMouseWheel, true);
      // o carro move para direcao do angulo em relacao a X
      if (keyboard.pressed("up")) {
        flagDesaceleracaoAutomatica = 1;
        if (speed > 0 && flagDesaceleracaoManual == 2) {
          chassi.matrix.multiply(
            mat4.makeTranslation(degreesToRadians(-anguloX), -speed, 0)
          );
          chassi.matrix.multiply(
            mat4.makeRotationZ(degreesToRadians(anguloX * 3))
          );
          speed = speed - 0.01;
        }

        if (speed <= 0.1) {
          flagDesaceleracaoManual = 1;
        }

        if (flagDesaceleracaoManual == 1 && !keyboard.pressed("down")) {
          chassi.matrix.multiply(
            mat4.makeTranslation(degreesToRadians(anguloX), speed, 0)
          );
          chassi.matrix.multiply(
            mat4.makeRotationZ(degreesToRadians(-anguloX * 3))
          );
          if (speed <= 1.4) {
            speed = speed + 0.01;
          }
        }
      }
      if (keyboard.pressed("down")) {
        flagDesaceleracaoAutomatica = 2;
        if (speed > 0 && flagDesaceleracaoManual == 1) {
          console.log('entrei if 1 ');
          chassi.matrix.multiply(
            mat4.makeTranslation(degreesToRadians(anguloX), speed, 0)
          );
          chassi.matrix.multiply(
            mat4.makeRotationZ(degreesToRadians(-anguloX * 3))
          );
          speed = speed - 0.01;
        }

        if (speed <= 0.1) {
          console.log('entrei if 2 ');
          flagDesaceleracaoManual = 2;
        }

        if (flagDesaceleracaoManual == 2 && !keyboard.pressed("up")) {
          console.log('entrei if 3');
          chassi.matrix.multiply(
            mat4.makeTranslation(degreesToRadians(-anguloX), -speed, 0)
          );
          chassi.matrix.multiply(
            mat4.makeRotationZ(degreesToRadians(anguloX * 3))
          );
          if (speed <= 0.4) {
            speed = speed + 0.01;
          }
        }
      }

      //Desacelera o carro quando não estiver apertando o acelerador
      if (!keyboard.pressed("up") && !keyboard.pressed("down")) {
        if (speed >= 0.1 && flagDesaceleracaoAutomatica == 1) {
          chassi.matrix.multiply(
            mat4.makeTranslation(degreesToRadians(anguloX), speed, 0)
          );
          chassi.matrix.multiply(
            mat4.makeRotationZ(degreesToRadians(-anguloX * 3))
          );
          speed = speed - 0.007;
        }

        if (speed >= 0.1 && flagDesaceleracaoAutomatica == 2) {
          chassi.matrix.multiply(
            mat4.makeTranslation(degreesToRadians(-anguloX), -speed, 0)
          );
          chassi.matrix.multiply(
            mat4.makeRotationZ(degreesToRadians(anguloX * 3))
          );
          speed = speed - 0.007;
        }
      }

      if (modoCamera === 2) {
        camera.lookAt(position);
      }
      MatrixGlobal.copy(chassi.matrix);
    }
  }

  //reseta o carro para posicao inicial
  function resetarCarro() {
    desligarAutoUpdate();
    resetMatrix();
    if (inspect === false) {
      carInicialPosition();
      chassi.matrix.copy(MatrixGlobal);
    } else {
      carInicialPosition();
    }
    rotate();
  }

  //funcao que desliga o autoUpdate das partes do carro
  function desligarAutoUpdate() {
    //frente do carro
    frenteDoCarro.matrixAutoUpdate = false;
    conexaoFrontal.matrixAutoUpdate = false;
    asaEsquerdafrontal.matrixAutoUpdate = false;
    asaDireitoFrontal.matrixAutoUpdate = false;
    banco.matrixAutoUpdate = false;
    apoioBanco.matrixAutoUpdate = false;

    //meio do carro
    chassi.matrixAutoUpdate = false;
    ponteCentral.matrixAutoUpdate = false;
    arcoEsquerdo.matrixAutoUpdate = false;
    arcoDireito.matrixAutoUpdate = false;
    cabine.matrixAutoUpdate = false;
    volante.matrixAutoUpdate = false;
    apoioVolante.matrixAutoUpdate = false;

    //rodas e eixos
    rodaDianteiraDireita.matrixAutoUpdate = false;
    rodaTraseiraDireita.matrixAutoUpdate = false;
    rodaDianteiraEsquerda.matrixAutoUpdate = false;
    rodaTraseiraEsquerda.matrixAutoUpdate = false;
    rodaTraseiraEsquerda.matrixAutoUpdate = false;
    eixoFrontal.matrixAutoUpdate = false;
    suporteEixoFrontalDireito.matrixAutoUpdate = false;
    suporteeixoFrontalEsquerdo.matrixAutoUpdate = false;
    eixoTraseiro.matrixAutoUpdate = false;

    //traseira
    wing.matrixAutoUpdate = false;
    leftWing.matrixAutoUpdate = false;
    rightWing.matrixAutoUpdate = false;
    suporteEsquerdoWing.matrixAutoUpdate = false;
    suporteDireitoWing.matrixAutoUpdate = false;
    escapamentoEsquerdo.matrixAutoUpdate = false;
    escapamentoDireito.matrixAutoUpdate = false;

    texturaConexaoFrontal.matrixAutoUpdate = false;
    texturaConexaoFrontalInferior.matrixAutoUpdate = false;
    texturaConexaoFrontalFrente.matrixAutoUpdate = false;
    texturaAsaCima.matrixAutoUpdate = false;
    texturaAsaLateral.matrixAutoUpdate = false;
    texturaAsaLateralTraseira.matrixAutoUpdate = false;
    texturaAsaBaixo.matrixAutoUpdate = false;
    texturaConexaoFrontalVolante.matrixAutoUpdate = false;
    texturaChassi.matrixAutoUpdate = false;
    texturaChassiInferior.matrixAutoUpdate = false;
    texturaChassiFrontal.matrixAutoUpdate = false;
    texturaChassiTraseira.matrixAutoUpdate = false;
    texturaChassiLateralEsquerda.matrixAutoUpdate = false;
    texturaChassiLateralDireita.matrixAutoUpdate = false;
    texturaConexaoFrontalEsquerda.matrixAutoUpdate = false;
    texturaConexaoFrontalDireita.matrixAutoUpdate = false;
  }

  // funcao que reseta a posicao das partes do carro
  function resetMatrix() {
    //meio do carro
    chassi.matrix.identity();
    arcoEsquerdo.matrix.identity();
    arcoDireito.matrix.identity();
    ponteCentral.matrix.identity();
    cabine.matrix.identity();
    volante.matrix.identity();
    apoioVolante.matrix.identity();

    //frente do carro
    frenteDoCarro.matrix.identity();
    conexaoFrontal.matrix.identity();
    asaEsquerdafrontal.matrix.identity();
    asaDireitoFrontal.matrix.identity();
    banco.matrix.identity();
    apoioBanco.matrix.identity();

    //traseira
    wing.matrix.identity();
    leftWing.matrix.identity();
    rightWing.matrix.identity();
    escapamentoEsquerdo.matrix.identity();
    escapamentoDireito.matrix.identity();
    suporteEsquerdoWing.matrix.identity();
    suporteDireitoWing.matrix.identity();

    //rodas e eixos
    rodaDianteiraDireita.matrix.identity();
    rodaTraseiraDireita.matrix.identity();
    rodaDianteiraEsquerda.matrix.identity();
    rodaTraseiraEsquerda.matrix.identity();
    eixoFrontal.matrix.identity();
    suporteEixoFrontalDireito.matrix.identity();
    suporteeixoFrontalEsquerdo.matrix.identity();
    eixoTraseiro.matrix.identity();

    texturaConexaoFrontal.matrix.identity();
    texturaConexaoFrontalInferior.matrix.identity();
    texturaConexaoFrontalFrente.matrix.identity();
    texturaAsaCima.matrix.identity();
    texturaAsaLateral.matrix.identity();
    texturaAsaLateralTraseira.matrix.identity();
    texturaAsaBaixo.matrix.identity();
    texturaConexaoFrontalVolante.matrix.identity();
    texturaChassi.matrix.identity();
    texturaChassiInferior.matrix.identity();
    texturaChassiFrontal.matrix.identity();
    texturaChassiTraseira.matrix.identity();
    texturaChassiLateralEsquerda.matrix.identity();
    texturaChassiLateralDireita.matrix.identity();
    texturaConexaoFrontalEsquerda.matrix.identity();
    texturaConexaoFrontalDireita.matrix.identity();
  }

  // funcao que posiciona as partes inicais do carro
  function carInicialPosition() {
    //frente do carro
    asaEsquerdafrontal.matrix.multiply(mat4.makeTranslation(-2.3, 4.5, 0.6));
    asaDireitoFrontal.matrix.multiply(mat4.makeTranslation(2.3, 4.5, 0.6));
    banco.matrix.multiply(mat4.makeTranslation(0, 0, 0.3));
    apoioBanco.matrix.multiply(mat4.makeTranslation(0, -0.3, 0.5));
    frenteDoCarro.matrix.multiply(mat4.makeTranslation(0, 4.5, 0));
    conexaoFrontal.matrix.multiply(mat4.makeTranslation(0, 3.25, 0.6));

    //meio do carro
    chassi.matrix.multiply(mat4.makeTranslation(0, 0, 1));
    cabine.matrix.multiply(mat4.makeTranslation(0, 0, 0.2));
    volante.matrix.multiply(mat4.makeTranslation(0, 1.2, 0.6));
    apoioVolante.matrix.multiply(mat4.makeTranslation(0, 1.7, 0.6));
    ponteCentral.matrix.multiply(mat4.makeTranslation(0, 0.2, 0));
    arcoEsquerdo.matrix.multiply(mat4.makeTranslation(-0.6, 0.2, 0));
    arcoDireito.matrix.multiply(mat4.makeTranslation(0.6, 0.2, 0));

    //traseira do carro
    wing.matrix.multiply(mat4.makeTranslation(0, -2, 1.5));
    rightWing.matrix.multiply(mat4.makeTranslation(2, -2, 1.5));
    leftWing.matrix.multiply(mat4.makeTranslation(-2, -2, 1.5));
    escapamentoEsquerdo.matrix.multiply(mat4.makeTranslation(-0.4, -1.9, 0));
    escapamentoDireito.matrix.multiply(mat4.makeTranslation(0.4, -1.9, 0));
    suporteEsquerdoWing.matrix.multiply(mat4.makeTranslation(-0.5, -2, 0.76));
    suporteDireitoWing.matrix.multiply(mat4.makeTranslation(0.5, -2, 0.76));

    //rodas e eixo
    eixoFrontal.matrix.multiply(mat4.makeTranslation(0, 3.2, 0));
    suporteEixoFrontalDireito.matrix.multiply(
      mat4.makeTranslation(1, 3.2, 0.2)
    );
    suporteeixoFrontalEsquerdo.matrix.multiply(
      mat4.makeTranslation(-1, 3.2, 0.2)
    );
    eixoTraseiro.matrix.multiply(mat4.makeTranslation(0, -2, 0));
    rodaDianteiraDireita.matrix.multiply(mat4.makeTranslation(-1.7, 3.2, 0));
    rodaTraseiraDireita.matrix.multiply(mat4.makeTranslation(1.7, -2, 0));
    rodaDianteiraEsquerda.matrix.multiply(mat4.makeTranslation(1.7, 3.2, 0));
    rodaTraseiraEsquerda.matrix.multiply(mat4.makeTranslation(-1.7, -2, 0));

    texturaConexaoFrontal.matrix.multiply(mat4.makeTranslation(0, 3.25, 0.955));
    texturaConexaoFrontalInferior.matrix.multiply(
      mat4.makeTranslation(0, 3.25, 0.23)
    );
    texturaConexaoFrontalEsquerda.matrix.multiply(mat4.makeTranslation(-0.41, 3.255, 0.6));
    texturaConexaoFrontalDireita.matrix.multiply(mat4.makeTranslation(0.41, 3.255, 0.6));
    texturaConexaoFrontalFrente.matrix.multiply(mat4.makeTranslation(0, 5, 0.605));

    texturaAsaCima.matrix.multiply(mat4.makeTranslation(0, -2, 1.61));
    texturaAsaLateral.matrix.multiply(mat4.makeTranslation(0, -1.69, 1.52));
    texturaAsaLateralTraseira.matrix.multiply(
      mat4.makeTranslation(0, -2.31, 1.52)
    );
    texturaAsaBaixo.matrix.multiply(mat4.makeTranslation(0, -2, 1.39));

    texturaConexaoFrontalVolante.matrix.multiply(mat4.makeTranslation(0, 1.504, 0.557));

    texturaChassi.matrix.multiply(mat4.makeTranslation(0, 0, 0.258));
    texturaChassiInferior.matrix.multiply(mat4.makeTranslation(0, 0, -0.257));
    texturaChassiFrontal.matrix.multiply(mat4.makeTranslation(0, 2.36, 0));
    texturaChassiTraseira.matrix.multiply(mat4.makeTranslation(0, -2.38, 0));
    texturaChassiLateralEsquerda.matrix.multiply(
      mat4.makeTranslation(-1.01, 0, 0)
    );
    texturaChassiLateralDireita.matrix.multiply(
      mat4.makeTranslation(1.01, 0, 0)
    );
  }

  // funcao que cria os filhos da Chassi para o carro mover junto

  function setTextura() {
    var textureLoader = new THREE.TextureLoader();
    var texturaPrincipal = textureLoader.load("assets/texturaColorida.jpg");
    var texturaSecundaria = textureLoader.load("assets/fireTexture.jpg");
    var texturaFinal = textureLoader.load("assets/crystal.jpg");
    var texturaPlano = textureLoader.load("assets/pista.jpg");
    var texturaAreia = textureLoader.load("assets/sand.jpg");

    texturaConexaoFrontal.material.map = texturaPrincipal;
    
    texturaConexaoFrontalFrente.material.map = texturaPrincipal;
    
    texturaAsaCima.material.map = texturaSecundaria;
    texturaAsaLateral.material.map = texturaSecundaria;
    texturaAsaLateralTraseira.material.map = texturaSecundaria;
    texturaAsaBaixo.material.map = texturaSecundaria;

    
    texturaConexaoFrontalInferior.material.map = texturaPrincipal;
    texturaConexaoFrontalVolante.material.map = texturaPrincipal;
    texturaConexaoFrontalEsquerda.material.map = texturaPrincipal;
    texturaConexaoFrontalDireita.material.map = texturaPrincipal;

    plane.material.map = texturaPlano;
    plane2.material.map = texturaAreia;



    texturaChassi.material.map = texturaFinal;
    texturaChassiInferior.material.map = texturaFinal;
    texturaChassiFrontal.material.map = texturaFinal;
    texturaChassiTraseira.material.map = texturaFinal;
    texturaChassiLateralEsquerda.material.map = texturaFinal;
    texturaChassiLateralDireita.material.map = texturaFinal;
  }
  function createCarChild() {
    //frente do carro
    chassi.add(frenteDoCarro);
    chassi.add(conexaoFrontal);
    chassi.add(asaEsquerdafrontal);
    chassi.add(asaDireitoFrontal);
    chassi.add(banco);
    chassi.add(apoioBanco);

    //meio do carro
    chassi.add(cabine);
    chassi.add(volante);
    chassi.add(apoioVolante);
    chassi.add(arcoEsquerdo);
    chassi.add(arcoDireito);
    chassi.add(ponteCentral);

    //traseira do carro
    chassi.add(wing);
    chassi.add(leftWing);
    chassi.add(rightWing);
    chassi.add(suporteEsquerdoWing);
    chassi.add(suporteDireitoWing);
    chassi.add(escapamentoEsquerdo);
    chassi.add(escapamentoDireito);

    //rodas e eeixo
    chassi.add(rodaDianteiraDireita);
    chassi.add(rodaTraseiraDireita);
    chassi.add(rodaDianteiraEsquerda);
    chassi.add(rodaTraseiraEsquerda);
    chassi.add(eixoFrontal);
    chassi.add(suporteEixoFrontalDireito);
    chassi.add(suporteeixoFrontalEsquerdo);
    chassi.add(eixoTraseiro);

    chassi.add(texturaConexaoFrontal);
    chassi.add(texturaConexaoFrontalInferior);
    chassi.add(texturaConexaoFrontalFrente);
    chassi.add(texturaAsaCima);
    chassi.add(texturaAsaLateral);
    chassi.add(texturaAsaLateralTraseira);
    chassi.add(texturaAsaBaixo);
    chassi.add(texturaConexaoFrontalVolante);
    chassi.add(texturaChassi);
    chassi.add(texturaChassiInferior);
    chassi.add(texturaChassiFrontal);
    chassi.add(texturaChassiTraseira);
    chassi.add(texturaChassiLateralEsquerda);
    chassi.add(texturaChassiLateralDireita);
    chassi.add(texturaConexaoFrontalEsquerda);
    chassi.add(texturaConexaoFrontalDireita);

    //câmera
    chassi.add(camera);

    //luz
    chassi.add(spotLight);
  }

  // funcao que rotaciona o angulo das pecas para formar o carro
  function rotate() {
    //frente do carro
    asaEsquerdafrontal.matrix.multiply(
      mat4.makeRotationY(degreesToRadians(90))
    );
    asaDireitoFrontal.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
    banco.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
    apoioBanco.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
    frenteDoCarro.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));

    //meio do carro
    arcoEsquerdo.matrix.multiply(mat4.makeRotationZ(degreesToRadians(94)));
    arcoDireito.matrix.multiply(mat4.makeRotationZ(degreesToRadians(-86)));
    ponteCentral.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));

    //traseira do carro
    leftWing.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
    rightWing.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
    suporteEsquerdoWing.matrix.multiply(
      mat4.makeRotationX(degreesToRadians(90))
    );
    suporteDireitoWing.matrix.multiply(
      mat4.makeRotationX(degreesToRadians(90))
    );

    //rodas e eixo
    rodaDianteiraDireita.matrix.multiply(
      mat4.makeRotationZ(degreesToRadians(90))
    );
    rodaTraseiraDireita.matrix.multiply(
      mat4.makeRotationZ(degreesToRadians(90))
    );
    rodaDianteiraEsquerda.matrix.multiply(
      mat4.makeRotationZ(degreesToRadians(90))
    );
    rodaTraseiraEsquerda.matrix.multiply(
      mat4.makeRotationZ(degreesToRadians(90))
    );
    eixoFrontal.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));
    suporteEixoFrontalDireito.matrix.multiply(
      mat4.makeRotationZ(degreesToRadians(90))
    );
    suporteEixoFrontalDireito.matrix.multiply(
      mat4.makeRotationX(degreesToRadians(30))
    );
    suporteeixoFrontalEsquerdo.matrix.multiply(
      mat4.makeRotationZ(degreesToRadians(90))
    );
    suporteeixoFrontalEsquerdo.matrix.multiply(
      mat4.makeRotationX(degreesToRadians(-30))
    );
    eixoTraseiro.matrix.multiply(mat4.makeRotationZ(degreesToRadians(90)));

    texturaConexaoFrontalEsquerda.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
    texturaConexaoFrontalDireita.matrix.multiply(mat4.makeRotationY(degreesToRadians(90)));
    texturaConexaoFrontalFrente.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
    texturaConexaoFrontalVolante.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));

    texturaAsaLateral.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
    texturaAsaLateralTraseira.matrix.multiply(
      mat4.makeRotationX(degreesToRadians(90))
    );

    texturaChassiFrontal.matrix.multiply(
      mat4.makeRotationX(degreesToRadians(90))
    );
    texturaChassiTraseira.matrix.multiply(
      mat4.makeRotationX(degreesToRadians(90))
    );
    texturaChassiLateralEsquerda.matrix.multiply(
      mat4.makeRotationY(degreesToRadians(90))
    );
    texturaChassiLateralDireita.matrix.multiply(
      mat4.makeRotationY(degreesToRadians(90))
    );
  }

  // funcao que cria as rodas do carro
  function roda() {
    const cylinderGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.7, 17);
    const cylinderMaterial = new THREE.MeshPhongMaterial({
      color: "rgb(50,50,50)",
    });
    const roda = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    return roda;
  }

  // função que cria os postes
  function poste() {
    //base do poste
    var mat4 = new THREE.Matrix4();
    var position = new THREE.Vector3();
    var quaternion = new THREE.Quaternion();
    var scale = new THREE.Vector3();
    const geometry = new THREE.BoxGeometry(1, 1, 0.5);
    const material = new THREE.MeshPhongMaterial({ color: 0xdcdcdc });
    const cube = new THREE.Mesh(geometry, material);
    cube.matrixAutoUpdate = false;
    cube.matrix.multiply(mat4.makeTranslation(0, 0, 0));
    cube.castShadow = true;

    const geometry2 = new THREE.ConeGeometry(0.5, 0.5, 32);
    const material2 = new THREE.MeshPhongMaterial({ color: 0x1c1c1c });
    const cone = new THREE.Mesh(geometry2, material2);
    cone.matrixAutoUpdate = false;
    cone.matrix.multiply(mat4.makeTranslation(0, 0, 0.3));
    cone.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
    cone.castShadow = true;

    const geometry3 = new THREE.CylinderGeometry(0.3, 0.3, 2, 32);
    const material3 = new THREE.MeshPhongMaterial({ color: 0xdcdcdc });
    const cylinder3 = new THREE.Mesh(geometry3, material3);
    cylinder3.matrixAutoUpdate = false;
    cylinder3.matrix.multiply(mat4.makeTranslation(0, 0, 1.2));
    cylinder3.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
    cylinder3.castShadow = true;

    const geometry4 = new THREE.ConeGeometry(0.31, 0.31, 32);
    const material4 = new THREE.MeshPhongMaterial({ color: 0x1c1c1c });
    const cone2 = new THREE.Mesh(geometry4, material4);
    cone2.matrixAutoUpdate = false;
    cone2.matrix.multiply(mat4.makeTranslation(0, 0, 2.35));
    cone2.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
    cone2.castShadow = true;

    // corpo poste
    const geometry5 = new THREE.CylinderGeometry(0.1, 0.1, 4, 32);
    const material5 = new THREE.MeshPhongMaterial({ color: 0xdcdcdc });
    const cylinder4 = new THREE.Mesh(geometry5, material5);
    cylinder4.matrixAutoUpdate = false;
    cylinder4.matrix.multiply(mat4.makeTranslation(0, 0, 4.2));
    cylinder4.matrix.multiply(mat4.makeRotationX(degreesToRadians(90)));
    cylinder4.castShadow = true;

    // base segura lampada
    const geometry6 = new THREE.CylinderGeometry(0.1, 0.1, 3, 32);
    const material6 = new THREE.MeshPhongMaterial({ color: 0xdcdcdc });
    const cylinder5 = new THREE.Mesh(geometry5, material5);
    cylinder5.matrixAutoUpdate = false;
    cylinder5.matrix.multiply(mat4.makeTranslation(0, -1.7, 7));
    cylinder5.matrix.multiply(mat4.makeRotationX(degreesToRadians(150)));
    cylinder5.castShadow = false;

    //bocal lampada
    const geometry7 = new THREE.BoxGeometry(0.5, 0.5, 0.2);
    const material7 = new THREE.MeshPhongMaterial({ color: 0xdcdcdc });
    const cube2 = new THREE.Mesh(geometry7, material7);
    cube2.matrixAutoUpdate = false;
    cube2.matrix.multiply(mat4.makeTranslation(0, -3.6, 8.1));
    cube2.matrix.multiply(mat4.makeRotationX(degreesToRadians(150)));
    cube2.castShadow = true;

    //lampada
    const geometry8 = new THREE.SphereBufferGeometry(
      0.25,
      32,
      32,
      0,
      2 * Math.PI,
      0,
      0.5 * Math.PI
    );
    const material8 = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry8, material8);
    sphere.matrixAutoUpdate = false;
    sphere.matrix.multiply(mat4.makeTranslation(0, -3.6, 8.15));
    sphere.matrix.multiply(mat4.makeRotationX(degreesToRadians(-90)));
    sphere.castShadow = true;

    var luzLampada = new THREE.SpotLight(lightColor);
    luzLampada.matrixAutoUpdate = false;
    setLuzLampada(luzLampada);

    cube.add(cylinder4);
    cube.add(cone);
    cube.add(cylinder3);
    cube.add(cone2);
    cube.add(cylinder5);
    cube.add(cube2);
    cube.add(sphere);
    sphere.add(luzLampada);
    sphere.add(luzLampada.target);
    return cube;
  }

  //configura a luz do poste
  function setLuzLampada(pointLight) {
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    pointLight.shadow.camera.fov = degreesToRadians(20);
    pointLight.castShadow = true;
    pointLight.decay = 2;
    pointLight.penumbra = 0.68;
    pointLight.focus = 1;
    pointLight.angle = 1.3;
    pointLight.target.position.set(0, 10, 1);
    pointLight.target.updateMatrixWorld();
    pointLight.name = "LuzPoste";
  }

  // funcao que cria o eixo
  function eixo() {
    var cylinderGeometry = new THREE.CylinderGeometry(0.07, 0.07, 3, 10);
    var cylinderMaterial = new THREE.MeshPhongMaterial({
      color: "rgb(255,255,0)",
    });
    var eixo = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    return eixo;
  }

  function cubo(width, height, depth, color) {
    var cubeGeometry = new THREE.BoxGeometry(width, height, depth);
    var planeMaterial = new THREE.MeshPhongMaterial({ color: color });
    var cubo = new THREE.Mesh(cubeGeometry, planeMaterial);
    return cubo;
  }

  //altera a câmera para o modo inspeção
  function cameraModoInspecao() {
    inspect = true;
    chassi.remove(camera);
    apoioBanco.remove(cubeCamera);
    trackballControls = initTrackballControls(camera, renderer);
    camera.position.x = -5;
    camera.position.y = 5;
    camera.position.z = 5;

    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 1;
    scene.remove(plane);
    scene.remove(plane2);
    scene.remove(skybox);
    scene.remove(montanha);
    scene.remove(montanhaLadoDireito);
    scene.remove(montanhaPequena);
    scene.remove(statue);
    scene.remove(statueHorse);
    scene.remove(poste08);
    scene.remove(poste07);
    scene.remove(poste06);
    scene.remove(poste05);
    scene.remove(poste04);
    scene.remove(poste03);
    scene.remove(poste02);
    scene.remove(poste01);
    resetarCarro();
  }

  //altera a câmera para o modo jogo
  function cameraModoJogo() {
    inspect = false;
    apoioBanco.remove(cubeCamera);
    speed = 0;
    anguloX = 0;
    scene.add(plane);
    scene.add(plane2);
    scene.add(skybox);
    scene.add(statue);
    scene.add(statueHorse);
   
    camera = changeCamera(new THREE.Vector3(0, -15, 5));
    resetarCarro();
    chassi.add(camera);
    scene.add(montanha);
    scene.add(montanhaLadoDireito);
    scene.add(montanhaPequena);
    scene.add(poste08);
    scene.add(poste07);
    scene.add(poste06);
    scene.add(poste05);
    scene.add(poste04);
    scene.add(poste03);
    scene.add(poste02);
    scene.add(poste01);
  }

  function cameraModoCockpit() {
    chassi.remove(camera);
    camera = changeCamera(new THREE.Vector3(0, 0.6, -1));

   
    cubeCamera.add(camera);
    apoioBanco.add(cubeCamera);

  }

  // controla o modo da câmera
  function changeCameraMode() {
    if (inspect === true && modoCamera === 1) {
      cameraModoJogo();
      modoCamera = 2;
  
    } else {
      if (modoCamera === 2) {
        cameraModoCockpit();
        modoCamera = 3;
      } else {
    
        modoCamera = 1;
        cameraModoInspecao();
      }
    }
  }
  function showInformation() {
    // Use this to show information onscreen
    controls = new InfoBox();
    controls.addParagraph();
    controls.add("Use keyboard arrows to move the chassi.");
    controls.add("Press '< and '>' to rotate Wheels.");
    controls.add("Press Space to change between modes");
    controls.show();
  }

  function render() {
    stats.update(); // Update FPS
    if (inspect === true) trackballControls.update();
    movimentacaoCarro();

    requestAnimationFrame(render);
    renderer.render(scene, camera); // Render scene
  }

  function onMouseWheel(event) {
    if (modoCamera === 2) {
      event.preventDefault();
      camera.fov += event.deltaY / 100;
      camera.updateProjectionMatrix();
  
    }
  }

  //configurações da câmera do jogo
  function changeCamera(initialPosition) {
    var position = initialPosition;
    var camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    camera.position.copy(position);
    camera.up.set(0, 0, 1);
    return camera;
  }

  //controla as luzes do cenário
  var controls = new (function () {
    this.viewDirecional = true;
    this.lightDirecional = function () {
      dirLight.visible = this.viewDirecional;
    };

    this.viewPoste = true;
    this.lightPoste = function () {
      luzPoste01.visible = this.viewPoste;
      luzPoste02.visible = this.viewPoste;
      luzPoste03.visible = this.viewPoste;
      luzPoste04.visible = this.viewPoste;
      luzPoste05.visible = this.viewPoste;
      luzPoste06.visible = this.viewPoste;
      luzPoste07.visible = this.viewPoste;
      luzPoste08.visible = this.viewPoste;
    };

    this.viewCarro = true;
    this.lightCarro = function () {
      spotLight.visible = this.viewCarro;
    };

    spotLight;
  })();

  //Chamam as funcionalidades que controlam as luzes do cenário
  var gui = new dat.GUI();
  gui
    .add(controls, "viewDirecional", true)
    .name("Luz Direcional")
    .onChange(function (e) {
      controls.lightDirecional();
    });
  gui
    .add(controls, "viewPoste", true)
    .name("Luz Poste")
    .onChange(function (e) {
      controls.lightPoste();
    });
  gui
    .add(controls, "viewCarro", true)
    .name("Luz Carro")
    .onChange(function (e) {
      controls.lightCarro();
    });


}
