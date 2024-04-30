import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('Request took too long.'));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw Error(`${data.message} ${response.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export async function sendJson(url, recipe) {
  const response = await Promise.race([
    fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify(recipe),
      },
      timeout(TIMEOUT_SEC)
    ),
  ]);
  const data = await response.json();
  if (!response.ok) throw new Error(`${data.message} ${response.status}`);
}
