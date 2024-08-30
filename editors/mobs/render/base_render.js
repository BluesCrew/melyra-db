import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let cameraControls = null;

function createScene(){
    let scene = new THREE.Scene();
    const light = new THREE.AmbientLight();
    scene.add(light);
    return scene;
}

function createRenderer(canvas) {
    let renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.width, canvas.height);
    return renderer
}

function setupCamera(scene, canvas, mobListPreview) {
    let camera = mobListPreview
        ? new THREE.OrthographicCamera(-1, 1, 1, -1, -200, 1000)
        : new THREE.PerspectiveCamera(50, canvas.width / canvas.height, 0.1, 1000);
    camera.position.set(-1, 1, -1);
    scene.add(camera);

    if (!mobListPreview) {
        cameraControls = new OrbitControls(camera, canvas);
        cameraControls.target.set(0, 0, 0);
    }
    return camera
}

function adjustCameraForModel(models, camera, mobListPreview) {
    if (mobListPreview) {
        const screenBox = new THREE.Box3().setFromObject(models[0].scene);
        for (let i = 1; i < models.length; i ++){
            screenBox.expandByObject(models[i].scene);
        }
        
        screenBox.applyMatrix4(camera.matrix);
        for (let i = 0; i < models.length; i ++){
            models[i].scene.position.sub(screenBox.getCenter(new THREE.Vector3()));
        }
        camera.zoom = 2 / Math.max(...screenBox.getSize(new THREE.Vector3()).toArray());
        camera.updateProjectionMatrix();
    }
    camera.lookAt(0, 0, 0);

    if (cameraControls) {
        cameraControls.update();
    }
}

function loadTexture(path, callback) {
    new THREE.TextureLoader().load(
        path,
        (texture) => {
            texture.flipY = false;
            texture.magFilter = THREE.NearestFilter;
            texture.colorSpace = THREE.SRGBColorSpace;
            callback(texture);
        },
        undefined,
        (error) => console.error(`Error loading texture: ${path}`, error)
    );
}

function applyMaterialToMesh(mesh, texture, color = null) {
    if (mesh.isMesh && mesh.material.map) {
        mesh.material.map = texture;
        mesh.material.map.needsUpdate = true;
        if (color) {
            mesh.material.color = new THREE.Color(color);
        }
    }
}

function loadModel(scene, path, callback) {
    const loader = new GLTFLoader();
    loader.load(
        path,
        (gltf) => {
            scene.add(gltf.scene);
            callback(gltf);
        },
        undefined,
        (error) => console.error(`Error loading model: ${path}`, error)
    );
}

function applyMobTextures(model, texture, tint = null, path_overwrite = null) {
    model.traverse((child) => {
        if (child.isMesh && child.material.map) {
            let texturePath = `/melyra-db/assets/mob_textures/${texture}.png`;
            if (path_overwrite) texturePath = path_overwrite;
            loadTexture(texturePath, (texture) => applyMaterialToMesh(child, texture, tint));
        }
    });
}

function render(scene, camera, renderer) {
    function animate() {
        requestAnimationFrame(animate);
        if (cameraControls) {
            cameraControls.update();
        }
        renderer.render(scene, camera);
    }
    animate();
}


export function renderBaseMob(mob, canvas, mobListPreview = false) {
    const scene = createScene();
    const renderer = createRenderer(canvas);
    const camera = setupCamera(scene, canvas, mobListPreview);
    render(scene, camera, renderer);

    if (mob.minecraftId === "tropical_fish") { 
        const basePath = `fish/tropical_${mob.fishSize ? 'b' : 'a'}`;
        // render first layer
        loadModel(scene,
            `/melyra-db/assets/models/tropical_fish/${mob.fishSize?'b':'a'}.gltf`,
            (gltf1) => {
                applyMobTextures(gltf1.scene, basePath, decimalToHex(defaultColors[mob.fishBaseColor]));
                //render second layer
                loadModel(scene,
                    `/melyra-db/assets/models/tropical_fish/pattern_${mob.fishSize ? 'b' : 'a'}.gltf`,
                    (gltf2) => {
                        applyMobTextures(gltf2.scene, `${basePath}_pattern_${parseInt(mob.fishPattern) + 1}`, decimalToHex(defaultColors[mob.fishPatternColor]));
                        adjustCameraForModel([gltf1, gltf2], camera, mobListPreview);
                    }
                );
            }
        );
        return
    }

    const modelPath = `/melyra-db/assets/models/${mob.minecraftId}.gltf`;

    loadModel(scene,
        modelPath,
        (gltf) => {
            if (mob.textureVariant) applyMobTextures(gltf.scene, `${mob.minecraftId}/${mob.textureVariant}`);
            adjustCameraForModel([gltf], camera, mobListPreview);
        }
    );
}