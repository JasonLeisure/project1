import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
      <ul className="navbar-nav mb-2 mb-lg-0 flex-wrap">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <NavLink className="nav-link text-white" to="manufacturers/">Manufacturers</NavLink>
        <NavLink className="nav-link text-white" to="manufacturers/create/">Create a Manufacturer</NavLink>
        <NavLink className="nav-link text-white" to="models/">Model</NavLink>
        <NavLink className="nav-link text-white" to="models/create/">Create a Model</NavLink>
        <NavLink className="nav-link text-white" to="automobiles/">Automobile</NavLink>
        <NavLink className="nav-link text-white" to="automobiles/create/">Create an Automobile</NavLink>
        <NavLink className="nav-link text-white" to="salespeople/">Salesperson</NavLink>
        <NavLink className="nav-link text-white" to="salespeople/create/">Create a Salesperson</NavLink>
        <NavLink className="nav-link text-white" to="customers/">Customer</NavLink>
        <NavLink className="nav-link text-white" to="customers/create/">Create a Customer</NavLink>
        <NavLink className="nav-link text-white" to="sales/">Sales</NavLink>
        <NavLink className="nav-link text-white" to="sales/create/">Create a Sale</NavLink>
        <NavLink className="nav-link text-white" to="sales/history/">Sales History</NavLink>
        <NavLink className="nav-link text-white" to="appointments/create/">Create a Service Appointment</NavLink>
        <NavLink className="nav-link text-white" to="appointments/">Service Appointments</NavLink>
        <NavLink className="nav-link text-white" to="technicians/create/">Add a Technician</NavLink>
        <NavLink className="nav-link text-white" to="technicians/">Technicians</NavLink>
        <NavLink className="nav-link text-white" to="appointment/history/">Service History</NavLink>
      </ul>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
