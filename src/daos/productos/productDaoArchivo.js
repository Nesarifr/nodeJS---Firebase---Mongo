import { Productos } from "../../managers/ContenedorProductosFile.js";

//crear una subclases de productos que trabaje con el contendor Archivos
class ProductsDaoArchivos extends Productos{
    constructor(filename){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(filename);
    }
}

export {ProductsDaoArchivos}