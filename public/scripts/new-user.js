document.addEventListener("DOMContentLoaded", async ()=> {
    const isAutorized =  JSON.parse(sessionStorage.getItem('auth')).isAutorized
    const user = JSON.parse(sessionStorage.getItem('auth')).user

    if(isAutorized != 'true'){
        window.location.replace('./login.html')
        return;
    }
    document.querySelector('#userName').textContent = user['matricula'].toUpperCase()

})


const msg = document.querySelector('#msg')
const regexEmail = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/


document.querySelector('.register-btn').addEventListener('click', async ()=>{
    const email = document.querySelector('#email').value
    if(email == '' || !regexEmail.test(email)){
        highlighterError('Informe um email válido!')
        return;
    }

    const nomeCompleto = document.querySelector('#nomeCompleto').value
    if(nomeCompleto == ''){
        highlighterError("Informe o nome do colcaborador!")
        return;
    } 
    
    const matricula = document.querySelector('#matricula').value
    if(matricula == ''){
        highlighterError("Informe a matrícula do colcaborador!")
        return;
    }

    

    const dataNascimento = document.querySelector('#dataNascimento').value
    if(dataNascimento == ''){
        highlighterError("Informe a data nascimento do colcaborador!")
        return;
    }

    const telefone = document.querySelector('#telefone').value
    if(telefone == ''){
        highlighterError('Informe o telefone do colcaborador!')
        return;
    }
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({nomeCompleto, matricula, dataNascimento, telefone, email})
    });

    const res = await response.json();

    if(res.error == 'Essa matrícula já está vinculado a um cadastro.'){  
        highlighterError(res.error)
        return;
    }

    highlighterMsg(res.msg)

})

function highlighterError(text){
    msg.textContent = text;
    msg.style.display = 'flex'
    msg.style.color = 'white'
    msg.style.boxShadow = '0px 0px 1rem #d44b4b'
    msg.style.boderColor = '0px 0px 1rem #d44b4b'
    msg.style.backgroundColor = '#ff0000d9'
}

function highlighterMsg(text){
    msg.textContent = text;
    msg.style.display = 'flex'
    msg.style.color = 'white'
    msg.style.boxShadow = '0px 0px 1rem #00FF9C'
    msg.style.boderColor = '0px 0px 1rem #00FF9C'
    msg.style.backgroundColor = '#00FF9C'
}


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