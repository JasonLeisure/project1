import { useEffect, useState } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([])
    const getData = async ()=> {
        const resp = await fetch('http://localhost:8080/api/appointments/')

        if (resp.ok) {
            const data = await resp.json()
            setAppointments(data.appointments)
        } else {
            console.error("Response Invalid")
        }
    }

    useEffect(()=> {
        getData()
    }, [])

    console.log(appointments)
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Test</th>
                </tr>
            </thead>
        </table>
    )
}

export default AppointmentList;
