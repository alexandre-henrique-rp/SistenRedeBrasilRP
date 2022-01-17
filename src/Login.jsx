import './Login.css';
import LOGO from '../public/LOGO.svg';

function Login() {
  return (
    <div className="container-login">
      <div className="main-login">
        <div className="left-login">
          <img src={LOGO} className="logo" alt="Rede Brasil RP" />
        </div>
        <div className="right-login">
          <div className="card-login">
            <h1>LOGIN</h1>
            <div className="textfield">
              <label for="usuario">Usuário</label>
              <input type="text" name="usuario" placeholder="Usuário" />
            </div>
            <div className="textfield">
              <label for="senha">Senha</label>
              <input type="password" name="senha" placeholder="Senha" />
            </div>
          <button className="BTM_Login">Login</button>
          </div>      
        </div>
      </div>
    </div>
  );
}

export default Login;
