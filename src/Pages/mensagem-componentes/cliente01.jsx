/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './cliente.css';



export default function Cliente01() {
  const [cliente01, setCliente01] = useState('')

  const clienteHttp = axios.create({
    baseURL: process.env.REACT_APP_POT
  });

  async function obterCliente01() {
    clienteHttp.get('/cliente-1').then(function (response) {
      setCliente01(response.data)
    });
  }


  function enviarMensagem() {
    cliente01.forEach(function (item, index) {
      setTimeout(async function () {
        var dia = "em: *1 dia*";
        var smsScript = "Prezado Cliente \n \nEstamos entrando em contato para informar que o seu Certificado digital \nModelo: *" + item.tipoCD + ". - " + item.titulo + ",*\n*" + item.titulo_doc + "* \nExpira " + dia + "          " + item.vctoCD.substr(8, 2) + "/" + item.vctoCD.substr(5, 2) + "/" + item.vctoCD.substr(0, 4) + "            \nfc:" + item.id + "       \n \nNão deixe para a última hora, Entre em contato agora          \npelo WhatsApp (16) 3325-4134 e renove o seu certificado.          \nAtenciosamente Equipe Rede Brasil Rp"

        const ref = item.id;
        const log = item.telefone;

        function regError() {
          clienteHttp.post('/log-error', { log: log, ref: ref });
        }

        const requestOptionsDefault = {
          headers: {
            "access-token": process.env.REACT_APP_TOKEN,
            "Content-Type": process.env.REACT_APP_TYPE
          },
          redirect: 'follow'
        };
        axios.post(process.env.REACT_APP_URL_API, JSON.stringify({
          "number": 55 + item.telefone,
          // "number": process.env.REACT_APP_TEST,
          "message": smsScript,
          "forceSend": true,
          "verifyContact": false
        }), requestOptionsDefault)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.error(error.message)
            console.log(item.telefone)
            regError()
          });
      }, index * 20000);
      console.log("concluído")
    });
    cliente01.forEach(function (item) {
      let dia = "em: 1 dia  ";
      clienteHttp.post('/send/email', { email: item.email, tipoCD: item.tipoCD, titulo: item.titulo, dia: dia, vctoCD: item.vctoCD, titulo_doc: item.titulo_doc, id: item.id }).then(function (response) {
        console.log(response.data)
      });
    });
    console.log('concluído')
  }


  useEffect(() => {
    obterCliente01();
  }, []);

  return (
    <div className="card">
      <div className="item">
        <p>
          1 dias:
          <p> {cliente01.length} para entrar em contato</p>
          <button className="BTM-ok" type="button" onClick={enviarMensagem}>ENTRAR EM CONTATO</button>
        </p>
      </div>
    </div>
  )
}