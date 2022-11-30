import {optionsSqliteDB} from "../config/dataBaseConfig.js";

let ContenedorDaoProductos;
let ContenedorDaoCarritos;

//identificador
let databaseType = "firebase";

switch(databaseType){
    case "archivos":
        const {ProductsDaoArchivos} = await import("./productos/productDaoArchivo.js");
        const {CartsDaoArchivos} = await import("./carritos/carritoDaoArchivo.js");
        ContenedorDaoProductos = new ProductsDaoArchivos("productos");
        ContenedorDaoCarritos = new CartsDaoArchivos("carrito");
        break;
    case "sql":
        const {ProductsDaoSql} = await import("./productos/productDaoSql.js");
        const {CarritoDaoSql} = await import("./carritos/carritoDaoSql.js");
        ContenedorDaoProductos = new ProductsDaoSql(optionsSqliteDB, "productos");
        ContenedorDaoCarritos = new CarritoDaoSql(optionsSqliteDB,"carrito");
        break;
    case "mongo":
        const {ProductsDaoMongo} = await import("./productos/productDaoMongo.js");
        const {CarritoDaoMongo} = await import("./carritos/carritoDaoMongo.js");
        const {productSchema, productCollection} = await import( "../models/modelProduct.js")
        const {carritoSchema, carritoCollection} = await import( "../models/modelCarrito.js")
        ContenedorDaoProductos = new ProductsDaoMongo(productCollection, productSchema);
        ContenedorDaoCarritos = new CarritoDaoMongo(carritoCollection, carritoSchema);
        break;
    case "firebase":
        const {ProductsDaoFirebase} = await import("./productos/productDaoFirebase.js");
        const {CarritoDaoFirebase} = await import("./carritos/carritoDaoFirebase.js");
        ContenedorDaoProductos = new ProductsDaoFirebase("productos");
        ContenedorDaoCarritos = new CarritoDaoFirebase("carritos");
        break;
}

export {ContenedorDaoProductos,ContenedorDaoCarritos}