import { messages, setMessages } from '../fakeData.mjs';
import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const app = Router();

app.get('/', (req, res) => {
  return res.send(messages);
});

app.post('/', (req, res, next) => {
  const { text, userId } = req.body;
  if (!text || !userId)
    next(new Error('Message data is missing a required field'));
  const message = {
    id: uuid(),
    text,
    userId,
  };
  setMessages([...messages, message]);
  return res.send(message);
});

app.get('/:messageId', (req, res, next) => {
  const message = messages.find(
    (message) => message.id === req.params.messageId,
  );
  if (!message) return next(new Error('Message not found'));
  return res.send(message);
});

app.put('/:messageId', (req, res, next) => {
  // Just because this should give an error if the message is not found.
  const message = messages.find((msg) => msg.id === req.params.messageId);
  if (!message) return next(new Error('Message not found'));
  const updated = messages.map((message) => {
    if (message.id === req.params.messageId) {
      return {
        ...message,
        ...req.body,
      };
    } else return message;
  });
  setMessages(updated);
  const updatedMsg = messages.find((msg) => msg.id === req.params.messageId);
  return res.send(updatedMsg);
});

app.delete('/:messageId', (req, res, next) => {
  const msgCountBeforeDelete = messages.length;
  const updated = messages.filter(
    (message) => message.id !== req.params.messageId,
  );
  if (msgCountBeforeDelete === updated.length)
    return next(new Error('Message not found'));
  setMessages(updated);
  return res.send(messages);
});

export default app;
