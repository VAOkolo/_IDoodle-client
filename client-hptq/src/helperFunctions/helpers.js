//date transformation
export function dateTransformer(date) {
  const d = new Date(date);
  console.log(d);
  return d.toString();
}

//sorting users in descending order
export function sortUsers(data) {
  return data.sort(function (a, b) {
    return b.scores - a.scores;
  });
}

export async function postUsers(data, url) {
  const { username, scores } = data;

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
}
