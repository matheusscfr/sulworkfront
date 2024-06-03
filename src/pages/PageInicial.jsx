import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import GridHomeList from '../components/GridHomeList'
import ModalColaboradorItem from '../components/ModalColaboradorItem'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'



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

    try {
      const all = await axios.get("https://sulworkback-production.up.railway.app/itens-selecionados");

      if (JSON.stringify(all.data) !== JSON.stringify(cafe)) {
        setCafe(all.data);
      }
    } catch (error) {
      toast.error(error)
    }

  }

  useEffect(() => {
    getColaborador()
    getCafe()
  }, [cafe])


  return (
    <div className="container h-screen">
      <h1 className='font-title ml-6'>Lista de Café da Manhã</h1>

      <div className="flex gap-5 mt-10">
        <Link to="/colaborador"><button className="btn btn-neutral">Cadastrar Colaborador</button></Link>
        <Link to="/itens"><button className="btn btn-neutral">Cadastrar Item </button></Link>
        <ModalColaboradorItem  colaborador={colaborador}  getCafe={getCafe} />
      </div>
      <GridHomeList cafe={cafe} setOnUpdate={setOnUpdate} getCafe={getCafe} />

    </div>
  )
}

export default PageInicial