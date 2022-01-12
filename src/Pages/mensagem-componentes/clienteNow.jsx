/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function ClienteNow() {
  const [clienteNow, setClienteNow] = useState([])


  const clienteHttp = axios.create({
    baseURL: 'http://localhost:3004/'
  });

  async function obterClienteNow() {
    clienteHttp.get('/cliente-now').then(function (response) {
      setClienteNow(response.data)
    });
  }

  function enviarMensagem() {

    
    clienteNow.forEach(function (item, index) {
      setTimeout(function () {

        let dia = ": *HOJE*"
        let smsScript = "Prezado Cliente \n \nEstamos entrando em contato para informar que o seu Certificado digital \nModelo: *" + item.tipoCD + ". - " + item.titulo + ",*\n*" + item.titulo_doc + "* \nExpira " + dia + "          " + item.vctoCD.substr(8, 2) + "/" + item.vctoCD.substr(5, 2) + "/" + item.vctoCD.substr(0, 4) + "            \nfc:" + item.id + "       \n \nNão deixe para a última hora, Entre em contato agora          \npelo WhatsApp (16) 3325-4134 e renove o seu certificado.          \nAtenciosamente Equipe Rede Brasil Rp";
        
        // clienteHttp.post('/send/whatsapp', { telefone: item.telefone, smg: smsScript }).then(function (response) {
        //   console.log(response.data)
        // });
        const requestOptionsDefault = {
          headers: {
            "access-token": "60de0c8bb0012f1e6ac5546b",
            "Content-Type": "application/json"
          },
          redirect: 'follow'
        };
        axios.post("https://api.zapstar.com.br/core/v2/api/chats/send-text", JSON.stringify({
          "number": 55 + item.telefone,
          // "number": 55169898247675,
          "message": smsScript,
          "forceSend": true,
          "verifyContact": false
        }), requestOptionsDefault)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error.mensagem)
            console.log(item.telefone)
          });
      }, index * 20000);
      console.log("concluído")
    });
    clienteNow.forEach(function (item) {

      let dia = ": HOJE"

      clienteHttp.post('/send/email', { email: item.email, tipoCD: item.tipoCD, titulo: item.titulo, dia: dia, vctoCD: item.vctoCD, titulo_doc: item.titulo_doc, id: item.id }).then(function (response) {
        console.log(response.data)
      });
    });
    console.log('concluído')
  }

  

  useEffect(() => {
    obterClienteNow();
  }, []);

  return (
    <div className="card">
      <div className="item">
        <p>Hoje:
          <p>
            {clienteNow.length} para entrar em contato
          </p>
          <button className="BTM-ok" type="button" onClick={enviarMensagem}>ENTRAR EM CONTATO</button>
        </p>
      </div>
    </div>
  )
}