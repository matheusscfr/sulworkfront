import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'

const ModalColaboradorItem = ({ getColaborador, colaborador, onEdit, getCafe }) => {

    const [isOpen, setIsOpen] = useState(false);

    const [itens, setItens] = useState([])
    const [optionColaborador, setOptionColaborador] = useState('');
    const [optionItem, setOptionItem] = useState('');

    const dateToday = () => {
        const data = new Date();
        return data.toLocaleDateString()
    }



    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);


    const handleChangeColaborador = (event) => {
        setOptionColaborador(event.target.value);
    };

    const handleChangeData = (event) => {
        setData(event.target.value);
    };

    const handleChangeItens= (event) => {
        setOptionItem(event.target.value);
    };
    
    const [data, setData] = useState(dateToday);



    const getItens = async () => {
  
          try{
              const res = await axios.get("https://sulworkback-production.up.railway.app/itens?data="+ data);
              setItens(res.data)
              
          }catch(error){
              toast.error(error)
          }
  
      }

  
      useEffect(() => {
        getItens()

      }, [data]) 
      
      

      
  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const response = await axios.post('https://sulworkback-production.up.railway.app/itens-selecionados', {
        nome: optionColaborador,
        item: optionItem,
        dataCafe: data
      });
      toast.success("Confirmado no café da manhã");
      getItens()
      getCafe()
      setIsOpen(false);
    } catch (error) {
      toast.error( error);
    }
  

  };

    return (
        <>
            <button className="btn btn-accent" onClick={openModal}>Participar do Café</button>
            {isOpen && (
                <dialog id="my_modal_1" className="modal" open>
                    <form className="modal-box flex flex-col gap-3" onSubmit={handleSubmit}>

                        
                        <h3 className="font-bold text-lg">O que você vai trazer?</h3>



                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-2"
                            onClick={closeModal}
                        >✕</button>



                        <label>Qual dia você deseja participar?</label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={data} onChange={handleChangeData}/>

                        <label>Nome do Colaborador</label>
                        <select className="select select-bordered w-full max-w-xs"
                            value={optionColaborador}
                            onChange={handleChangeColaborador}> 

                            <option disabled value="" selected>Colaborador</option>
                            {colaborador.map((item, i) => (
                                <option key={i} value={item.nome}>{item.nome}</option>
                            ))
                            }
                        </select>
                        
                        <label>Item que vai levar</label>
                        <select className="select select-bordered w-full max-w-xs"
                            value={optionItem}
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
    )
}

export default ModalColaboradorItem