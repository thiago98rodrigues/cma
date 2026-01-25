import { dbPromise } from "./database.js"
import bcrypt from 'bcrypt'
import { salt } from "../routes/users.js"

const criadoEm = new Date().toISOString();
const passwordHash = await bcrypt.hash('essasenhaeforte', salt);

export async function insertDummyUser() {
    const db = await dbPromise
    try{
    await db.run(`INSERT INTO users (nomeCompleto, matricula, dataNascimento, telefone, email, password, criadoEm) 
        VALUES ('Juliano Juliano', 'cma78sr78', '2000-02-02', '87981568475', 'cma@cma.com', ?, ?)`, [passwordHash, criadoEm])}catch(err){
            console.log('-------------')
        }
}


    
