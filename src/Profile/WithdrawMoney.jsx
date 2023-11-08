import React, {useEffect} from 'react';

export default function WithdrawMoney() {
    useEffect(() => {
        throw new Error("No money for you!");
    }, []);

    return (
        <div>Throwing error</div>
    )
}