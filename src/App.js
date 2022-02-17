import React, { useState } from "react";
import app from "./config/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Home from "./views/Home";
import Login from "./views/Login";

const auth = getAuth(app);

export default function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  //Escucha los cambios, si inicio sesion o cerro sesion
  onAuthStateChanged(auth, (usuario) => {
    //Detectar cambios de sesion
    if (usuario) {
      //Inicio sesion
      setUsuarioGlobal(usuario);
    } else {
      //No hay sesion
      setUsuarioGlobal(null);
    }
  });
  return (
    <>{usuarioGlobal ? <Home correo={usuarioGlobal.email} /> : <Login />}</>
  );
}
