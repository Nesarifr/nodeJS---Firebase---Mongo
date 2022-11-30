import knex from "knex";

export class ContenedorSql {
    constructor(options, tableName){
        this.database=  knex(options);
        this.tableName=tableName;
    }
    async save(element){
        try {
            if(element){
                const [newid]= await this.database.from(this.tableName).insert(element);
                console.log(element);
                console.log(newid);
                return newid
            } else{
                return {error: "elemento vacio, no se puede crear"}
            }
        } catch (error) {
            return {error: error}
        }
    }

    async getById(id){
        try {
            //En el caso carrito se overridea esta funcoin en el DAOcarritoSQL
            const element = await this.database.from(this.tableName).where("id",id)
            const returnElement = element.map(elem=>({...elem}))
            if(!returnElement.length){
                return {error: "No existe la opcion seleccionada"}
            } else{ return returnElement }
        } catch (error) {
            return {error: error}
        }
    }

    async getAll(){
        try {
            
            const data = await this.database.from(this.tableName).select("*");

            if (data.length) {
                const dataReturn = data.map(elem=>({...elem}))
                return dataReturn
            } else {
                return {error: "No existen los datos pedidos"}
            }
        } catch (error) {
            return {error: error}
        }
    }

    async deletedById(id){
        try {
            const element = await this.database.from(this.tableName).where("id",id)
            if(!element.length){
                return {error: error}
            }
            await this.database.from(this.tableName).where("id",id).del()
            return { msj: "Se borro exitosamente"}
        } catch (error) {
            return {error: error}
        }
    }

    async actualizaByID(id , actualizacion){
        let msj = "Se Overridea el metodo actualizarByID en los Dao correspondientes para Carrito y Productos"
        console.log(msj);
        return msj
        
    }

    // lastID(): retorna el ultimo ID
    async lastID(){
    const element = await this.database.from(this.tableName).max('carritoNum')
    return element
    }

}