import admin  from "firebase-admin";
import {connectionON} from "../config/firebaseConfig.js"

export class ContenedorFirebase{
    constructor(collection){
        this.db=connectionON;
        this.query=this.db.collection(collection);        
    }
    async save(element){
        try {
            let ultimoID = await this.lastID()
            console.log(ultimoID);
            let doc = this.query.doc(`${ultimoID+1}`)
            let result = await doc.create({...element})
            return result
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
    }
        
    async getById(id){
        try {
            let result = await this.query.get();
            let docs = result.docs;
            let response = docs.map((elem) =>({id: elem.id, ...elem.data()})); 
            const arrayActualizada = response.filter(product =>product.carritoNum==id)
            return arrayActualizada
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
        
    }

    async getAll(){
        try {
            let result = await this.query.get();
            let docs = result.docs;
            let response = docs.map((elem) =>({id: elem.id, ...elem.data()})); 
            return response
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
    }

    async deletedById(id){
        try {
            let elementDelete = this.query.doc(`${id}`);
            await elementDelete.delete();
            return {msj: "archivo eliminado"}
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
    }

    async actualizaByID(id , actualizacion){
        try {
            let elementUpdated =  this.query.doc(id);
            await elementUpdated.update(actualizacion);
            return elementUpdated
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
    }

    async lastID(){
        try {
            let ultimoid
            let arrayTodo =await this.getAll()
            if(!arrayTodo.length){
                console.log("entra aca");
                ultimoid = 0
            } else{
                console.log(arrayTodo);
                ultimoid = arrayTodo.reduce(function (acc, item) {
                    let idParse = parseInt(item.id)
                    if(acc<idParse){
                        return acc=idParse
                    } else { return acc}
                }, 0);
            }
            console.log(ultimoid, "ultimo id");
            return ultimoid
            
        } catch (error) {
            
        }
    }
}


// let productosFirebase = new ContenedorFirebase("productos");
// await productosFirebase.save({title: 'algo', price: 200, thumbnail: "algo mas "})
// console.log(await productosFirebase.getAll()); 
// await productosFirebase.actualizaByID("zygMKkVpf9WOr3nBd20n",{title: 'aasfasfaslgo', price: 500, thumbnail: "algo mas "} )
// console.log(await productosFirebase.getAll()); 