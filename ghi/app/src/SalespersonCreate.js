import React, { useEffect, useState } from 'react';

function SalespersonCreate() {
    let alertClasses = "alert alert-success d-none";
    const [submitted, setSubmit] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        employee_number: '',
        id: '',
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

        const url = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();
            setFormData({
                name: '',
                employee_number: '',
                id: '',
            })

            setSubmit('submitted!')
        }
    }

    if (submitted.length > 0) {
        alertClasses = "alert alert-success mt-4";
    }
    return (
        <>
            <div className={alertClasses} role="alert">
                Salesperson successfully submitted!
            </div>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>New Salesperson Submission!</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input placeholder="Name" onChange={handleFormChange} required value={formData.first_name} type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input placeholder="Employee Number" onChange={handleFormChange} required value={formData.employee_id} type="text" name="employee_id" id="employee_id" className="form-control" />
                                <label htmlFor="employee_number">Employee Number</label>
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

export default SalespersonCreate;
