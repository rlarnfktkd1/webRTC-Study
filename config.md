- 1. react react-dom next 설치
     <pre>$ yarn add react react-dom next</pre>
- 2. typescript, @types/react @types/node devDependecies모듈 추가
     <pre>$ yarn add typescript @types/react @types/node -D</pre>
- 3. package.json 스크립트 추가
      <pre>
      "scripts": {
       "dev": "node server.js",
       "build": "next build",
       "start": "cross-env NODE_ENV=production node server.js"
     },
       </pre>
- 4. Store 생성 => src/store 안에 생성해줍니다.
