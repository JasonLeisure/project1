import React, { useState, useEffect } from 'react';

function AutomobileCreate() {
    let alertClasses = "alert alert-success d-none";
    const [submitted, setSubmit] = useState('');
    const [formData, setFormData] = useState({
        color: '',
        year:'',
        vin: '',
        model_id: ''
    });
    const [models, setModels] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = `http://localhost:8100/api/automobiles/`;
        console.log(JSON.stringify(formData))
        console.log(formData)
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

            setFormData({
                color: '',
                year:'',
                vin: '',
                model_id: ''
            })
            setSubmit("submitted!")
        }
    }

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        })
    }
    if (submitted.length > 0) {
        alertClasses = "alert alert-success mt-4";
        console.log(alertClasses)
    }
    return (
        <>
            <div className={alertClasses} role="alert">
                Model successfully submitted!
            </div>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>New Automobile Submission!</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.color} placeholder="Color" required name="color" type="text" id="color" className="form-control" />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.year} placeholder="Year" required name="year" type="text" id="year" className="form-control" />
                                <label htmlFor="year">Year</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.vin} placeholder="VIN" required name="vin" type="text" id="vin" className="form-control" />
                                <label htmlFor="VIN">VIN</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.model_id} placeholder="model_id" required name="model_id" type="text" id="model_id" className="form-select">
                                    <option key="">Choose Model</option>
                                    {models.map(model => {
                                        return (
                                            <option key={model.id} value={model.id}>{model.name}</option>
                                        )
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
export default AutomobileCreate;
