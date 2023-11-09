import React, {useState} from 'react';

const defaultUsers = [
    {
        userID: 1,
        username: 'Pesho',
        age: 23,
        privileges: ['admin', 'content creator'],
    },
    {
        userID: 2,
        username: 'Misho',
        age: 50,
        privileges: ['admin'],
    },
    {
        userID: 3,
        username: 'Gosho',
        age: 18,
        privileges: [],
    },
]

const defaultInputs = {
    username: '',
    age: '',
    privilege: ''
}

export default function UseStateArray(){
    const [users, setUsers] = useState(defaultUsers)
    const [inputs, setInputs] = useState(defaultInputs);
    const [selectedUserID, setSelectedUserID] = useState(0);

    const disabled = Number(selectedUserID) === 0;

    const handleSelectedUserChange = (e) => {
        setSelectedUserID(e.target.value);
        setInputs(defaultInputs);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const newUsers = users.map(x => {
            if (x.userID === Number(selectedUserID)) {
                if(inputs.username) {
                    x.username = inputs.username;
                }
                if(inputs.age) {
                    x.age = Number(inputs.age);
                }
                if(inputs.privilege) {
                    x.privileges.push(inputs.privilege)
                }

                return x;
            } else {
                return x;
            }
        });

        setUsers(newUsers);
    }

    return (
        <div className='border border-danger p-3'>
            <div className="row">
                <div className="col-md-6">
                <select value={selectedUserID} onChange={handleSelectedUserChange} className="form-select">
                <option value={0}>Choose user</option>
                    {defaultUsers.map(x => (
                        <option key={x.userID} value={x.userID}>{x.username}</option>
                    ))}
                </select>

                <form onSubmit={onSubmit}>
            <div className="mb-1">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                value={inputs.username}
                className="form-control"
                id="username"
                disabled={disabled}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                onChange={(e) =>
                  setInputs({ ...inputs, age: e.target.value })
                }
                value={inputs.age}
                className="form-control"
                type='number'
                id="age"
                disabled={disabled}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="privilege" className="form-label">
                Add privilege
              </label>
              <input
                onChange={(e) =>
                  setInputs({ ...inputs, privilege: e.target.value })
                }
                value={inputs.privilege}
                className="form-control"
                id="privilege"
                disabled={disabled}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={disabled}
            >
              Change user
            </button>
          </form>
                </div>
                <div className="col-md-6">
                <pre>
                {JSON.stringify(users, null, 4)}
            </pre>
                </div>
            </div>
        </div>
    )
}