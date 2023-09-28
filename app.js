let leftEye, rightEye, scene, renderer, camera;

init();
function init(){
  const modelPath = "model.glb";
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfde2af);

  renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#c"), antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 0, 20);

  var loader = new THREE.GLTFLoader();
  loader.load(
    modelPath,
    function(gltf){
      model = gltf.scene;
      model.traverse(function(child){
        if(child.isMesh){
          child.castShadow = true;
          child.recieveShadow = true;
          console.log(child.morphTargetDictionary);

          child.morphTargetInfluences[30] = 0.6;
          child.morphTargetInfluences[31] = 0.6;
          child.morphTargetInfluences[16] = 0.6;
;
        }
        /*
        if(child.name === 'LeftEye' && child.isBone){
          child.rotateZ(Math.PI / 6);
          leftEye = child;
        }

        if(child.name === 'RightEye' && child.isBone){
          rightEye = child;
        }*/
      });

      model.scale.set(7, 7, 7);
      scene.add(model);
    },
    undefined,
    function(err){
      console.error(err);
    }
  );

  scene.add(new THREE.AmbientLight(0xffffff));
}

function update(){
  if (resizeRendererToDisplaySize(renderer)){
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  requestAnimationFrame(update);
  renderer.render(scene, camera);
}
update();

function resizeRendererToDisplaySize(renderer){
  const canvas = renderer.domElement;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let canvasPixelWidth = canvas.width / window.devicePixelRatio;
  let canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize =
    canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize){
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function moveParts(leftEye, rightEye){
  if(leftEye){
    leftEye.rotateZ(Math.PI / 6);
  }
}
//moveParts(leftEye, rightEye);