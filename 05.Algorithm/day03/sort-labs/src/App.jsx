import GradeSorter from './GradeSorter';
import PriceSorter from './PriceSorter';

export default function App() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Day 3 — 정렬 알고리즘</h1>
      <GradeSorter />
      <hr style={{ margin: '24px 0' }} />
      <PriceSorter />
    </main>
  );
}
