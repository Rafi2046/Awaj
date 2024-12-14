import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = () => {

    const [users, setUsers] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8000/users.php')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching messages:", error);
            });
    }, []);

    return (
        <div className='w-full flex items-center justify-center flex-wrap'>
            {users.map(user => {
                return (
                    <div key={user?.uName} className="card card-compact bg-base-100 w-96 shadow-xl w-1/5 m-2">
                        <figure>
                            <img className='w-full h-full'
                                src={user?.proPic}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{user?.fName}</h2>
                            <p>{user?.email}</p>
                            <p>Age: {user?.age}</p>

                            <div className="card-actions justify-end">
                                <button className="btn btn-outline">View Profile</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Users;