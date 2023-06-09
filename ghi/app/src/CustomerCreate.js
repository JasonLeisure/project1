import React, { useEffect, useState } from 'react';

function CustomerCreate() {
    let alertClasses = "alert alert-success d-none";
    const [submitted, setSubmit] = useState('');
    const [formData, setFormData] = useState({
        name: '',
	    address: '',
        phone_number: '',
        id: ''
    });

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

        const url = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);

            setFormData({
                name: '',
                address: '',
                phone_number: '',
		        id: ''
            })

            setSubmit('submitted!')
        }
    }

    if (submitted.length > 0) {
        alertClasses = "alert alert-success mt-4";
        console.log(alertClasses)
    }
    return (
        <>
            <div className={alertClasses} role="alert">
                Customer successfully submitted!
            </div>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>New Customer Submission!</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input placeholder="Name" onChange={handleFormChange} required value={formData.name} type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="first_name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input placeholder="Name" onChange={handleFormChange} required value={formData.address} type="text" name="address" id="address" className="form-control" />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input placeholder="Phone Number" onChange={handleFormChange} required value={formData.phone_number} type="text" name="phone_number" id="phone_number" className="form-control" />
                                <label htmlFor="phone_number">Phone Number</label>
                            </div>
			                <div className="form-floating mb-3">
                                <input placeholder="ID" onChange={handleFormChange} required value={formData.id} type="text" name="id" id="id" className="form-control" />
                                <label htmlFor="id">ID</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerCreate;
