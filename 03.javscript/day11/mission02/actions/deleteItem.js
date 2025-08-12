import { store } from '../store.js';
import { listEl } from '../utils/dom.js';
import { Toast } from '../utils/toast.js';

export function deleteItem() {
  listEl.addEventListener('click', (e) => {
    const deleteBtnEl = e.target;
    if (!deleteBtnEl.matches('.btn-delete')) return;

    const deleteCard = deleteBtnEl.closest('[data-id]');
    if (!deleteCard) return;

    const id = Number(deleteCard.dataset.id);

    store.set((prev) => {
      const newItems = prev.items.filter((item) => item.id !== id);
      const isNewItems = newItems.length === prev.items.length;
      return isNewItems ? prev : { ...prev, items: newItems };
    });

    const toast = new Toast();
    toast.show('삭제했어요.');
  });
}
