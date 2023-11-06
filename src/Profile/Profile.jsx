import React, {useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom"
import { getUserByID, addMoneyToUserAccount } from '../api';
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { userID } = useParams();
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [moneyToAdd, setMoneyToAdd] = useState('');

    const { setBalance } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            const user = await getUserByID(Number(userID));
            setUser(user);
            setLoading(false);
          })();
    }, [userID]);

    const addMoneyToAccount = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const balance = await addMoneyToUserAccount(user.userID, Number(moneyToAdd));
        setBalance(balance);
        navigate("/game");
    }

    if (loading) {
        return <h1 className='d-flex justify-content-center'>LOADING...</h1>
    }

    return (
        <div className="profile-wrapper">
        {user &&
            <div className="card">
                <h3 className="card-header">{user.username}</h3>
                <div className="card-body">
                    <div>Your current balance is {user.balance}$</div>
                    <form onSubmit={addMoneyToAccount}>
                        <input
                        onChange={(e) =>
                            setMoneyToAdd(e.target.value )
                        }
                        value={moneyToAdd}
                        className="form-control"
                        id="moneyToAdd"
                        disabled={submitting}
                        required
                    />
                        <button className='btn btn-success mt-2 w-100'>Add money and go back to the game</button>
                    </form>
                </div>
            </div>
        }
        </div>
    )
}