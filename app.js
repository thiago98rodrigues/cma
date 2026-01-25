import express from 'express';
import { authRouter } from './src/auth/authenticator.js'
import {userRouter} from './src/routes/users.js'
import { matriculaRouter } from './src/routes/matricula.js'


import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = '5500'
const app = express()

app.use(express.static(path.join(__dirname, 'public/')))

app.use(express.json())

app.use(authRouter)

app.use(userRouter)

app.use(matriculaRouter)

app.get('/', (req, res)=>{
  return res.json('<<-BEM-VINDO A API DO CMA!!->>')
})


app.listen(PORT, ()=>{
    console.log(`<<-RODANDO DA PORTA ${PORT}->>`);
});