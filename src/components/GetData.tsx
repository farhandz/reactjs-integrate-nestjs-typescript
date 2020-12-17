import * as React from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
const GetData  = () => {
    const [data, setData] = React.useState([] as any[])
    const history = useHistory();    
    React.useEffect(() => {
        axios
          .get("http://localhost:3333/employee", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((dt) => {
            setData(dt.data);
          }).catch(err => {
            if(err.message === "Request failed with status code 401") {
              window.location.reload()
              localStorage.removeItem("token")
              alert("WAKTU ANDA HABIS!!!!!!")
              setTimeout(() => {
                window.location.href = "/login"
              }, 1000)
            }
          })
    }, [])

    return (
      <>
        <div className="mt-4  table-container ">
          <button className="btn btn-success" onClick={() => history.push("/")}>
            tambah
          </button>
          <table className="table wrap-table ">
            <thead>
              <tr>
                <th scope="col">no</th>
                <th scope="col">email</th>
                <th scope="col">nama</th>
                <th scope="col">umur</th>
                <th scope="col">gender</th>
                <th scope="col">job title</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dt, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <th>{dt.email}</th>
                    <td>{dt.nama}</td>
                    <td>{dt.umur}</td>
                    <td>{dt.gender}</td>
                    <td>{dt.jobtitle}</td>
                    <td>
                      <div className="button-get">
                        <button
                          onClick={() =>
                            axios
                              .delete(
                                `http://localhost:3333/employee/${dt._id}`
                              )
                              .then((dt) => {
                                window.location.href = "/data";
                              })
                          }
                          className="btn btn-danger btn-sm"
                        >
                          del
                        </button>
                        <button
                          onClick={() => history.push(`/data/${dt._id}`)}
                          className="btn btn-primary btn-sm ml-2"
                        >
                          upd
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
}

export default GetData