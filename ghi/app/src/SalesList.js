import React, { useEffect, useState } from 'react';

function SalesList() {
    const [sales, setSales] = useState([])


    const fetchData = async () => {

        const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    const clickDelete = async (id) => {
        const url = `http://localhost:8090/api/sales/${id}`;
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
                        <th>Price</th>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>Automobile</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => {
                        return (
                            <tr key={sale.automobile.vin}>
                                <td className="align-middle">{sale.price}</td>
                                <td className="align-middle">{sale.salesperson.name}</td>
                                <td className="align-middle">{sale.customer.name}</td>
                                <td className="align-middle">{sale.automobile.vin}</td>
                                <td className="align-middle">${sale.id}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </>
    );
}

export default SalesList;
