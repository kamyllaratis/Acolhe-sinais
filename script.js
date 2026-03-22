import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// CONFIG DO SEU FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyARdl2Q2A1zMtOxvs_SeZsfE4VLW6S0syw",
  authDomain: "acolhesinais.firebaseapp.com",
  projectId: "acolhesinais",
  storageBucket: "acolhesinais.firebasestorage.app",
  messagingSenderId: "474572296647",
  appId: "1:474572296647:web:09b43c026de03ba00189e2",
};

// Inicializar
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// LOGIN
window.login = async function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "menu.html";
  } catch (e) {
    alert("Erro no login");
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
    alert("Erro ao cadastrar");
  }
};

// SALVAR PACIENTE
const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
let sintomas = [];

checkboxes.forEach((cb) => {
  sintomas.push(cb.value);
});
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const sintoma = document.getElementById("sintoma").value;

  let risco = "Normal";

  if (sintoma === "Febre" || sintoma === "Vômito") {
    risco = "⚠️ Atenção";
  }

  await addDoc(collection(db, "pacientes"), {
    nome,
    idade,
    sintoma,
    risco
  });

  alert("Enviado!");
};

// LISTAR PACIENTES (MÉDICO)
window.onload = async function () {
  const lista = document.getElementById("lista");
  if (!lista) return;

  const querySnapshot = await getDocs(collection(db, "pacientes"));

  querySnapshot.forEach((doc) => {
    const p = doc.data();

    lista.innerHTML += `
      <div>
        <p><b>${p.nome}</b> (${p.idade})</p>
        <p>${p.sintoma} - ${p.risco}</p>
        <hr>
      </div>
    `;
  });
};
