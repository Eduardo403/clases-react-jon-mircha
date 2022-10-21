import React from "react";
import { useHistory } from "react-router-dom";
const SongTableRow = ({ el, id, handelDeletSong }) => {
  console.log(el);
  let history = useHistory();
  return (
    <tr>
      <td>
        <img src={el.bio.strArtistBanner} alt={el.bio.strArtist} />
      </td>
      <td>{el.search.artist}</td>
      <td>{el.search.song}</td>
      <td>
        <button onClick={() => history.push("/detalles")}>Ver</button>
        <button onClick={() => handelDeletSong(id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default SongTableRow;
