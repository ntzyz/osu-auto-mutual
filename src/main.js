'use strict';

let Triangels = require('./trig.js');

let inst = new Triangels({
    element: document.getElementById('triangles')
})

let input = document.getElementById('uid');
let button = document.getElementById('mutual');
let message = document.getElementById('message');
let busy = false;

button.addEventListener('click', () => {
    if (busy) return;
    busy = true;
    message.parentNode.classList.add('hide');
    setTimeout(() => {
        message.innerHTML = 'Please wait.'
        message.parentNode.classList.remove('hide');

        let xhr = new XMLHttpRequest();
        xhr.open('GET', `request?id=${input.value}`);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if (xhr.status === 200) {
                    message.parentNode.classList.add('hide');
                    setTimeout(() => {
                        message.innerHTML = xhr.responseText;
                        message.parentNode.classList.remove('hide');
                        busy = false;
                    }, 200);
                }
            }
        }

        xhr.send();
    }, 200);
});
