let map = L.map('map', {zoomControl:false,attributionControl:false,dragging:false,scrollWheelZoom:false,doubleClickZoom:false,center:[43.731548, 7.415006],zoom: 17,});
let myIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
});
L.marker([43.731548, 7.415006], {
    icon: myIcon
}).addTo(map);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const URL_API = `https://geo.ipify.org/api/v2/country,city?apiKey=at_kmUnn5uFmA02Ybf9LUHz1cSh9io5V`;
const resultsElements = Array.from(document.getElementById("results").querySelectorAll("span")); 
const form = document.querySelectorAll("form")[0];

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    await fetchData(form.querySelectorAll("input")[0].value);
})







async function fetchData(data) {
    const ip = await getIp(data);
    resultsElements[0].textContent = ip.ip;
    resultsElements[1].textContent = `${ip.location.city}, ${ip.location.region} ${ip.location.postalCode}`;
    resultsElements[2].textContent = `UTC ${ip.location.timezone}`;
    resultsElements[3].textContent = ip.isp;
    form.querySelectorAll("input")[0].value=ip.ip
    
    map.setView([ip.location.lat, ip.location.lng], 16, {
        animate: true
    });
    let myIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
    });
    L.marker([ip.location.lat, ip.location.lng], {
        icon: myIcon
    }).addTo(map);
}




async function getIp(ip) {
    const apiurl = new URL(URL_API);
    ip && apiurl.searchParams.set("ipAddress",ip)
    console.log(apiurl.href);
    const data = (await (await fetch(apiurl.href)).json());
    console.log(data);
    return data; 
}