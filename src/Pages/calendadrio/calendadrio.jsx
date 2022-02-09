import './calendario.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import 'react-big-calendar/lib/css/react-big-calendar.css';
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

// const events = [
//      {
//           title: "Big calendar",
//           allDay: true,
//           start: new Date(2022, 1, 7),
//           end: new Date(2022, 1, 7),

//      },
//      {
//           title: "reunião",
//           start: new Date(2022, 1, 7),
//           end: new Date(2022, 1, 7)
//      },
//      {
//           title: "Conferencia ",
//           start: new Date(2022, 1, 7),
//           end: new Date(2022, 1, 7)
//      },
// ];





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
          // var link = $("")
          function validacao() {
               var vld = item.validacao
               if (vld === "VIDEO CONF") {
                    return <div className="rbc-event" style={{ backgroundColor: "#8e24aa"}} />;
               } else if (vld === "EXTERNA") {
                    return <div className="rbc-event" style={{ backgroundColor: "#f6bf26" }} />;
               
               }
          }
          
          var titulo = item.id + ' ' + item.titulo; 
               
          


          return {
               title: titulo,
               start: new Date(ano, mes, dia, hora, minuto, segundo),
               end: new Date(endAno, endMes, endDia, horaFim, minutoFim, segundo),
               backgroundEvents:validacao()

          };

     });

     console.log(itensAgenda);



     useEffect(() => {
          agendados();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);


     return (
          <div className="container">
               <Calendar localizer={localizer} events={itensAgenda} startAccessor={itensAgenda.start} endAccessor={itensAgenda.end} style={{ height: "90vh", margin: "50px", marginTop: "0"}} />

          </div>
     )
}