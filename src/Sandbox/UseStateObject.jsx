import React, {useState} from 'react';

const defaultUser = {
    username: 'Pesho',
    age: 23,
    privileges: ['admin', 'content creator']
}

const defaultInputs = {
    username: '',
    age: '',
    privilege: ''
}

export default function UseStateObject(){
    const [user, setUser] = useState(defaultUser)
    const [inputs, setInputs] = useState(defaultInputs);

    const onSubmit = (e) => {
        e.preventDefault();

        if(inputs.username) {
            setUser({...user, username: inputs.username})
        }
        if(inputs.age) {
            setUser({...user, age: Number(inputs.age)})
        }
        if(inputs.privilege) {
            setUser({...user, privileges: [...user.privileges, inputs.privilege]})
        }
    }

    return (
      <div className='border border-danger p-3'>
        <div className="row">
          <div className="col-md-6">
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
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Change user
            </button>
          </form>
          </div>
          <div className="col-md-6">
          <pre>
                {JSON.stringify(user, null, 4)}
            </pre>
          </div>
        </div>
        </div>
    )
}