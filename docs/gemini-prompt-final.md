# Gemini用プロンプト — GitHub Star Ranker（最終版）

---

## 仮想デザイナーレビュー

### レビュアー：Kenji Yamada（仮想）
経歴：Awwwards受賞歴3回、Stripe・Linear・Vercelのインタラクティブ演出を手がけた3Dウェブデザイナー。年収$180K。

### レビューコメント

> 最初の草案を確認した。技術仕様としては十分だが、**「使いたい」「触りたい」と思わせる演出が弱い**。以下を指摘する。
>
> **1. ランディングが弱い**
> タイトルが浮かんでいるだけでは退屈。ユーザーが初めてサイトを開いた瞬間の「没入体験」が足りない。宇宙空間に吸い込まれるような導入が必要。
>
> **2. マウス追従がない**
> 3Dサイトで最も重要なのは「自分が操作している感覚」。マウスの動きに連動してパーティクルが反応する、光が追従するなどのインタラクションが必須。
>
> **3. サウンドがない**
> 星をクリックした時、言語を切り替えた時の微細なサウンドフィードバックがあるだけで体験の質が跳ね上がる。
>
> **4. 星の表現が単純すぎる**
> 単なる球体ではなく、レンズフレア、グロウリング、パーティクル放出など、星らしい表現が必要。「本物の星空を見ているような感動」が欲しい。
>
> **5. スクロールストーリーテリングがない**
> ランディング → ランキングの遷移がボタンクリックだけ。スクロールでカメラが移動しながらストーリーが展開する演出を入れるべき。
>
> **6. シェアラビリティが低い**
> SNSでスクリーンショットを共有した時に「これ何？」と思わせるビジュアルインパクトが必要。OGP画像の自動生成も検討すべき。

### レビュー反映結果

上記6点を全て反映した最終版プロンプトを以下に記載。

---

## 最終版プロンプト（Geminiにこれを貼り付ける）

---

あなたは世界最高峰の3D WebアプリケーションUIエンジニア兼インタラクションデザイナーです。Awwwards Site of the Year を獲得するレベルの、サイトを開いた瞬間に息を呑むような3Dインタラクティブ体験を構築してください。「触ってみたい」「誰かに見せたい」「スクリーンショットを撮りたい」— そう思わせることが最優先の目標です。

---

### プロジェクト概要

**GitHub Star Ranker** — プログラミング言語別に、GitHubで最もスターを集めたリポジトリを3D宇宙空間で探索できるWebアプリ。

「Star」の二重の意味（GitHubのスター ＝ 宇宙の星）を活かし、コードの世界を宇宙として可視化する。

ターゲット：世界中のエンジニア・技術者
言語：UIは英語

---

### 技術スタック（必ずこの構成で実装すること）

```
React 19 + TypeScript
Vite（ビルドツール）
@react-three/fiber（Three.jsのReactラッパー）
@react-three/drei（便利ヘルパー：Html, Float, Trail, Sparkles, Stars, Text, MeshDistortMaterial等）
@react-three/postprocessing（Bloom, ChromaticAberration, Vignette）
@react-spring/three（3Dスプリングアニメーション）
TanStack Query v5（@tanstack/react-query）
GitHub REST API
```

---

### 体験フロー（シネマティック設計）

#### Phase 0：ロード中（0〜2秒）

真っ暗な画面。中央に小さな光の粒が1つ脈動している。
画面下部に細いプログレスバーが静かに伸びる。
テキスト：「Connecting to the universe...」（Inter Light, letter-spacing: 0.3em, opacity 0.5）

#### Phase 1：ランディング（ロード完了後）

光の粒が爆発するように拡散 → 無数のパーティクルが四方に飛び散り、宇宙空間が形成される。カメラがゆっくり後退して全体が見える。

中央にタイトルが出現：
```
GITHUB
  STAR
RANKER
```
- フォント: Inter Black, 超大文字
- テキストは3D空間に配置（@react-three/drei の Text3D または Text）
- 文字にホログラフィック風マテリアル（虹色の微妙な反射）
- 背後からボリュームライトが文字のシルエットを照らす

タイトルの周囲：
- 10個の言語アイコン（円形配置）がゆっくり公転
- 各アイコンはその言語色で淡く光っている
- マウスの位置に応じてパララックス効果で全体がわずかに傾く

画面下部テキスト：
「Choose a language to explore the stars ↓」
下矢印がふわふわ上下にバウンス

#### Phase 2：言語選択 → 宇宙探索（メイン画面）

言語アイコンをクリック、またはスクロールすると遷移開始。

