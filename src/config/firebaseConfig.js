import admin  from "firebase-admin";
import {readFileSync} from "fs";
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename)

const serviceAccount= JSON.parse(readFileSync(path.join(__dirname,"./coderbaseKey.json")))

const connection = async function(){
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://backendcoder1150.firebaseio.com"
})
console.log("base conectada");
return admin.firestore()
}
const connectionON = await connection()
export {connectionON}