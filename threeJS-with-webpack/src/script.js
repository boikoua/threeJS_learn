import * as THREE from 'three';
import './style.css';

// Создание сцены
const scene = new THREE.Scene();

// Создаём график осей координат и добавляем его на сцену
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Создаю сам объект (фигуру)
const geometry = new THREE.BoxGeometry(1, 1, 1); // размеры фигуры
const material = new THREE.MeshBasicMaterial({
  color: 'purple', // цвет фигуры
  wireframe: true, // прозрачность фигуры
}); // материал фигуры (цвет, заливка)
const mesh = new THREE.Mesh(geometry, material); // создаю сетку, объеденив всё в один

// Позиции для перемещения фигуры
// mesh.position.x = -1;
// mesh.position.y = -0.5;
// mesh.position.z = 0.5;

// Делаю масштабирование фигуры
mesh.scale.x = 0.5;
mesh.scale.y = 2;
mesh.scale.z = 0.7;

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
