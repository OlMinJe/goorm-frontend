# (Git) 브랜치 전략 설계하기

- Git Flow 전략 이해하고 문서화
- 실제 프로젝트에 적용할 수 있는 브랜치 전략 설계

## 1. Git Flow 전략

### 브랜치 종류 및 목적

- main: 제품에 배포되는 최종 버전
- develop: 다음 릴리스를 위한 통합 개발 브랜치
- feature/\*: 새로운 기능 개발 브랜치
- release/\*: 배포 준비용 브랜치
- hotfix/\*: 운영 이슈 긴급 수정용 브랜치

### 브랜치 흐름도

```bash
main ← hotfix
↑       ↑
release ← develop ← feature
```

### 예시

1. feature/기능 브랜치 생성
2. 작업 후 develop에 병합
3. 릴리스 전 release/버전 생성
4. 검토 후 main으로 병합 + 태깅

### 유의 사항

- 기능 개발은 반드시 feature 브랜치로 생성
- main 브랜치는 항상 안정된 상태를 유지해야 함
