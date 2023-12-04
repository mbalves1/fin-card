import { URL_BASE } from './url';

export async function postCategory(payload, token) {
  const response = await fetch(`${URL_BASE}category`, {
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

export async function getCategory(token) {
  const response = await fetch(`${URL_BASE}categorys`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data;
}

export async function putCategory(payload, token) {
  const response = await fetch(`${URL_BASE}category/${payload._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  return response;
}

export async function deleteCategory(id, token) {
  const response = await fetch(`${URL_BASE}category/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return response;
}
