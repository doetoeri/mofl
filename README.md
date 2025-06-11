# mofl (MoneyFlow)

A minimalist personal accounting app demonstrating magic-link authentication and expressive Material 3 styling.

## Development

```bash
npm install
npm run dev
```

The dev script runs both the Express API server and the React development server.

Create a `.env` file based on `.env.example` with your PostgreSQL credentials and JWT secret.

## GitHub Pages 배포

GitHub Pages에서는 정적 파일만 제공되므로, React 빌드 결과물(dist 폴더)을 올려 프론트엔드만 배포할 수 있습니다. 백엔드는 별도 서버에 배포해야 합니다.

1. `package.json`의 `homepage` 값을 본인 GitHub 사용자명에 맞게 수정합니다.
2. 배포용 의존성 설치:
   ```bash
   npm install --save-dev gh-pages
   ```
3. 프로젝트 빌드 후 GitHub Pages 브랜치에 배포합니다.
   ```bash
   npm run deploy
   ```
   이 스크립트는 `webpack`으로 빌드한 후 `gh-pages` 브랜치에 `dist` 폴더를 푸시합니다.
4. GitHub 저장소의 Settings > Pages에서 배포 브랜치를 `gh-pages`로 설정하면 페이지가 공개됩니다.

백엔드 서버 주소는 `.env` 혹은 프록시 설정을 통해 수정하여 사용하십시오.
