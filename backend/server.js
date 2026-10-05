import app from "./app.js";
import config from "./src/config/config.js";
import connectToDB from "./src/config/db.js";
import logger from "./src/utils/logger.js";

await connectToDB();

app.listen(config.PORT, () => {
  logger.success("Server", `🚀 Server is running on port: ${config.PORT}`);
  logger.info("Server", `Environment: ${config.NODE_ENV || "development"}`);
  logger.info("Server", `Frontend URL: ${config.FRONTEND_URL}`);
});
