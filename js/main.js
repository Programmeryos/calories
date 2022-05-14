'use strinct';

import calculator from './modules/calculator';
import menu from './modules/menu';
import modal from './modules/modal';
import sendData from './modules/sendData';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {

    const modalTimerId = setTimeout(() => {
        openModal('.modal', modalTimerId);
    }, 300000);

    tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
    timer('.timer', '2022-05-20');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field:'.offer__slider-inner'
    });
    modal('[data-modal]', '.modal', modalTimerId);
    menu();
    sendData(modalTimerId);
    calculator();
});