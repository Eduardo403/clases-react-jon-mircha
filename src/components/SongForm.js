import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const initialForm = {
  artist: "",
  song: "",
};

const SongForm = ({ handleSearch, handelSaveSong, diseibol }) => {
  const [form, setForm] = useState(initialForm);

  let history = useHistory();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.artist || !form.song) {
      alert("Datos Incompletos");
      return;
    }

    handleSearch(form);
    setForm(initialForm);

    history.push("/detalles");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="artist"
          placeholder="Nombre del Intérprete"
          onChange={handleChange}
          value={form.artist}
        />
        <input
          type="text"
          name="song"
          placeholder="Nombre de la Canción"
          onChange={handleChange}
          value={form.song}
        />
        <input type="submit" value="Enviar" />
        <input
          type="button"
          value="Agregra Favoritas"
          onClick={handelSaveSong}
          disabled={diseibol && "disabled"}
        />
      </form>
    </div>
  );
};

export default SongForm;
