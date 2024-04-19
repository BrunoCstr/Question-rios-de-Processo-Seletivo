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

let modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEmail = document.querySelector('#m-email')
const btnSalvar = document.querySelector('#btnSalvar')

let id

const unidadeCollection = db.collection("unidade");

const tabela = document.querySelector("table tbody");

// Função para buscar e exibir os dados na tabela
function buscarDadosEExibir() {
  unidadeCollection.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const dados = doc.data();
      const nome = dados.nome;
      const email = dados.email;

      const novaLinha = tabela.insertRow();
      const colunaNome = novaLinha.insertCell(0);
      const colunaEmail = novaLinha.insertCell(1);
      const colunaEditar = novaLinha.insertCell(2);
      const colunaExcluir = novaLinha.insertCell(3);

      colunaNome.textContent = nome;
      colunaEmail.textContent = email;

      const editarBtn = document.createElement("button");
      editarBtn.addEventListener("click", () => openEditModal(true, doc.id));
      editarBtn.id="btn-responsivo"
      editarBtn.classList.add("botao-editar");
      editarBtn.textContent = "Editar";
      colunaEditar.appendChild(editarBtn);

      const excluirBtn = document.createElement("button");
      excluirBtn.classList.add("botao-excluir");
      excluirBtn.id="btn-responsivo"
      excluirBtn.textContent = "Excluir";
      excluirBtn.addEventListener("click", () => confirmarExclusao(doc.id));
      colunaExcluir.appendChild(excluirBtn);
    });
  });
}

// Chame a função para buscar e exibir os dados
buscarDadosEExibir();

// Abre modal de cadastro
function openModal(edit = false, docId = null) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  }

  if (edit) {
    unidadeCollection.doc(docId).get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        sNome.value = data.nome;
        sEmail.value = data.email;
        id = docId;
      } else {
        console.error("Documento não encontrado");
      }
    }).catch((error) => {
      console.error("Erro ao obter dados da unidade:", error);
    });
  } else {
    sNome.value = '';
    sEmail.value = '';
    id = '';
  }
}

function closeModal() {
  const modal = document.getElementById('modal-container');
  editModal.classList.remove('active');
}
// Fecha modal de cadastro

// Abre modal de edição
function openEditModal(edit = false, docId = null) {
  const editModal = document.getElementById('editModal');
  editModal.classList.add('active');

  editModal.onclick = e => {
    if (e.target.className.indexOf('modal') !== -1) {
      closeEditModal();
    }
  };

  if (edit) {
    unidadeCollection.doc(docId).get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        document.getElementById('m-nome-edit').value = data.nome;
        document.getElementById('m-email-edit').value = data.email;
        id = docId;
      } else {
        console.error("Documento não encontrado");
      }
    }).catch((error) => {
      console.error("Erro ao obter dados da unidade:", error);
    });
  } else {
    document.getElementById('m-nome-edit').value = '';
    document.getElementById('m-email-edit').value = '';
    id = '';
  }
}

function closeEditModal() {
  const editModal = document.getElementById('editModal');
  editModal.classList.remove('active');
}
// Fecha modal de edição

//Abre função para salvar (cadastro)
function saveUnidade() {
  const nome = document.getElementById('m-nome').value;
  const email = document.getElementById('m-email').value;

  if (nome && email) {
    if (id) {
      unidadeCollection.doc(id).update({
        nome: nome,
        email: email
      }).then(() => {
        console.log("Documento atualizado com sucesso");
        alert("Unidade atualizada com sucesso!");
        id = '';
        document.getElementById('editModal').classList.remove('active');
        location.reload();
      }).catch((error) => {
        console.error("Erro ao atualizar a unidade:", error);
        alert("Erro ao atualizar a unidade!");
      });
    } else {
      db.collection("unidade").add({
        nome: nome,
        email: email
      }).then(function (docRef) {
        console.log("Documento cadastrado com ID: ", docRef.id);
        alert("Unidade cadastrada com sucesso!");
        document.getElementById('editModal').classList.remove('active');
        location.reload();
      }).catch(function (error) {
        console.error("Erro cadastrando: ", error);
        alert("Erro no cadastro!");
      });
    }
  } else {
    alert("Preencha todos os campos!");
  }
}
// Fecha Função

// Abre função para salvar (edição)
function saveUnidadeEdit() {
  const nomeEdit = document.getElementById('m-nome-edit').value;
  const emailEdit = document.getElementById('m-email-edit').value;

  if (nomeEdit && emailEdit) {
    if (id) {
      unidadeCollection.doc(id).update({
        nome: nomeEdit,
        email: emailEdit
      }).then(() => {
        console.log("Documento atualizado com sucesso");
        alert("Unidade atualizada com sucesso!");
        id = ''; 
        document.getElementById('editModal').classList.remove('active'); 
        location.reload(); 
      }).catch((error) => {
        console.error("Erro ao atualizar a unidade:", error);
        alert("Erro ao atualizar a unidade!");
      });
    } else {
      alert("ID não encontrado. Não é possível atualizar.");
    }
  } else {
    alert("Preencha todos os campos no modal de edição!");
  }
}
// Fecha função

// Função para excluir os dados
function confirmarExclusao(docId) {
  if (confirm("Tem certeza de que deseja excluir esta unidade?")) {
    excluirUnidade(docId);
  }
}

function excluirUnidade(docId) {
  unidadeCollection.doc(docId).delete().then(() => {
    location.reload();
  }).catch((error) => {
    console.error("Erro ao excluir a unidade:", error);
  });
}


// Botão voltar
function Resultados() {
  window.location.href = "Resultados.html";
}