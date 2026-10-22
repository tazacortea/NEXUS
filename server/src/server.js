import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = process.env.PORT || 5000;

connectDatabase()
  .then(() => {
    app.listen(port, () => console.log(`NEXUS API listening on http://localhost:${port}`));
  })
  .catch((error) => {
    console.error("Could not start NEXUS API:", error.message);
    process.exit(1);
  });
