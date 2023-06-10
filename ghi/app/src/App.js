import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainPage from './MainPage';
import ManufacturerList from './ManufacturerList';
import ManufacturerCreate from './ManufacturerCreate';
import ModelsList from './ModelsList';
import ModelsCreate from './ModelsCreate'
import AutomobileList from './AutomobileList';
import AutomobileCreate from './AutomobileCreate';
import SalespersonCreate from './SalespersonCreate';
import SalespersonList from './SalespersonList';
import CustomerCreate from './CustomerCreate';
import CustomerList from './CustomerList';
import SalesList from './SalesList';
import SalesCreate from './SalesCreate';
import SalesHistory from './SalesHistory';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import AppointmentHistory from './AppointmentHistory';

function App() {
  const [technicians, setTechnicians] = useState([])
  const [appointments, setAppointments] = useState([])

  const getTechnicians = async () => {
    const url = 'http://localhost:8080/api/technicians/'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      const technicians = data.technicians
      setTechnicians(technicians)
    }
  }

  const getAppointments = async () => {
    const url = 'http://localhost:8080/api/appointments/'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      const appointments = data.appointments
      setAppointments(appointments)
    }
  }

  useEffect(() => {
    getTechnicians()
    getAppointments()
  }, [])

  return (
    <BrowserRouter>
      <Nav />
        <Routes>
            <Route path="appointments">
              <Route path="" element={<AppointmentList appointments={appointments} getAppointments={getAppointments} />}/>
              <Route path="new" element={<AppointmentForm getAppointments={getAppointments} technicians={technicians} />}/>
              <Route path="history"  element={<AppointmentHistory appointments={appointments} setAppointments={setAppointments}/>}/>
            </Route>

              <Route path="technicians"></Route>
              <Route path="" element={<TechnicianList technicians={technicians} getTechnicians={getTechnicians} />}/>
              <Route path="new" element={<TechnicianForm getTechnicians={getTechnicians}/>} />



          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers/" element={<ManufacturerList />} />
          <Route path="manufacturers/create/" element={<ManufacturerCreate />} />
          <Route path="models/" element={<ModelsList />} />
          <Route path="models/create/" element={<ModelsCreate />} />
          <Route path="automobiles/" element={<AutomobileList />} />
          <Route path="automobiles/create/" element={<AutomobileCreate />} />
          <Route path="salespeople/" element={<SalespersonList />} />
          <Route path="salespeople/create/" element={<SalespersonCreate />} />
          <Route path="customers/" element={<CustomerList/>} />
          <Route path="customers/create/" element={<CustomerCreate />} />
          <Route path="sales/" element={<SalesList />} />
          <Route path="sales/create/" element={<SalesCreate />} />
          <Route path="sales/history/" element={<SalesHistory />} />
        </Routes>

  </BrowserRouter>

  );
}
export default App;
