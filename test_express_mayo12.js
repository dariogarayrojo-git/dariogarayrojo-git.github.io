import express from 'express';
import path from 'path';


const app = express();


app.listen(1984, () => {
   console.log('Up and up');
});

app.get('/bienvenida', (req, res) => {
   res.send('Esto no es una página html');
});


app.get('/otraBienvenida', (req, res) => {
  res.sendFile(path.resolve('bienvenida.html'));
});
