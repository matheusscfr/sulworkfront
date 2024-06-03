import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ModalCadastroUpdate = ({ onUpdate, setOnUpdate, getCafe }) => {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState('');
  const [nomeUpdate, setNomeUpdate] = useState('');
  const [itemUpdate, setItemUpdate] = useState('');
  const [itens, setItens] = useState([])

  useEffect(() => {
    if (onUpdate) {
      openModal();
      getItens()
      setDataUpdate(onUpdate.data);
      setNomeUpdate(onUpdate.nome);
    }
  }, [onUpdate]);

  const getItens = async () => {

    try {
      const res = await axios.get("https://sulworkback-production.up.railway.app/itens?data=" + onUpdate.data);
      setItens(res.data)

    } catch (error) {
      toast.error(error)
    }

  }


  const openModal = () => setIsOpenUpdate(true);
  const closeModal = () => setIsOpenUpdate(false);

  const handleChangeData = (e) => setDataUpdate(e.target.value);
  const handleChangeNome = (e) => setNomeUpdate(e.target.value);
  const handleChangeItens = (e) => setItemUpdate(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let id = onUpdate.id;
    try {
      const response = await axios.put('https://sulworkback-production.up.railway.app/itens-selecionados/' + id, {
        nome: nomeUpdate,
        item: itemUpdate,
        dataCafe: dataUpdate
      });

      setOnUpdate(null)
      closeModal()
      getCafe()
    } catch (error) {
      toast.error(error);
    }
  }



  return (
    <>
      {isOpenUpdate && (
        <dialog id="my_modal_1" className="modal" open>
          <form className="modal-box flex flex-col gap-3" onSubmit={handleSubmit}>
            
            <h3 className="font-bold text-lg">O que você vai trazer?</h3>

            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2"
              onClick={closeModal}
            >
              ✕
            </button>

            <label>Qual dia você deseja participar?</label>

            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={dataUpdate}
              onChange={handleChangeData}
            />

            <label>Nome do Colaborador</label>

            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={nomeUpdate}
              onChange={handleChangeNome}
            />

            <label>Item que vai levar</label>

            <select className="select select-bordered w-full max-w-xs"
              value={itemUpdate}
              onChange={handleChangeItens}>

              <option disabled value="" selected>Itens</option>
              {itens.map((item, i) => (
                <option key={i} value={item.nome}>{item.nome}</option>
              ))
              }
            </select>

            <div className="modal-action">

              <button className="btn" type="submit">Confirmar</button>

            </div>
          </form>
        </dialog>
      )}
    </>
  );
};

export default ModalCadastroUpdate