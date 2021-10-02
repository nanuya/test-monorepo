##### 버리는거 복구시킴 참고용

# 모노레포 공부하기

$ yarn init -y

# Lerna 설정

- 모노레포 구성에 필요한 Lerna 설치
- Yarn Workspace 설정 뒤에는 -W 플래그를 주지 않으면 프로젝트 루트 레벨에 패키지를 설치할 수 없음
``` $ yarn add -DW lerna ```

이 전에 ``` $ npm i --global lerna ```
- Lerna 설정 파일 생성
``` $ lerna init ```

```json

{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0",
  "useWorkspaces": true, // Yarn Workspace 를 사용하겠다
  "npmClient": "yarn" // 패키지 관리 클라이언트로 yarn 을 사용하겠다
}

```

# 패키지 추가하기

## 리액트 앱 추가
``` $ yarn create react-app packages/app --typescript ```

- packages 폴더에 app 이라는 폴더가 생김
- app > package.json 파일을 열어 name 을 변경
- 리액트 앱을 lerna 나 yarn workspace 에서 식별하기 위한 이름으로 `@bomee/app`을 사용

- 생성된 패키지를 실행하는 방법
  - yarn workspace 사용
    ``` $ yarn workspace @bomee/app start ```
  - lerna 사용
    ``` $ lerna run start --scope=@bomee/app ```

단일 명령 사용 시 `yarn workspace` 가 나은 것 같고, 필터를 사용해 여러 패키지에 대한 작업을 수행할 때는 `lerna` 가 좋은 것 같다. (https://imch.dev/posts/make-react-app-with-monorepo/)

## 라이브러리 패키지 추가

- @bomee/app 앱에 별도의 패키지를 설치하여 그 패키지의 컴포넌트를 사용하기
- packages 폴더 안에 shared 폴더 생성
```
$ mkdir -p packages/shared
$ cd packages/shared
$ yarn init -y
$ yarn add -D typescript
$ tsc --init // 타입스크립트 설정 파일 생성
```

- `tsconfig.json` 에 다음과 같이 설정
```json
{
  "compilerOptions": {
    "jsx": "react",
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./build",
    "strict": true,
    "esModuleInterop": true
  }
}
```

- `package.json` 에 다음과 같이 설정
```json
{
  "name": "@bomee/shared",
  "version": "1.0.0",
  "main": "build/index.js",
  "types": "build/index.d.ts",
  "files": ["build"],
  "license": "MIT",
  "devDependencies": {
    "typescript": "^4.4.3"
  },
  "scripts": {
    "build": "tsc"
  }
}
```


## 궁금한 점... 👀

- 아니.. shared 에서 필요한 함수를 app > src > components 에서 import 하니까 src 외부에 있는 것은 import 할 수 없다고 에러 발생하는데??!!!
  그렇다면... isLogin 이런 공통 함수는 어떻게 불러와서 사용해야해...??????


아 ㅠㅠㅠㅠ app 에 shared 의존성을 추가하였는데 찾질 못 한다 ㅠㅠㅠ