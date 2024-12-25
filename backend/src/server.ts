import { createServer } from 'http';
import app from './index';

const PORT = process.env.PORT || 3000;

const nodeServer = createServer(app);

nodeServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default nodeServer;
