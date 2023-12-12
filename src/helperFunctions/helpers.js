//date transformation
export function dateTransformer(date) {
  const d = new Date(date);
  return d.toString();
}

//sorting users in descending order
export function sortUsers(data) {
  return data.sort(function (a, b) {
    return b.scores - a.scores;
  });
}

export function postUsers(data) {
  data.forEach((player) => postUser(player));
}

async function postUser(data) {
  let url = "https://idoodle.onrender.com/users";
  // let url = "https://localhost:4000/users"

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": "token-value",
    },
    body: JSON.stringify(data),
  };

  fetch(url, options)
    .then((res) => console.log("I Have Posted The User(s): " + res))
    .catch((err) => console.log(err));
}
