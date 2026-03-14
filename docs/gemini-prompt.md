# Gemini用プロンプト — GitHub Star Ranker

以下をGeminiにそのまま貼り付けてください。

---

## プロンプト本文

あなたは世界最高峰の3D WebアプリケーションUIエンジニアです。React + TypeScript + React Three Fiber を使い、サイトを開いた瞬間に「すごい」と声が出るレベルの3Dインタラクティブ体験を構築してください。

---

### プロジェクト概要

**GitHub Star Ranker** — プログラミング言語別に、GitHubで最もスターを集めたリポジトリを3D宇宙空間で探索できるWebアプリ。

ターゲット：世界中のエンジニア・技術者
言語：UIは英語

---

### コンセプト：「GitHubの星空」

「Star」という言葉の二重の意味を活かす。GitHubのスターが、宇宙の星として3D空間に浮かぶ。

- スター数が多いリポジトリほど、大きく明るく輝く
- 言語ごとに星の色が異なる
- 言語を切り替えると、星座が組み変わるようにトランジション
- 星をクリックするとリポジトリ情報が浮かび上がる
- 宇宙空間をマウスで自由に回転・ズームできる

---

### 技術スタック（必ずこの構成で実装すること）

```
React 19 + TypeScript
Vite（ビルドツール）
@react-three/fiber（React Three Fiber — Three.jsのReactラッパー）
@react-three/drei（便利ヘルパー集）
@react-three/postprocessing（Bloom等のポストエフェクト）
@react-spring/three（3Dアニメーション）
TanStack Query v5（@tanstack/react-query）（データフェッチング・キャッシュ）
GitHub REST API（データソース）
```

---

### 画面構成（4つの状態）

#### 状態1：ランディング（初回訪問時）

宇宙空間の中心に大きなタイトル「GitHub Star Ranker」がホログラム風に浮かぶ。背景には無数の微小パーティクルがゆっくり流れる。画面下部に「Select a language to explore」とサブテキスト。言語セレクターが既に表示されている。

言語を選択すると、タイトルが上方にフェードしながら縮小し、代わりに星たちが中心に向かって飛来するアニメーションで出現する。

#### 状態2：ランキング表示（メイン画面）

3D空間にトップ30リポジトリが星として浮かぶ。

星の配置ルール：
- スター数1位の星が中心付近に最も大きく配置
- 2位以降は螺旋状に外側へ広がって配置
- 各星はゆっくり自転（脈動するように微妙にスケール変化）
- 星と星の間に細い光のライン（コンステレーション風）が走る

言語セレクターは常に画面上部に表示（2D UIオーバーレイ）。

星にマウスホバーすると：
- その星が少し明るくなる
- リポジトリ名とスター数がツールチップとして浮かび上がる

#### 状態3：リポジトリ詳細（星クリック時）

カメラが選択した星にスムーズにズームイン。
右側からガラス風パネルがスライドインして以下を表示：

```
リポジトリ名
説明文（description）
★ スター数  |  🍴 フォーク数  |  📝 言語
オーナーアバター + オーナー名
最終更新日
[View on GitHub] ボタン
[View Owner's Repos →] リンク
```

背景の3D空間は暗くブラーがかかり、選択した星だけが明るく残る。

「×」または背景クリックでパネルが閉じ、カメラが元の位置に戻る。

#### 状態4：ユーザー詳細（オーナークリック時）

パネル内容がトランジションしてユーザー情報に切り替わる：

```
アバター（大）
ユーザー名 / 表示名
Bio
フォロワー数 / フォロー数 / 公開リポジトリ数
---
そのユーザーのトップリポジトリ一覧（スター数順、上位10件）
各リポジトリはクリックでGitHubに遷移
```

「← Back to repo」で状態3に戻る。
「✕ Close」で状態2に戻る。

---

### 言語セレクター仕様

表示する言語（10種）：
```
TypeScript  #3178c6
JavaScript  #f7df1e
Python      #3776ab
Go          #00add8
Rust        #dea584
Java        #b07219
C++         #f34b7d
Swift       #f05138
Kotlin      #a97bff
Ruby        #701516
```

- 水平方向に並ぶピル型ボタン
- 選択中の言語はその言語色で光る
- 未選択はグレーの半透明
- 切替時に星が入れ替わるアニメーション（古い星がスケール0にシュリンク → 新しい星がスケール0からポップイン、0.3秒ずらしてカスケード）

