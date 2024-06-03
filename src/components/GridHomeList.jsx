import React, { useState } from 'react'
import "../App.css"
import { MdModeEdit } from 'react-icons/md'
import { IoCloseOutline } from "react-icons/io5";
import ModalCadastroUpdate from './ModalCadastroUpdate';


const GridHomeList = ({ cafe, getCafe }) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [closedRows, setClosedRows] = useState([]);


  const handleEdit = (item) => {
    setSelectedItem(item);
  }


  const handleToggleClose = (index) => {
    setClosedRows((prevClosedRows) => {
      if (prevClosedRows.includes(index)) {
        return prevClosedRows.filter((i) => i !== index);
      } else {
        return [...prevClosedRows, index];
      }
    });
  }

  const isRowClosed = (index) => {
    return closedRows.includes(index);
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-md class-table mt-10">
        <thead>
          <tr>
            <th></th>
            <th>Colaborador</th>
            <th>CPF</th>
            <th>Item</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cafe.map((item, i) => (
            <tr key={i} className={isRowClosed(i) ? 'closed-row' : ''}>
              <td></td>
              <td>{item.nome}</td>
              <td>{item.cpf}</td>
              <td>{item.items.map((item, i) => (
                <p key={i}>{item.nome}</p>
              ))}</td>
              <td>{item.data}</td>
              <td><MdModeEdit onClick={() => handleEdit(item)} /></td>
              <td><IoCloseOutline onClick={() => handleToggleClose(i)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <ModalCadastroUpdate onUpdate={selectedItem} setOnUpdate={setSelectedItem} getCafe={getCafe} />
      )}
    </div>


  )
}

export default GridHomeList