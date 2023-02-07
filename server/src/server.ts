import { server } from "./index";

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
