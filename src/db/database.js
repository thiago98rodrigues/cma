import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { insertDummyUser } from './seed.js';

export const dbPromise = await open({filename: './cma.db', driver: sqlite3.Database})

export async function createTables(){
    const db = await dbPromise;
    db.exec(`
        CREATE TABLE IF NOT EXISTS matriculas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeCompleto TEXT NOT NULL,
        cpf TEXT NOT NULL,
        dataNascimento TEXT NOT NULL,
        sexo TEXT NOT NULL,
        cor TEXT NOT NULL,
        turmaInteresse TEXT NOT NULL,
        telefone TEXT NOT NULL,
        email TEXT NOT NULL,
        cidade TEXT,
        endereco TEXT,
        numero TEXT,
        bairro TEXT,
        criadoEm TEXT NOT NULL)`)
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeCompleto TEXT NOT NULL,
        matricula TEXT NOT NULL UNIQUE,
        dataNascimento TEXT NOT NULL,
        telefone TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        criadoEm TEXT NOT NULL)`)
}

createTables().then(()=>{
    console.log('DB:On')
    insertDummyUser().then(()=> console.log("DB: 1 User Online"))
})

