import AppConfig from './appConfig.json';


class Config {
  appConfig: typeof AppConfig = AppConfig;

  SERVER_URL: typeof AppConfig.SERVER_URL;
  SERVER_MODE: typeof AppConfig.SERVER_MODE = this.appConfig.SERVER_MODE as "DEV" | "PROD" | "STAGING";
  ENABLE_LOGGING: boolean = this.appConfig.ENABLE_LOGGING;
  

  constructor() {
    this.SERVER_URL = this.appConfig.SERVER_URL;
    this.SERVER_MODE = this.appConfig.SERVER_MODE as "DEV" | "PROD" | "STAGING";
    this.ENABLE_LOGGING = this.appConfig.ENABLE_LOGGING;
  }

  get getServerUrl() {
    return this.SERVER_URL[this.SERVER_MODE as "DEV" | "PROD" | "STAGING"];
  }

  get isLoggingEnabled() {
    return this.ENABLE_LOGGING;
  }
}

export default new Config();