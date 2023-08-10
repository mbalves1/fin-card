export async function postReleases(payload) {
  const response = await fetch('https://backend-finplan.vercel.app/api/services', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}

export async function deleteRelease(id) {
  return await fetch(`https://backend-finplan.vercel.app/api/services/${id}`, {
    method: 'DELETE',
  });
}

// Cards
export async function getCards() {
  return await fetch('https://backend-finplan.vercel.app/api/cards');
}

// Login
// export async function postLogin(payload) {
//   console.log(payload);
//   const response = await fetch('https://backend-finplan.vercel.app/api/auth/user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });
//   const data = await response.json();
//   return data;
// }

export async function register(payload) {
  const response = await fetch('https://backend-finplan.vercel.app/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}
