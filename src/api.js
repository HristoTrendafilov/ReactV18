import { sleep } from "./utils.js";
import { users } from "./Defaults/users.js";

let nextID = 4;
const getNextID = () => nextID++;

export async function getUser(username, password) {
  await sleep(2000);

  const user = users.find(
    (x) => x.username === username && x.password === password
  );

  return user;
}

export async function getUserByUsername(username) {
  await sleep(2000);

  const user = users.find((x) => x.username === username);
  return user;
}

export async function getUserByID(userID) {
  await sleep(2000);

  const user = users.find((x) => x.userID === userID);
  return user;
}

export async function addUser(username, password) {
  await sleep(2000);

  const newUser = {
    userID: getNextID(),
    username: username,
    password: password,
    balance: 0,
  };

  users.push(newUser);
  return newUser;
}
