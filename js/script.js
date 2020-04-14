window.addEventListener('DOMContentLoaded', function(){

    'use strict';
    //-------------TABS-----------
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


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

    let dedline = '2020-03-14';

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

    let  more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
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

// -----------------   FORM HERE ----------------

let message = {
    loading: 'Loading...',
    success: 'Thank you. We contact with you as soon, as possible.',
    failure: 'Eror..'
};

let form = document.querySelector('.main-form'),
    contactForm = document.querySelector('#form'),
    input = form.getElementsByTagName('input'),
    contactInput = contactForm.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');


    function sendToServer(e){
        e.preventDefault();
        
        return new Promise(function(resolve, reject){
            this.appendChild(statusMessage);

            let input = this.getElementsByTagName('input');

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            let formData = new FormData(this);

            let object = {};

            formData.forEach(function(key,  value){
                object[key] = value;
            });

            let json = JSON.stringify(object);
            request.send(json);

            request.onload() =  function(){
                if(request.readyState < 4){
                    resolve();
                }else if(request.readyState === 4 && request.status == 200){
                    resolve();
                }else{
                    reject();
                }
            };

            for(let i = 0; i < input.length; i++){
                input[i].value = '';
            }
            sendToServer()
            .then(() => {
                console.log("work");
                statusMessage.innerHTML = message.loading;})
            .then(() => {statusMessage.innerHTML = message.success;})
            .catch(() => {statusMessage.innerHTML = message.failure;});

        });

        
    }

form.addEventListener('submit', sendToServer);  //--- MODAL FORM(submit for modal form) ----

contactForm.addEventListener('submit', sendToServer);//------CONTACT FORM(submit for contact form)-----
    
});



