import './App.css'
import React from "react";
import PageCadastroColaborador from "./pages/PageCadastroColaborador.jsx";
import 'react-toastify/dist/ReactToastify.css'
import PageCadastroItem from './pages/PageCadastroItem.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageInicial from './pages/PageInicial.jsx';
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PageInicial/>}/>
          <Route path='/colaborador' element={<PageCadastroColaborador/>}/>
          <Route path='/itens' element={<PageCadastroItem/>}/>
      </Routes>

      </BrowserRouter>
      <ToastContainer position='top-right' autoClose={3000}/>
    </>
  )
}

export default App
