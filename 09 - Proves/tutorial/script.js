const worker = new Worker('./generate.js');

worker.postMessage({
    command: 'generate',
    quota: 10000000
  });

worker.addEventListener('message', (message) => {
    console.log(message.data);
  });
  