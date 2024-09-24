// worker.js
self.onmessage = async (event) => {
  const { url } = event.data;
  try {
    const response = await fetch(url);

    if (!response.body) {
      postMessage({ error: 'ReadableStream not supported by the browser' });
      return;
    }

    const reader = response.body.getReader();
    let receivedLength = 0;
    let chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      const size = receivedLength / (1024 * 1024);
      postMessage({ size });
    }

    const body = new Blob(chunks);
    const text = await body.text();

    postMessage({ data: text, done: true });
  } catch (error) {
    postMessage({ done: true, error: error.message });
  }
};
