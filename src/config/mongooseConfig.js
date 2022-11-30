import mongoose from "mongoose";
//LA URL donde se esta ejcutando nuestra base de datosconst 
URL ="mongodb://127.0.0.1:27017/ecommerce";
//conectamos a la base de datos
const connection= async function(){
    try {
        await mongoose.connect(URL, {useNewUrlParser: true,useUnifiedTopology: true}, 
            error=>{
                if(error) throw new Error(`Conexion fallida ${error}`);
                console.log("conexion base de datos exitosa!")})
                console.log("base de datos conectada")
    } catch (error) {
        console.log(error);
    }
}

const connectionON = await connection()

export {connectionON}