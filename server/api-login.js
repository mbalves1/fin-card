export async function postLogin(payload) {
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

export async function registerUser(payload) {
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

export async function getUser() {
  const token = localStorage.getItem("token")
  const response = await fetch(`https://backend-finplan.vercel.app/api/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}