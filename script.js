const qS = (el) => document.querySelector(el);
const qSa = (el) => document.querySelectorAll(el);

qS('.busca').addEventListener('submit', async (m)=>{
    m.preventDefault();

    let input = qS('#searchInput').value;

    if(input !== '') {
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e04382eca5fd835e9fd20a0c83680bc9&units=metric&lang=pt_br`;
        
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }
    } 

    
});

function showInfo(json) {
    showWarning('');

    qS('.resultado').style.display = 'block';

    qS('.titulo').innerHTML = `${json.name}, ${json.country}`;
    qS('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    qS('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    qS('.temp img').setAttribute(`src`, `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    qS('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
}

function clearInfo() {
    showInfo('');
    qS('.resultado').style.display = 'none';
}

function showWarning(msg) {
    qS('.aviso').innerHTML = msg;
}