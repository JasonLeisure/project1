import React, { useEffect, useState } from 'react'

function TechnicianList() {
    const [technicians, setTechnicians] = useState([])
    const fetchData = async () => {
      const url = 'http://localhost:8080/api/technicians/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians)
      }
    }

    useEffect(() => {
      fetchData()
    }, []);

    const clickDelete = async (id) => {
      const url = 'http://localhost:8080/api/technicians/${id}';
      const fetchConfig = {
        method: "Delete",
      };
      const response = await fetch(url, fetchConfig);
      fetchData()
    }


  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Employee ID</th>
          </tr>
        </thead>
          <tbody>
              {technicians.map(technician => {
                  return (
                      <tr key={technician.employee_id}>
                          <td className="align-middle">{technician.first_name}</td>
                          <td className="align-middle">{technician.last_name}</td>
                          <td className="align-middle">{technician.employee_id}</td>
                          <td><button className="align-middle btn btn-outline-danger" onClick={() => { clickDelete(technician.id) }}>Delete</button></td>
                      </tr>
                  )
              })
              }
          </tbody>
      </table>
        </>
    );
}

export default TechnicianList;
