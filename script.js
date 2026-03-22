import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
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

  
