import ButtonMerge from '@/components/ButtonMerge'
import { Button } from '@/components/ui/button'

export default function MyApp() {
  return (
    <div>
      <Button>버튼입니다</Button>
      <ButtonMerge isPrimary>isPrimary가 true랍니다</ButtonMerge>
      <ButtonMerge>isPrimary가 false랍니다.</ButtonMerge>
    </div>
  )
}
