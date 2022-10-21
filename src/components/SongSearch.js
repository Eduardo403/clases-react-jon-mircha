import React, { useState, useEffect } from "react";
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import { helpHttp } from "../helpers/helpHttp";
import SongTable from "../pages/songTable";
import Loader from "./Loader";
import SongDetails from "./SongDetails";
import SongForm from "./SongForm";

let initeSong = JSON.parse(localStorage.getItem("mysong")) || [];

const SongSearch = () => {
  const [search, setSearch] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mySong, setMySong] = useState(initeSong);
  const [diseibol, setDiseibol] = useState(true);

  const handleSearch = (data) => {
    //console.log(data);
    setSearch(data);
  };

  useEffect(() => {
    if (search === null) return;

    const fetchData = async () => {
      const { artist, song } = search;

      let artistUrl = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
      let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`;

      //console.log(artistUrl, songUrl);

      setLoading(true);

      const [artistRes, songRes] = await Promise.all([
        helpHttp().get(artistUrl),
        helpHttp().get(songUrl),
      ]);

      // console.log(artistRes, songRes);

      setBio(artistRes);
      setLyric(songRes);
      setLoading(false);
      setDiseibol(false);
    };

    fetchData();
    localStorage.setItem("mysong", JSON.stringify(mySong));
  }, [search, mySong]);

  const handelSaveSong = () => {
    let confirFavorit = window.confirm("Desea Agregar a tus Favoritas");
    let currentSong = {
      search,
      bio,
      lyric,
    };
    if (!confirFavorit) {
      return false;
    } else {
      let songs = [...mySong, currentSong];
      setMySong(songs);
      localStorage.setItem("mysong", JSON.stringify(songs));
      setSearch(null);
      // console.log(mySong);
    }
  };

  const handelDeletSong = (id) => {
    // alert(`Eliminar el id:${id}`);

    let isDelete = window.confirm(`Desea eliminar esta de los favoritos `);

    if (!isDelete) {
      return false;
    } else {
      let songs = mySong.filter((el, index) => index !== id);
      setMySong(songs);
      localStorage.setItem("mysong", JSON.stringify(songs));
    }
  };

  return (
    <div>
      <HashRouter basename="canciones">
        <header>
          <h2>Song Search</h2>
          <Link to="/">Home</Link>
          <Link to="/detalles">Detlles</Link>
          <Link to="/favoritas">Favoritas</Link>
        </header>
        {loading && <Loader />}
        <article className="grid-1-3">
          <Switch>
            <Route exact path="/">
              <SongForm
                handleSearch={handleSearch}
                handelSaveSong={handelSaveSong}
                diseibol={diseibol}
              />
            </Route>
            <Route exact path="/detalles">
              {search && !loading && (
                <SongDetails search={search} lyric={lyric} bio={bio} />
              )}
            </Route>
            <Route exact path="/favoritas">
              <SongTable handelDeletSong={handelDeletSong} mySong={mySong} />
            </Route>
          </Switch>
        </article>
      </HashRouter>
    </div>
  );
};

export default SongSearch;
