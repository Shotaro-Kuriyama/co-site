# Webサイト（GitHub Pages）

GitHub Pages で公開。

## 公開手順
1. GitHubで新規リポジトリ作成（例: `co-site`）
2. 作成したindex.htmlファイルをリポジトリ直下へ配置して push
3. GitHub → Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
4. 数十秒後、Pages のURLが発行される

## 独自ドメイン（任意）
- Pages 設定画面で Custom domain を入力
- DNS を設定（Aレコード or CNAME）
- `CNAME` ファイルをリポジトリ直下に置く