遷移アニメーション：
1. タイトルが上方にフェードアウト（0.5秒）
2. 選択した言語の色の光がカメラに向かって飛んでくる（0.3秒）
3. 画面が一瞬その言語色にフラッシュ
4. フラッシュが引くと、宇宙空間にリポジトリの星たちが出現している
5. 星は中心から外側に向かって1つずつ次々とポップイン（カスケード、各50msディレイ）

メイン画面の構成：
- 3D空間：リポジトリの星が螺旋配置で浮遊
- 画面上部：言語セレクター（常時表示、2D UIオーバーレイ）
- 画面左下：「Showing top 30 {Language} repositories by stars」テキスト
- 画面右下：操作ガイド「Drag to rotate · Scroll to zoom · Click a star」

#### Phase 3：星のインタラクション

**ホバー時：**
- 星が1.2倍に拡大（spring animation）
- 星の周囲にリング状のオーラが出現
- ツールチップが浮かび上がる（リポジトリ名 + ★数）
- カーソルがポインターに変化
- 近くの星との接続ライン（コンステレーション）が明るくなる

**クリック時：**
- 微細なパルス波が星から同心円状に広がる
- カメラがその星にスムーズにドリー（1秒）
- 他の星が暗くなる（opacity 0.15に）
- 右側からガラスモーフィズムのパネルがスライドイン

#### Phase 4：詳細パネル

リポジトリ詳細パネル：
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[リポジトリ名]                    ✕
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[description]

★ 128,456    🍴 24,891    📝 TypeScript

