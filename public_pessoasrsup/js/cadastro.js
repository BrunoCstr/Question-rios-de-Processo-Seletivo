const firebaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
    storageBucket: ""
});

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

var inputUnidade = document.getElementById("inputUnidade");

db.collection("unidade").onSnapshot((querySnapshot) => {
    inputUnidade.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nome}`);
        inputUnidade.innerHTML += `
            <option>${doc.data().nome}</option>
        `
        document.getElementById("inputUnidade").value = inputUnidade;
    });
});

var forms = new Array(25);

// Abre validação dos inputs

function validation() {
    var nome = document.getElementById('inputNome').value;
    var email = document.getElementById('inputEmail').value;
    var unidade = document.getElementById('inputUnidade').value;

    if (nome.trim() !== '' && email.trim() !== '' && unidade.trim() !== '') {

        // Armazena os dados no localStorage
        localStorage.setItem('nome', nome);
        localStorage.setItem('email', email);
        localStorage.setItem('unidade', unidade);

        // Mensagem de sucesso
        msgSuccess.setAttribute('style', 'display: block');
        msgSuccess.innerHTML = '<strong>Dados cadastrados com sucesso!</strong>';
        msgError.setAttribute('style', 'display: none');
        msgError.innerHTML = '';

        window.location.href = "QuestionarioComportamental.html";

    } else {
        // Mensagem de erro
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = '<strong>Preencha todos os campos!</strong>';
        msgSuccess.innerHTML = '';
        msgSuccess.setAttribute('style', 'display: none');
    }
}

let unidade = document.querySelector('#inputUnidade');
let labelUnidade = document.querySelector('#labelUnidade');
let validUnidade = false

let nome = document.querySelector('#inputNome');
let labelNome = document.querySelector('#labelNome');
let validNome = false

let email = document.querySelector('#inputEmail');
let labelEmail = document.querySelector('#labelEmail');
let validEmail = false

let telefone = document.querySelector('#inputTelefone');
let labelTelefone = document.querySelector('#labelTel');
let validTelefone = false

unidade.addEventListener('change', () => {
    if (unidade.value === '') {
        labelUnidade.setAttribute('style', 'color: red');
        labelUnidade.innerHTML = 'Unidade: *Selecione uma unidade';
        unidade.setAttribute('style', 'border-color: red');
        validUnidade = false;
    } else {
        labelUnidade.setAttribute('style', 'color: green');
        labelUnidade.innerHTML = 'Unidade';
        unidade.setAttribute('style', 'border-color: green');
        validUnidade = true;
    }
});

nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
        labelNome.setAttribute('style', 'color: red');
        labelNome.innerHTML = 'Nome: *Mínimo 3 caracteres';
        nome.setAttribute('style', 'border-color: red');
        validNome = false;
    } else {
        labelNome.setAttribute('style', 'color: green');
        labelNome.innerHTML = 'Nome:'
        nome.setAttribute('style', 'border-color: green');
        validNome = true;
    }
})

email.addEventListener('keyup', () => {
    let emailValue = email.value;
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(emailValue)) {
        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = 'E-mail: *Insira um e-mail válido';
        email.setAttribute('style', 'border-color: red');
        validEmail = false
    } else {
        labelEmail.setAttribute('style', 'color: green');
        labelEmail.innerHTML = 'E-mail';
        email.setAttribute('style', 'border-color: green');
        validEmail = true
    }
});
// Fecha validação dos inputs

//Fixagem do Matriz Caratinga/MG como primeira opção do option:
db.collection("unidade").onSnapshot((querySnapshot) => {
    const unidades = [];
    querySnapshot.forEach((doc) => {
        const nomeUnidade = doc.data().nome;
        unidades.push(nomeUnidade);
    });

    // Ordena o array de unidades e coloca a unidade específica em primeiro lugar
    unidades.sort((a, b) => {
        if (a === "Matriz Caratinga/MG") {
            return -1;
        } else if (b === "Matriz Caratinga/MG") {
            return 1;
        } else {
            return a.localeCompare(b);
        }
    });

    // Cria as opções com base no array ordenado
    const optionHTML = unidades.map((nomeUnidade) => {
        return `<option>${nomeUnidade}</option>`;
    }).join('');

    // Atualize apenas o innerHTML do elemento, não é necessário redeclarar a variável.
    document.getElementById("inputUnidade").innerHTML = optionHTML;

    // Desmarca qualquer opção selecionada por padrão
    document.getElementById("inputUnidade").selectedIndex = -1;
});


// Aniamção do ícone de loading, usando a biblioteca Vivus, && Preloader
var myVivus = new Vivus('asas-rsup', {
    start: 'autostart',
    animTimingFunction: Vivus.EASE
  });
  
  new Vivus('asas-rsup', {}, function (myVivus) {
    myVivus.play(myVivus.getStatus() === 'end' ? -1 : 1);
  })
  
  //Lógica da saída do loader
  document.addEventListener('DOMContentLoaded', () => {
    var overlayPreloader = document.querySelector('.overlay-preloader');
    var preloaderLogo = document.getElementById('asas-rsup');
  
    window.addEventListener('load', () => {
      overlayPreloader.style.display = 'none';
      preloaderLogo.style.display = 'none';
    });
  })