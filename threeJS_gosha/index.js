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
