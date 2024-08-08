import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export function renderBaseMob(mob, canvas, itemListPreview=false) {

    const loader = new GLTFLoader();
    
    loader.load(
        `/melyra-db/assets/models/${mob.minecraftId}.gltf`,

        function(gltf) {
            const scene = new THREE.Scene();
            const light = new THREE.AmbientLight();
            scene.add(light);

            let camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -200, 1000)
            if (!itemListPreview) {
                camera = new THREE.PerspectiveCamera(75, 1, -1000, 1000);
            }
            scene.add(camera);
            scene.add(gltf.scene);
            console.log(scene);

            camera.position.set(-1, 1, -1);
            camera.lookAt(0, 0, 0);


            const screenBox = new THREE.Box3().setFromObject(gltf.scene).applyMatrix4(camera.matrix);
            gltf.scene.position.sub(screenBox.getCenter(new THREE.Vector3()));
            camera.zoom = 2 / Math.max(...screenBox.getSize(new THREE.Vector3()).toArray())
            camera.updateProjectionMatrix();

            const renderer = new THREE.WebGLRenderer({canvas});
            renderer.setSize(canvas.width, canvas.height);

            render();

            function render() {
                requestAnimationFrame(render);

                renderer.render(scene, camera);
            }
        },

        undefined,

        function(error) {
            console.error(error);
        }
    );
}