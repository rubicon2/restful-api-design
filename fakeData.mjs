import { faker } from '@faker-js/faker';

function createFakeUser() {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
}

function createFakeMessage(userId) {
  return {
    id: faker.string.uuid(),
    text: faker.lorem.lines({ min: 3, max: 10 }),
    userId,
  };
}

function createFakeData(userCount, maxMsgsPerUser) {
  const users = [];
  const messages = [];
  for (let i = 0; i < userCount; i++) {
    const user = createFakeUser();
    users.push(user);
    const msgCount = Math.random() * maxMsgsPerUser;
    for (let j = 0; j < msgCount; j++) {
      messages.push(createFakeMessage(user.id));
    }
  }
  return { users, messages };
}

// Create users here so they are the same no matter where else they are imported.
let { users, messages } = createFakeData(50, 5);

// But must use methods to update the values. Cannot do directly to users and messages.
function setUsers(newObj) {
  users = newObj;
}

function setMessages(newObj) {
  messages = newObj;
}

export { users, messages, setUsers, setMessages };
