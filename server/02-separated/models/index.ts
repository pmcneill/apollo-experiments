import { User, Message } from '../types';

const users : { [k: string] : User } = {
  "2886": { id: "2886", first: "Patrick", last: "McNeill" },
  "211": { id: "211", first: "Erin", last: "McNeill" },
  "1": { id: "1", first: "Admin", last: "Jones" },
};

const messages : { [k: string] : Message } = {
  1: { id: "1", text: "hello world", userId: "2886" },
  2: { id: "2", text: "fooooo", userId: "211" },
};

export default {
  users,
  messages,
};
