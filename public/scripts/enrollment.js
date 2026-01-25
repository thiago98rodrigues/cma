function somenteDigitos(valor) {
  return (valor || "").replace(/\D/g, "");
}

async function carregarConfigMatricula() {
  const res = await fetch('/api/config-matricula');
  const data = await res.json();

  const titleEl = document.getElementById("pageTitle");
  const descEl = document.getElementById("pageDesc");

  if (titleEl && data.titulo) titleEl.innerHTML = `<b>${data.titulo}</b>`;
  if (descEl && data.descricao) descEl.textContent = data.descricao;

}

async function enviarMatricula(evento) {
  evento.preventDefault();

  const status = document.getElementById("statusMsg");
  if (status) status.textContent = "Enviando...";

  const form = evento.target;
  const payload = Object.fromEntries(new FormData(form).entries());

  payload.nomeCompleto = (payload.nomeCompleto || "").trim();
  payload.cpf = somenteDigitos(payload.cpf);
  payload.dataNascimento = (payload.dataNascimento || "").trim();
  payload.sexo = (payload.sexo || "").trim();
  payload.cor = (payload.cor || "").trim();
  payload.turmaInteresse = (payload.turmaInteresse || "").trim();
  payload.telefone = (payload.telefone || "").trim();
  payload.email = (payload.email || "").trim();

  payload.cidade = (payload.cidade || "").trim();
  payload.endereco = (payload.endereco || "").trim();
  payload.numero = (payload.numero || "").trim();
  payload.bairro = (payload.bairro || "").trim();

  if (!payload.nomeCompleto) {
    if (status) highlighterError("Informe o nome completo.");
    return;
  }

  if (payload.cpf.length !== 11) {
    if (status)  highlighterError("CPF inválido: informe 11 dígitos (apenas números).");
    return;
  }

  if (!payload.dataNascimento) {
    if (status) highlighterError("Informe a data de nascimento.");
    return;
  }

  if (!payload.sexo) {
    if (status)  highlighterError("Selecione o sexo.");
    return;
  }

  if (!payload.cor) {
    if (status) highlighterError("Selecione a cor.")
    return;
  }

  if (!payload.turmaInteresse) {
    if (status) highlighterError("Selecione a turma de interesse.")
    return;
  }

  const res = await fetch('/api/matriculas', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json().catch(() => ({}));
 
  if (res.ok) {
    if (status)  highlighterMsg(`${data.mensagem || "Matrícula registrada."} ID: ${data.id}`);
    form.reset();
  } else {
    if (status) highlighterError( data.mensagem || "Erro ao enviar matrícula.");
  }
}

function highlighterError(text){
    const msg = document.getElementById("statusMsg");
    msg.textContent = text;
    msg.style.display = 'flex'
    msg.style.color = 'white'
    msg.style.boxShadow = '0px 0px 1rem #d44b4b'
    msg.style.boderColor = '0px 0px 1rem #d44b4b'
    msg.style.backgroundColor = '#ff0000d9'
}

function highlighterMsg(text){
    const msg = document.getElementById("statusMsg");
    msg.textContent = text;
    msg.style.display = 'flex'
    msg.style.color = 'white'
    msg.style.boxShadow = '0px 0px 1rem #00FF9C'
    msg.style.boderColor = '0px 0px 1rem #00FF9C'
    msg.style.backgroundColor = '#00FF9C'
}

document.addEventListener("DOMContentLoaded", () => {
  carregarConfigMatricula();

  const form = document.getElementById("formMatricula");
  if (form) form.addEventListener("submit", enviarMatricula);
});
