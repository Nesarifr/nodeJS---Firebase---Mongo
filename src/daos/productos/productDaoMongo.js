import { ContenedorMongo } from "../../managers/ContenedorMongo.js";

//crear una subclases de productos que trabaje con el contendor Archivos
class ProductsDaoMongo extends ContenedorMongo{
    constructor(schema, collection ){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(schema, collection);
    }
}

export {ProductsDaoMongo}