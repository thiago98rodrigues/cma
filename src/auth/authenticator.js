import { json, Router } from "express"
import { dbPromise } from "../db/database.js"
import bcrypt from 'bcrypt'
import 'dotenv/config'

export const authRouter = Router()

authRouter.get('/auth/login', async (req, res)=>{
    const {matricula, password} = req.query
    const user = await findUser(matricula)
    
    if(Object.keys(user).length === 0 || user['msg']=="Erro ao acessaro banco de dados!"){
        return res.status(404).json({ok:false, msg:"matricula não pertence a um usuário cadastrado!"})
    }
    
    const checkPassword = await bcrypt.compare(password, user[0]['password']);
    if(!checkPassword){
        return res.status(422).json({ok:false, msg:"Essa não é sua senha!"})
    }

    return res.status(200).json({ok: true, msg:'Acesso autorizado!', user:user})
});


async function findUser(matricula){
    const db = await dbPromise
    try {
        const user = await db.all(`SELECT * FROM users WHERE matricula = ?`, matricula)
        return user
    }catch(error){
        return {msg: "Erro ao acessaro banco de dados!" }
    }
}