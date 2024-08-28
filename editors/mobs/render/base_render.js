import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let camera = null;

export function renderBaseMob(mob, canvas, mobListPreview=false) {
    const loader = new GLTFLoader();
    
    loader.load(
        `/melyra-db/assets/models/${mob.minecraftId}.gltf`,

        function(gltf) {
            const scene = new THREE.Scene();

            if (mob.textureVariant !== null && mob.textureVariant !== "") {
                gltf.scene.traverse(function (child) {
                    if (child.isMesh && child.material.map) {
                        new THREE.TextureLoader().load(
                            `/melyra-db/assets/mob_textures/${mob.minecraftId}/${mob.textureVariant}.png`,

                            function(tex) {
                                tex.flipY = false;
                                tex.magFilter = THREE.NearestFilter;
                                tex.colorSpace = THREE.SRGBColorSpace
                                child.material.map = tex;
                                child.material.map.needsUpdate = true;
                            },

                            undefined,

                            function(err){
                                console.error(err);
                            }
                        );

                    }
                }
                )
            }


            const light = new THREE.AmbientLight();
            scene.add(light);
            scene.add(gltf.scene);

            let cameraControls = null;
            if (camera == null)
            {
                camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -200, 1000)
                if (mobListPreview) {
                    const screenBox = new THREE.Box3().setFromObject(gltf.scene).applyMatrix4(camera.matrix);
                    gltf.scene.position.sub(screenBox.getCenter(new THREE.Vector3()));
                    camera.zoom = 2 / Math.max(...screenBox.getSize(new THREE.Vector3()).toArray())
                    camera.updateProjectionMatrix();
                }
                else
                {
                    camera = new THREE.PerspectiveCamera(50, canvas.width/canvas.height, 0.1, 1000);
                    cameraControls = new OrbitControls(camera, canvas);
                }
                scene.add(camera);
                camera.position.set(-1, 1, -1);
                
            }
            camera.lookAt(0, 0, 0);

            if (cameraControls != null) {
                cameraControls.target.set(0, 0, 0);
                cameraControls.update();
            }

            const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
            renderer.setSize(canvas.width, canvas.height);



            cancelAnimationFrame(render);
            render();

            function render() {
                requestAnimationFrame(render);

                if (cameraControls)
                    cameraControls.update();

                renderer.render(scene, camera);
            }
        },

        undefined,

        function(error) {
            console.error(error);
        }
    );
}