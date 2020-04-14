function slider(){
    let slideIndex = 1,
        slides     = document.querySelectorAll('.slider-item'),
        dots       = document.querySelectorAll('.dot'),
        dotsWrap   = document.querySelector('.slider-dots'),
        prev       = document.querySelector('.prev'),
        next       = document.querySelector('.next');

    showSlide(slideIndex);

    function showSlide(n){
        if(n > slides.length){
            slideIndex = 1;
        }
        if(n<1){
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');
        dots.forEach(item => item.classList.remove('dot-active'));

        slides[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].classList.add('dot-active');
    }

    function changeSlide(n){
        showSlide(slideIndex += n);
    }

    function currentSlide(n){
        showSlide(slideIndex = n);
    }

    next.addEventListener('click', () => {changeSlide(1)});
    prev.addEventListener('click', () => {changeSlide(-1)});

    dotsWrap.addEventListener('click' , (event) => {
        for(let i = 0; i < dots.length + 1; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i-1]){
                currentSlide(i);
            }
        }
    });
}

module.exports = slider;