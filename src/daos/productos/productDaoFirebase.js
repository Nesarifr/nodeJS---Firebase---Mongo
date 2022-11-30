import {ContenedorFirebase} from '../../managers/ContenedorFirebase.js'


//crear una subclases de productos que trabaje con el contendor Archivos
class ProductsDaoFirebase extends ContenedorFirebase{
    constructor(collection){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(collection);
    }
}

export {ProductsDaoFirebase}