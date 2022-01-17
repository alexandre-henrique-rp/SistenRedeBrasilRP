/* eslint-disable no-undef */
import React from 'react'
import { useEffect, useState } from 'react';




export default function Lista() {
  const [cliente, setCliente] = useState([])


  async function obterCliente() {
    const resp = await fetch(process.env.REACT_APP_POT)
    const dados = await resp.json()
    setCliente(dados);
  }

  const itensDb = cliente.map(function (item) {


    return (

      < tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.vctoCD}</td>
        <td>{item.tipocd}</td>
        <td>{item.telefone}</td>
        <td>{item.titulo}</td>
        <td>{item.titulo-doc}</td>
        <button onClick={function () { apagarClient(item.id) }}>Apagar</button>
      </tr >

    );
  });
  console.log(cliente)

  useEffect(() => {
    obterCliente();
  }, []);


  return (
    <div>
      <div>
        <h1>total de chamados</h1>
        <p>{cliente.length}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Ficha</th>
            <th>Data de vencimento</th>
            <th>Tipo de certificado</th>
            <th>Tel</th>
            <th>Nome/Razão</th>
            <th>CPF/CNPJ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itensDb}
        </tbody>
      </table>
      <h1>oi</h1>

    </div>
  )
}
