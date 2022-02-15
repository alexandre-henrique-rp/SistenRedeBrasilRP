import './calendario.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';

import React, { useEffect, useState } from 'react';
import ptBR from 'date-fns/locale/pt-BR';
import axios from 'axios';



const locales = {
     "pt-BR": ptBR
}

const localizer = dateFnsLocalizer({
     format,
     parse,
     startOfWeek,
     getDay,
     locales,
})


export default function Calendario() {
     const [cliente, setCliente] = useState([])


     const clienteHttp = axios.create({
          baseURL: process.env.REACT_APP_POT
     });

     async function agendados() {
          clienteHttp.get('/agendados').then(function (response) {
               setCliente(response.data)
          });
     }
     const itensAgenda = cliente.map(function (item) {

          var dia = item.dt_agenda.substr(8, 2);
          var mes = item.dt_agenda.substr(5, 2) - "1";
          var ano = item.dt_agenda.substr(0, 4);
          var hora = item.hr_agenda.substr(0, 2);
          if (hora < 10) {
               return hora.replace("0",)
          };
          var minuto = item.hr_agenda.substr(3, 2);
          var segundo = '0';
          var endDia = dia;
          var endMes = mes;
          var endAno = ano;
          var dt = new Date(ano, mes, dia, hora, minuto, segundo);
          var ndt = new Date(ano, mes, dia, hora, minuto, segundo);
          ndt.setMinutes(dt.getMinutes() + 60);
          var horaFim = ndt.getHours();
          var minutoFim = ndt.getMinutes();
          let vld = item.validacao === "VIDEO CONF" ? "VC" : item.validacao === "INTERNA" ? "INT" : item.validacao === "EXTERNA" ? "EXT" : item.validacao === "VIDEO INTERNA" ? "VI" : item.validacao === "RENOV ONLINE" ? "RO" : "";
          let identifica = item.validacao === "VIDEO CONF" ? item.validacao : item.validacao === "INTERNA" ? item.validacao : item.validacao === "EXTERNA" ? item.validacao : item.validacao === "VIDEO INTERNA" ? item.validacao : item.validacao === "RENOV ONLINE" ? item.validacao : item.andamento;
          var titulo = vld + "  " + item.id + "  " + item.titulo + " " + item.obs_agenda; 
               
          return {
               title: titulo,
               id: item.id,
               start: new Date(ano, mes, dia, hora, minuto, segundo),
               end: new Date(endAno, endMes, endDia, horaFim, minutoFim, segundo),
               type: identifica,
          };

     });

     console.log(itensAgenda);



     useEffect(() => {
          agendados();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);


     return (
          <div className="container">
               <Calendar
                    localizer={localizer}
                    events={itensAgenda}
                    startAccessor={itensAgenda.start}
                    endAccessor={itensAgenda.end}
                    style={{ height: "90vh", margin: "50px", marginTop: "0" }}
                    onSelectEvent={(event) => window.open("https://redebrasilrp.com.br/fcw2/abrir_ficha.php?fc="+ event.id) }
                    eventPropGetter={(event, start, end, isSelected) => ({
                         event,
                         start,
                         end,
                         isSelected,
                         style: {
                              backgroundColor: event.type === "VIDEO CONF" ? "#8e24aa" : event.type === "EXTERNA" ? "#dff800" : event.type === "INTERNA" ? "#F55600" : event.type === "VIDEO INTERNA" ? "#026c1c" : event.type === "RENOV ONLINE" ? "#696969" : event.type === "RENOV ONLINE" ? "#696969" : event.type === "APROVADO" ? "#4c2bf1" : event.type === "EMITIDO" ? "#4c2bf1" : event.type === "INFORMACOES" ? "#fd2600" : "#ffff",
                              
                              border: event.type === " " ? "3px solid #000000" : "1px solid",
                    
                              borderColor: event.type === "VIDEO CONF" ? "#471255" : event.type === "EXTERNA" ? "#707C00" : event.type === "INTERNA" ? "#7B2B00" : event.type === "VIDEO INTERNA" ? "#01360E" : event.type === "RENOV ONLINE" ? "#353535" : event.type === "APROVADO" ? "#261679" : event.type === "EMITIDO" ? "#261679" : "#000",
                              
                              color: event.type === "VIDEO CONF" ? "#fff" : event.type === "EXTERNA" ? "#000" : event.type === "INTERNA" ? "#ffff" : event.type === "VIDEO INTERNA" ? "#ffff" : event.type === "RENOV ONLINE" ? "#ffff" : event.type === "APROVADO" ? "#ffff" : event.type === "EMITIDO" ? "#ffff" : event.type === "INFORMACOES" ? "#ffff" : "#000",
                         },
                    })}               
               />

          </div>
     )
}