import { store } from '../store.js';
import { listEl } from '../utils/dom.js';
import { showToast } from '../utils/toast.js';

export function deleteItem() {
  listEl.addEventListener('click', (e) => {
    const deleteBtnEl = e.target;
    if (!deleteBtnEl) return;

    const deleteCard = deleteBtnEl.closest('[data-id]');
    if (!deleteCard) return;

    const id = Number(deleteCard.dataset.id);

    store.set((prev) => {
      const newItems = prev.items.filter((item) => item.id !== id);
      return newItems.length === prev.items.length ? prev : { ...prev, items: newItems };
    });

    showToast('삭제했어요.');
  });
}
