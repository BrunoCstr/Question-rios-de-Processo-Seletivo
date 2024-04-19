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

var forms = new Array(44);

//Checagem
function validarForm() {
    const unidade = localStorage.getItem('unidade');
    const nome = localStorage.getItem('nome');
    const email = localStorage.getItem('email');


    var letras = [0, 0, 0, 0, 0, 0, 0, 0];

    var resultado = "null";
    for (let i = 1; i <= forms.length; i++) {
        var formname = "form" + i;
        forms[i - 1] = document.forms[formname].elements['questao'];
    }
    for (let i = 0; i < forms.length; i++) {
        switch (forms[i].value) {
            case 'e': {
                letras[0]++;
                break;
            }
            case 'i': {
                letras[1]++;
                break;
            }
            case 's': {
                letras[2]++;
                break;
            }
            case 'n': {
                letras[3]++;
                break;
            }
            case 't': {
                letras[4]++;
                break;
            }
            case 'f': {
                letras[5]++;
                break;
            }
            case 'j': {
                letras[6]++;
                break;
            }
            case 'p': {
                letras[7]++;
                break;
            }
        }
    }

    if (letras[0] > letras[1]) {
        resultado = "E";
    } else {
        resultado = "I";
    }

    if (letras[2] > letras[3]) {
        resultado += "S";
    } else {
        resultado += "N";
    }

    if (letras[4] > letras[5]) {
        resultado += "T";
    } else {
        resultado += "F";
    }

    if (letras[6] > letras[7]) {
        resultado += "J";
    } else {
        resultado += "P";
    }

    if (nome != "" && letras[0] + letras[1] + letras[2] + letras[3] + letras[4] + letras[5] + letras[6] + letras[7] >= 44) {

        db.collection("unidade") // Substitua "sua_colecao" pelo nome da sua coleção
            .where("nome", "==", unidade)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    // Se houver documentos que correspondem ao critério de consulta
                    querySnapshot.forEach((doc) => {
                        var dadosDocumento = doc.data();
                        emailUnidade = dadosDocumento.email;
                        console.log("E-mail da Unidade:", emailUnidade);
                        console.log("E-mail do usuário:", email);
                    });
                } else {
                    console.log("Nenhum documento encontrado com esse nome.");
                }


                db.collection("selecaoCandidato").add({
                    to: [email, emailUnidade],
                    message: {
                        subject: 'Resultado do Teste Tipológico: ' + nome,
                        text: 'Resultado do Teste Tipológico',
                        html: `Nome: ${nome} | E-mail: ${email} | O perfil é tipo: ${resultado}<br>E: ${letras[0]}   |   I: ${letras[1]}   |   S: ${letras[2]}   |   N: ${letras[3]}   |   T: ${letras[4]}   |   F: ${letras[5]}   |   J: ${letras[6]}   |   P: ${letras[7]}`,
                    }
                })
                    .then(function () {
                        alert("Obrigado pelo envio!" + "\n\nSerá enviado para sua caixa de e-mail o resultado dos dois questionários!");
                        setTimeout(function () {
                            window.location.href = "thankyou.html"
                        }, 2000)
                    }
                    )
            })
            .catch(function (error) {
                console.error("Erro ao adicionar documento: ", error);
                alert("Erro ao enviar os dados: " + error.message);
            });


    } else {
        var respostasIncompletas = [];

        for (let i = 0; i < forms.length; i++) {
            if (!forms[i].value) {
                respostasIncompletas.push(`Questão ${i + 1}`);
            } else {
                switch (forms[i].value) {
                    case 'i':
                        letras[0]++;
                        break;
                    case 'a':
                        letras[1]++;
                        break;
                    case 'c':
                        letras[2]++;
                        break;
                    case 'o':
                        letras[3]++;
                        break;
                }
            }
        }

        if (respostasIncompletas.length > 0) {
            alert(`Por favor, complete as seguintes questões:\n${respostasIncompletas.join('\n')}`);
            return;
        }
    }
}

// Aniamção do ícone de loading, usando a biblioteca Vivus, && Preloader
var myVivus = new Vivus('asas-rsup', {
    start: 'autostart',
    animTimingFunction: Vivus.EASE
  });
  
  new Vivus('asas-rsup', {}, (myVivus) => {
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