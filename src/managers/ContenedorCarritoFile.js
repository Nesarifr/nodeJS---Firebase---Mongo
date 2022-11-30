import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename)


class Carrito{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        this.url=path.join(__dirname,`../DB/${this.nombreArchivo}.txt` )
        this.getnombreArchivo = function () {
            return this.nombreArchivo
        }
        this.getUrl = function () {
            return this.url
        }
    }
    
    // save(Object): Number - Recibe un producto, lo guarda en el archivo, devuelve el id asignado.
    async save(newCarrito){ 
        try{
            if(fs.existsSync(this.url)){ //si es que existe el archivo ====>>>
                const listCarrito = await fs.promises.readFile(this.url,"utf-8")

                if(listCarrito){ //si hay contendio en el archivo
                    const arrayCarrito = JSON.parse(listCarrito)
                    const ultimoID= await this.lastID()
                    console.log(ultimoID);
                    const newListCarrito= {id:ultimoID+1, ...newCarrito}
                    arrayCarrito.push(newListCarrito)
                    await fs.promises.writeFile(this.url, JSON.stringify(arrayCarrito, null, 2))
                    return newListCarrito.id //retorno el ID solicitado}
                }else{// no hay contenido
                    const newListCarrito={ ...newCarrito, id:1}
                    await fs.promises.writeFile(this.url, JSON.stringify([newListCarrito], null, 2))
                    return newListCarrito.id  //retorno el ID solicitado
                }
            }else{ //no existe el archivo , por lo tanto es el primer elemento
                const newListCarrito={ ...newCarrito, id:1}
                await fs.promises.writeFile(this.url, JSON.stringify([newListCarrito], null, 2))
                return newListCarrito.id  //retorno el ID solicitado
            } 
        } catch(err) {
            console.log(err)
        }
    }

    // getById(Number): Product -  Recibe un id y devuelve el producto con ese id, o null si no está.
    async getById(ID){
        try{
            const numeroID=parseInt(ID)
            if(fs.existsSync(this.url)){
                const listCarrito = await fs.promises.readFile(this.url,"utf-8")
                if(listCarrito){ //si hay contendio en el archivo
                    const arrayCarrito = JSON.parse(listCarrito)//obtengo todos los elementos del array del archivo
                    const carritoFind = arrayCarrito.filter((product)=>product.carritoNum==numeroID?product:false)
                    if(carritoFind){
                        return carritoFind
                    }else return null
                } else return null
            } else return null
        }
        catch(err){
            return `No existe el ID ${numeroID} solicitado o ya fue borrado`
        }
    }

    // getAll(): arrayCarrito[] - Devuelve un array con los objetos presentes en el archivo. En caso de que no haya objetos, ret
    async getAll(){
        try {
            const listCarrito = await fs.promises.readFile(this.url,"utf8");
            if(listCarrito){
                const arrayCarrito = JSON.parse(listCarrito);
                return arrayCarrito
            } else{
                return {error: 'No existe una lista de productos todavia'}
            }
        } catch (error) {
            return {error: 'No existe una lista de productos todavia'}
        }
    }

    // deleteById(Number): void - Elimina del archivo el producto con el id buscado.
    async deletedById(ID){
        try {
            const listCarrito = await fs.promises.readFile(this.url,"utf8");
            const arrayCarrito = JSON.parse(listCarrito);
            
            const arrayFiltrados= arrayCarrito.filter(item=>item.carritoNum!==ID);
            console.log(arrayFiltrados);
            await fs.promises.writeFile(this.url, JSON.stringify(arrayFiltrados, null, 2))
        } catch (error) {
            console.log(error)
        }
    }

    // deleteAll(): void - Elimina todos los productos presentes en el archivo.
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.url, JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    }

    // acutalizaByID(number: ID , json: productoNew): void - actualiza borrando el producto y agregando el nuevo producto
    async actualizaByID(ID, newCarrito){
        try{
            const existeCarrito=await this.getById(ID)
            if(existeCarrito){
                const arrayCarrito= await this.getAll()
                let arrayActualizada = []
                if(arrayCarrito){
                    arrayActualizada = arrayCarrito.map( obj =>{
                        if(obj.id===ID){
                            return {...newCarrito, id: ID}
                        } else return obj
                })} else return null
                await this.deleteAll()
                await fs.promises.writeFile(this.url, JSON.stringify(arrayActualizada, null, 2))
                return {...newCarrito, id: ID}
            }
        } catch(error) {
            console.log(error)
        }
    }

    // lastID(): retorna el ultimo ID
    async lastID(){
        try{
            if(fs.existsSync(this.url)){ //si es que existe el archivo ====>>>
                let ultimoID
                const listCarrito = await fs.promises.readFile(this.url,"utf-8")
                if(listCarrito){ //si hay contendio en el archivo
                    let arrayCarrito = JSON.parse(listCarrito)
                    ultimoID = arrayCarrito.reduce(function (acc, item) {
                        if(acc<=item.carritoNum){
                            return acc=item.carritoNum
                        } else { return acc}
                    }, 0)
                } else{ ultimoID=0 }

                return ultimoID
            }
        }catch{
            return { msj: "No existe el archivo solicitado"}
        }
}


}
/* --------------------------------- exports -------------------------------- */
export {Carrito}