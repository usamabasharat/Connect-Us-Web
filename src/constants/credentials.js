export const credentials = [
  {
    email: 'ans@gmail.com',
    password: 'password',
  },
  {
    email: 'hira@gmail.com',
    password: 'pass',
  },
  {
    email: 'sibghat@outlook.com',
    password: 'word',
  },
];

export function updateUsers(newUser) {
  credentials.push(newUser);
}
