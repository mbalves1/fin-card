export async function postTransactions(payload, token) {
  const response = await fetch('https://backend-finplan.vercel.app/api/services', {
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

export async function getTransactions({ page, perPage }) {

  const token = localStorage.getItem("token")
  return await fetch(`https://backend-finplan.vercel.app/api/services?page=${page}&perPage=${perPage}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
}
