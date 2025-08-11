export function showToast(message, { duration = 2000 } = {}) {
  const root = document.getElementById('toast-root');
  if (!root) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;

  root.appendChild(toast);

  setTimeout(() => toast.remove(), duration);
}
