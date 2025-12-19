# 合同会社C&O Webサイト（GitHub Pages）

このフォルダをそのまま GitHub リポジトリに push すれば、GitHub Pages で公開できます。

## 公開手順（最短）
1. GitHubで新規リポジトリ作成（例: `co-site`）
2. このフォルダの中身をリポジトリ直下へ配置して push
3. GitHub → Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
4. 数十秒後、Pages のURLが発行されます

## 独自ドメイン（任意）
- Pages 設定画面で Custom domain を入力
- DNS を設定（Aレコード or CNAME）
- `CNAME` ファイルをリポジトリ直下に置くと安定します

## お問い合わせフォーム（任意）
このサイトのフォームは Formspree を想定しています。
1) Formspreeでフォームを作成
2) `script.js` の `FORM_ENDPOINT` にURLを貼る

## 変更しやすいポイント
- 文言: `index.html`
- デザイン: `styles.css`（CSS変数の `--brand` など）
- 動き/フォーム: `script.js`
