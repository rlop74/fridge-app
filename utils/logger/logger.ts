// https://www.npmjs.com/package/react-native-logs

import Config from "@/configs/config";

class Logger {
  filePath: string

  constructor(filePath = "") {
    this.filePath = filePath;
  }

  debug(...args: any) {
    return Config.isLoggingEnabled ? console.log("DEBUG:", this.filePath, ":", ...args) : () => {};
  }

  warn(...args: any) {
    return Config.isLoggingEnabled ? console.warn("WARN:", this.filePath, ":", ...args) : () => {};
  }

  error(...args: any) {
    return Config.isLoggingEnabled ? console.error("ERROR:", this.filePath, ":", ...args) : () => {};
  }
}

const logger = new Logger();

export {
  logger as appLogger
};

export default Logger

