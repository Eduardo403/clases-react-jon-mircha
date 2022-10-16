import logo from "./logo.svg";
import "./App.css";
import CrudApp from "./components/CrudApp";
import CrudApi from "./components/CrudApi";
import CrudForm from "./components/CrudForm";
import SongSearch from "./components/SongSearch";

function App() {
  return (
    <div className="App">
      <hr />
      <CrudApp />
      <hr />
      <CrudApi />
      <hr />
      <CrudForm />
      <hr />
      <SongSearch />
    </div>
  );
}

export default App;
