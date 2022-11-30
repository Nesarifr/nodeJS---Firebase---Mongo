import { ContenedorSql } from "../../managers/ContenedorSql.js";

//crear una subclases de productos que trabaje con el contendor Archivos
class CarritoDaoSql extends ContenedorSql {
    constructor(options, tableName){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(options, tableName);
    }

    async actualizaByID(id , actualizacion){
        try {
            const element = await this.database.from(this.tableName).where("id",id)
            if(!element.length){
                return {error: "No existe el carrito solicitado"}
            }
            const  idAct = element.id
            const idproduct = actualizacion.idproduct
            const newtitle=actualizacion.title
            const newPrice=actualizacion.price
            const newUrl = actualizacion.thumbnail
            await this.database.from(this.tableName).where("id",id).update({
                id: idAct,
                idproduct: idproduct,
                title: newtitle,
                price: newPrice,
                thumbnail: newUrl
            })
            const Newelement = await this.database.from(this.tableName).where("id",id)
            return  Newelement    
        } catch (error) {
            return {error: error}
        }
    }
    async getById(id){
        try {
            const element = await this.database.from(this.tableName).where("carritoNum",id)
            const returnElement = element.map(elem=>({...elem}))
            if(!returnElement.length){
                return {error: "No existe la opcion seleccionada"}
            } else{ return returnElement }
        } catch (error) {
            return {error: error}
        }
    }

    async deletedById(id){
        try {
            const element = await this.database.from(this.tableName).where("carritoNum",id)
            if(!element.length){
                return {error: error}
            }
            await this.database.from(this.tableName).where("carritoNum",id).del()
            return { msj: "Se borro exitosamente"}
        } catch (error) {
            return {error: error}
        }
    }
}
export {CarritoDaoSql}