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
const dbRef = db.collection("selecaoCandidato");
getTipologico();
getComportamental();
//parte modal
const modal = document.getElementById('modal');
const senha_modal = document.getElementById('senha-modal');
var modalState = "none";
const content = document.getElementById('background-data');
const modal_password = "banana";

async function getTipologico(){
    var tabelaTipologico = dbRef.where('message.text', '==', 'Resultado do Teste Tipológico').orderBy('delivery.endTime', 'desc');
    var dadosTipologico = await tabelaTipologico.get();
    var index = 0;
    dadosTipologico.forEach((doc) => {
        if(index == 0){
            document.getElementById('tabela_tipologico').innerHTML = `
                <table>
                    <caption>Teste Tipologico</caption>
                    <td>${doc.data().message.html}</td>
                </table>`
        }
        else{
            document.getElementById('tabela_tipologico').innerHTML += `
            <table>
                <td>${doc.data().message.html}</td>
            </table>`
        }
        index++;
    });
}

async function getComportamental(){
    var tabelaComportamental = dbRef.where('message.text', '==', 'Resultado do teste comportamental').orderBy('delivery.endTime', 'desc');
    var dadosComportamental = await tabelaComportamental.get();
    var index = 0;
    dadosComportamental.forEach((doc) => {
        if(index == 0){
            document.getElementById('tabela_comportamental').innerHTML = `
                <table>
                    <caption>Teste Comportamental</caption>
                    <td>${doc.data().message.html}</td>
                </table>`
        }
        else{
            document.getElementById('tabela_comportamental').innerHTML += `
            <table>
                <td>${doc.data().message.html}</td>
            </table>`
        }
        index++;
    });
}

function unlockContent(){
    modal.style.display = "none";
    modalState = "none";
    content.className = "not-blurred";
}

senha_modal.addEventListener('keydown', (e)=> {
    if(e.key === 'Enter'){
        if(senha_modal.value == modal_password){
            unlockContent();
        }
    }
});