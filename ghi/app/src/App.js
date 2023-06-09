import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainPage from './MainPage';
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
          <Route path="/" element={<MainPage />}></Route>
            <Route path="appointments">
              <Route path="" element={<AppointmentList appointments={appointments} getAppointments={getAppointments} />}/>
              <Route path="new" element={<AppointmentForm getAppointments={getAppointments} technicians={technicians} />}/>
              <Route path="history"  element={<AppointmentHistory appointments={appointments} setAppointments={setAppointments}/>}/>
            </Route>

            <Route path="technicians">
              <Route path="" element={<TechnicianList technicians={technicians} getTechnicians={getTechnicians} />}/>
              <Route path="new" element={<TechnicianForm getTechnicians={getTechnicians}/>} />
        </Route>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