---

### 3D演出の詳細仕様

#### 背景
- 色: #050510（漆黒に近い紺）
- パーティクル: 2000個のPointsで星屑を表現
- パーティクルはゆっくりY軸回転（0.0003rad/frame）
- 一部のパーティクルはランダムに瞬く（opacity 0.3〜1.0をsin波で変化）

#### リポジトリの星
- ジオメトリ: SphereGeometry（segments: 32）
- マテリアル: MeshStandardMaterial
  - color: 言語色
  - emissive: 言語色
  - emissiveIntensity: スター数に比例（0.5〜2.0）
  - roughness: 0.2
  - metalness: 0.8
- 各星の周囲に PointLight（intensity: スター数に比例、distance: 5）
- サイズ: log(スター数) * 定数 でスケーリング（大きすぎる差を抑える）
- 自転: Y軸で0.005rad/frame
- 脈動: scale = 1 + sin(time * 2) * 0.03

#### ポストプロセシング
- Bloom: intensity 1.5, luminanceThreshold 0.6, luminanceSmoothing 0.9
- Vignette: 軽く（offset 0.3, darkness 0.7）

#### カメラ
- PerspectiveCamera: fov 60, near 0.1, far 1000
- 初期位置: (0, 0, 25)
- OrbitControls: enableDamping, dampingFactor 0.05, maxDistance 50, minDistance 5
- 星クリック時: カメラが星の位置 + (3, 1, 3) にスムーズ移動

#### アニメーション（@react-spring/three）
- 星の出現: scale 0→1, opacity 0→1 (config: { mass: 1, tension: 170, friction: 26 })
- 星の退場: scale 1→0 (config: { mass: 1, tension: 200, friction: 30 })
- カスケード: 各星に index * 50ms のディレイ
- カメラ移動: 1秒かけてイージング

---

### UIデザイン仕様

#### 全体
- ダークテーマ固定（宇宙空間のため）
- フォント: 'Inter' (Google Fonts)
- テキストカラー: #e0e0e0（通常）、#ffffff（強調）
- 角丸: 12px（パネル）、24px（ピル型ボタン）

#### glassmorphism パネル
```css
background: rgba(15, 15, 35, 0.7);
border: 1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
```

#### ローディング表示
- 星が1つずつ生成されていくアニメーション
- 「Fetching stars from the universe...」テキスト
- プログレス感のあるアニメーション

#### レスポンシブ
- PC: フル3D体験
- タブレット: 3D維持、パネルはフルスクリーン
- スマホ: 3D維持、言語セレクターは横スクロール、パネルはボトムシート

---

### データフェッチング設計（最重要）

#### GitHub API エンドポイント

リポジトリ検索:
```
GET https://api.github.com/search/repositories?q=language:{lang}+stars:>1000&sort=stars&order=desc&per_page=30
```

ユーザー詳細:
```
GET https://api.github.com/users/{username}
```

ユーザーのリポジトリ:
```
GET https://api.github.com/users/{username}/repos?sort=stars&direction=desc&per_page=10
```

#### TanStack Query 設計

```tsx
// リポジトリ一覧取得
export function useRepositories(language: string) {
  return useQuery({
    queryKey: ['repositories', language],
    queryFn: ({ signal }) => fetchRepositories(language, signal),
    staleTime: 5 * 60 * 1000,    // 5分間キャッシュ
    gcTime: 30 * 60 * 1000,      // 30分間保持
    enabled: !!language,
  });
}

// ユーザー詳細取得
export function useUserDetail(username: string) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: ({ signal }) => fetchUserDetail(username, signal),
    staleTime: 10 * 60 * 1000,
    enabled: !!username,
  });
}
```

#### API関数（AbortSignal対応）

