const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 1318,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        credentials: true // ini untuk CORS
      },
    },
  });

  server.route(routes);

  try {
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`); // Perbaikan template literal
  } catch (err) {
    console.error('Gagal memulai server:', err);
    process.exit(1);
  }
};

init();