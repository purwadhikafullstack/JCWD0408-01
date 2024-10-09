module.exports = {
    apps: [
      {
        name: 'jcwd040801-web',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 4081,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwd040801.purwadhikabootcamp.com/apps/web',
      },
      {
        name: 'jcwd040801-api',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 4181,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwd040801.purwadhikabootcamp.com/apps/api',
      },
    ],
   };