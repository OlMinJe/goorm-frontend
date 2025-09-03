export function quickSortBy(arr, cmp) {
  const a = arr.slice();
  (function qs(lo, hi) {
    if (lo >= hi) {
      return;
    }
    const p = partition(a, lo, hi, cmp);
    qs(lo, p - 1);
    qs(p + 1, hi);
  })(0, a.length - 1);
  return a;
}

function partition(a, lo, hi, cmp) {
  const pivot = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (cmp(a[j], pivot) < 0) {
      [a[i], a[j]] = [a[j], a[i]];
      i++;
    }
  }
  [a[i], a[hi]] = [a[hi], a[i]];
  return i;
}

export const byNum = (sel) => (a, b) => sel(a) - sel(b);
