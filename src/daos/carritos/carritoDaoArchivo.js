import { Carrito } from "../../managers/ContenedorCarritoFile.js";
import fs from 'fs';

//crear una subclases de carritos  que trabaje con el contendor Archivos
class CartsDaoArchivos extends Carrito{
    constructor(filename){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(filename);
    }
    
    async lastIdCarrito(){
        if(fs.existsSync(this.url)){
            const listCarrito = await fs.promises.readFile(this.url,"utf-8")
            const arrayCarrito = JSON.parse(listCarrito)
            const ultimoID=arrayCarrito.reduce(function (acc, item) {
                if(acc<item.carritoNum){
                    return acc=item.carritoNum
                } else { return acc}
            }, 0)
            return [{id: ultimoID}]
        } else{ return false}
        
    }

}

export {CartsDaoArchivos}