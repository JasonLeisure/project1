import React, { useEffect, useState } from 'react';

function AutomobileList() {
    const [autos, setAutos] = useState([])
    const fetchData = async () => {

        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos)
            console.log(data)
        }
    }
    console.log(autos)

    useEffect(() => {
        fetchData()
    }, []);

    const clickDelete = async (vin) => {
        const url = `http://localhost:8100/api/automobiles/${vin}`;
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
                        <th>Color</th>
                        <th>Year</th>
                        <th>Vin</th>
                        <th>Model</th>
                        <th>Sold</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map(auto => {
                        return (
                            <tr key={auto.id}>
                                <td className="align-middle">{auto.color}</td>
                                <td className="align-middle">{auto.year}</td>
                                <td className="align-middle">{auto.vin}</td>
                                <td className="align-middle">{auto.model.name}</td>
                                <td className="align-middle">{auto.model.manufacturer.name}</td>
                                <td className="align-middle">{ auto.sold ? "Yes" : "No" }</td>
                                <td><button className="align-middle btn btn-outline-danger" onClick={() => { clickDelete(auto.vin) }}>Delete</button></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </>
    );
}

export default AutomobileList;
