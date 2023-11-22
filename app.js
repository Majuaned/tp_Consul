const express = require('express');
const Consul = require('node-consul');
const consul = new Consul({host:"consul", port: 8500 });

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello, Juan desde Consul!!!');
});

app.listen(port, () => {
  console.log(`Servidor sirviendo en el puerto:  http://localhost:${port}`);
  
  const serviceDetails = {
    name: 'mi_servicio',
    address: 'localhost',
    port,
    check: {
      http: `http://localhost:${port}`,
      interval: '10s',
    },
  };
  
  consul.agent.service.register(serviceDetails, (err) => {
    if (err) {
      console.error('Error al registrar en Consul:', err);
    } else {
      console.log('Servicio registrado en Consul');
    }
  });
});
