import React, { useEffect, useState } from "react";
import app from "../config/credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import Agregar from "../components/Agregar";
import Listar from "../components/Listar";

const auth = getAuth(app);
const db = getFirestore(app);

export default function Home({ correo }) {
  // console.log(correo);
  const [arrayTareas, setArrayTareas] = useState(null);
  const falsas = [
    { id: 1, description: "Tarea falsa 1", url: "https://picsum.photos/420" },
    { id: 2, description: "Tarea falsa 2", url: "https://picsum.photos/420" },
    { id: 3, description: "Tarea falsa 3", url: "https://picsum.photos/420" },
  ];

  const crearDocumento = async (idDocumento) => {
    //Crear referencia al documento
    const docuRef = doc(db, `usuarios/${idDocumento}`);
    //buscar documento
    const consulta = await getDoc(docuRef);
    //revisar si existe el documento
    if (consulta.exists()) {
      //si existe
      const infoDocu = consulta.data();
      return infoDocu.tareas;
    } else {
      //no existe
      await setDoc(docuRef, { tareas: [...falsas] });
      const infoDocu = consulta.data();
      return infoDocu.tareas;
    }
  };
  useEffect(() => {
    const obtenerTareas = async () => {
      const tareas = await crearDocumento(correo);
      setArrayTareas(tareas);
    };
    obtenerTareas();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <h5>Bienvenido al crud</h5>
          <button
            className="btn btn-secondary col-2 mb-3"
            onClick={() => {
              signOut(auth);
            }}
          >
            Cerrar Sesión
          </button>
          <hr />
          <div className="col">
            <Agregar
              arrayTareas={arrayTareas}
              setArrayTareas={setArrayTareas}
              correo={correo}
            />
          </div>
          <hr />
          <div className="col">
            {arrayTareas ? (
              <Listar
                arrayTareas={arrayTareas}
                setArrayTareas={setArrayTareas}
                correo={correo}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
