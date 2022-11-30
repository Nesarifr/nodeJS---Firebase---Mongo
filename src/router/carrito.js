import Express  from "express";
/* ------------------- import de clase contenedora y otros ------------------ */
import {ContenedorDaoCarritos} from '../daos/index.js'

/* ------------------------ configuracion del router ------------------------ */
const routerCarrito = Express.Router();

routerCarrito.use(Express.json());
routerCarrito.use(Express.urlencoded({extended: true}))

/* -------------------------------- POST: '/' ------------------------------- */
/* -------------------- Crea un carrito y devuelve su id. ------------------- */
routerCarrito.post('/', async (req, res)=>{
    try{
        console.log("ingresa al metodo post / de carritos");
        const loadProduct = req.body
        let newProduct
        if(loadProduct.idproduct){
            //agrega productos al ultimo carrito generado
            const ultimoIdcarrito = await ContenedorDaoCarritos.lastID()

            if(ultimoIdcarrito){
                    newProduct = {carritoNum:ultimoIdcarrito+1, ...loadProduct }
                } else {
                    newProduct = {carritoNum:1, ...loadProduct }
                }
                let nuevoId = await ContenedorDaoCarritos.save(newProduct);
                res.json({nuevoid: nuevoId}) 
        }else {
            res.json({error: "falta producto"})
        }
    }catch{
        res.status(500).send('Error en el servidor')
    }
})

/* ----------------------------- DELETE: '/:id' ----------------------------- */
/* --------------------- Vacía un carrito y lo elimina. --------------------- */
routerCarrito.delete('/:id', async (req,res)=>{
    try{
        const {id}=req.params;
        const carritoID = await ContenedorDaoCarritos.getById(id);
        if(carritoID){
            await ContenedorDaoCarritos.deletedById(parseInt(id));
            res.json({msg: "Carrito eliminado"})
        } else {res.json ({msj: "Carrito no existe"})}
    }catch{
        res.status(500).send('Error en el servidor')
    }
})

/* -------------------------- GET: '/:id/productos' ------------------------- */
/* ------ Me permite listar todos los productos guardados en el carrito ----- */
routerCarrito.get('/:id/productos/', async (req, res)=> {
    try{
        const {id} = req.params
        const carrito = await ContenedorDaoCarritos.getById(id)
        if ( carrito ){
            res.json(carrito)
            // res.json(productos)
        } else res.render('partials/error', {productos: {error: 'No existe una lista de productos todavia'}})
    }
    catch(error){
        res.status(500).send('Error en el servidor')
    }
})


/* ------------------------- POST: '/:id/productos' ------------------------- */
/* ------- Para incorporar productos al carrito por su id de producto ------- */
routerCarrito.post('/:id/productos/', async (req, res)=> {
    try{
        const loadProduct = req.body;
        const {id} = req.params
        const existeCarrito = await ContenedorDaoCarritos.getById(id)
        console.log(existeCarrito);
        if(!existeCarrito.error){
            let newProduct = {carritoNum: parseInt(id), ... loadProduct }
            await ContenedorDaoCarritos.save(newProduct);
            const nuevaLista = await ContenedorDaoCarritos.getById(id)
            console.log(nuevaLista);
            res.json(nuevaLista)
        }else res.json({error: "No existe el carrito solicitado."})
    }catch(error){
        res.status(500).send('Error en el servidor')
    }    
})


/* -------------------- DELETE: '/:id/productos/:id_prod' ------------------- */
/* --- Eliminar un producto del carrito por su id de carrito y de producto -- */
routerCarrito.delete('/:id/productos/:id_prod/', async (req, res)=>{
    try{
        const  id = parseInt( req.params.id);
        const  id_prod= parseInt(req.params.id_prod);
        const existeCarrito = await ContenedorDaoCarritos.getById(id)

        if(existeCarrito){
                const arrayActualizada = existeCarrito.filter(product =>product.idproduct==id_prod)
                
                arrayActualizada.forEach(async element => {
                    await ContenedorDaoCarritos.deletedById(element.id)
                });
                const carritoModificado = await ContenedorDaoCarritos.getById(id)
                console.log(carritoModificado);
                res.json(carritoModificado)
        }else res.json({error: "No existe el carrito solicitado."})
    }catch(error){
        res.status(500).send('Error en el servidor')
    }    
})

export default routerCarrito