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

//=========== FIREBASE STARTUP ===========
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const dbRef = db.collection("selecaoCandidato");

var paginas_tipologico = new Array();
var paginas_comportamental = new Array();

getTipologico(loadTipologico);
getComportamental(loadComportamental);

//=========== MODAL STARTUP ===========
const modal = document.getElementById('modal');
const senha_modal = document.getElementById('senha-modal');
var modalState = "none";
const content = document.getElementById('background-data');
const modal_password = "RsUP!2386*";

//=========== PAGINATION STARTUP ===========
var num_paginas_tipologico = 0;
var num_paginas_comportamental = 0;
var pagina_atual = 1;

//=========== DATA LOGIC ===========

async function getTipologico(callback) {
    var tabelaTipologico = dbRef.where('message.text', '==', 'Resultado do Teste Tipológico').orderBy('delivery.endTime', 'desc');
    var dadosTipologico = await tabelaTipologico.get();
    dadosTipologico.forEach((doc) => {
        paginas_tipologico.push(doc.data().message.html);
    });
    callback();
}

async function getComportamental(callback) {
    var tabelaComportamental = dbRef.where('message.text', '==', 'Resultado do teste comportamental').orderBy('delivery.endTime', 'desc');
    var dadosComportamental = await tabelaComportamental.get();
    dadosComportamental.forEach((doc) => {
        paginas_comportamental.push(doc.data().message.html);
    });
    callback();
}

//=========== MODAL LOGIC ===========
function unlockContent() {
    modal.style.display = "none";
    modalState = "none";
    content.className = "not-blurred";
}

senha_modal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (senha_modal.value == modal_password) {
            unlockContent();
        }
    }
});

//=========== PAGINATION LOGIC ===========

function loadTipologico() {
    var start_index_tipologico = (6 * (pagina_atual - 1));
    let tabelaTipologicoHTML = '';
    for (let i = 0; i < 6 && ((start_index_tipologico + i) < paginas_tipologico.length); i++) {
        tabelaTipologicoHTML += `<table><td><div class="blur-overlay"></div><div class="text-content">${paginas_tipologico[start_index_tipologico + i]}</div></td></table>`;
    }
    document.getElementById('tabela_tipologico').innerHTML = tabelaTipologicoHTML;
    num_paginas_tipologico = Math.ceil(paginas_tipologico.length / 6);
}

function loadComportamental() {
    var start_index_comportamental = (6 * (pagina_atual - 1));
    let tabelaComportamentalHTML = '';
    for (let i = 0; (i < 6) && ((start_index_comportamental + i) < paginas_comportamental.length); i++) {
        tabelaComportamentalHTML += `<table><td><div class="blur-overlay"></div><div class="text-content">${paginas_comportamental[start_index_comportamental + i]}</div></td></table>`;
    }
    document.getElementById('tabela_comportamental').innerHTML = tabelaComportamentalHTML;
    num_paginas_comportamental = Math.ceil(paginas_comportamental.length / 6);
}
// Navegação

function nextPage() {
    if (pagina_atual < num_paginas_tipologico) {
        pagina_atual++;
    }
    loadComportamental();
    loadTipologico();
    console.log("chegou!");
}

function previousPage() {
    if (pagina_atual > 1) {
        pagina_atual--;
    }
    loadComportamental();
    loadTipologico();
}

function crud() {
    window.location.href = "crud.html";
}
