import React, { useEffect, useState } from 'react';

function TechnicianForm() {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [employeeID, setID] = useState('');

  // const firstNameChange etc... for each variable
  // make a function for each handle variable

  const firstNameChange = (e) => {
    const value = e.target.value
    setFirst(value)
  }
  const lastNameChange = (e) => {
    const value = e.target.value
    setLast(value)
  }
  const EmployeeIDChange = (e) => {
    const value = e.target.value
    setID(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {}
    data.first_name = firstName
    data.last_name = lastName
    data.employee_id = employeeID

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
        setFirst('');
        setLast('');
        setID('');
      }
    }

    return (
      <div className="my-5 container">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a technician</h1>
          <form onSubmit={handleSubmit} id="create-technician-form">
            <div className="form-floating mb-3">
              <input onChange={firstNameChange} value={firstName} placeholder="first_name" required type="text" name="first-name" className="form-control"/>
              <label htmlFor="technician_name">First name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={lastNameChange} value={lastName} placeholder="last_name" required type="text" name="last-name" className="form-control"/>
              <label htmlFor="technician_name">Last name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={EmployeeIDChange} value={employeeID} placeholder="employee_id" required type="text" name="employee-number" className="form-control"/>
              <label htmlFor="employee_number">Employee ID</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default TechnicianForm;
