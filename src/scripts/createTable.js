import {optionsMariaDB} from '../config/dataBaseConfig.js';
import { optionsSqliteDB } from '../config/dataBaseConfig.js';
import knex from 'knex';

//instancia de base de datos
const databaseProduct = knex(optionsSqliteDB)


const createTable = async ()=>{

    const tableExist=await databaseProduct.schema.hasTable("productos");

    if (tableExist) {
        await databaseProduct.schema.dropTable("productos");
    }
    await databaseProduct.schema.createTable('productos', table =>{
        table.increments('id')
        table.string('title', 30).nullable(false)
        table.integer('price').nullable(false)
        table.string('thumbnail', 100)
    })
    .then(()=> console.log('Se creo la tabla de productos'))
    .catch((err)=> { console.log(err); throw err})

    const tableCarrito=await databaseProduct.schema.hasTable("carrito");
    if (tableCarrito) {
        await databaseProduct.schema.dropTable("carrito");
    }

    await databaseProduct.schema.createTable('carrito', table =>{
        table.increments('id')
        table.integer('carritoNum').nullable(false)
        table.integer('idproduct').nullable(false)
        table.string('title', 30).nullable(false)
        table.integer('price').nullable(false)
        table.string('thumbnail', 100)
    })
    .then(()=> console.log('Se creo la tabla Carrito'))
    .catch((err)=> { console.log(err); throw err})
    .finally(()=>databaseProduct.destroy())



}

createTable()
