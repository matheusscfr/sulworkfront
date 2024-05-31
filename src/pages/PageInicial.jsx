import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import GridHomeList from '../components/GridHomeList'
import ModalColaboradorItem from '../components/ModalColaboradorItem'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import ModalCadastroUpdate from '../components/ModalCadastroUpdate'


const PageInicial = () => {

const [colaborador, setColaborador] = useState([]);
const [onUpdate, setOnUpdate] = useState(null)
const [cafe, setCafe] = useState([])

  const getColaborador = async () => {
    try {
      const res = await axios.get("https://sulworkback-production.up.railway.app/colaboradores");
      setColaborador(res.data);
    } catch (error) {
      toast.error(error)
    }

}

const getCafe = async () => {

  try{
    const all = await axios.get("https://sulworkback-production.up.railway.app/itens-selecionados");

   if (JSON.stringify(all.data) !== JSON.stringify(cafe)) {
      setCafe(all.data);
    }
  }catch(error){
    toast.error(error)
  }

}

useEffect(() => {
  getColaborador()
  getCafe()
},[cafe])

  
  return (
    <div className="container h-screen">
        <h1 className='font-title ml-6'>Lista de Café da Manhã</h1>

        <div className="flex gap-5 mt-10">
            <Link to="/colaborador"><button className="btn btn-neutral">Cadastrar Colaborador</button></Link>
            <Link to="/itens"><button className="btn btn-neutral">Cadastrar Item </button></Link>
            <ModalColaboradorItem getColaborador={getColaborador} colaborador={colaborador} onUpdate={onUpdate} getCafe={getCafe} />
        </div>
    <GridHomeList cafe={cafe} setOnUpdate={setOnUpdate} getCafe={getCafe} />
    <ToastContainer autoClose={3000}/>
    </div>
  )
}

export default PageInicial