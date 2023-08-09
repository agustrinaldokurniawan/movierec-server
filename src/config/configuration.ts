export default () => ({
  node_env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
});
