import 'material-icons/iconfont/material-icons.css';
import './sass/main.scss';
import { Notify } from 'notiflix';
import lozad from 'lozad';
import axios from 'axios';
import ApiService from './js/apiService';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const apiKey = '16085264-71307d3f0a6fd2ec26a379ecb';

import refs from './js/refs';
import photoCard from './template/photo-card.hbs';

const { formSearch, imgGallery, loader } = refs;

function clearImgGallery() {
  imgGallery.innerHTML = '';
}

const fetchImg = () => {
  ApiService.fetchImg().then(data => {
    console.log(data);
    imgGallery.insertAdjacentHTML('beforebegin', photoCard(data.hits));
  });
};

formSearch.addEventListener('submit', e => {
  e.preventDefault();
  clearImgGallery();

  ApiService.resetPage();

  const userRequest = e.currentTarget.elements.query.value.trim();

  if (!userRequest) return;

  ApiService.query = userRequest;

  fetchImg();

  formSearch.reset();
});

document.addEventListener('DOMContentLoaded', () => {
  let options = {
    root: null,
    rootMargin: '100px',
    threshold: 0.25,
  };

  function handleIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fetchImg();
      }
    });
  }

  let observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(loader);
});
