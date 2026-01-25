

const erro = document.querySelector('#error')
const regexEmail = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/


document.querySelector('#submit').addEventListener('click', async ()=>{
    const matricula = document.querySelector('#matricula').value
    if(matricula == ''){
        erro.textContent = 'Informe sua matrícula!';
        highlighter()
        return;
    }

    const password = document.querySelector('#password').value
    if(password == ''){
        erro.textContent = "Informe sua senha!";
        highlighter()
        return;
    }  

    const res = await fetch(`http://localhost:5500/auth/login?matricula=${matricula}&password=${password}`)
    const response = await res.json()
    
    if(response['ok']){
        erro.style.display = 'none'
        sessionStorage.setItem('auth',  JSON.stringify({'isAutorized':'true', user: response['user'][0]}))
        window.location.replace('./dashboard.html')
    }else{
        erro.textContent = response['msg']
        highlighter()
    }
})

function highlighter(){
    erro.style.display = 'flex'
    erro.style.color = 'white'
    erro.style.boxShadow = '0px 0px 1rem #d44b4b'
    erro.style.boderColor = '0px 0px 1rem #d44b4b'
    erro.style.backgroundColor = '#ff0000d9'
}