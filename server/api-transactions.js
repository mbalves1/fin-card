import { URL_BASE } from './url';

export async function postTransactions(payload, token) {
  const response = await fetch(`${URL_BASE}transactions`, {
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
  return await fetch(`${URL_BASE}transactions?page=${page}&perPage=${perPage}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
}

export async function deleteTransaction(id) {
  const token = localStorage.getItem("token")
  return await fetch(`${URL_BASE}transactions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
}
