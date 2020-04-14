function form(){

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
}

module.exports = form;