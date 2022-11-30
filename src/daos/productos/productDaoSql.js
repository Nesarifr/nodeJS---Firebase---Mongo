import { ContenedorSql } from "../../managers/ContenedorSql.js";

//crear una subclases de productos que trabaje con el contendor Archivos
class ProductsDaoSql extends ContenedorSql {
    constructor(options, tableName){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(options, tableName);
    }

    async actualizaByID(id , actualizacion){
        try {
            const element = await this.database.from(this.tableName).where("id",id)
            if(!element.length){
                return {error: "No existe el producto solicitado"}
            }
            const idAct = element.id
            const newtitle=actualizacion.title
            const newPrice=actualizacion.price
            const newUrl = actualizacion.thumbnail
            await this.database.from(this.tableName).where("id",id).update({
                id: idAct,
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
}

export {ProductsDaoSql}