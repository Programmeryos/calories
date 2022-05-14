function openModal (modalSeletor, modalTimerId) {
    const modal = document.querySelector(modalSeletor);

    modal.classList.remove('hide');
    modal.classList.add('show');

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal (modalSeletor) {
    const modal = document.querySelector(modalSeletor);
    
    modal.classList.remove('show');
    modal.classList.add('hide');
}

function modal(triggerSelector, modalSeletor, modalTimerId) {
    //Modal

    const modal = document.querySelector(modalSeletor),
        modalTrigger = document.querySelectorAll(triggerSelector);

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(modalSeletor);
        }
    });

    modalTrigger.forEach(e => {
        e.addEventListener('click', () => {
            openModal(modalSeletor, modalTimerId);
        });
    });

    modal.addEventListener('click', e => {
        const target = e.target;

        if(target == modal || target.getAttribute('data-close') == "") {
            closeModal(modalSeletor);
        }
    });


    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal(modalSeletor, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};