import { ReactComponent as Flagship } from "../../icons/flagship.svg";
import { State, Status } from "../../types/Status";
import Button from "../Button";
import "./style.css";

interface HeaderProps {
  ready: boolean;
  status?: Status | null;
  onDisconnect: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = ({
  ready,
  status,
  onDisconnect
}: HeaderProps) => (
  <header>
    <a href="https://www.gelato.network/" className="logo">
      <Flagship />
    </a>
    <div className="links">
      <a href="https://www.gelato.network/blog">Blog</a>
      <a href="https://github.com/gelatodigital">GitHub</a>
      <a href="https://docs.gelato.network">
        Documentation
      </a>
    </div>

    {status?.state == State.success && (
      <button  onClick={onDisconnect} className="btn bg-connect-button">
        <span>
         Disconnect
        </span>
      </button>
    )}
  </header>
);

export default Header;
