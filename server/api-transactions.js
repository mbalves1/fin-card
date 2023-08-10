export async function postTransactions(payload, token) {
  console.log("payload api", payload)
  console.log("token api", token)
  const response = await fetch('https://backend-finplan.vercel.app/api/services', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log("data", response);
  return data;
}

export async function getTransactions() {
  const token = localStorage.getItem("token")
  return await fetch('https://backend-finplan.vercel.app/api/services', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
}
