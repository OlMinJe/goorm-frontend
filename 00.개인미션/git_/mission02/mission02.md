### (Git) Git 명령어 사용하기

- 다양한 Git 명령어를 사용해 커밋 내역을 관리하는 방법을 실습합니다. git commit 명령어를 사용해 코드 변경 사항을 커밋하고, 그 내역을 확인하는 방법을 학습합니다.

1. 프로젝트 폴더에 깃 세팅하기

```bash
cd 프로젝트_폴더_경로
git init
```

- `git init`은 현재 프로젝트 폴더 경로에 깃을 사용하기 위해서, git을 세팅해주는 명령어

2. 커밋 만들기

   2-1. 파일 생성하기(아래 코드는 예시)

   ```bash
   echo "파일 생성하기" > file.txt
   ```

   2-2. 커밋 준비 완료되었다고 알리기

   ```bash
   git add file.txt
   ```

   2-3. 준비 완료된 파일 커밋하기

   ```bash
   git commit -m "file.txt 파일 생성"
   ```

3. 파일 수정하기

   3-1. 파일 수정하기

   3-2. 커밋 준비 완료되었다고 알리기

   ```bash
   git add file.txt
   ```

   3-3. 준비 완료된 파일 커밋하기

   ```bash
   git commit -m "file.txt 파일 수정"
   ```

4. 커밋 내역 확인하기

   4-1. git log

   ```bash
   git log
   git log --graph --online -- all
   ```

   4-2. 특정 커밋 보기
   git show HEAD~1 혹은 해시번호
