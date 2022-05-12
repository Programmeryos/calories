'use strinct';

window.addEventListener('DOMContentLoaded', function() {
    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabList = document.querySelector('.tabheader__items'),
        tabContent = document.querySelectorAll('.tabcontent');

    function hideTabContent () {
        tabContent.forEach(e => {
            e.classList.remove('show');
            e.classList.add('hide');
        });

        tabs.forEach(e => {
            e.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabs[i].classList.add('tabheader__item_active');

        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show');

    }

    hideTabContent();
    showTabContent();

    tabList.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = '2022-05-26';

    function getTimeRemaining (endtime) {
        const total = Date.parse(deadline) - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((total / (1000 * 60) % 60)),
            seconds = Math.floor((total / 1000) % 60);

        return {
            'total': total,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero (num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);
            
        }
    }

    setClock('.timer', deadline);

    //Slider

    const slider = document.querySelector('.offer__slider'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderInner = document.querySelector('.offer__slider-inner'),
        slides = document.querySelectorAll('.offer__slide'),
        slideNext = document.querySelector('.offer__slider-next'),
        slidePrev = document.querySelector('.offer__slider-prev'),
        slidesCurrent = document.querySelector('#current'),
        totalCurrent = document.querySelector('#total'),
        slidesWrapperWidth = window.getComputedStyle(slidesWrapper).width;

    let slideNum = 1,
        offset = 0;
    
    slides.forEach(e => {
        e.style.width = slidesWrapperWidth;
    });
    
    sliderInner.style.width = 100 * slidesWrapperWidth.slice(0, -2) + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.7s all';

    slidesWrapper.style.overflow = 'hidden';

    slidesCurrent.textContent = getZero(slideNum);
    totalCurrent.textContent = getZero(slides.length);

    const indicatots = document.createElement('ol');
    const dots = [];

    slider.style.position = 'relative';

    indicatots.classList.add('carousel-indicators');

    slider.append(indicatots);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');

        indicatots.append(dot);

        dot.classList.add('dot');

        dots.push(dot);
    }

    function activeDot () {
        dots.forEach(e => {
            e.style.opacity = '0.5';    
        });

        dots[slideNum - 1].style.opacity = 1;
    }

    activeDot();

    indicatots.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('dot')) {
            dots.forEach((item, i) => {
                if (item == target) {
                    offset = +slidesWrapperWidth.slice(0, -2) * i;
                    slideNum = i + 1;
                    activeDot();
                    slidesCurrent.textContent = getZero(slideNum);
                    sliderInner.style.transform = `translateX(-${offset}px)`;
                }
            });
        }
    });

    slideNext.addEventListener('click', () => {
        if (offset == +slidesWrapperWidth.slice(0, -2) * (slides.length - 1)) {
            offset = 0;
            slideNum = 1;
        } else {
            offset += +slidesWrapperWidth.slice(0, -2);
            slideNum++;
        }

        slidesCurrent.textContent = getZero(slideNum);

        sliderInner.style.transform = `translateX(-${offset}px)`;

        activeDot();
    });

    slidePrev.addEventListener('click', () => {
        if (offset == 0) {    
            offset = +slidesWrapperWidth.slice(0, -2) * (slides.length - 1);
            slideNum = slides.length;
        } else {
            offset -= +slidesWrapperWidth.slice(0, -2);
            slideNum--;
        }

        slidesCurrent.textContent = getZero(slideNum);

        sliderInner.style.transform = `translateX(-${offset}px)`;

        activeDot();
    });

    //Menu

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changetoUAN();
        }

        changetoUAN() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parentSelector.append(element);
        }
    }

    const getResurses = async(url) => {
        const res = await fetch(url);

        if (!res.ok) {
            return 'Error';
        }

        return await res.json();
    };

    getResurses('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    //Modal

    const modal = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal]');

    function openModal () {
        modal.classList.remove('hide');
        modal.classList.add('show');
        clearInterval(modalTimerId);
    }

    function closeModal () {
        modal.classList.remove('show');
        modal.classList.add('hide');
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    modalTrigger.forEach(e => {
        e.addEventListener('click', () => {
            openModal();
        });
    });

    modal.addEventListener('click', e => {
        const target = e.target;

        if(target == modal || target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);

    // function showModalByScroll () {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
    //         openModal();
    //         window.removeEventListener('scroll', showModalByScroll);
    //     }
    // }

    // window.addEventListener('scroll', showModalByScroll);

    //send data

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'spinner.svg',
        success: 'Мы с вами вскоре свяжемся!',
        failture: 'Что-то пошло не так'
    };

    forms.forEach(e => {
        bindPostData(e);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                showThanksModal(message.success);
                console.log(data);
                statusMessage.remove();
            }).catch(()=> {
                showThanksModal(message.failture);
                statusMessage.remove();  
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal (messange) {
        const prevModalDialog = document.querySelector('.modal__dialog'),
            thanksModal = document.createElement('div');

        prevModalDialog.style.display = 'none';
        openModal();

        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${messange}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        
        setTimeout(() => {
            closeModal();
            thanksModal.style.display = 'none';
            prevModalDialog.style.display = 'block';
        },4000);
    }

    //Calculator

    const result = document.querySelector('.calculating__result span');
    let sex,
    height, weight, age,
    ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }
    
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(e => {
            e.classList.remove(activeClass);

            if (e.getAttribute('id') === localStorage.getItem('sex')) {
                e.classList.add(activeClass);
            }

            if (e.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                e.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        } 

        if (sex === 'female') {
            result.textContent = +Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = +Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', e => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio'); 
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));   
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
});

const arr = [
    {a:1, b:2},
    {a:1, b:2},
    {a:1, b:2}
];

const result = arr.map(item => Object.entries(item)[1][1]).reduce((sum, curr) => sum + curr);
console.log(result);