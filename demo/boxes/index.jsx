/* IMPORT */
import { BoxBufferGeometry } from 'three/src/geometries/BoxGeometry';
import { DirectionalLight } from 'three/src/lights/DirectionalLight';
import { Mesh } from 'three/src/objects/Mesh';
import { MeshNormalMaterial } from 'three/src/materials/MeshNormalMaterial';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import { Scene } from 'three/src/scenes/Scene';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer';
import { $, render, useAnimationLoop, useEffect, useMemo } from 'voby';
/* HELPERS */
const COUNT_INITIAL = 100;
const COUNT_MIN = 1;
const COUNT_MAX = 10000;
const SPEED = 0.01;
/* MAIN */
const useIdleInput = (callback) => {
    let pending = false;
    return (event) => {
        if (pending)
            return;
        pending = true;
        setTimeout(() => {
            console.log("useIdleInput timeout");
            pending = false;
            callback(event);
        }, 50);
    };
};
const useRotations = (count) => {
    const getRandom = () => Math.random() * 360;
    const getRotation = () => $([getRandom(), getRandom(), getRandom()]);
    const rotations = useMemo(() => Array(+count()).fill(0).map(getRotation));
    useAnimationLoop(() => {
        rotations().forEach(rotation => {
            const [x, y, z] = rotation();
            rotation([x + SPEED, y + SPEED, z + SPEED]);
        });
    });
    return rotations;
};
const ThreeScene = (camera, light, meshes) => {
    const scene = new Scene();
    scene.add(light);
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff);
    useEffect(() => {
        scene.remove.apply(scene, scene.children.slice(2));
        meshes().forEach(mesh => scene.add(mesh));
    });
    useAnimationLoop(() => {
        renderer.render(scene, camera);
    });
    useEffect(() => {
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        onResize();
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    });
    return renderer.domElement;
};
const ThreePerspectiveCamera = (location) => {
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new PerspectiveCamera(106, aspect, 1, 1000);
    camera.position.set(...location);
    return camera;
};
const ThreeDirectionalLight = (direction) => {
    const light = new DirectionalLight(0x000000);
    light.position.set(...direction);
    return light;
};
const ThreeMesh = (rotation) => {
    const material = new MeshNormalMaterial();
    const geometry = new BoxBufferGeometry(2, 2, 2);
    const mesh = new Mesh(geometry, material);
    useEffect(() => {
        mesh.rotation.set(...rotation());
    });
    return mesh;
};
const Controls = ({ count, onInput }) => {
    return (<div class="controls">
      <input id="slider" type="range" onInput={onInput} min={COUNT_MIN} max={COUNT_MAX} step={1}/>
      <label htmlFor="slider">{count}</label>
    </div>);
};
const Rotations = ({ rotations }) => {
    const camera = ThreePerspectiveCamera([0, 0, 3.2]);
    const light = ThreeDirectionalLight([-5, 0, -10]);
    const meshes = useMemo(() => rotations().map(ThreeMesh));
    const scene = ThreeScene(camera, light, meshes);
    return (<div class="container">
      {scene}
    </div>);
};
const App = () => {
    const count = $(COUNT_INITIAL);
    const rotations = useRotations(count);
    const onInput = useIdleInput(event => {
        count(parseInt(event.target.value));
    });
    return (<main>
      <Rotations rotations={rotations}/>
      <Controls count={count} onInput={onInput}/>
    </main>);
};
render(<App />, document.getElementById('app'));
