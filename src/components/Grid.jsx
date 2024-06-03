import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../App.css"
import { MdModeEdit } from "react-icons/md";


const Grid = ({ colaborador, setOnEdit }) => {

  const handleEdit = (item) => {
    setOnEdit(item);
  }

  return (
    <>

      <table className="table-lg class-table">
        <thead>
          <tr className='prose-stone'>
            <th>Colaborador</th>
            <th>CPF</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {colaborador.map((item, i) => (
            <tr key={i}>

              <td>{item.nome}</td>
              <td>{item.cpf}</td>
              <td><MdModeEdit onClick={() => handleEdit(item)} /></td>
            </tr>
          ))}

        </tbody>
      </table>

    </>
  )
}

export default Grid