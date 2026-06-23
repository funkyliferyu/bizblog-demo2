# 비즈플래닛 마케팅 채널관리 데모

Store Learning & Blog Content Automation PoC 화면을 Bizchat 데모 방식으로 정적 HTML 렌더링한 산출물입니다.

```bash
node_modules/.bin/tsx build/exportStoreLearningFixture.ts
node_modules/.bin/tsx build/render.tsx
cp src/styles/base.css demo/styles/base.css
npm run serve
```

브라우저에서 `http://localhost:4174`를 열어 시나리오를 확인합니다.
