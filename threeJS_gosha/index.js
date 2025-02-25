import * as THREE from 'three';

const scene = new THREE.Scene(); // создал сцену

// Создаю источники света Light
// Свет для всей сцены (создали и добавили на сцену) (похож на фильтр)
// всегда указываем первым параметром цвет, вторым интенсивность света
// const ambientLight = new THREE.AmbientLight('white', 0.1);
// scene.add(ambientLight);

// direction light свет который похож по типу солнца (светит с одной стороны которую мы укажем позиционированием)
// всегда указываем первым параметром цвет, вторым интенсивность света
// const dirLight = new THREE.DirectionalLight('white', 1);
// dirLight.position.set(5, 5, 5);
// scene.add(dirLight);

// point light похож на эффект фонаря (с одной точки, будет рассеивать свет)
// всегда указываем первым параметром цвет, вторым интенсивность света и дистанцию третим
// const pointLight = new THREE.PointLight('white', 10, 100);
// pointLight.position.set(0.5, 1, 1);
// scene.add(pointLight);

// визуализация света (нужна только на стадии разработки) тестируем
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
// scene.add(pointLightHelper);

// spot light освещает только в одну сторону, как фонарь, но не рассеивает
const spotLight = new THREE.SpotLight('white', 1);
spotLight.position.set(1, 1, 1);
scene.add(spotLight);

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

  renderer.render(scene, camera);
}

animate();
