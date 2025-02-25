import * as THREE from 'three';
import './style.css';

// Создание сцены
const scene = new THREE.Scene();

// Создаю сам объект (фигуру)
const geometry = new THREE.BoxGeometry(1, 1, 1); // размеры фигуры
const material = new THREE.MeshBasicMaterial({
  color: 'purple', // цвет фигуры
  wireframe: true, // прозрачность фигуры
}); // материал фигуры (цвет, заливка)

const mesh = new THREE.Mesh(geometry, material); // создаю сетку, объеденив всё в один

scene.add(mesh); // добавляю сетку на сцену

// Создаю камеру (то как будет показана сама сцена)
const sizes = {
  width: 500,
  height: 500,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); // указываю угол обзора и размеры самой камеры
camera.position.z = 3; // смещаем камеру по оси Z

scene.add(camera); // добавляю камеру на сцену

// Создаю отрисовщик сцены
const canvas = document.querySelector('.canvas'); // достаю элемент на странице

const renderer = new THREE.WebGLRenderer({ canvas }); // создаю объект рендерера

renderer.setSize(sizes.width, sizes.height); // задаю размеры окна рендерера

// Рендерим сцену
renderer.render(scene, camera);

// Работаю с анимацией

const clock = new THREE.Clock();

// функция tick будет рендериться на каждый фрейм анимации
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Меняем вращение каждый раз при срабатывании фукнции tick
  mesh.rotation.y = elapsedTime;
  // Вращение вокруг своей оси
  mesh.position.x = Math.cos(elapsedTime);
  mesh.position.y = Math.sin(elapsedTime);

  // Вращаею камеру относительно позиций
  camera.lookAt(mesh.position);

  // Рендерим после изменения координат вращения
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
