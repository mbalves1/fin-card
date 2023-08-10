export async function postLogin(payload) {
  console.log("api-server", payload);
  const response = await fetch('https://backend-finplan.vercel.app/api/auth/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}