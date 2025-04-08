import { users } from './fakeData.mjs';
import routers from './routers/index.mjs';
import express from 'express';
import 'dotenv/config';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Some mega app-level middleware (i.e. it runs regardless of route or method)
app.use((req, res, next) => {
  // A pretend authenticated (i.e. logged in) user.
  req.user = users[0];
  return next();
});

app.use('/users', routers.users);
app.use('/messages', routers.messages);

app.get('/session', (req, res, next) => {
  if (!req.user) return next(new Error('User is not authenticated'));
  const session = users.find((user) => user.id === req.user.id);
  return res.send(session);
});

app.use((error, req, res, next) => {
  return res.send(error.message);
});

app.listen(PORT, () => console.log('Listening on port', PORT));
