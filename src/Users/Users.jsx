import React, {useState, Suspense} from 'react';
import DeferedUsers from './DeferedUsers';
import SuspenseUsers from './SuspenseUsers';


import './users.scss';

export default function Users() {
    const [query, setQuery] = useState('');

    return (
        <div className="users-wrapper">
            <input
                onChange={(e) =>
                    setQuery(e.target.value)
                }
                value={query}
                className="form-control mb-3"
                id="query"
              />

            <div className="row">
                <div className="col-md-6">
                    <Suspense fallback={<h2>Loading...</h2>}>
                        <SuspenseUsers query={query}/>
                    </Suspense>
                </div>
                <div className="col-md-6">
                    <DeferedUsers />
                </div>
            </div>
        </div>
    )
}