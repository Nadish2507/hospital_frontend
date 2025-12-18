import { getUsers } from "./dbService";

// LOGIN CHECK
export const loginUser = (email, password) => {
  const users = getUsers();

  const found = users.find(
    (u) => u.email === email && u.password === password
  );

  return found || null;
};

// REGISTER USER
export const registerUser = (data) => {
  const users = getUsers();
  users.push(data);
  localStorage.setItem("users", JSON.stringify(users));
};
