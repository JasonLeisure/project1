import React, { useEffect, useState } from 'react';

function CustomerList() {
    const [customers, setCustomers] = useState([])
    const fetchData = async () => {

        const url = 'http://localhost:8090/api/customers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const clickDelete = async (id) => {
        const url = `http://localhost:8090/api/customers/${id}`;
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
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
			            <th>ID</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => {
                        return (
                            <tr key={customer.phone_number}>
                                <td className="align-middle">{customer.name}</td>
                                <td className="align-middle">{customer.address}</td>
                                <td className="align-middle">{customer.phone_number}</td>
				                <td className="align-middle">{customer.id}</td>
                                <td><button className="align-middle btn btn-outline-danger" onClick={() => { clickDelete(customer.id) }}>Delete</button></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </>
    );
}

export default CustomerList;
