import {Route, Routes } from "react-router-dom";
import SearchBox from './containers/SearchBox.tsx';
import './App.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<SearchBox/>} />
      </Routes>
    </>
  );
};

export default App;