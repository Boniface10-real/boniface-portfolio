// Change this URL if your API is deployed to a hosting service.
const API_URL = 'https://boniface-portfolio.onrender.com/api/portfolio';
const form = document.getElementById('portfolio-form');
const recordId = document.getElementById('record-id');
const recordsBody = document.getElementById('records');
const message = document.getElementById('form-message');
const fields = ['owner_name','headline','bio','email','location','skills','projects','linkedin_url','github_url'];
document.getElementById('year').textContent = new Date().getFullYear();

async function api(path = '', options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}

async function loadRecords() {
  recordsBody.innerHTML = '<tr><td colspan="4">Loading records...</td></tr>';
  try {
    const rows = await api();
    if (!rows.length) {
      recordsBody.innerHTML = '<tr><td colspan="4">No records yet. Add one using the form above.</td></tr>';
      return;
    }
    recordsBody.innerHTML = rows.map(row => `
      <tr><td>${row.id}</td><td><strong>${escapeHtml(row.owner_name)}</strong><br><small>${escapeHtml(row.headline)}</small></td>
      <td>${escapeHtml(row.location || '—')}</td><td><button type="button" data-edit="${row.id}">Edit</button><button class="delete" type="button" data-delete="${row.id}">Delete</button></td></tr>`).join('');
  } catch (error) {
    recordsBody.innerHTML = `<tr><td colspan="4">Could not load records. Start the backend server first. (${escapeHtml(error.message)})</td></tr>`;
  }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function clearForm() {
  form.reset(); recordId.value = ''; document.getElementById('save-button').textContent = 'Save record'; message.textContent = '';
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  const body = Object.fromEntries(fields.map(field => [field, document.getElementById(field).value.trim()]));
  const id = recordId.value;
  try {
    await api(id ? `/${id}` : '', { method: id ? 'PUT' : 'POST', body: JSON.stringify(body) });
    message.textContent = id ? 'Portfolio record updated successfully.' : 'Portfolio record created successfully.';
    clearForm(); await loadRecords();
  } catch (error) { message.textContent = `Error: ${error.message}`; }
});
document.getElementById('reset-button').addEventListener('click', clearForm);
recordsBody.addEventListener('click', async event => {
  const editId = event.target.dataset.edit;
  const deleteId = event.target.dataset.delete;
  if (editId) {
    try {
      const row = await api(`/${editId}`);
      recordId.value = row.id;
      fields.forEach(field => { document.getElementById(field).value = row[field] || ''; });
      document.getElementById('save-button').textContent = 'Update record';
      message.textContent = `Editing record #${row.id}. Change the fields and select Update record.`;
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) { message.textContent = error.message; }
  }
  if (deleteId) {
    if (!confirm(`Delete portfolio record #${deleteId}?`)) return;
    try { await api(`/${deleteId}`, { method: 'DELETE' }); message.textContent = 'Record deleted.'; await loadRecords(); }
    catch (error) { message.textContent = error.message; }
  }
});
loadRecords();
