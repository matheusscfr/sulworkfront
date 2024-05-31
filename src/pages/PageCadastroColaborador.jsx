import React, { useEffect, useState } from 'react'
import '../App.css'
import Modal from '../components/ModalCadastro'
import Grid from '../components/Grid'
import axios from 'axios'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const PageCadastroColaborador = () => {

    const [colaborador, setColaborador] = useState([]);
    const [onEdit, setOnEdit] = useState(null);

    const getColaborador = async () => {
        try {
          const res = await axios.get("https://sulworkback-production.up.railway.app/colaboradores");
          setColaborador(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)));
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
        getColaborador();
      }, [setColaborador])
    

  return (
    <div className="container">
      <div className="flex w-full mb-10">
        <div style={{  marginRight: '10%', cursor: 'pointer',  marginTop:'1%' }}>
          <Link to="/">
        <IoIosArrowBack size={30 }/>
        </Link>
        </div>
        <h1 className='font-title'>Cadastro de Colaborador</h1>
        </div>
        <Modal getColaborador={getColaborador} onEdit={onEdit} setOnEdit={setOnEdit}/>
        <Grid colaborador={colaborador} setColaborador={setColaborador} getColaborador={getColaborador} setOnEdit={setOnEdit}/>

        <ToastContainer position='top-right' autoClose={3000}/>
    </div>
  )
}

export default PageCadastroColaborador