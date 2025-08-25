import app from "./app";
import config from "./config/appConfig";
import logger from "./logger";

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
  console.log(`Server running on port ${config.port}`);
});
