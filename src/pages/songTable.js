import React from "react";
import SongTableRow from "../components/songTableRow";
const SongTable = ({ handelDeletSong, mySong }) => {
  return (
    <>
      <h2>table</h2>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Artista</th>
            <th>Canciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mySong.length > 0 ? (
            mySong.map((el, index) => (
              <SongTableRow
                key={index}
                el={el}
                id={index}
                handelDeletSong={handelDeletSong}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4"> sin canciones agregadas </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default SongTable;
