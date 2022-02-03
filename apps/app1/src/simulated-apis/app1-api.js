export default async function fetchApp1Api() {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          json() {
            return 'App1';
          },
        });
      }, 5000);
    });
    return promise;
  }
  