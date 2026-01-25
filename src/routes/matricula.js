import { Router } from "express"
import { dbPromise } from "../db/database.js";

export const matriculaRouter = Router()

matriculaRouter.get('/api/config-matricula', (req, res) => {
  res.status(200).json({
    titulo: "Reserva de Matrícula 2026",
    descricao: "Preencha os dados abaixo para registrar sua solicitação de matrícula."
  })
})

matriculaRouter.post('/api/matriculas', async (req, res) => {
  const db = await dbPromise
  const {
    nomeCompleto,
    cpf,
    dataNascimento,
    sexo,
    cor,
    turmaInteresse,
    telefone,
    email,
    cidade,
    endereco,
    numero,
    bairro
  } = req.body

  const obrigatorios = [nomeCompleto, cpf, dataNascimento, sexo, cor, turmaInteresse, telefone, email];
  if (obrigatorios.some(v => !v || String(v).trim() === "")) {
    return res.status(400).json({ ok: false, mensagem: "Preencha todos os campos obrigatórios." });
  }

  const criadoEm = new Date().toISOString();

  try {
    const result = await db.run(
    'INSERT INTO matriculas (nomeCompleto, cpf, dataNascimento, sexo, cor, turmaInteresse, telefone, email, cidade, endereco, numero, bairro, criadoEm) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      String(nomeCompleto).trim(),
      String(cpf).trim(),
      String(dataNascimento).trim(),
      String(sexo).trim(),
      String(cor).trim(),
      String(turmaInteresse).trim(),
      String(telefone).trim(),
      String(email).trim(),
      cidade && String(cidade).trim() !== "" ? String(cidade).trim() : null,
      endereco && String(endereco).trim() !== "" ? String(endereco).trim() : null,
      numero && String(numero).trim() !== "" ? String(numero).trim() : null,
      bairro && String(bairro).trim() !== "" ? String(bairro).trim() : null,
      criadoEm
    ])
    res.status(201).json({ ok: true, id: result.lastID, mensagem: "Matrícula registrada com sucesso." })
  } catch (error) {
    res.status(500).json({ ok: false, mensagem: "Erro ao salvar no banco." })
  }
})

matriculaRouter.get('/api/matriculas', async(req, res) => {
  const db = await dbPromise;
  try {
    const matricula = await db.all(`SELECT * FROM matriculas ORDER BY id DESC`)
    res.status(200).json(matricula);
  } catch (error) {
    res.status(500).json({ ok: false, mensagem: "Erro ao consultar o banco." })
  }
})


