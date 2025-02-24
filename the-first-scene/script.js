// Создание сцены
const scene = new THREE.Scene();

// Создаю сам объект (фигуру)
const geometry = new THREE.BoxGeometry(1, 1, 1); // размеры фигуры
const material = new THREE.MeshBasicMaterial({ color: 'purple' }); // материал фигуры (цвет, заливка)
const mesh = new THREE.Mesh(geometry, material); // создаю сетку, объеденив всё в один

scene.add(mesh); // добавляю сетку на сцену

// Создаю камеру (то как будет показана сама сцена)
const sizes = {
  width: 600,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); // указываю угол обзора и размеры самой камеры
camera.position.z = 3; // смещаем камеру по оси Z
camera.position.y = 1; // смещаем камеру по оси Y

scene.add(camera); // добавляю камеру на сцену

// Создаю отрисовщик сцены
const canvas = document.querySelector('.canvas'); // достаю элемент на странице

const renderer = new THREE.WebGLRenderer({ canvas }); // создаю объект рендерера

renderer.setSize(sizes.width, sizes.height); // задаю размеры окна рендерера

// Рендерим сцену
renderer.render(scene, camera);
