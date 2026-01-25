import { Router } from "express"
import { dbPromise } from "../db/database.js";
import bcrypt from "bcrypt"

export const salt = await bcrypt.genSalt(12)
export const userRouter = Router()


userRouter.post('/api/users', async (req, res)=> {
    const db = await dbPromise
    const {nomeCompleto, matricula, dataNascimento, telefone, email} = req.body
    
    const password = 'colaborador'+matricula
    const criadoEm = new Date().toISOString();
    const passwordHash = await bcrypt.hash(password, salt);


    const user = await db.all(`SELECT * FROM users WHERE matricula = ?`, matricula) 

    if(Object.keys(user).length !== 0){
      res.status(500).json({ error: "Essa matrícula já está vinculado a um cadastro." })
      return;
    }

    try {
      db.run(
        `INSERT INTO users (nomeCompleto, matricula, dataNascimento, telefone, email, password, criadoEm) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nomeCompleto, matricula, dataNascimento, telefone, email, passwordHash, criadoEm])
        res.status(201).json({ msg: "Colaborador Cadastrado com sucesso!" })
    } catch (error) {
      res.status(500).json({error: "Erro ao salvar no banco." })
    }

})

userRouter.get('/api/users', async(req, res) => {
  const db = await dbPromise;
  try {
    const users = await db.all(`SELECT * FROM users`)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ ok: false, msg: "Erro ao consultar o banco." })
  }
})



