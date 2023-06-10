import React, { useEffect, useState } from 'react';

function SalesCreate() {
    let alertClasses = "alert alert-success d-none";
    const [customers, setCustomers] = useState([])
    const [automobiles, setAutomobiles] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [alert, setAlert] = useState('');
    const [formData, setFormData] = useState({
        price: '',
        salesperson: '',
	    customer: '',
        automobile: '',
        id: ''
    });
    let loads = 0

    const fetchData = async () => {

        let url = 'http://localhost:8090/api/customers/';
        let response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
            loads++;
        }
        url = 'http://localhost:8090/api/salespeople/';
        response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespersons);
            loads++;
        }
        url = 'http://localhost:8100/api/automobiles/';
        response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos.filter(auto => auto.sold == false));
            loads++;
        }

    }

    const warning = () => {
        let alertBase = "Warning. "
        if(customers.length == 0){
            alertBase += "No customers found to sell to. "
            setAlert(alertBase)
        }
        if(salespeople.length == 0){
            alertBase += "No salesperson found to sell. "
            setAlert(alertBase)
        }
        if(automobiles.length == 0){
            alertBase += "No cars found to be sold. "
            setAlert(alertBase)
        }
    }

    useEffect(() => {
        fetchData();
        if(loads>=3){
            warning();
        }
    }, []);

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        const url = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        console.log(response)
        if (response.ok) {
            const paidUrl = `http://localhost:8100/api/automobiles/${formData.automobile}/`
            const paidFetchConfig = {
                method: "put",
                body: JSON.stringify({ "sold": true }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            console.log(JSON.stringify({ "sold": "true" }))
            const paidResponse = await fetch(paidUrl, paidFetchConfig);
            console.log(paidResponse)

            const newSales = await response.json();
            console.log(newSales);
            setFormData({
                price: '',
                salesperson: '',
		        customer: '',
                automobile: '',
                id: '',
            })
            setAlert('Sale successfully submitted!')
        }
        else{
            let error =
            setAlert(`Failed to submit. ${response.statusText}}`)
        }
    }

    if (alert == 'Sale successfully submitted!') {
        alertClasses = "alert alert-success mt-4";
    }
    else if(alert.includes("Failed to submit.")){
        alertClasses = "alert alert-danger mt-4";
    }
    else if(alert.includes("Warning.")){
        alertClasses = "alert alert-warning mt-4";
    }
    return (
        <>
          <div className={alertClasses} role="alert">
            {alert}
          </div>
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>New Sale Submission!</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="Price"
                      onChange={handleFormChange}
                      required
                      value={formData.price}
                      type="number"
                      name="price"
                      id="price"
                      className="form-control"
                    />
                    <label htmlFor="price">Price</label>
                  </div>
                  <div className="mb-3">
                    <select
                      required
                      onChange={handleFormChange}
                      value={formData.salesperson}
                      name="salesperson"
                      id="salesperson"
                      className="form-select"
                    >
                      <option value="">Choose a salesperson</option>
                      {salespeople.map((salesperson) => {
                        return (
                          <option
                            key={salesperson.employee_number}
                            value={salesperson.employee_number}
                          >
                            {salesperson.name} - {salesperson.employee_number}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select
                      required
                      onChange={handleFormChange}
                      value={formData.customer}
                      name="customer"
                      id="customer"
                      className="form-select"
                    >
                      <option value="">Choose a customer</option>
                      {customers.map((customer) => {
                        return (
                          <option
                            key={customer.phone_number}
                            value={customer.phone_number}
                          >
                            {customer.name} - {customer.phone_number}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select
                      required
                      onChange={handleFormChange}
                      value={formData.automobile}
                      name="automobile"
                      id="automobile"
                      className="form-select"
                    >
                      <option value="">Choose an automobile VIN</option>
                      {automobiles.map((automobile) => {
                        return (
                          <option key={automobile.vin} value={automobile.vin}>
                            {automobile.vin}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        </>
      );
      }

      export default SalesCreate;
