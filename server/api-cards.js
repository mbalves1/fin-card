import { URL_BASE } from './url';

export async function postCard(payload, token) {
  const response = await fetch(`${URL_BASE}cards`, {
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
  const response = await fetch(`${URL_BASE}cards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

export async function removeCard(token, id) {
  return await fetch(`${URL_BASE}cards/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

export async function putCard(payload, token) {

  const { _id } = payload
  const response = await fetch(`${URL_BASE}cards/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
}