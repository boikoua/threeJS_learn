import * as THREE from 'three';
// Класс для работы с камерой
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene(); // создал сцену

// Создаю источники света Light
// Свет для всей сцены (создали и добавили на сцену) (похож на фильтр)
// всегда указываем первым параметром цвет, вторым интенсивность света
const ambientLight = new THREE.AmbientLight('white', 0.1);
scene.add(ambientLight);

// direction light свет который похож по типу солнца (светит с одной стороны которую мы укажем позиционированием)
// всегда указываем первым параметром цвет, вторым интенсивность света
const dirLight = new THREE.DirectionalLight('white', 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// создал камеру
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 5; // переместил камеру по оси z

// создал метод рендера в переменную, и указал размеры вывода
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// добавил рендер на страницу
document.body.appendChild(renderer.domElement);

// Работа с камерой (указываю какую именно камеру и куда вывести)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // плавное замедление камеры
controls.dampingFactor = 0.05; // указываем насколько булет плавное замедление
controls.screenSpacePanning = false; // отключаем понормирование по экрану
// минимальная и максимальная дистанция
controls.minDistance = 2;
controls.maxDistance = 10;

const geometry = new THREE.BoxGeometry(); // создание заготовленого стандартного куба

// указываю параметры для куба
// const material = new THREE.MeshBasicMaterial({
//   color: 'red',
// });

// материал для куба, что бы работал свет общей сцены
const material = new THREE.MeshStandardMaterial({ color: 'red' });

const cube = new THREE.Mesh(geometry, material); // собираю куб в один меш
cube.position.set(0, 0, 0); // двигаем куб по XYZ
scene.add(cube); // добавляю куб на сцену

// делаю функцию, которая будет постоянно рендерить мою фигуру на страницу
function animate() {
  requestAnimationFrame(animate); // использую браузерную функцию для реакции на любой фрейм фигуры

  // при каждом перерендере меняет свою позицию для вращения
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // обновляем положение камеры
  controls.update();

  renderer.render(scene, camera);
}

animate();
