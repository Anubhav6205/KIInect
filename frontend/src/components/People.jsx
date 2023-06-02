import { useState, useEffect } from 'react';
import { getUsers } from '../getUsers';
import axios from "axios";
import "./css/People.css"
function People() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userFetch = () => {
      axios.get("http://localhost:5000/api/userinfos").then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
      });
    };

    userFetch();
  }, []);
  return (
    <div className='main-container'>
      <h2 className='title'>Users</h2>
      <div className='cards'>
        {users.map((user, index) => (
          (index % 2 === 1) ? (
            <div key={user._id} className='card'>
              <div className='prof-image'>
                <img src={user.photoURL} alt={"Not available"} />
              </div>
              <div className='username'>
                <p>{user.name}</p>
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
  
}

export default People;
