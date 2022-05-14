import {getZero} from './timer';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //Slider

    const slider = document.querySelector(container),
        slidesWrapper = document.querySelector(wrapper),
        sliderInner = document.querySelector(field),
        slides = document.querySelectorAll(slide),
        slideNext = document.querySelector(nextArrow),
        slidePrev = document.querySelector(prevArrow),
        slidesCurrent = document.querySelector(currentCounter),
        totalCurrent = document.querySelector(totalCounter),
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

}

export default slider;