import * as THREE from 'three'; // импорт библиотеки
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene(); // создание сцены

// создание камеры
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5; // позиционирование камеры

const renderer = new THREE.WebGLRenderer(); // создание объекта для рендера (canvas)
renderer.setSize(window.innerWidth, window.innerHeight); // устанавливаю размеры относительно экрана

document.body.appendChild(renderer.domElement); // добавляю объект в ДОМ структуру

const controls = new OrbitControls(camera, renderer.domElement); // добавляю контроль над камерой
controls.enableDamping = true; // добавляю плавность

const light = new THREE.AmbientLight(0xffffff, 1); // создаю цетральное освещение
scene.add(light); // добавляю его на сцену

const geometry = new THREE.BoxGeometry(1, 1, 1); // создаю стандартный куб
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
}); // создаю материал для куба

const cube = new THREE.Mesh(geometry, material); // собираю куб
scene.add(cube); // добавляю куб на сцену

// пишу функцию для анимации куба
function animate() {
  requestAnimationFrame(animate); // рендер при каждом изменении фрейма

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update(); // обновление управления

  renderer.render(scene, camera); // рендер на странице
}

animate(); // первый запуск функции
