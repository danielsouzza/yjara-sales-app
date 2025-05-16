export const config = {
  api: {
    baseURL: process.env.API_BASE_URL,
    timeout: parseInt(process.env.API_TIMEOUT) || 10000
  },
  app: {
    name: process.env.APP_NAME,
    env: process.env.APP_ENV,
    debug: process.env.APP_DEBUG === 'true'
  }
};

export default config;
