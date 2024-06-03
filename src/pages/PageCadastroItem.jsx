import React, { useEffect, useState } from 'react'
import ModalCadastroItem from '../components/ModalCadastroItem';
import axios from 'axios';
import { toast } from 'react-toastify';
import GridItens from '../components/GridItens';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';


const PageCadastroItem = () => {


  const [item, setItem] = useState([]);


  const getItens = async () => {
    const data = new Date();

    try {
      const res = await axios.get("https://sulworkback-production.up.railway.app/itens?data=" + data.toLocaleDateString());
      setItem(res.data)

    } catch (error) {
      toast.error(error)
    }

  }

  useEffect(() => {
    getItens()
  }, [item])


  return (
    <div className='container'>
      <div className="flex gap-5 ">
        <div style={{ marginRight: '10%', marginTop: '1%', cursor: 'pointer' }}>
          <Link to="/">
            <IoIosArrowBack size={30} />
          </Link>
        </div>
        <h1 className='font-title'>Cadastro de Itens do Café</h1>
      </div>
      <ModalCadastroItem getItens={getItens} />
      <GridItens itens={item} getItens={getItens} />
    </div>
  )
}

export default PageCadastroItem