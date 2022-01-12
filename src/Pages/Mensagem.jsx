import React from 'react';
// import {Link} from 'react-router-dom';
import Cliente30 from './mensagem-componentes/cliente30';
import Cliente15 from './mensagem-componentes/cliente15';
import Cliente10 from './mensagem-componentes/cliente10';
import Cliente05 from './mensagem-componentes/cliente05';
import Cliente01 from './mensagem-componentes/cliente01';
import ClienteNow from './mensagem-componentes/clienteNow';
import './mensagem-componentes/cliente.css'

export default function Mensagem() {

  return (
    <div className="container-mensagem">
      <div>
        <div>
          <div>
            <h3>Ha vencer</h3>
            <div>
              <p>Alerta de cliente com vencimento proximo</p>
            </div>
            <div className="header-mensagem">
              <button className="BTM-regular-ok" type="button">comunicado geral</button>
              {/* <Link href="/Lista"> */}
              <button className="BTM-regular-ok" type="button">Aniversariante do mês</button>
              {/* </Link> */}
              <button className="BTM-regular-ok" type="button">aviso aos parceiros</button>
              {/* </Link> */}
            </div>
            <div className="cliente">
              <ClienteNow />
              <Cliente01 />
              <Cliente05 />
              <Cliente10 />
              <Cliente15 />
              <Cliente30 />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}