import React, { useEffect, useState } from 'react';

function TechnicianForm() {
    let alertClasses = "alert alert-success d-none";
    const [name, setName] = useState('');
    const [submitted, setSubmit] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { name }
        const url = 'http://localhost:8100/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newTechnician = await response.json();

            setName('')

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
                Technician successfully submitted!
            </div>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>New Technician Submission!</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input placeholder="Name" onChange={handleNameChange} required value={name} type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TechnicianForm;
