# (Git) 기본 Git 워크플로(커밋, 푸시, 풀, 병합) 마스터하기

- Git의 기본 워크플로에 대해 학습합니다. 변경 사항을 저장하는 git commit, 원격 저장소에 변경 사항을 업로드하는 git push, 원격 저장소의 최신 상태를 받아오는 git pull, 그리고 여러 브랜치를 하나로 합치는 git merge 명령어를 사용하여 Git의 핵심 기능을 익힙니다.

## 1. 로컬에서 Clone & 초기 커밋

```bash
git clone https://github.com/사용자명/레포명.git
cd 프로젝트경로

echo "# Git 워크플로우 실습" > README.md
git add README.md
git commit -m "initial README"
git push origin main
```

## 2. 브랜치 생성 & 작업

```bash
git checkout -b feature/1
echo "기능 1 생성" > feature1.txt
git add feature1.txt
git commit -m "feature1.txt 생성"
git push origin feature/1
```

## 3. Github에서 Pull Request와 Merge 진행

1. Github 사이트에서 PR 생성

   - 이때, main이 타겟이 되도록 설정

2. 생성한 PR에 충돌이 없는지 확인(자동 체크) 후 main으로 merge 진행

## 4. 로컬에서 원격 내용 pull 받기

```bash
git switch main
git pull origin main
```

## 5. 기능 브랜치에 main의 최신 내용 반영하기

```bash
git switch feature/1
git pull origin main
```

이때 충돌나는 내용이 있다면 해결후 작업 내용 올리기

## (추가) 로컬에서 main에 내용 반영하기

```bash
git switch main
git merge feature/1
```
