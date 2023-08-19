import React from 'react';
import { useForm } from 'react-hook-form';
import './App.css'


function App() {

  // Inicializa o React Hook Form
  const {register, handleSubmit, setValue, setFocus} = useForm();

  // Função chamada quando o formulário é submetido
  const onSubmit = (e) => {
    console.log(e);
  }

  // Função para verificar o CEP e preencher os campos de endereço
  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');  // Remove caracteres não numéricos do CEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json()).then(data => {
        setValue('rua', data.logradouro); // Preenche o campo de rua com o logradouro do CEP
        setValue('bairro', data.bairro);
        setValue('cidade', data.localidade);
        setValue('uf', data.useForm);
        setFocus('numero');
    })
  }

  return (
    <>
      <div className="App">
        <div className='form-control-group'>
        <form onSubmit={handleSubmit(onSubmit)}> 
          <div className='form-control-group'>
              <label>CEP</label>
              <input type="text" {...register("cep")} onBlur={checkCEP}/>
          </div>
          <div className='form-control-group'>
              <label>Rua</label>
              <input type="text" {...register("rua")}/>
          </div>
          <div className='form-control-group'>
              <label>Numero</label>
              <input type="text" {...register("numero")}/>
          </div>
          <div className='form-control-group'>
              <label>Complemento</label>
              <input type="text" {...register("complemento")}/>
          </div>
          <div className='form-control-group'>
              <label>Bairro</label>
              <input type="text" {...register("bairro")}/>
          </div>
          <div className='form-control-group'>
              <label>Cidade</label>
              <input type="text" {...register("cidade")}/>
          </div>
          <div className='form-control-group'>
              <label>Estado</label>
              <input type="text" {...register("uf")}/>
          </div>
          
          <button type='submit'>Enviar</button>
        </form>
        </div>
      </div>
    </>
  )
}

export default App
