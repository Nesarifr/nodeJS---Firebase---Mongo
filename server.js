import express from 'express';
import * as HttpServer from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import routerProducts  from './src/router/productos.js';
import routerCarrito from './src/router/carrito.js'

/* ------------------- constantes necesarias del servidor ------------------- */
const app = express();
const httpServer = new HttpServer.createServer(app); 
//io: servidor de Websocket
const __filename = fileURLToPath(import.meta.url); 
// ^^^ Esta es una variable especial que contiene toda la meta información relativa al módulo, de forma que podremos acceder al contexto del módulo.
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 3000;

/* ------------------------------- configuracion del servidor ------------------------------- */
app.use(express.static(__dirname + '/src/public')) 
app.use(express.json());
app.use(express.urlencoded({extended: true}))

/* ------------------- rutas /api/productos ------------------- */
app.use('/api/v1/productos', routerProducts );
app.use('/api/v1/carritos', routerCarrito );

/* -------------------- Se crea el servidor y se enciende ------------------- */
httpServer.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));


