document.addEventListener("DOMContentLoaded", async ()=> {
    const isAutorized =  JSON.parse(sessionStorage.getItem('auth')).isAutorized
    const user = JSON.parse(sessionStorage.getItem('auth')).user


    if(isAutorized != 'true'){
        window.location.replace('./login.html')
        return;
    }
    document.querySelector('#userName').textContent = user['matricula'].toUpperCase()

    const requisicaoMatricula = await fetch("http://localhost:5500/api/matriculas")
    const matriculas = await requisicaoMatricula.json()

    const totalMatricula = matriculas.length
    document.querySelector('#totalMatricula').textContent = totalMatricula

    const requisicaoUsuarios = await fetch("http://localhost:5500/api/users")
    const usuarios = await requisicaoUsuarios.json()

    document.querySelector('#totalUsuario').textContent = usuarios.length

    const container = document.querySelector(".matriculas__container")
    container.innerHTML = ""

    if (totalMatricula === 0) {
        const msg = document.createElement("p")
        msg.textContent = "Ainda não há matrículas!"
        container.appendChild(msg)
        return
    }

    matriculas.forEach(matricula => {
    const article = document.createElement("article")
    article.classList.add("matricula-card")
    const titulo = document.createElement("h3")
    titulo.textContent = matricula.nomeCompleto
    const criadoEm = new Date(matricula.criadoEm)
    const dataSubmissao = document.createElement("small")
    dataSubmissao.textContent = `Submetido em: ${criadoEm.getDate()}/${criadoEm.getMonth() + 1}/${criadoEm.getFullYear()}`

    const ul = document.createElement("ul")

    const campos = [
        ["CPF", matricula.cpf],
        ["Data de Nascimento", matricula.dataNascimento],
        ["Sexo", matricula.sexo],
        ["Cor", matricula.cor],
        ["Turma de Interesse", matricula.turmaInteresse],
        ["Telefone", matricula.telefone],
        ["Email", matricula.email],
        ["Cidade", matricula.cidade],
        ["Endereço", matricula.endereco],
        ["Número", matricula.numero],
        ["Bairro", matricula.bairro],
    ]

    campos.forEach(([label, valor]) => {
        if (valor) {
        const li = document.createElement("li")
        li.innerHTML = `<strong>${label}:</strong> ${valor}`
        ul.appendChild(li)
        }
    })

    article.appendChild(titulo)
    article.appendChild(dataSubmissao)
    article.appendChild(ul)

    container.appendChild(article)
    })
})

document.querySelector('#openPopUp').addEventListener('click', ()=>{
    document.querySelector('#popUp_container').style.display = 'flex'
})

document.querySelector('#closePopUp').addEventListener('click', ()=>{
    document.querySelector('#popUp_container').style.display = 'none'
})

document.querySelector('#logOut').addEventListener('click', ()=>{
    sessionStorage.clear()
    window.location.replace('./login.html')
})