━━━ Owner ━━━━━━━━━━━━━━━━━━━━
[avatar]  [username]           →

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Updated: 2026-03-01

      [ View on GitHub → ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

オーナークリックでユーザー詳細に遷移：
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
← Back                           ✕
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     [大きなavatar]
     [display name]
     @[username]
     [bio]

Followers: 12,345 · Following: 234
Public repos: 89

━━━ Top Repositories ━━━━━━━━━━
1. repo-name      ★ 45,678
2. repo-name      ★ 12,345
3. repo-name      ★ 8,901
...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### マウス追従インタラクション（没入感の核心）

これが体験の質を決定的に左右する。全画面でマウスの動きに反応すること。

1. **パーティクル追従**: マウス周辺のパーティクルがカーソルに引き寄せられる / 押しのけられる（磁石効果）
2. **パララックス**: マウスのX/Y位置に応じて全体の3Dシーンがわずかに傾く（最大±2度）
3. **光の追従**: マウス位置にPointLightを配置、マウスの動きに合わせて宇宙空間を照らす（淡い白色、intensity低め）
4. **トレイル**: 高速マウス移動時に淡い光の軌跡（Trail コンポーネント使用）

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

デザイン：
- 水平方向に並ぶカプセル型ボタン
- 背景: rgba(15, 15, 35, 0.6), backdrop-filter: blur(16px)
- 選択中: その言語色のボーダーが光る + 背景にその色のグロウ
- ホバー: ボタンがわずかに浮き上がる（translateY -2px）+ 言語色でシャドウ
- 未選択: border 1px solid rgba(255,255,255,0.1)

切替アニメーション：
1. 現在の星たちが外側に散っていく（位置を外側に加速 + opacity 0 + scale 0）(0.4秒)
2. 0.2秒の間（暗い宇宙だけ）
3. 新しい星たちが中心から螺旋状にポップイン（各50msカスケード）(0.6秒)

---

### 星（リポジトリ）の3D表現

球体だけでは退屈。以下の演出で「本物の恒星」に見せる。

#### 星本体
- SphereGeometry（widthSegments: 64, heightSegments: 64）
- MeshPhysicalMaterial:
  - color: 言語色
  - emissive: 言語色
  - emissiveIntensity: 1.0 + (rank / 30) * 2.0（1位が最も明るい）
  - roughness: 0.1
  - metalness: 0.9
  - clearcoat: 1.0
  - clearcoatRoughness: 0.1
- サイズ: 0.3 + log10(stars) * 0.15（1位≒1.1、30位≒0.6）

#### グロウリング
- 星の周囲にリング状のスプライト
- RingGeometry + MeshBasicMaterial（transparent, opacity 0.15, 言語色）
- ゆっくり回転（Z軸）

#### パーティクル放出
- 各星から5〜10個の微小パーティクルが浮遊
- Sparklesコンポーネント（drei）で実現
- 言語色で淡く光る

#### レンズフレア
- 1位〜3位の星にのみ控えめなレンズフレア効果
- 水平方向の光線（anamorphic flare風）

#### 配置アルゴリズム（螺旋配置）
```typescript
function calculateStarPosition(index: number, total: number) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // 黄金角
  const radius = 2 + index * 0.4;
  const theta = index * goldenAngle;
  const y = (index / total - 0.5) * 8;
  return {
    x: Math.cos(theta) * radius,
    y: y + Math.sin(index * 0.5) * 0.5,
    z: Math.sin(theta) * radius
  };
}
```
黄金角を使った配置でひまわりの種のように自然に広がる。

#### コンステレーション（星座線）
- 距離が近い星同士を細い光のラインで接続
- Line コンポーネント（drei）使用
- opacity 0.06（ほぼ見えない。ホバーで0.3に）
- 言語色 + グラデーション

---

### 背景の宇宙空間

#### 星屑パーティクル
- Stars コンポーネント（drei）で3000個
- radius: 80, depth: 60, count: 3000
- factor: 6, saturation: 0, fade: true
- 全体がY軸で極めてゆっくり回転（speed: 0.3）

#### 星雲（ネビュラ）
- 3〜4個の巨大な半透明スプライトを遠方に配置
- 言語に応じて色が変わる（紫系 → TypeScript選択時は青系に変化）
- ゆっくり脈動（opacity 0.03〜0.08を10秒周期で変化）
- ガウシアンブラーのかかったテクスチャ

#### 環境光
- ambientLight intensity: 0.05（ほぼ暗闇）
- 星自体の発光が主な光源

---

### ポストプロセシング

```tsx
<EffectComposer>
  <Bloom
    intensity={1.8}
    luminanceThreshold={0.4}
    luminanceSmoothing={0.9}
    mipmapBlur
  />
  <ChromaticAberration
    offset={[0.0006, 0.0006]}  // 極めて微細な色収差
  />
  <Vignette
    offset={0.25}
    darkness={0.75}
  />
</EffectComposer>
```

---

### UIデザイン仕様

#### 全体
- ダークテーマ固定
- フォント: 'Inter' (Google Fonts)  weight: 300, 400, 700, 900
- テキストカラー: rgba(255,255,255,0.7)（通常）、#ffffff（強調）
- 角丸: 16px（パネル）、24px（カプセルボタン）
- トランジション: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

#### glassmorphism パネル
```css
background: rgba(10, 10, 30, 0.75);
border: 1px solid rgba(255, 255, 255, 0.06);
backdrop-filter: blur(24px) saturate(1.2);
box-shadow:
  0 0 0 1px rgba(255, 255, 255, 0.03) inset,
  0 8px 40px rgba(0, 0, 0, 0.6),
  0 0 80px rgba(言語色, 0.05);
```

#### ボタン
```css
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.08);
color: rgba(255, 255, 255, 0.8);
transition: all 0.2s ease;

/* ホバー */
background: rgba(255, 255, 255, 0.08);
border-color: rgba(255, 255, 255, 0.15);
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
```

#### ローディング
- 中央の脈動する光の粒
- 下部プログレスバー（言語色のグラデーション）
- 「Fetching stars from the universe...」
- フォント: Inter Light, letter-spacing 0.2em

#### レスポンシブ
- PC（>1024px）: フル3D体験
- タブレット（768-1024px）: 3D維持、パネルはオーバーレイ
- スマホ（<768px）: 3D維持、言語セレクターは横スクロール、パネルはボトムシート、タッチ操作対応

---

### データフェッチング設計

#### GitHub API エンドポイント

リポジトリ検索:
```
GET https://api.github.com/search/repositories
  ?q=language:{lang}+stars:>1000
  &sort=stars
  &order=desc
  &per_page=30
```

ユーザー詳細:
```
GET https://api.github.com/users/{username}
```

ユーザーのリポジトリ:
```
GET https://api.github.com/users/{username}/repos
  ?sort=stars
  &direction=desc
  &per_page=10
```

#### API関数（AbortSignal対応必須）

```typescript
const GITHUB_API = 'https://api.github.com';

export async function fetchRepositories(
  language: string,
  signal?: AbortSignal
): Promise<Repository[]> {
  const response = await fetch(
    `${GITHUB_API}/search/repositories?q=language:${encodeURIComponent(language)}+stars:>1000&sort=stars&order=desc&per_page=30`,
    {
      signal,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  );
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  const data = await response.json();
  return data.items;
}
```

#### TanStack Query hooks

```typescript
export function useRepositories(language: string) {
  return useQuery({
    queryKey: ['repositories', language],
    queryFn: ({ signal }) => fetchRepositories(language, signal),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!language,
  });
}

export function useUserDetail(username: string) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: ({ signal }) => fetchUserDetail(username, signal),
    staleTime: 10 * 60 * 1000,
    enabled: !!username,
  });
}

export function useUserRepos(username: string) {
  return useQuery({
    queryKey: ['userRepos', username],
    queryFn: ({ signal }) => fetchUserRepos(username, signal),
    staleTime: 10 * 60 * 1000,
    enabled: !!username,
  });
}
```

**重要**: TanStack Queryがsignalを自動でqueryFnに渡す。言語切替やコンポーネントアンマウント時にfetchが自動でabortされる。手動のAbortControllerやisCancelledフラグは不要。

---

### コンポーネント設計原則（3つの鉄則）

#### 鉄則1: useEffectの依存配列は「決まる」もの
useEffect内で参照する値は全て依存配列に含める。実装者が選ぶ余地はない。ESLintのexhaustive-depsルールで自動検出される。

#### 鉄則2: データフェッチングはTanStack Query
- useEffect + fetchのパターンは一切使わない
- キャッシュ・自動キャンセル・ローディング・エラーは全てTanStack Queryが管理
- queryFnのsignalでAbortSignalをfetchに渡す

#### 鉄則3: Props drillingはコンポーネント合成で解決

```tsx
// ❌ NG: Props drilling — 中間コンポーネントが不要なデータを受け取る
function App() {
  const { data } = useRepositories(language);
  return <SceneWrapper repos={data} language={language} />;
}
function SceneWrapper({ repos, language }) {
  return <StarScene repos={repos} language={language} />;
}
function StarScene({ repos, language }) {
  return repos.map(repo => <RepoStar repo={repo} color={getColor(language)} />);
}

// ✅ OK: コンポーネント合成 — AppがRepoStarに直接データを渡す
function App() {
  const { data } = useRepositories(language);
  const color = getColor(language);
  return (
    <SceneWrapper
      content={data?.map(repo => (
        <RepoStar key={repo.id} repo={repo} color={color} />
      ))}
    />
  );
}
function SceneWrapper({ content }) {
  return <Canvas><group>{content}</group></Canvas>;
  // contentの中身を一切知らない。置くだけ。
}
```

Context APIはテーマなどアプリ全体で不変の値にのみ使用する。サーバーデータの共有にはTanStack Queryのキャッシュを使う。

---

### ファイル構成

```
src/
├── components/
│   ├── three/
│   │   ├── Scene.tsx              # Canvas + ライト + ポストプロセシング + OrbitControls
│   │   ├── StarField.tsx          # 背景の星屑パーティクル + 星雲
│   │   ├── RepoStar.tsx           # 1つのリポジトリ星（球体 + グロウ + パーティクル + アニメーション）
│   │   ├── Constellation.tsx      # 星同士の接続ライン
│   │   ├── CameraController.tsx   # カメラのスムーズ移動 + マウスパララックス
│   │   ├── MouseLight.tsx         # マウス追従ライト
│   │   └── LandingTitle.tsx       # 3Dタイトルテキスト + 言語アイコン公転
│   ├── ui/
│   │   ├── LanguageSelector.tsx   # 言語選択カプセルボタン
│   │   ├── RepoDetailPanel.tsx    # リポジトリ詳細パネル
│   │   ├── UserDetailPanel.tsx    # ユーザー詳細パネル
│   │   ├── LoadingScreen.tsx      # ロード画面（光の粒 + プログレス）
│   │   └── HelpOverlay.tsx        # 操作ガイド表示
│   └── layout/
│       └── AppLayout.tsx          # 3DシーンとUIオーバーレイの統合
├── hooks/
│   ├── useRepositories.ts         # TanStack Query: リポジトリ検索
│   ├── useUserDetail.ts           # TanStack Query: ユーザー詳細
│   ├── useUserRepos.ts            # TanStack Query: ユーザーのリポジトリ
│   └── useMousePosition.ts        # マウス位置の正規化（-1〜1）
├── api/
│   └── github.ts                  # GitHub API関数（AbortSignal対応）
├── types/
│   └── github.ts                  # 型定義
├── utils/
│   ├── starLayout.ts              # 黄金角による螺旋配置計算
│   └── colors.ts                  # 言語 → 色マッピング
├── App.tsx                        # QueryClientProvider + 状態管理
├── main.tsx                       # エントリポイント
└── index.css                      # リセット + Inter読み込み + グローバルスタイル
```

---

### 出力要件

1. 上記のファイル構成に従い、全ファイルの完全なソースコードを出力すること
2. 一切の省略・「...」・「// 残りの実装」をしないこと
3. コメントは日本語で記載すること
4. package.jsonも出力すること（全依存パッケージとバージョンを含む）
5. vite.config.tsも出力すること
6. tsconfig.json, tsconfig.app.json も出力すること
7. index.htmlも出力すること（Inter フォント読み込み含む）
8. .gitignoreも出力すること

### 品質基準

- TypeScriptの型は厳密に定義（anyは絶対に使わない）
- React 19のベストプラクティスに従う
- React.memo, useMemo, useCallbackをパフォーマンスに必要な箇所で使用
- アクセシビリティ（aria-label, role, keyboard navigation）
- 1ファイル200行以内を目安
- 変数名・関数名は意図が明確な英語
- エラーハンドリング（API失敗時のフォールバックUI）
