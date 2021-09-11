import "./style.sass";
import logoPath from "./assets/logo.svg";
import telIconPath from "./assets/tel-icon.svg";
import mailIconPath from "./assets/mail-icon.svg";
import devicesPath from "./assets/devices.svg";
import bubble1Path from "./assets/bubble1.svg";
import bubble2Path from "./assets/bubble2.svg";
import LoginButton from "../Authorization/LoginButton";

const WebPreview = () => (
  <main className="container">
    <div className="column column-left">
      <img className="logo" src={logoPath} alt="Syncoli logo" />
      <h1 className="title">
        Vyvíjíme novou sféru efektivity v offline distribuci informací
      </h1>
      <h2 className="subtitle">
        Webová stránka je ve výstavbě
        <br />
        <br />
        <LoginButton />
      </h2>

      <div className="social">
        <img src={telIconPath} alt="Syncoli Facebook" />
        <a href="tel:+420774020239">+420 774 020 239</a>
      </div>
      <div className="social">
        <img src={mailIconPath} alt="Syncoli Email" />
        <a href="mailto:app@syncoli.com">app@syncoli.com</a>
      </div>
    </div>
    <div className="column column-right">
      <img src={devicesPath} alt="Smart Devices" />
    </div>
    <div className="bubble-container">
      <img className="bubble bubble-1" src={bubble1Path} alt="Bubble 1" />
      <img className="bubble bubble-2" src={bubble2Path} alt="Bubble 2" />
    </div>
  </main>
);

export default WebPreview;
