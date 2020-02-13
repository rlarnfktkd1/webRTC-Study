const users = [];

const addUser = ({ id, name, room, signalRoom }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    user => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room, signalRoom };

  users.push(user);

  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.filter(user => user.id !== id);
  }
};

const getUser = id => users.find(user => user.id === id);

const existingRoom = () => {
  return users | [];
};

const getUsersInRoom = room => {
  console.log(users);
  return users.filter(user => user.room === room);
};

module.exports = { addUser, existingRoom, removeUser, getUser, getUsersInRoom };
