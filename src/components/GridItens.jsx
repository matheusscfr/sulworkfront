import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../App.css"
import { IoCloseOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';


const GridItens = ({ itens, getItens }) => {

  const deleteItem = async (id) => {
    await axios.delete("https://sulworkback-production.up.railway.app/itens/" + id).then(({ data }) => {
      getItens()
      toast.success(data)
    }).catch(({ data }) => toast.error(data))
  }

  return (
    <>

      <table className="table-lg class-table  mt-10">
        <thead>
          <tr className='prose-stone'>
            <th>Itens do Café</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item, i) => (
            <tr key={i}>
              <td>{item.nome}</td>
              <td><IoCloseOutline onClick={() => deleteItem(item.id)} /></td>
            </tr>
          ))}

        </tbody>
      </table>

    </>
  )
}

export default GridItens