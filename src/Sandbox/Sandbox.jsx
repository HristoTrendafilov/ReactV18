import React, { useState } from 'react';
import UseStateObject from './UseStateObject';
import UseStateArray from './UseStateArray';
import UseEffect from './UseEffect';
import UseReducer from './UseReducer';

import './sandbox.scss';

const sanboxTypes = [
    "useState",
    "useEffect",
    "useReducer"
]

export default function Sandbox() {
    const [sandboxType, setSandboxType] = useState('');

    return (
        <div className='sandbox-wrapper'>
            <div className="d-flex justify-content-center">
                <select
                value={sandboxType} onChange={(e) => setSandboxType(e.target.value)} 
                className="form-select" 
                style={{maxWidth: '20rem'}}>
                    <option value={0}>Choose sandbox type</option>
                        {sanboxTypes.map(x => (
                            <option key={x} value={x}>{x}</option>
                        ))}
                </select>
            </div>

            {sandboxType === "useState" && 
                <div className='row g-2'>
                    <div className="col-md-6">
                        <h1 className='d-flex justify-content-center'>useState() OBJECT</h1>
                        <UseStateObject/>
                    </div>
                    <div className="col-md-6">
                        <h1 className='d-flex justify-content-center'>useState() ARRAY</h1>
                        <UseStateArray/>
                    </div>
                </div>
            }

            {sandboxType === "useEffect" && 
               <UseEffect/>
            }

            {sandboxType === "useReducer" && 
               <UseReducer/>
            }
        </div>
    )
}