/*import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyARdl2Q2A1zMtOxvs_SeZsfE4VLW6S0syw",
  authDomain: "acolhesinais.firebaseapp.com",
  projectId: "acolhesinais",
  storageBucket: "acolhesinais.firebasestorage.app",
  messagingSenderId: "474572296647",
  appId: "1:474572296647:web:09b43c026de03ba00189e2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN
window.login = async function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    alert("Login feito!");
    window.location.href = "menu.html";
  } catch (e) {
    alert(e.message);
  }
};

// CADASTRO
window.cadastrar = async function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada!");
  } catch (e) {
    alert(e.message);
  }
};
window.salvarPaciente = function () {
  const nome = document.getElementById("nome")?.value;

  if (!nome) {
    alert("Digite o nome");
    return;
  }

  alert("Paciente enviado!");

  setTimeout(() => {
    window.location.href = "menu.html";
  }, 500);
};
*/
const medicoEmail = "medico@hospital.com";
const medicoSenha = "1234";

// LOGIN
window.login = function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const tipo = localStorage.getItem("tipoEscolhido");

  if (!email || !senha) {
    alert("Preencha email e senha");
    return;
  }

  // LOGIN MÉDICO
  if (tipo === "medico") {
    if (email === medicoEmail && senha === medicoSenha) {
      localStorage.setItem("tipoUsuario", "medico");
      window.location.href = "medico.html";
    } else {
      alert("Login de médico inválido");
    }
    return;
  }

  // LOGIN PACIENTE
  localStorage.setItem("tipoUsuario", "paciente");
  window.location.href = "paciente.html";
};

// CADASTRO
window.cadastrar = function () {
  alert("Conta criada!");
  window.location.href = "login.html";
};

// SALVAR PACIENTE
window.salvarPaciente = function () {
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;

  const sintomas = [];
  document.querySelectorAll(".sintomas input:checked").forEach(item => {
    sintomas.push(item.value);
  });

  if (!nome || !idade) {
    alert("Preencha nome e idade");
    return;
  }

  const paciente = { nome, idade, sintomas };

  let lista = JSON.parse(localStorage.getItem("pacientes")) || [];
  lista.push(paciente);

  localStorage.setItem("pacientes", JSON.stringify(lista));

  alert("Paciente salvo!");

  window.location.href = "medico.html";
};
