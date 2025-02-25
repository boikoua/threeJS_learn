import * as THREE from 'three';

const scene = new THREE.Scene(); // создал сцену

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

// добавил библиотеку на страницу
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(); // создание заготовленого стандартного куба

// указываю параметры для куба
const material = new THREE.MeshBasicMaterial({
  color: 'red',
});

const cube = new THREE.Mesh(geometry, material); // собираю куб в один меш
cube.position.set(-3, 0, 0); // двигаем куб по XYZ
scene.add(cube); // добавляю куб на сцену

// Создаю стандартную сферу с радиусом сферы и сигментами (пересечения)
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({
  color: 'blue',
  emissive: 'white',
  shininess: 100,
});

const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(2, 0, 0);
scene.add(sphere);

// создаю пончик (стандартный)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.7, 0.2, 16, 100),
  new THREE.MeshBasicMaterial({
    color: 'orange',
  })
);

torus.position.set(2, 2, 1);
scene.add(torus);

// делаю функцию, которая будет постоянно рендерить мою фигуру на страницу
function animate() {
  requestAnimationFrame(animate); // использую браузерную функцию для реакции на любой фрейм фигуры

  // при каждом перерендере меняет свою позицию для вращения
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
