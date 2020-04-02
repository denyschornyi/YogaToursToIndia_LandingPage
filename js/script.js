'use strict';
window.addEventListener('DOMContentLoaded', function(){
    let tab         = document.querySelectorAll('.info-header-tab'),
        info        = document.querySelector('.info-header'),
        tabContent  = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a){
        for( let i = a; i<tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')){
            for (let i = 0; i<tab.length; i++){
                if(target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;


                }
            }
        }
    });

    // ------------------------ TIMER---------------

    let dedline = '2020-04-24';

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/60/60));

            return{
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
        }
        function setClock(id, endtime){
            let timer = document.getElementById(id),
                hours = timer.querySelector('.hours'),
                minutes = timer.querySelector('.minutes'),
                seconds = timer.querySelector('.seconds'),
                timeInterval = setInterval(updateClock, 1000);

            function updateClock(){
                let t = getTimeRemaining(endtime);

                function addZero(num){
                    if(num <= 9 )
                        {return '0' + num;}
                    else{return num;}
                }

                hours.textContent = addZero(t.hours);
                minutes.textContent = addZero(t.minutes);
                seconds.textContent = addZero(t.seconds);

                if(t.total <= 0 ){
                    hours.textContent = "00";
                    minutes.textContent = "00";
                    seconds.textContent = "00";
                }
        }
    }
    setClock('timer', dedline);


    // --------------------- MODAL WINDOW ----------------------

    let  more       = document.querySelector('.more'),
        overlay     = document.querySelector('.overlay'),
        close       = document.querySelector('.popup-close'),
        moreBtnTabs = document.querySelectorAll('.description-btn');


    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = 'visible';

    });

    moreBtnTabs.forEach(function(item){
        item.addEventListener('click', function(){
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });
    
    
        
//    class Options{
//        constructor(height, width, bg, fontSize, textAlign){
//             this.height = height;
//             this.width = width;
//             this.bg = bg;
//             this.fontSize = fontSize;
//             this.textAlign = textAlign;
//        }

//         createDiv() {
//             let div = document.createElement('div');
//             div.textContent = 'lorem lorem lorem babah';
//             div.style.cssText = `height: ${this.height}px;
//                                 width: ${this.width}px;
//                                 background: ${this.bg};
//                                 font-size: ${this.fontSize}px;
//                                 text-align: ${this.textAlign};`;
//             document.body.appendChild(div);
//         }

        
//    }
//    let block = new Options(200,200,"red",40,"center");
//    block.createDiv();



 
// ----------------- FORM HERE ----------------

let message = {
    loading: 'Loading...',
    success: 'Thank you. We contact with you as soon, as possible.',
    failure: 'Eror..'
};

let form          = document.querySelector('.main-form'),
    contact       = document.querySelector('#form'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function sendToServer(item){
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            
            item.appendChild(statusMessage);

            let input = item.getElementsByTagName('input');
            let formData = new FormData(item);

            function postData(){
                return new Promise(function(resolve, reject){
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    
                    
                    let object = {};
                    formData.forEach(function(key,  value){
                        object[key] = value;
                    });
        
                    let json = JSON.stringify(object);
                    console.log(json);
                    
        
                    request.onload = function(){
                        if(request.readyState < 4){
                            resolve();
                        }else if(request.readyState === 4 && request.status == 200){
                            resolve();
                        }else{
                            reject();
                        }
                    };
                    request.send(json);
            });
            }
            function clearInput(){
                for(let i = 0; i < input.length; i++){
                    input[i].value = '';
                }
            }
            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput)
            });
            
        }

    sendToServer(contact);
    sendToServer(form);




    //---------------------------SLIDER HERE-----------------------//

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

    //---------------------------CALCULATOR HERE-----------------------//

    let persons     = document.querySelectorAll('.counter-block-input')[0],
        restDays    = document.querySelectorAll('.counter-block-input')[1],
        place       = document.getElementById('select'),
        totalValue  = document.getElementById('total'),
        personsSum  = 0,
        daysSum     = 0,
        total       = 0;

        totalValue.textContent = 0;

        persons.addEventListener('input', function(){
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000;
            if(restDays.value == ''){
                totalValue.textContent = 0;
            }else{
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('input', function(){
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000;
            if(persons.value == ''){
                totalValue.textContent = 0;
            }else{
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function(){
            if(restDays.value == '' || persons.value ==''){
                totalValue.innerHTML = 0;
            }else{
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });



});





