import React, { useState, useEffect } from 'react';

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickDelete = async (id) => {
    const url = `http://localhost:8100/api/manufacturers/${id}`;
    const fetchConfig = {
      method: 'Delete',
    };
    const response = await fetch(url, fetchConfig);
    fetchData();
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Delete?</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.name}>
                <td className="align-middle">{manufacturer.name}</td>
                <td>
                  <button
                    className="align-middle btn btn-outline-danger"
                    onClick={() => {
                      clickDelete(manufacturer.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ManufacturerList;
