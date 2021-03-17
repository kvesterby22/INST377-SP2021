function mapInit() {
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);
  const marker = L.marker([51.5, -0.09]).addTo(mymap);
  const circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(mymap);
  const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
  ]).addTo(mymap);

  marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
  circle.bindPopup('I am a circle.');
  polygon.bindPopup('I am a polygon.');

  const popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent('I am a standalone popup.')
    .openOn(mymap);

  function onMapClick(e) {
    alert(`You clicked the map at ${ e.latlng}`);
  }
  
  mymap.on('click', onMapClick);

  const popup = L.popup();

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent(`You clicked the map at ${e.latlng.toString()}`)
      .openOn(mymap);
  }

  mymap.on('click', onMapClick);

  return mymap;
}

// async function dataHandler(mapObjectFromFunction) {
//   // use your assignment 1 data handling code here
//   // and target mapObjectFromFunction to attach markers
// }

// async function windowActions() {
//   const map = mapInit();
//   await dataHandler(map);
// }

// window.onload = windowActions;