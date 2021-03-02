const images = () => {
    const imgPopup = document.createElement('div'),
          nextBtn = document.createElement('div'),
          prevBtn = document.createElement('div'),
          slidesParent = document.createElement('div'),
          workSection = document.querySelector('.works'),
          slides = document.querySelectorAll('.preview'),      
          bigImage = document.createElement('img'),
          slideCurrent = document.createElement('div'),
          windows = document.querySelectorAll('[data-modal]'),
          total = document.createElement('span');

    slidesParent.classList.add('works--popup');  
    slidesParent.setAttribute("data-modal", "");
    imgPopup.classList.add('popup');
    nextBtn.classList.add('works__btn-next-popup', 'works__btn-popup');
    prevBtn.classList.add('works__btn-prev-popup', 'works__btn-popup');
    slideCurrent.classList.add('works__slide-current');

    workSection.appendChild(slidesParent);    
    slidesParent.appendChild(imgPopup);
    imgPopup.appendChild(slideCurrent);
    // total.appendChild(slideCurrent);
    imgPopup.prepend(prevBtn);
    imgPopup.appendChild(bigImage);
    imgPopup.appendChild(nextBtn);

    slidesParent.style.cssTxet = `
        position: relative;
    `;
    prevBtn.style.cssText = `
        left: 0%;
        background-image: url(assets/img/main/icons/arrow-left.svg);
        background-position: left center;
        background-position-x: center;
    `;
    nextBtn.style.cssText = `
        right: 0%;
        background-image: url(assets/img/main/icons/arrow-right.svg);
        background-position: right center;
        background-position-x: center;
    `;
    imgPopup.style.cssText = `
        justify-content: center;
        align-items: center;
        display: none;
    `;
    slideCurrent.style.cssText = `
        position: absolute;
        right: 20px;
        top: 20px;
        color: #fff;
        font-size: 20px;
    `;
    
    let slideIndex = 1;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        slideCurrent.textContent =  ` / 0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        slideCurrent.textContent =  ` / ${slideIndex}`;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }
        
        let pathSlide = slides[slideIndex - 1].parentNode.getAttribute('href'); 
        bigImage.setAttribute('src', pathSlide);
    }

    function plusSlides(i) {
        showSlides(slideIndex += i);
    }

    workSection.addEventListener('click', (e) => {
        e.preventDefault();
        let target = e.target;
        
        if(target === imgPopup) {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            imgPopup.style.display = 'none';
        }

        if (target && target.classList.contains('preview')) { 
            const slideId = target.parentNode.dataset.imgId;
            console.log(slideId)
            slideIndex = slideId
            showSlides(slideId)

            imgPopup.style.display = 'flex';

            prevBtn.addEventListener('click', () => {
                plusSlides(-1); 
                if (slides.length < 10) {
                    slideCurrent.textContent =  ` / 0${slideIndex}`;
                } else {
                    slideCurrent.textContent =  ` / ${slideIndex}`;
                }
            });

            nextBtn.addEventListener('click', () => {
                plusSlides(1);
                if (slides.length < 10) {
                    slideCurrent.textContent =  ` / 0${slideIndex}`;
                } else {
                    slideCurrent.textContent =  ` / ${slideIndex}`;
                } 
            });     
        }
        
    });
};

export default images;