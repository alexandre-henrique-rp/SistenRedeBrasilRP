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
               
          var titulo = vld + "  " + item.id + "  " + item.titulo; 
               
          


          return {
               title: titulo,
               id: item.id,
               start: new Date(ano, mes, dia, hora, minuto, segundo),
               end: new Date(endAno, endMes, endDia, horaFim, minutoFim, segundo),
               type: item.validacao,
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
                    eventPropGetter={(event, start, end, isSelected) => ({
                         event,
                         start,
                         end,
                         isSelected,
                         style: {
                              backgroundColor: event.type === "VIDEO CONF" ? "#8e24aa" : event.type === "EXTERNA" ? "#dff800" : event.type === "INTERNA" ? "#F55600" : event.type === "VIDEO INTERNA" ? "#026c1c" : event.type === "RENOV ONLINE" ? "#696969" : "#ffff",
                              
                              border: "1px solid",
                              borderColor: event.type === "VIDEO CONF" ? "#471255" : event.type === "EXTERNA" ? "#707C00" : event.type === "INTERNA" ? "#7B2B00" : event.type === "VIDEO INTERNA" ? "#01360E" : event.type === "RENOV ONLINE" ? "#353535" : "",
                              
                              color: event.type === "EXTERNA" ? "#000" : "#fff",
                         },
                    })}               
               />

          </div>
     )
}