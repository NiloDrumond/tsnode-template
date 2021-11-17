// #!/usr/bin/env node
import express from 'express';

import { router } from './routes';

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {});

app.use(router);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
