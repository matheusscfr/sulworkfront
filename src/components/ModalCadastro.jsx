import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { IoMdAdd } from "react-icons/io";
import { toast } from 'react-toastify';


const Modal = ({ getColaborador, onEdit, setOnEdit }) => {

  const [formData, setFormData] = useState({ nome: '', cpf: '' });
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (onEdit) {

      formData.nome = onEdit.nome;
      formData.cpf = onEdit.cpf;
      openModal()
    }
  }, [onEdit])




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();


    if (onEdit) {
      let id = onEdit.id;
      await axios.put("https://sulworkback-production.up.railway.app/colaboradores/" + id, {
        nome: formData.nome,
        cpf: formData.cpf
      }).then(({ data }) => toast.success(data)).catch(({ data }) => toast.error(data));

      setFormData({ nome: '', cpf: '' })
      setIsOpen(false);
      getColaborador()
    } else {
      try {
        const response = await axios.post('https://sulworkback-production.up.railway.app/colaboradores', formData);
        toast.success(response.data);
        setFormData({ nome: '', cpf: '' });
        setIsOpen(false);
        getColaborador()
      } catch (error) {
        if (formData.cpf.length != 11) {
          toast.error("Insira um CPF de 11 digitos.")
        } else {
          toast.error('Error posting data:', error);
        }
      }
    }

    setOnEdit(null)
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setFormData({ nome: '', cpf: '' })
    setOnEdit(null)
    setIsOpen(false);
  }

  return (
    <>

      <button className="btn" onClick={openModal}>Cadastrar Colaborador</button>
      {isOpen && (
        <dialog id="my_modal_1" className="modal" open>
          <form className="modal-box flex flex-col gap-3" onSubmit={handleSubmit}>

            <h3 className="font-bold text-lg">{onEdit ? "Editar Colaborador" : "Adicionar Colaborador"}</h3>

            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2"
              onClick={closeModal}
            >✕</button>

            <label className="input input-bordered flex items-center gap-2">
              Colaborador

              <input
                type="text"
                name="nome"
                className="grow"
                placeholder=":"
                value={formData.nome}
                onChange={handleInputChange}
              />

            </label>
            <label className="input input-bordered flex items-center gap-2">
              CPF

              <input
                type="text"
                name="cpf"
                className="grow"
                placeholder=":"
                value={formData.cpf}
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

export default Modal;