import React from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom'

interface InputProps {
    nama: string,
}

function Input({nama}: InputProps) {
    const history = useHistory()
    const [data, setData] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [gender, SetGender] = React.useState("")
    const [umur, SetUmur] = React.useState("")
    const [job, setJob] = React.useState("")

    const insertData = (e: React.FormEvent) => {
        e.preventDefault()
         axios
           .post("http://localhost:3333/employee", {
             nama: data,
             umur: umur,
             gender: gender,
             email: email,
             jobtitle: job,
           })
           .then((dt) => {
               window.location.href = "/data"
           });
    }
    return (
        <div className="container">
        <form onSubmit={insertData}>
            <h3 className="text-secondary font-weight-bold">insert data employee</h3>
            <div className="form-group">
            <label>Nama</label>
            <input type="Text"  className="form-control" onChange={e => setData(e.target.value)} placeholder="email sob" />
            </div>
            <div className="form-group">
            <label>Umur</label>
            <input type="Text" className="form-control" onChange={e => SetUmur(e.target.value)} placeholder="Umur..." />
            </div>
            <div className="form-group">
            <label>Gender</label>
            <input type="Text" className="form-control" onChange={e => SetGender(e.target.value)} placeholder="Gender..." />
            </div>
            <div className="form-group">
            <label>Email</label>
            <input type="Text" className="form-control" onChange={e => setEmail(e.target.value)} placeholder="Email.." />

            </div>
            <div className="form-group">
            <label>Job Title</label>
            <input type="Text" className="form-control" onChange={e => setJob(e.target.value)} placeholder="Job Title... " />
            </div>
            <button type="submit" className="btn btn-primary">submit</button>
            <button onClick={() => history.push("/data")} className="btn btn-warning ml-2">cancel</button>
        </form>
        </div>
    )
}

export default Input
