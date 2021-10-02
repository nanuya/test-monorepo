# 모노레포 학습하기!

// @TODO
이론부분은 나중에 채워넣기!

```
$ mkdir react-pro-monorepo
$ cd react-pro-monorepo

$ yarn init -y
```

- 생성된 `package.json` 파일을 열어서 다음과 같이 수정
```json
{
  "name": "@pro/root",
  "version": "1.0.0",
  "license": "MIT",
  "private": true,
  "devDependencies": {
    "lerna": "^4.0.0"
  },
  "workspaces": [
    "packages/*"
  ]
}
```

## Lerna 설정

- 모노레포 구성에 필요한 Lerna 설치
- Yarn Workspace -W (watch) 모드로 설정
```
$ yarn add -DW lerna
$ lerna init
```

- lerna.json 설정 수정
```json
{
  "packages": [
    "packages/*"
  ],
  "version": "1.0.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

여기까지가 기본적인 모노레포 패키지 추가하는 설정

-----

## 패키지 추가하기 (common, admin, product)

### common
```
$ yarn create react-app common --template typescript
$ yarn create react-app admin --template typescript
$ yarn create react-app product --template typescript
```

- `common` 안에 있는 package.json 이름 변경하기 : `@pro/common`
- `src/components/Button.tsx` 만들기
- `src/index.tsc` 아래와 같이 `export` 하기
  ```ts
  import Button from './components/Button';
  export {
    Button
  }
  ```


사용하는 곳에서는 `@pro/common` 패키지를 `import` 해줘야 한다

### product
- `src/App.tsx` 에서 `import {Button} from '@pro/common` 하기
- 🌬 이 때 `import` 에러 발생
- 모노레포에서 다른 패키지 의존성을 추가할 때는
 `$ lerna add @pro/common --scope=@pro/product` 로 추가
 이렇게 한 후에 다시 `yarn start` 를 하게 되면 자꾸 `@pro/product/src` 내에서 찾으려고 한다. 이를 위해 다음과 같이 수정한다
 - common 폴더 `package.json` 에 { main: './src/index.tsx' } -> Button 컴포넌트를 `export` 해주고 있는 `index` 파일을 메인으로 엔트리 파일을 설정
 - 그럼 이제 webpack loader 에서 index 파일을 로드하지 못 한다는 에러 발생
   - 이유는 모르겠지만.. webpack 설정을 덮어쓰기 위해서 craco 를 설치
   ```
    $ yarn add @craco/craco -D (참고로 얘는 product 패키지에 추가)
    $ touch craco.config.js
   ```
   - 그 다음에는 `package.json` 에 `script`를 `react-scripts` 부분을 -> `craco` 로 변경

