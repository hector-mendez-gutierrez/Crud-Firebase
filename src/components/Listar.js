import React from "react";
import app from "../config/credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";

const db = getFirestore(app);

export default function Listar({ arrayTareas, correo, setArrayTareas }) {
  const eliminarTarea = async (idTarea) => {
    //crear nuevo array de tareas
    const newArrayTarea = await arrayTareas.filter(
      (tarea) => tarea.id !== idTarea
    );
    //actualizar bd
    const docuRef = doc(db, `usuarios/${correo}`);
    await updateDoc(docuRef, { tareas: [...newArrayTarea] });
    //actualizar el state
    setArrayTareas(newArrayTarea);
  };

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Ver</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {arrayTareas.map((tarea, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{tarea.description}</th>
                <th>
                  <a href={tarea.url}>
                    <button className="btn btn-info">Ver documento</button>
                  </a>
                </th>
                <th>
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminarTarea(tarea.id)}
                  >
                    Eliminar Tarea
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
