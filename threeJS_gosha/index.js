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

// новые материалы для куда
const originMaterial = new THREE.MeshStandardMaterial({ color: 'red' });
const highlightMaterial = new THREE.MeshStandardMaterial({
  color: 'yellow',
  emissive: 'white',
  emissiveIntensity: 0.5,
});

const cube = new THREE.Mesh(geometry, originMaterial); // собираю куб в один меш
cube.position.set(0, 0, 0); // двигаем куб по XYZ
scene.add(cube); // добавляю куб на сцену

// GSAP Animation для куба (указываю для позиционирования, но можно и другие)
// gsap.to(cube.position, {
//   y: 2,
//   x: 2,
//   duration: 1,
//   ease: 'power1.inOut',
//   repeat: -1,
//   yoyo: true,
// });

// END GSAP

// организовую взаимодействие с пользователем
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(); // храним положение мыши в двумерном пространстве

// function onMouseClick(event) {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // получаем правильную координату мышки по оси Х
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // получаем правильную координату мышки по оси Y

//   raycaster.setFromCamera(mouse, camera);

//   // записываем все объекты по которым работало событие (там где было пересечение)
//   const intersects = raycaster.intersectObjects(scene.children);

//   if (intersects.length > 0) {
//     // первый элемент массива покрасим в синий
//     intersects[0].object.material.color.set('blue');
//   }
// }
// // вешаем событие на окно браузера
// window.addEventListener('mousemove', onMouseClick);

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove);

let isHovered = false;

// делаю функцию, которая будет постоянно рендерить мою фигуру на страницу
function animate() {
  requestAnimationFrame(animate); // использую браузерную функцию для реакции на любой фрейм фигуры

  // при каждом перерендере меняет свою позицию для вращения
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(cube);

  // если было пересечиние с объектом, то делаем действия в блоке кода
  if (intersects.length > 0 && !isHovered) {
    cube.material = highlightMaterial;
    isHovered = true;

    gsap.to(cube.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: 1.5,
      ease: 'power1.out',
    });
  } else if (intersects.length === 0 && isHovered) {
    cube.material = originMaterial;
    isHovered = false;

    gsap.to(cube.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.5,
      ease: 'power1.out',
    });
  }

  // обновляем положение камеры
  controls.update();

  renderer.render(scene, camera);
}

animate();
