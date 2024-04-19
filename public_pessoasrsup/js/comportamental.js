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

var forms = new Array(25);

//Checagem

function validarForm() {
    const unidade = localStorage.getItem('unidade');
    const nome = localStorage.getItem('nome');
    const email = localStorage.getItem('email');

    //indices = 0 = aguia, i; 1 = tubarão, a; 2 = gato, c; 3 = lobo, o
    var letras = [0, 0, 0, 0];

    for (let i = 1; i <= forms.length; i++) {
        var formname = "form" + i;
        forms[i - 1] = document.forms[formname].elements['questao'];
    }

    for (let i = 0; i < forms.length; i++) {
        switch (forms[i].value) {
            case 'i': {
                letras[0]++;
                break;
            }
            case 'a': {
                letras[1]++;
                break;
            }
            case 'c': {
                letras[2]++;
                break;
            }
            case 'o': {
                letras[3]++;
                break;
            }
        }
    }


    if (nome != "" && letras[0] + letras[1] + letras[2] + letras[3] >= 25) {

        for (let i = 0; i < letras.length; i++) {
            letras[i] *= 4;
        }

        db.collection("unidade")
            .where("nome", "==", unidade)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        var dadosDocumento = doc.data();
                        var emailUnidade = dadosDocumento.email;
                    });
                } else {
                    console.log("Nenhum documento encontrado com esse nome.");
                }

                db.collection("unidade")
                    .where("nome", "==", unidade)
                    .get()
                    .then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            querySnapshot.forEach((doc) => {
                                var dadosDocumento = doc.data();
                                var emailUnidade = dadosDocumento.email;
                                console.log("E-mail da Unidade:", emailUnidade);
                                console.log("E-mail do colaborador", email);

                                db.collection("selecaoCandidato").add({
                                    to: [email, emailUnidade],
                                    message: {
                                        subject: 'Resultado do Teste Comportamental: ' + nome,
                                        text: 'Resultado do teste comportamental',
                                        html: `Nome: ${nome} | E-mail: ${email}<br>Águia: ${letras[0]}% Lobo: ${letras[3]}% Tubarão: ${letras[1]}% Gato: ${letras[2]}%`,
                                    }
                                })
                                    .then(() => {
                                        alert('Aguarde... Estamos te redirecionando para o outro questionário!');
                                    }
                                    )

                                    .catch((error) => {
                                        console.error("Erro cadastrando.: ", error);
                                        alert("Erro no cadastro!");
                                    });
                            });
                        } else {
                            console.log("Nenhum documento encontrado com esse nome.");
                        }
                    })
                    .catch((error) => {
                        console.error("Erro ao consultar o Firestore:", error);
                    });


            })
            .catch((error) => {
                console.error("Erro ao consultar o Firestore:", error);
            });
        setTimeout(function () {
            window.location.href = "QuestionarioTipologico.html"
        }, 5000)
    }

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
};


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