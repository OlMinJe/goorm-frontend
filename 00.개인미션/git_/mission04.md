# (Git) branch 생성 및 전환하기

- 브랜치를 사용하면 독립된 작업을 진행할 수 있습니다. git branch 명령어를 사용해 새로운 브랜치를 생성하고, git checkout 명령어를 사용해 브랜치를 전환하여 작업을 진행하는 방법을 실습합니다.

## 1. 기본 브랜치 확인

```bash
git branch
```

기본 브랜치 이름이 `main` 혹은 `master`인지 확인

## 2. 새 브랜치 생성

```bash
git checkout -b feature/ming
```

## 3. 브랜치 전황

```bash
git switch feature/ming
```

## 4. 브랜치별 작업 내용 구분

```bash
echo "This is login feature" > login.txt
git add login.txt
git commit -m "Add login.txt on feature-login"
```

그 후 main으로 돌아가 비교하면

```bash
git checkout main
ls # login.txt 없음
```

feature-login에서 커밋한 상태로, main 전환 후 파일 사라진 모습을 확인할 수 있다.
