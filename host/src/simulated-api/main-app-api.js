export default async function fetchMainAppApi() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        json() {
          return {
            remotes: [
              {
                url: 'http://localhost:3001/remoteEntry.js',
                scope: 'App1',
                module: './RemoteApp',
              },
              {
                url: 'http://localhost:3002/remoteEntry.js',
                scope: 'App2',
                module: './RemoteApp',
              },
            ],
          };
        },
      });
    }, 3000);
  });
  return promise;
}
