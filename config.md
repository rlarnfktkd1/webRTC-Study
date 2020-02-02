- 1. react react-dom next 설치
     <pre>$ yarn add react react-dom next</pre>
- 2. typescript, @types/react @types/node devDependecies모듈 추가
     <pre>$ yarn add typescript @types/react @types/node -D</pre>
- 3. package.json 스크립트 추가
     <pre>
     "scripts": {
       "dev": "node server.js",
       "build": "next build",
       "export": "next export",
       "start": "cross-env NODE_ENV=production node server.js"
     },
      </pre>
- 4. Store 생성 => src/store 안에 생성해줍니다.
- 5. nextjs github에서 withApolloReduxsaga를 보고 참고해서 짤것.
- 6. server.js에 static 파일을 같이 로드하기 위해 수정해줍니다.
- static 폴더안에 favicon파일을 넣고 server.js파일을 수정해주면된다. 파비콘 등록 완료

- 7. 스타일 컴포넌트 사용시에 클라이언트쪽 클래스네임과 서버쪽 클래스네임이 달라서 에러가나는데 .babelrc 파일 수정을 통해 해결 가능하다.

- 8. Serverless 배포시
     => 1. yarn export를 이용해서 out폴더로 빼준다.
     => 2. firebase init을 통해서 hosting 서비스를 열어준다. (디렉터리 지정시에 out으로 지정)
     => 3.
