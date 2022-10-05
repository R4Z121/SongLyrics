import './styles/style.css';
import 'regenerator-runtime';
import './scripts/components/app-carousel';
import './scripts/components/song-shelf';
import './scripts/components/song-info';
import carouselImg from './img/carousel.jpg';
import main from './scripts/view/main';

document.querySelector('#carouselImg').src = carouselImg;
document.addEventListener('DOMContentLoaded', main);
