import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function sendData(modalTimerId) {
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
        openModal('.modal', modalTimerId);

        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${messange}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        
        setTimeout(() => {
            closeModal('.modal');
            thanksModal.style.display = 'none';
            prevModalDialog.style.display = 'block';
        },4000);
    }
}

export default sendData;