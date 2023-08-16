export async function postCard(payload, token) {
  const response = await fetch('https://backend-finplan.vercel.app/api/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}

export async function getCard(token) {
  const response = await fetch('https://backend-finplan.vercel.app/api/cards', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}