```tsx
export async function fetchRepositories(language: string, signal?: AbortSignal) {
  const res = await fetch(
    `https://api.github.com/search/repositories?q=language:${language}+stars:>1000&sort=stars&order=desc&per_page=30`,
    { signal }  // ← AbortSignal をfetchに渡す
  );
  if (!res.ok) throw new Error('Failed to fetch repositories');
  const data = await res.json();
  return data.items;
}
```

TanStack QueryはqueryFnにsignalを自動で渡す。コンポーネントのアンマウントやクエリキーの変更時に自動でAbortされる。これにより手動のAbortControllerやisCancelledフラグは不要になる。

---

### コンポーネント設計（3つの原則を厳守）

#### 原則1: useEffectの依存配列
useEffect内で参照する値は全て依存配列に含める。ESLintのexhaustive-depsルールに従う。このプロジェクトではデータフェッチングにTanStack Queryを使うためuseEffect+fetchのパターンは使わないが、3DアニメーションなどでuseEffectを使う場合は必ず依存配列を正しく設定すること。

#### 原則2: データフェッチングはTanStack Query
- useEffect + fetch は使わない
- TanStack Queryがキャッシュ・キャンセル・ローディング状態・エラー状態を全て管理
- queryFnのsignalパラメータでAbortSignalをfetchに渡す

#### 原則3: Props drillingはコンポーネント合成で解決
- 中間コンポーネントが不要なpropsを受け取らない設計にする
- children や render props パターンを活用する
- Context APIはテーマなどアプリ全体で共有する値にのみ使用する
- サーバーデータの共有はTanStack Queryのキャッシュに任せる

#### コンポーネント合成の具体例

```tsx
// ❌ Props drilling
function App() {
  const { data } = useRepositories('typescript');
  return <Scene repos={data} />;  // Sceneが中継するだけ
}
function Scene({ repos }) {
  return <StarGroup repos={repos} />;  // またreposを渡すだけ
}

// ✅ コンポーネント合成
function App() {
  const { data } = useRepositories('typescript');
  return (
    <Scene
      stars={data?.map(repo => (
        <RepoStar key={repo.id} repo={repo} />
      ))}
    />
  );
}
function Scene({ stars }) {
  return <group>{stars}</group>;  // 中身を知らない。置くだけ
}
```

---

### ファイル構成

```
src/
├── components/
│   ├── three/                    # 3Dコンポーネント
│   │   ├── Scene.tsx             # Canvas + カメラ + ライト + ポストプロセシング
│   │   ├── StarField.tsx         # 背景の星屑パーティクル
│   │   ├── RepoStar.tsx          # 1つのリポジトリ星（球体 + ライト + アニメーション）
│   │   └── CameraController.tsx  # カメラのスムーズ移動制御
│   ├── ui/                       # 2D UIオーバーレイ
│   │   ├── LanguageSelector.tsx  # 言語選択ピルボタン
│   │   ├── RepoDetailPanel.tsx   # リポジトリ詳細パネル
│   │   ├── UserDetailPanel.tsx   # ユーザー詳細パネル
│   │   ├── LoadingOverlay.tsx    # ローディング表示
│   │   └── LandingTitle.tsx      # 初回タイトル表示
│   └── layout/
│       └── AppLayout.tsx         # 3DとUIの統合レイアウト
├── hooks/
│   ├── useRepositories.ts        # TanStack Query: リポジトリ検索
│   ├── useUserDetail.ts          # TanStack Query: ユーザー詳細
│   └── useUserRepos.ts           # TanStack Query: ユーザーのリポジトリ
├── api/
│   └── github.ts                 # GitHub API呼び出し関数（AbortSignal対応）
├── types/
│   └── github.ts                 # 型定義（Repository, User, etc.）
├── utils/
│   ├── starLayout.ts             # 星の3D配置計算（螺旋配置）
│   └── colors.ts                 # 言語→色のマッピング
├── App.tsx                       # ルートコンポーネント（QueryClientProvider配置）
├── main.tsx                      # エントリポイント
└── index.css                     # グローバルスタイル（Inter読み込み、リセット）
```

---

### 出力要件

1. 上記のファイル構成に従い、全ファイルの完全なソースコードを出力すること
2. 一切の省略・「...」・「// 残りの実装」をしないこと
3. コメントは日本語で記載すること
4. package.jsonも出力すること（全依存パッケージを含む）
5. vite.config.tsも出力すること
6. tsconfig.jsonも出力すること
7. index.htmlも出力すること

### 品質基準

- TypeScriptの型は厳密に（anyを使わない）
- React 19のベストプラクティスに従う
- パフォーマンスを意識（React.memo, useMemo, useCallbackを適切に使用）
- アクセシビリティを意識（aria-label等）
- コードは読みやすく、1ファイル200行以内を目安に
