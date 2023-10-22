import server from "./api/server.js";

const port = 3008

server.listen(port, () => console.log(`Server is runnning port at ${port}`))