import React from "react";
import app from "../config/credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore(app);
const st = getStorage(app);

export default function Agregar({ correo, setArrayTareas, arrayTareas }) {
  let urlDescarga;
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const description = e.target.documento.value;
    console.log(description);
    //crear nuevo array de tareas
    const nuevoArrayTareas = [
      ...arrayTareas,
      {
        id: +new Date(),
        description: description,
        url: urlDescarga,
        // url: "https//picsum.photos/420",
      },
    ];
    //Actualizar bd
    const docuRef = doc(db, `usuarios/${correo}`);
    await updateDoc(docuRef, { tareas: [...nuevoArrayTareas] });

    // Actulizar el estado
    setArrayTareas(nuevoArrayTareas);
    //limpiar form
    e.target.documento.value = "";
  };
  const handlerFile = async (e) => {
    //Detectar archivo
    const archivo = e.target.files[0];
    //Cargar al storage
    const archivoRef = ref(st, `documentos/${archivo.name}`);
    await uploadBytes(archivoRef, archivo);
    //Obtener url
    urlDescarga = await getDownloadURL(archivoRef);
  };

  return (
    <>
      <div className="row mb-3">
        <form onSubmit={handlerSubmit}>
          <input
            type="text"
            placeholder="Nombre del documento"
            id="documento"
            required
          />
          <input
            type="file"
            placeholder="Selecione archivo"
            className="ms-5"
            onChange={handlerFile}
            required
          />
          <button className="btn btn-primary ms-5" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
}
