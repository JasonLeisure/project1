import { useEffect, useState } from "react";

function ModelsList() {
  let alertClasses = "alert alert-success d-none";
  const [models, setModels] = useState([]);

  const fetchData = async () => {
    console.log("Fetching");

    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
     setModels(data.models);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteShoe = async (id) => {
    const url = `http://localhost:8100/api/models/${id}`;
    const response = await fetch(url, { method: "delete" });
    fetchData();
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
            <th>Delete?</th>
          </tr>
        </thead>
        <tbody>
          {models.map(models => (
            <tr key={models.id}>
              <td>{models.name}</td>
              <td>{models.manufacturer.id}</td>
              <td><img width="90px" alt="no image" src={models.picture_url}/></td>
              <td><button className="align-middle btn btn-outline-danger" onClick={() => deleteShoe(models.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ModelsList;
