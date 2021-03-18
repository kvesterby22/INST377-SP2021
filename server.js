/* eslint-disable max-len */
// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import reload from 'livereload';
import connectReload from 'connect-livereload';

dotenv.config();

const __dirname = path.resolve(); // computer figures out where all my stuff is
const app = express(); // turn on express
const port = process.env.PORT || 3000;
const staticFolder = 'public'; // where you store your pages you want the internet to see

// Add some auto-reloading to our server
const liveReloadServer = reload.createServer();
liveReloadServer.watch(path.join(__dirname, staticFolder)); // this is why my webpages reload when I turn my server on

// Configure express
if (process.env.CONTEXT === 'development') {
  app.use(connectReload());
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // why i can send json back from my server when i edit my route
app.use(express.static(staticFolder)); 

app.use((req, res, next) => { // let people connect to this server
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api') // endpoint you are using; each route only gets 1 instance of each verb
  .get(async (req, res) => { // async lets us avoid using then chains
    // first objects that are passed on a request from express is request and response
    console.log('GET request detected');
    // fetch is easiest way to talk about external delayed requests to other apis and it works the same way on server and browser
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    // getting contents of fetch request and then sending a response to the frontend
    const json = await data.json();
    console.log('data from fetch', json[0]);
    res.json(json);
  })
  .post(async (req, res) => { // all database methods are async
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
    console.log('Now send something back to your client');
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();

    fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
      .then((data) => data.json())
      .then((data2) => {
        // do something with your data!
      })
      .catch((err) => console.error(err));

    res.json({data: json});
  });

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`);
});

if (process.env.CONTEXT === 'development') {
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });
}
