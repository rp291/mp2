import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import NavBar from './components/NavBar';
import PokemonGallery from './components/PokemonGallery';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        

        <Route path="/list" element={<PokemonList />} />
        <Route path="/gallery" element={<PokemonGallery />} />
        <Route path="/details/:pokemonId" element={<PokemonDetail />} />
        <Route path="/" element={<PokemonList />} />

      </Routes>
    </>
  );
}

export default App;
