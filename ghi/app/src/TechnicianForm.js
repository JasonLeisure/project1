import React, { useEffect, useState } from 'react';

function TechnicianForm() {
  let alertClasses = "alert alert-success d-none";
  const [submitted, setSubmit] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name:
  })

  const handleFormChange = (event) => {
    const first_name = event.target.value;
    const last_name = event.target.value;
    const employee_id = event.target.value;
  }

  const handleSubmit = async (event) => {
      event.preventDefault()

      const data = {}
      data.technician_name = technicianName
      data.employee_number = employeeNumber

      const url = 'http://localhost:8080/api/technicians/';
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const appointment = await response.json();

        setTechnicianName('');
        setEmployeeNumber('');
        getTechnicians()
      }
  }

  return (
      <div className="my-5 container">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a technician</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input onChange={handleTechnicianNameChange} value={first_name} placeholder="first_name" required type="text" name="first_name" className="form-control"/>
              <label htmlFor="technician_name">Technician name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleTechnicianNameChange} value={last_name} placeholder="last_name" required type="text" name="last_name" className="form-control"/>
              <label htmlFor="technician_name">Technician name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleEmployeeNumberChange} value={employee_id} placeholder="employee_id" required type="text" name="employee_number" className="form-control"/>
              <label htmlFor="employee_number">Employee number</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );

}


export default TechnicianForm;
