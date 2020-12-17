import React from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'


const EditData = ({match} : any) => {
    const history = useHistory()
    const [data, setData] = React.useState({} as any)
    const [nama, setNama] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [umur, setUmur] = React.useState("")
    const [gender, setGender] = React.useState("")
    const [jobtitle, setJObtitle] = React.useState("")
    const id = match.params.id;

    React.useEffect(() => {
        axios
          .get(`http://localhost:3333/employee/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((dt) => {
            setData(dt.data);
          }).catch(err => {
             if (err.message === "Request failed with status code 401") {
               window.location.reload();
               localStorage.removeItem("token");
               setTimeout(() => {
                 window.location.href = "/login";
               }, 1000);
             }
          })
    }, [])
    const dataSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        axios
          .put(
            `http://localhost:3333/employee/${id}`,
            {
              nama:
                typeof nama == "undefined" || nama === null || nama === ""
                  ? data.nama
                  : nama,
              email:
                typeof email == "undefined" || email === null || email === ""
                  ? data.email
                  : email,
              umur:
                typeof umur == "undefined" || umur === null || umur === ""
                  ? data.umur
                  : umur,
              gender:
                typeof gender == "undefined" || gender === null || gender === ""
                  ? data.gender
                  : gender,
              jobtitle:
                typeof jobtitle == "undefined" ||
                jobtitle === null ||
                jobtitle === ""
                  ? data.jobtitle
                  : jobtitle,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((dt) => {
            window.location.href = "/data";
          });
    } 
    const ChaneEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        console.log(email)
    }
    return (
        <div className="mt-4 edit-wrap">
            {/* <h1>{match.params.id}</h1> */}
            <h1>Edit Form</h1>
            <button onClick={() => history.push("/data")} className="btn btn-secondary">back</button>
            <form onSubmit={dataSubmit}>
                <div className="form-group">
                    <label >Email address</label>
                    <input onChange={ChaneEmail} type="email" className="form-control" defaultValue={data.email} placeholder="email..." />
                </div>
                <div className="form-group">
                    <label >name</label>
                    <input onChange={e => setNama(e.target.value)} type="text" className="form-control" defaultValue={data.nama} placeholder="nama..." />
                </div>
                <div className="form-group">
                    <label>Umur</label>
                    <input onChange={e => setUmur(e.target.value)} type="number" className="form-control" defaultValue={data.umur} placeholder="umur..." />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <input type="text"  onChange={e => setGender(e.target.value)} className="form-control" defaultValue={data.gender} placeholder="gender..." />
                </div>
                <div className="form-group">
                    <label>Job Title</label>
                    <input type="text" className="form-control" onChange={e => setJObtitle(e.target.value)} defaultValue={data.jobtitle} placeholder="JobTitle..." />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}

export default EditData