import prompt from 'prompt';

prompt.start();

const properties = [
  {
    name: 'username',
    validator: /^[a-zA-Z\s-]+$/,
    warning: 'Username must be only letters, spaces, or dashes',
  },
  {
    name: 'password',
    hidden: true,
  },
];

prompt.start();

prompt.get(properties, (err, result) => {
  if (err) {
    return onErr(err);
  }
  console.log('Command-line input received:');
  console.log('  Username: ' + result.username);
  console.log('  Password: ' + result.password);
});

function onErr(err: any) {
  console.log(err);
  return 1;
}
