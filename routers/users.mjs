import { users, setUsers, messages } from '../fakeData.mjs';
import { Router } from 'express';

const app = Router();

app.get('/', (req, res) => {
  console.log(req.user);
  return res.send(users);
});

app.post('/', (req, res) => {
  return res.send({ message: 'received post request on user resource' });
});

app.get('/:userId', (req, res, next) => {
  const user = users.find((user) => user.id === req.params.userId);
  if (!user) return next(new Error('User not found'));
  return res.send(user);
});

app.get('/:userId/messages', (req, res) => {
  const userMessages = messages.filter(
    (message) => message.userId === req.params.userId,
  );
  return res.send(userMessages);
});

app.put('/:userId', (req, res, next) => {
  const updated = users.map((user) => {
    if (user.id === req.params.userId) return { ...user, ...req.body };
    else return user;
  });
  setUsers(updated);
  const user = users.find((user) => user.id === req.params.userId);
  if (!user) return next(new Error('User not found'));
  return res.send(user);
});

app.delete('/:userId', (req, res, next) => {
  const userCountBeforeDelete = users.length;
  const updated = users.filter((user) => user.id !== req.params.userId);
  if (userCountBeforeDelete === updated.length)
    return next(new Error('User not found'));
  setUsers(updated);
  return res.send(users);
});

export default app;
