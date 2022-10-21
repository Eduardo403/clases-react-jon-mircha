import React from "react";
import { useHistory } from "react-router-dom";

const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { name, constellation, id } = el;
  let history = useHistory();
  const HandelEdit = () => {
    setDataToEdit(el);
    history.push("/editar");
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{constellation}</td>
      <td>
        <button onClick={HandelEdit}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default CrudTableRow;
