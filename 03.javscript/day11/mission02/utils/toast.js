// 힌트: 클래스로 구현하고, 메서드를 외부로 전달할 때 this문제 해결을 위해 bind 사용.
// export function showToast(message, { duration = 2200 } = {}) {
//   const root = document.getElementById('toast-root');
//   if (!root) return;

//   const toast = document.createElement('div');
//   toast.className = 'toast';
//   toast.textContent = message;

//   root.appendChild(toast);

//   setTimeout(() => toast.remove(), duration);
// }

export class Toast {
  constructor(rootId = 'toast-root') {
    this.root = document.getElementById(rootId);
    if (!this.root) console.warn('Toast의 root element가 없음');

    // show를 콜백으로 전달할 때도 this가 유지되도록 바인딩
    this.show = this.show.bind(this);
  }

  show(message, { duration = 2200 } = {}) {
    if (!this.root) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    this.root.appendChild(toast);

    setTimeout(() => toast.remove(), duration);
  }
}
