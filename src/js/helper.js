const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('Request took too long.'));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout]);
    const data = await response.json();
    if (!response.ok) throw Error(`${data.message} ${response.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
