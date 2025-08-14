import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Gestión de Reparaciones</h1>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/orderRegistration">Creación de órdenes</Link>
        <Link to="/orders">Gestión de órdenes</Link>
        <Link to="/technicians">Técnicos</Link>
      </div>
    </nav>
  );
}

export default Navbar;
