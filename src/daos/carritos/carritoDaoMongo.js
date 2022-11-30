import { ContenedorMongo } from "../../managers/ContenedorMongo.js";

//crear una subclases de productos que trabaje con el contendor Archivos
class CarritoDaoMongo extends ContenedorMongo{
    constructor(schema, collection){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(schema, collection);
    }
    
    async actualizaByID(id , actualizacion){
        try {
            let result = await  this.model.find({carritoNum: id})
            console.log(result);
            if(result){
                let elementUpdated = await this.model.updateOne({id: id}, actualizacion)
                return elementUpdated
            } else {
                await this.save(actualizacion)
            }
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
    }

    async getById(id){
        try {
            let result = await  this.model.find({carritoNum: id})
            if(result){
                return result
            } return null
        } catch (error) {
            console.log(error);
            return {msj: error}
        }
        
    }
        async deletedById(id){
        try {
            let result = await this.model.deleteMany({carritoNum: id});
            return result
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
                const lastItemId = lastItem.carritoNum
                const id = lastItemId
                return id
            }
        } catch(error){
            return error
        }
    }
}

export {CarritoDaoMongo}