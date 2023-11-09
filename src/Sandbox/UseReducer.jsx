import React, { useReducer, useEffect } from 'react';
import { getAllUsers } from '../api'

const randomNumbers = [
    4988, 
    3604,
    5838,
    5255,
    6521,
    4156,
    5078,
    4581
]

const defaultState = {  
    selectedUser: {
        userID: 0,
        username: '',
        age: 0,
        balance: 0,
        retries: 0,
    },
    turnsLeft: 3,
    gamesPlayed: 0,
    guessNumberInput: '',
    numberToGuess: randomNumbers[0],
    hasGuessed: false,
    loading: true,
    users: [],
}

export default function UseReducer() {
    const [state, dispatch] = useReducer(readucer, defaultState);

    const gameOver = state.selectedUser.balance === 0 || state.turnsLeft === 0 || state.hasGuessed;
    console.log(state.numberToGuess);

    useEffect(() => {
        (async function () {
            const users = await getAllUsers();
            dispatch({type: 'load_users', payload: users})
          })();
    }, []);

    const handleUserChanged = (e) => {
        const selectedUserID = Number(e.target.value);
        if (selectedUserID === 0) {
            return;
        }

        const selectedUser = state.users.find(x => x.userID === selectedUserID);
        dispatch({type: 'set_user', payload: selectedUser});
    }

    const handleCheckGuess = (e) => {
        dispatch({type: 'decrease_game_turn'});

        if (Number(state.guessNumberInput) === state.numberToGuess) {
            dispatch({type: 'set_game_won'});
        }
    }

    const handleTryAgain = () => {
        dispatch({type: 'try_again'});
    }

    return (
        <div className='d-flex flex-column align-items-center mt-3 border border-danger p-3'>
            {!state.loading ? (
                <select onChange={handleUserChanged} className="form-select">
                    <option value={0}>Choose user</option>
                        {state.users.map(x => (
                            <option key={x.userID} value={x.userID}>{x.username}</option>
                        ))}
                </select> ) : (
                    <b>Loading users...</b>
                )
            }
             
            <div className='mt-3'>Turns left: {state.turnsLeft}</div>
            <div className="d-flex gap-3 mb-3">
                <input
                    onChange={(e) => {
                        dispatch({ type: 'set_guess_number_input', payload: { guessNumberInput: e.target.value } });
                    }}
                    value={state.guessNumberInput}
                    type="number"
                    className="form-control"
                    disabled={gameOver || state.loading}
                />
                <button
                    disabled={gameOver || state.loading}
                    onClick={handleCheckGuess}
                    className="btn btn-primary w-100"
                >
                Guess the whole number
                </button>
            </div>
            <h1 className='d-flex justify-content-center mt-3'>{String(state.numberToGuess).substring(0,3) + "X"}</h1>

            {gameOver && (
                <div className="d-flex flex-column justify-content-center">
                <h1>{state.hasGuessed ? 'Congratulations. You won 1000$' : 'No luck this time'}</h1>
                <button disabled={state.selectedUser.balance === 0} className="btn btn-success" onClick={handleTryAgain}>
                    Try again
                </button>
                </div>
            )}

            <pre>
                {JSON.stringify(state, null, 4)}
            </pre>
        </div>
    )
}

function readucer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case "load_users":
        return {
            ...state, 
            loading: false,
            users: payload
        };
      case "set_user":
        return {
            ...state,
            turnsLeft: 3,
            gamesPlayed: 0,
            hasGuessed: false,
            guessNumberInput: '',
            selectedUser: {
                userID: payload.userID,
                username: payload.username,
                age: payload.age,
                balance: payload.balance,
                retries: 0
            }
        };
      case "increase_balance":
        return {
            ...state,
            selectedUser: {
              ...state.selectedUser,
              balance: state.balance + payload,
            }
          };
        case "decrease_game_turn": 
        return {
            ...state,
            turnsLeft: state.turnsLeft - 1,
            gamesPlayed: state.gamesPlayed + 1,
            selectedUser: {
                ...state.selectedUser,
                balance: state.selectedUser.balance - 10,
            }
        }
        case "set_guess_number_input": 
        return {
            ...state,
            guessNumberInput: payload.guessNumberInput
        }
        case "set_game_won": 
        return {
            ...state,
            hasGuessed: true,
            selectedUser: {
                ...state.selectedUser,
                balance: state.selectedUser.balance + 1000
            }
        }
        case "try_again": 
        return {
            ...state,
            hasGuessed: false,
            turnsLeft: 3,
            guessNumberInput: '',
            numberToGuess: randomNumbers[state.selectedUser.retries + 1],
            selectedUser: {
                ...state.selectedUser,
                retries: state.selectedUser.retries + 1
            }
        }
      default:
        return state;
    }
}