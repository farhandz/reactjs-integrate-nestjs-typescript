import * as React from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";



const GetData  = () => {
    const [data, setData] = React.useState([] as any[])
    const history = useHistory();
    
    React.useEffect(() => {
        axios.get("http://localhost:3333/employee").then(dt => {
            setData(dt.data)
        })
    }, [])

    return (
      <>
        <div className="mt-4">
          <button className="btn btn-success" onClick={() => history.push("/")}>
            tambah
          </button>
          <table className="table table-responsive  ">
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
                  <tr>
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