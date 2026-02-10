import Logger from "@/utils/logger/logger";

const useLogger = (namespace: string) => {
  const logger = new Logger(namespace);
  return logger;
}

export default useLogger;