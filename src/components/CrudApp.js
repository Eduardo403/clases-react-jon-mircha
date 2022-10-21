import React, { useState } from "react";
import { HashRouter, NavLink, Route, Switch } from "react-router-dom";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";

const initialDb = [
  {
    id: 1,
    name: "Seiya",
    constellation: "Pegaso",
  },
  {
    id: 2,
    name: "Shiryu",
    constellation: "Dragón",
  },
  {
    id: 3,
    name: "Hyoga",
    constellation: "Cisne",
  },
  {
    id: 4,
    name: "Shun",
    constellation: "Andrómeda",
  },
  {
    id: 5,
    name: "Ikki",
    constellation: "Fénix",
  },
];

const CrudApp = () => {
  const [db, setDb] = useState(initialDb);
  const [dataToEdit, setDataToEdit] = useState(null);

  const createData = (data) => {
    data.id = Date.now();
    //console.log(data);
    setDb([...db, data]);
  };

  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );

    if (isDelete) {
      let newData = db.filter((el) => el.id !== id);
      setDb(newData);
    } else {
      return;
    }
  };

  return (
    <div>
      <HashRouter basename="santos">
        <NavLink to="/editar" activeClassName="active">
          Editar
        </NavLink>
        <NavLink to="/agregar" activeClassName="active">
          Agregra
        </NavLink>
        <NavLink to="/" activeClassName="active">
          Santos
        </NavLink>
        <Switch>
          <Route exact path="/editar">
            <CrudForm
              createData={createData}
              updateData={updateData}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
            />
          </Route>
          <Route exact path="/agregar">
            <CrudForm
              createData={createData}
              updateData={updateData}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
            />
          </Route>
          <Route exact path="/">
            <h2>CRUD App</h2>
            <article className="grid-1-2">
              <CrudTable
                data={db}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            </article>
          </Route>
          <Route path="*" children="Not found" />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default CrudApp;
