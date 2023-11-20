import { URL_BASE } from './url';

export async function postLogin(payload) {
  const response = await fetch(`${URL_BASE}auth/user`, {
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
  const response = await fetch(`${URL_BASE}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return response.status === 201
}

export async function getUser() {
  const token = localStorage.getItem("token")
  const response = await fetch(`${URL_BASE}user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

export async function forgotPass(payload) {
  const response = await fetch(`${URL_BASE}forgot_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}

export async function resetPass(payload) {
  const response = await fetch(`${URL_BASE}reset_password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}