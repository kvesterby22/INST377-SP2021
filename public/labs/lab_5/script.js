function mapInit() {
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia3Zlc3RlcmJ5MjIiLCJhIjoiY2ttY3Fvcmg5MXMwbTJ3cDlha3g2ZXh0cSJ9.26HvIeYiNVZpVdmNDt2-vA'
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

  // const popup = L.popup()
  //   .setLatLng([51.5, -0.09])
  //   .setContent('I am a standalone popup.')
  //   .openOn(mymap);

  // function onMapClick(e) {
  //   alert(`You clicked the map at ${ e.latlng}`);
  // }

  // mymap.on('click', onMapClick);

  // const popup = L.popup();

  // function onMapClick(e) {
  //   popup
  //     .setLatLng(e.latlng)
  //     .setContent(`You clicked the map at ${e.latlng.toString()}`)
  //     .openOn(mymap);
  // }

  // mymap.on('click', onMapClick);

  return mymap;
}
async function dataHandler(mapObjectFromFunction) {
  const form = document.querySelector('#search-form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.target-list');

  const request = await fetch('/api');
  const data = await request.json();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('form submitted');
    const filtered = data.filter((record) => record.zip.includes(search.value)
    && record.geocoded_column_1);
    filtered.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      console.log('markerLongLat', longLat[0], longLat[1]);
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction);

      const appendItem = document.createElement('li');
      appendItem.classList.add('block');
      appendItem.classList.add('list-item');
      appendItem.innerHTML = `<div class="list-header is-size-5">${item.name}</div><address class="is-size-6">${item.address_line_1}</address>`;
      targetList.append(appendItem);
    });
  });
}
async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;