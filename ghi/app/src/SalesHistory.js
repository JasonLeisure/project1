import { useEffect, useState } from 'react';

function SalesHistory() {

    const [salesperson, setSalesperson] = useState('');
    const [salespeople, setSalespeople] = useState([]);
    const [sales, setSales] = useState([]);


    const fetchSalespeople = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(salespeopleUrl);

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespersons);
        }
    }

    const fetchSales = async () => {
        const response = await fetch('http://localhost:8090/api/sales/');
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    }

    useEffect(() => {
        fetchSales();
        fetchSalespeople();
    }, []);

    const handleSalespersonChange = (e) => {
        const value = e.target.value;
        setSalesperson(value);
    }

    return (
        <div>
        <h1>Salesperson History</h1>
        <div className="mb-3">
                        <select onChange={handleSalespersonChange} value={salesperson} required name="salesperson" id="salesperson" className="form-select">
                            <option value="">Choose a salesperson...</option>
                            {salespeople.map(employee => {
                                return(
                                    <option key={employee.id} value={employee.id}>
                                        {employee.name }
                                    </option>
                                );
                            })}
                        </select>
                    </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Salesperson</th>
                    <th>Customer</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.filter(sale => sale.salesperson.id.toString() === salesperson).map(sale => {
                    return (

                        <tr key={sale.id}>
                            <td>{sale.salesperson.name}</td>
                            <td>{sale.customer.name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>${sale.price}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    );
}

export default SalesHistory;
