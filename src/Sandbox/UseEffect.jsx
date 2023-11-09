import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../api';

export default function UseEffect() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputUsername, setInputUsername] = useState('');

    useEffect(() => {
        (async function () {
            const users = await getAllUsers();
            setUsers(users);
            setLoading(false);
          })();
    }, []);

    useEffect(() => {
        const filteredUsers = users.filter(x => x.username.includes(inputUsername));
        setFilteredUsers(filteredUsers)
    }, [users, inputUsername])

    if (loading) {
        return <b>LOADING...</b>
    }

    return (
        <div className='mt-3 d-flex flex-column align-items-center border border-danger p-3'>
            <label htmlFor="username" className="form-label">
                Filter by username
            </label>
            <input
                onChange={(e) => setInputUsername(e.target.value)}
                value={inputUsername}
                className="form-control"
                id="username"
            />

            <pre className='mt-3'>{JSON.stringify(filteredUsers, null, 4)}</pre>
        </div>
    )
}