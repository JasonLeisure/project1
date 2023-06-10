import React, { useState, useEffect } from 'react';

function ModelsCreate() {
    let alertClasses = "alert alert-success d-none";
    const [submitted, setSubmit] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        manufacturer_id: '',
        picture_url: ''
    });
    const [manufacturers, setManufacturers] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = `http://localhost:8100/api/models/`;
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
                name: '',
                manufacturer_id: '',
                picture_url: '',
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
                        <h1>New Model Submission!</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.name} placeholder="Name" required name="name" type="text" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture URL" required name="picture_url" type="text" id="picture_url" className="form-control" />
                                <label htmlFor="picture_url">Picture URL</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleFormChange} value={formData.manufacturer_id} placeholder="manufacturer_id" required name="manufacturer_id" type="text" id="manufacturer_id" className="form-select">
                                    <option key="">Choose Manufacturer</option>
                                    {manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
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
export default ModelsCreate;
