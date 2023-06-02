import { onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "./firebase";

const getUsers = async () => {
  const users = [];

  await onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { displayName, photoURL } = user;
      users.push({ name: displayName, photo: photoURL });
    }
  });

  return users;
};

export { getUsers }
