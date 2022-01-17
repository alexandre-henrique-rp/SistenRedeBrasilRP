/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/anchor-is-valid */

import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import LOGO2 from './img/LOGO 2.svg';
import Login from './Login';
import Mensagem from './Pages/Mensagem';
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoMailOpenOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { AiOutlineLogin } from "react-icons/ai";


function App() {

  return (
    <Router>
      <div className="container">
        <nav className="menu">
          <div className="menu-logo">
            <img src={LOGO2} className="logo" alt="Rede Brasil RP" />
          </div>
          <div className="menu-link">
            <div className="menu-link-li">
              <Link to="/" className="linkMenu"><IoHomeOutline /><a>Dashboard</a></Link>
            </div>
            <div className="menu-link-li">
              <Link to="/" className="linkMenu"><HiOutlineClipboardList /><a>Clientes</a></Link>
            </div>
            <div className="menu-link-li">
              <Link to="/" className="linkMenu"><IoPersonAddOutline /><a>Novo registro</a></Link>
            </div>
            <div className="menu-link-li">
              <Link to="/" className="linkMenu"><IoCalendarOutline /><a>Agenda</a></Link>
            </div>
            <div className="menu-link-li">
              <Link to="/mensagem" className="linkMenu"><IoMailOpenOutline /><a>Notificar Cliente</a></Link>
            </div>
            <div className="menu-link-li">
              <Link to="/login" className="linkMenu"><AiOutlineLogin /><a>Login</a></Link>
            </div>
          </div>

        </nav>
        <div className="conteudo">
          <Switch>
            <Route path="/" exact>

            </Route>
            <Route path="/criar" exact>

            </Route>
            <Route path="/mensagem" exact>
              <Mensagem />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
          </Switch>

        </div>
      </div>
    </Router>
  );
  
}

export default App;
