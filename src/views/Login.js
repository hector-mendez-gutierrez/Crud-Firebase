import React, { useState } from "react";
import app from "../config/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);

export default function Login() {
  const [registro, setRegistro] = useState(false);
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  const handlerChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (registro) {
      await createUserWithEmailAndPassword(
        auth,
        usuario.email,
        usuario.password
      );
    } else {
      await signInWithEmailAndPassword(auth, usuario.email, usuario.password);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <form onSubmit={handlerSubmit}>
              <h1> {registro ? "Registro" : "Iniciar sesión"}</h1>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handlerChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handlerChange}
                />
              </div>

              <button type="submit" className="btn btn-primary col-12">
                {registro ? "Registrate" : "Iniciar sesión"}
              </button>
            </form>
            <button
              onClick={() => setRegistro(!registro)}
              className="btn btn-info mt-3"
            >
              {registro ? "¿Ya tienes Cuenta?" : " ¿No tienes cuenta?"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
