import mongoose from "mongoose";
import {connectionON} from "../config/mongooseConfig.js"


export class ContenedorMongo{
    constructor( collection, schema){
        this.model= mongoose.model(collection, schema);
        this.connection=connectionON;
    }
    async save(element){
        try {
            let newelement = element
            if(element._id){
                newelement = {
                    carritoNum: element.carritoNum, 
                    idproduct: element.idproduct, 
                    title: element.title,
                    price: element.price,
                    thumbnail: element.thumbnail
            }
            }

            if(!element.length){
                if(element.carritoNum){
                    let result = await this.model.create({...newelement})
                    return result.id
                } else {
                    let ultimoID = await this.lastID()
                    let result = await this.model.create({id: ultimoID, ...element})
                    return result.id
                }
            } else {
                return {msj: "no hay elementos agregados"}
            }
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
    }
        
    async getById(id){
        try {
            let result = await  this.model.find({id: id})
            if(result.length){
                return result
            } return null
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
        
    }

    async getAll(){
        try {
            let result = await this.model.find();
            return result
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
    }

    async deletedById(id){
        try {
            let result = await this.model.deleteOne({id: id});
            return result
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
    }

    async actualizaByID(id , actualizacion){
        try {
            let elementUpdated = await this.model.updateOne({id: id}, actualizacion)
            return elementUpdated
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
        
    }

    async lastID(){
        try{
            const data = await this.model.find()
            if(data.length === 0){
                return  1
            }
            else{
                const length = data.length
                const lastItem = data[length-1]
                const lastItemId = lastItem.id
                const id = lastItemId + 1
                return id
            }
        } catch(error){
            return error
        }
    
    }
}


// let productosMongo = new ContenedorMongo(productModel);
// await productosMongo.save([{title: 'algo', price: 200, thumbnail: "algo mas "}])
// console.log(await productosMongo.getAll())
// console.log("se encontrrooooo: " + await productosMongo.getById("6378cf8bd62145d45d6e7bb4"));

