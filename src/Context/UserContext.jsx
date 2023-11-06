import { useReducer, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, {});

  const userProviderValue = {
    user: userState,
    addUserToContext: (user) => {
      userDispatch({
        type: "add_user",
        payload: {
          userID: user.userID,
          username: user.username,
          balance: user.balance,
        },
      });
    },
    changeUsername: (username) => {
      userDispatch({
        type: "change_username",
        payload: { username: username },
      });
    },
    decreaseBalance: (sum) => {
      userDispatch({
        type: "decrease_balance",
        payload: { sum: sum },
      });
    },
    increaseBalance: (sum) => {
      userDispatch({
        type: "increase_balance",
        payload: { sum: sum },
      });
    },
  };

  return (
    <UserContext.Provider value={userProviderValue}>
      {children}
    </UserContext.Provider>
  );
};

function userReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "add_user":
      return {
        userID: payload.userID,
        username: payload.username,
        balance: payload.balance,
      };
    case "change_username":
      return {
        ...state,
        username: payload.username,
      };
    case "decrease_balance":
      return {
        ...state,
        balance: state.balance - payload.sum,
      };
    case "increase_balance":
      return {
        ...state,
        balance: state.balance + payload.sum,
      };
    default:
      return state;
  }
}
