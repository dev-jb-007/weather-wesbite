
let button=document.querySelector('#btn');
let image=document.querySelector('img');
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let text = document.getElementById('search').value;
    fetch('/?address=' + text).then(response => response.json()).then(data => {
        if (data.error) {
            document.querySelector('#display_area').innerHTML = `<p>${data.error}<p>`;
        }
        else {
            if((data.img).toLowerCase()=='rain'){
                image.setAttribute('src','/images/rain2.jpeg');
            }
            else if((data.img).toLowerCase()=='cloud'){
                image.setAttribute('src','/images/weather.jpg');
            }
            else if((data.img).toLowerCase()=='snow')
            {
                image.setAttribute('src','/images/snow.jpeg');
            }
            else{
                image.setAttribute('src','/images/weather.jpg');
            }
            document.querySelector('#display_area').innerHTML = `<p>${data.location}<p><br><p>${data.forecast}</p>`

        }
    });
})