// import { twMerge } from 'tailwind-merge'

// export default function ButtonMerge({ isPrimary }) {
//   return (
//     <button
//       className={twMerge(
//         'px-4 py-2 rounded font-bold',
//         isPrimary ? 'bg-blue-500 text-white font-bold' : 'bg-gray-300 text-black'
//         // 'bg-red-500' // 마지막 우선 적용
//       )}
//     >
//       Click me
//     </button>
//   )
// }

import { twJoin } from 'tailwind-merge'

export default function ButtonMerge({ isPrimary }) {
  return (
    <button
      className={twJoin(
        'px-4 py-2 rounded font-bold',
        isPrimary ? 'bg-blue-500 text-white font-bold' : 'bg-gray-300 text-black'
        // 'bg-red-500' // 마지막 우선 적용
      )}
    >
      Click me
    </button>
  )
}
