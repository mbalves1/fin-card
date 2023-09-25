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

export async function getTransactionsFilters({item, value}, { page, perPage }) {

  const token = localStorage.getItem("token")
  return await fetch(`${URL_BASE}transactions/filter/${item}=${value}?page=${page}&perPage=${perPage}`, {
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

export async function putTransaction(payload) {
  const token = localStorage.getItem("token")
  const response = await fetch(`${URL_BASE}transactions/${payload._id}`, {
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
