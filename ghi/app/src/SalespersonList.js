import React, { useEffect, useState } from 'react';

function SalespersonList() {
    const [salespeople, setSalespeople] = useState([])
    const fetchData = async () => {

        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setSalespeople(data.salespersons)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const clickDelete = async (id) => {
        const url = `http://localhost:8090/api/salespeople/${id}`;
        const fetchConfig = {
            method: "delete",
        };
        const response = await fetch(url, fetchConfig);
        fetchData()
    }

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Employee Number</th>
                        <th>ID</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map(salesperson => {
                        return (
                            <tr key={salesperson.employee_id}>
                                <td className="align-middle">{salesperson.name}</td>
                                <td className="align-middle">{salesperson.employee_number}</td>
                                <td className="align-middle">{salesperson.id}</td>
                                <td><button className="align-middle btn btn-outline-danger" onClick={() => { clickDelete(salesperson.id) }}>Delete</button></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </>
    );
}

export default SalespersonList;
