import React, { useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';


const ModalCadastroItem = ({ getItens }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('https://sulworkback-production.up.railway.app/itens', formData);
      console.log('Response:', response.data);
      setFormData({ nome: '' });

      toast.success("Item do café cadastrado com sucesso.")
      getItens()
    } catch (error) {
      toast.error('Error posting data:', error);
    }
    setIsOpen(false);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <button className="btn btn-primary  mt-10" onClick={openModal}>Cadastrar itens</button>
      {isOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <form className="modal-box flex flex-col gap-3" onSubmit={handleSubmit}>
            
            <h3 className="font-bold text-lg">Adicionar Item</h3>

            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2"
              onClick={closeModal}
            >✕</button>

            <label className="input input-bordered flex items-center gap-2">
              Nome

              <input
                type="text"
                name="nome"
                className="grow"
                placeholder=":"
                value={formData.nome}
                onChange={handleInputChange}
              />

            </label>
            <div className="modal-action">

              <button className="btn" type="submit">Confirmar</button>

            </div>
          </form>
        </dialog>
      )}
    </>
  )
}

export default ModalCadastroItem