import { addedSeo } from '../i18n/addedLocales';
import { translations } from '../i18n/translations';
import { Language } from '../types';

export interface SeoCopy {
  ogLocale: string;
  siteName: string;
  imageAlt: string;
  /** Sentence after the canonical summary. */
  metaExtra: string;
  leadExtra: string;
  facts: string;
  fastest: string;
  howTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
  languagesLabel: string;
  sourceLabel: string;
  updatedLabel: string;
}

const fastest =
  '这份 {date} 快照里，最快的是 {a}（{aTps} t/s），然后是 {b}（{bTps} t/s）和 {c}（{cTps} t/s）。';

export const seoCopy: Record<Language, SeoCopy> = {
  zh: {
    ogLocale: 'zh_CN',
    siteName: '步步福 Bubufu',
    imageAlt: '步步福',
    metaExtra: '在浏览器里播放，不调用模型接口。速度是 Artificial Analysis {date} 的中位输出 tokens/s。',
    leadExtra: '这是浏览器里的播放器：不登录，也不调用模型接口。',
    facts:
      '大约 4 个字符算 1 个 Token，用来感受节奏，不是模型自己的分词器。排行按系列列出中位输出速度，包括 OpenAI、Anthropic、Google、SpaceXAI Grok、DeepSeek、通义、GLM、Kimi、MiniMax，以及速度特长模型。有公开输出标价时，才估算费用。Gemini 4 Argon 没有公布中位速度，所以不在列表里。',
    fastest,
    howTitle: '怎么用',
    steps: [
      '先选主模型，比如 GPT 或 Claude，再选版本。播放速度会改成它的中位 tokens/s。',
      '按播放，看文字以这个速度流出。原文可以改，也可以贴一个公开页面的链接。',
      '要并排看，打开对比，再点另一行设为 B。换到另一个系列时，那一栏的文字会清空。',
    ],
    faqTitle: '常见问题',
    faqs: [
      {
        q: 'Token 速度模拟是什么？',
        a: '用实时 Token 流模拟不同输出速度，直观比较 AI 响应节奏与流畅度。看见人工智能的响应节奏。',
      },
      {
        q: '播放时会把文字发给模型吗？',
        a: '不会。播放只在浏览器里按你选的速度出字，不登录，也不调用模型接口。贴了公开链接时，会去读那个页面的文字；直接读不到时，会再试读者代理。',
      },
      {
        q: '排行里的速度是怎么来的？',
        a: '来自 Artificial Analysis 公布的中位输出 tokens/s，快照日期是 {date}。用来感受节奏，不是对你账号的实时测速。',
      },
      {
        q: '目前最快的是哪一个？',
        a: fastest,
      },
      {
        q: '两个模型怎么对比？',
        a: '打开对比，点一行作为 A，再把另一行设为 B，然后按一次播放。同一个系列里只改速度时，文字保留；换系列会清空那一栏。',
      },
      {
        q: '费用怎么算？',
        a: '有 AA 输出标价时，累计费用约为 Token 数乘以单价，每秒费用约为速度乘以单价。没有标价就显示横线，不估算一个价格。',
      },
      {
        q: '有哪些语言？',
        a: '简体中文、繁體中文、English、日本語、한국어、Español、Português、Română、Français、Deutsch。选「自动」时跟随浏览器；选了具体语言会写进 bubufu-language，并打开对应地址。',
      },
    ],
    languagesLabel: '语言版本',
    sourceLabel: '数据来源',
    updatedLabel: '页面更新于',
  },
  'zh-Hant': {
    ogLocale: 'zh_HK',
    siteName: '步步福 Bubufu',
    imageAlt: '步步福',
    metaExtra: '在瀏覽器裡播放，不呼叫模型介面。速度是 Artificial Analysis {date} 的中位輸出 tokens/s。',
    leadExtra: '這是瀏覽器裡的播放器：不登入，也不呼叫模型介面。',
    facts:
      '大約 4 個字元算 1 個 Token，用來感受節奏，不是模型自己的分詞器。排行按系列列出中位輸出速度，包括 OpenAI、Anthropic、Google、SpaceXAI Grok、DeepSeek、通義、GLM、Kimi、MiniMax，以及速度專長模型。有公開輸出標價時，才估算費用。Gemini 4 Argon 沒有公布中位速度，所以不在列表裡。',
    fastest:
      '這份 {date} 快照裡，最快的是 {a}（{aTps} t/s），然後是 {b}（{bTps} t/s）和 {c}（{cTps} t/s）。',
    howTitle: '怎麼用',
    steps: [
      '先選主模型，例如 GPT 或 Claude，再選版本。播放速度會改成它的中位 tokens/s。',
      '按播放，看文字以這個速度流出。原文可以改，也可以貼一個公開頁面的連結。',
      '要並排看，打開對比，再點另一行設為 B。換到另一個系列時，那一欄的文字會清空。',
    ],
    faqTitle: '常見問題',
    faqs: [
      {
        q: 'Token 速度模擬是什麼？',
        a: '模擬即時 Token 串流，比較 AI 回應速度與流暢度。看見人工智能的回應節奏。',
      },
      {
        q: '播放時會把文字送給模型嗎？',
        a: '不會。播放只在瀏覽器裡按你選的速度出字，不登入，也不呼叫模型介面。貼了公開連結時，會去讀那個頁面的文字；直接讀不到時，會再試讀者代理。',
      },
      {
        q: '排行裡的速度怎麼來的？',
        a: '來自 Artificial Analysis 公布的中位輸出 tokens/s，快照日期是 {date}。用來感受節奏，不是對你帳號的即時測速。',
      },
      {
        q: '目前最快的是哪一個？',
        a: '這份 {date} 快照裡，最快的是 {a}（{aTps} t/s），然後是 {b}（{bTps} t/s）和 {c}（{cTps} t/s）。',
      },
      {
        q: '兩個模型怎麼對比？',
        a: '打開對比，點一行作為 A，再把另一行設為 B，然後按一次播放。同一個系列裡只改速度時，文字保留；換系列會清空那一欄。',
      },
      {
        q: '費用怎麼算？',
        a: '有 AA 輸出標價時，累計費用約為 Token 數乘以單價，每秒費用約為速度乘以單價。沒有標價就顯示橫線，不估算一個價格。',
      },
      {
        q: '有哪些語言？',
        a: '簡體中文、繁體中文、English、日本語、한국어、Español、Português、Română、Français、Deutsch。選「自動識別」時跟隨瀏覽器；選了具體語言會寫進 bubufu-language，並打開對應地址。',
      },
    ],
    languagesLabel: '語言版本',
    sourceLabel: '資料來源',
    updatedLabel: '頁面更新於',
  },
  en: {
    ogLocale: 'en_US',
    siteName: 'Bubufu',
    imageAlt: 'Bubufu',
    metaExtra:
      'Playback stays in the browser and does not call a model API. Speeds are Artificial Analysis median output tokens/s from {date}.',
    leadExtra: 'It is a browser player: no login, and no model API call.',
    facts:
      'About 4 characters count as 1 token, so you can feel the pace. That is not the model’s own tokenizer. Rows are grouped by family: OpenAI, Anthropic, Google, SpaceXAI Grok, DeepSeek, Qwen, GLM, Kimi, MiniMax, and speed specialists. Cost is shown only when an output price is published. Gemini 4 Argon has no published median, so it is not listed.',
    fastest:
      'On the {date} snapshot, the fastest is {a} ({aTps} t/s), then {b} ({bTps} t/s) and {c} ({cTps} t/s).',
    howTitle: 'How to use it',
    steps: [
      'Pick a model line, such as GPT or Claude, then a version. Play uses that median tokens/s.',
      'Press Play and watch the text come out at that pace. You can edit the text or paste a public page link.',
      'Turn on Compare and set another row as B to race them. Switching family clears that pane.',
    ],
    faqTitle: 'Questions',
    faqs: [
      {
        q: 'What is Token Speed Simulator?',
        a: 'Simulate real-time token streams to compare AI response pacing and perceived responsiveness. See the pace of AI.',
      },
      {
        q: 'Does playback send the text to a model?',
        a: 'No. Playback types in the browser at the speed you picked. It does not log you in or call a model API. A public link is read for its text; if the browser cannot read it, a reader proxy is tried.',
      },
      {
        q: 'Where do the speeds come from?',
        a: 'They are Artificial Analysis median output tokens/s, snapshotted on {date}. They are for feel, not a live test of your account.',
      },
      {
        q: 'Which model is fastest right now?',
        a: 'On the {date} snapshot, the fastest is {a} ({aTps} t/s), then {b} ({bTps} t/s) and {c} ({cTps} t/s).',
      },
      {
        q: 'How do I compare two models?',
        a: 'Turn on Compare, pick A, set another row as B, and press Play once. The same family keeps the text when only the speed changes. A different family clears that pane.',
      },
      {
        q: 'How is cost calculated?',
        a: 'When AA publishes an output price, spend is about tokens times that price, and the rate is about tokens/s times that price. Missing prices stay a dash. Nothing is invented.',
      },
      {
        q: 'Which languages are available?',
        a: 'Simplified Chinese, Traditional Chinese, English, Japanese, Korean, Spanish, Portuguese, Romanian, French, and German. Auto follows the browser. A specific language is saved in the bubufu-language cookie and opens that language URL.',
      },
    ],
    languagesLabel: 'Languages',
    sourceLabel: 'Source',
    updatedLabel: 'Page updated',
  },
  ja: {
    ogLocale: 'ja_JP',
    siteName: 'Bubufu',
    imageAlt: 'Bubufu',
    metaExtra:
      '再生はブラウザ内で行い、モデル API は呼びません。速度は Artificial Analysis の {date} 時点の出力 tokens/s 中央値です。',
    leadExtra: 'ブラウザで動く再生ツールです。ログインも、モデル API の呼び出しもありません。',
    facts:
      '約 4 文字を 1 トークンとして数えます。リズムを見るための目安で、モデル自身のトークナイザではありません。OpenAI、Anthropic、Google、SpaceXAI Grok、DeepSeek、通義、GLM、Kimi、MiniMax と、速度特化のモデルを系列ごとに並べます。出力単価が公開されているときだけ費用を出します。Gemini 4 Argon は中央値が公開されていないので、一覧にありません。',
    fastest:
      '{date} のスナップショットでは、いちばん速いのが {a}（{aTps} t/s）、次が {b}（{bTps} t/s）と {c}（{cTps} t/s）です。',
    howTitle: '使い方',
    steps: [
      'GPT や Claude などのモデルを選び、次にバージョンを選びます。再生速度はその中央値 tokens/s になります。',
      '再生を押すと、その速度で文字が出ます。原文は編集でき、公開ページのリンクも貼れます。',
      '比較をオンにして別の行を B にすると、並べて見られます。系列を変えると、その欄の文字は消えます。',
    ],
    faqTitle: 'よくある質問',
    faqs: [
      {
        q: 'Token速度シミュレーターとは？',
        a: 'トークンのストリーミングを再現し、AI の応答速度や体感を比較します。AIの応答速度を体感。',
      },
      {
        q: '再生時に文章をモデルへ送りますか？',
        a: '送りません。選んだ速度でブラウザが表示するだけです。ログインも、モデル API の呼び出しもありません。公開リンクを貼ったときは、そのページの文字を読みます。直接読めないときはリーダー代理を試します。',
      },
      {
        q: '速度の数字はどこから？',
        a: 'Artificial Analysis が公開している出力 tokens/s の中央値で、スナップショット日は {date} です。体感用であり、あなたのアカウントへの実測ではありません。',
      },
      {
        q: 'いま一番速いモデルは？',
        a: '{date} のスナップショットでは、いちばん速いのが {a}（{aTps} t/s）、次が {b}（{bTps} t/s）と {c}（{cTps} t/s）です。',
      },
      {
        q: '2つのモデルを比べるには？',
        a: '比較をオンにして A を選び、別の行を B にして、再生を一度押します。同じ系列で速度だけ変えるときは文字が残ります。系列が変わると、その欄は消えます。',
      },
      {
        q: '費用はどう計算しますか？',
        a: 'AA の出力単価があるとき、累計はトークン数×単価、毎秒は速度×単価の目安です。単価がなければダッシュのままで、価格は作りません。',
      },
      {
        q: '対応言語は？',
        a: '簡体字、繁体字、英語、日本語、韓国語、スペイン語、ポルトガル語、ルーマニア語、フランス語、ドイツ語です。自動検出はブラウザに従います。言語を指定すると bubufu-language に保存し、その言語のアドレスを開きます。',
      },
    ],
    languagesLabel: '言語',
    sourceLabel: '出典',
    updatedLabel: 'ページ更新',
  },
  ko: {
    ogLocale: 'ko_KR',
    siteName: 'Bubufu',
    imageAlt: 'Bubufu',
    metaExtra:
      '재생은 브라우저에서 이루어지며 모델 API를 호출하지 않습니다. 속도는 Artificial Analysis {date} 출력 tokens/s 중앙값입니다.',
    leadExtra: '브라우저에서 재생하는 도구입니다. 로그인하지 않고, 모델 API도 호출하지 않습니다.',
    facts:
      '문자 약 4개를 토큰 1개로 셉니다. 속도를 느끼기 위한 기준이며, 모델 자신의 토크나이저는 아닙니다. OpenAI, Anthropic, Google, SpaceXAI Grok, DeepSeek, 통의, GLM, Kimi, MiniMax와 속도 특화 모델을 계열별로 보여 줍니다. 출력 가격이 공개된 경우에만 비용을 계산합니다. Gemini 4 Argon은 공개된 중앙값이 없어 목록에 없습니다.',
    fastest:
      '{date} 스냅샷에서 가장 빠른 모델은 {a}({aTps} t/s)이고, 다음은 {b}({bTps} t/s), {c}({cTps} t/s)입니다.',
    howTitle: '사용 방법',
    steps: [
      'GPT나 Claude 같은 모델을 고른 뒤 버전을 고르세요. 재생 속도는 그 중앙값 tokens/s로 바뀝니다.',
      '재생을 누르면 그 속도로 글자가 나옵니다. 원문은 고칠 수 있고, 공개 페이지 링크도 붙일 수 있습니다.',
      '비교를 켜고 다른 줄을 B로 두면 나란히 볼 수 있습니다. 계열을 바꾸면 그 칸의 글은 지워집니다.',
    ],
    faqTitle: '자주 묻는 질문',
    faqs: [
      {
        q: 'Token 속도 시뮬레이터는 무엇인가요?',
        a: '실시간 토큰 스트림으로 AI 응답 속도와 체감 반응성을 비교합니다. AI의 응답 속도를 확인하세요.',
      },
      {
        q: '재생할 때 글을 모델에 보내나요?',
        a: '보내지 않습니다. 고른 속도로 브라우저가 글자를 보여줄 뿐입니다. 로그인하지 않고 모델 API도 호출하지 않습니다. 공개 링크를 붙이면 그 페이지의 글을 읽습니다. 바로 읽지 못하면 리더 프록시를 시도합니다.',
      },
      {
        q: '속도 숫자는 어디서 왔나요?',
        a: 'Artificial Analysis가 공개한 출력 tokens/s 중앙값이며, 스냅샷 날짜는 {date}입니다. 체감을 위한 값이고, 내 계정의 실시간 측정은 아닙니다.',
      },
      {
        q: '지금 가장 빠른 모델은 무엇인가요?',
        a: '{date} 스냅샷에서 가장 빠른 모델은 {a}({aTps} t/s)이고, 다음은 {b}({bTps} t/s), {c}({cTps} t/s)입니다.',
      },
      {
        q: '두 모델을 어떻게 비교하나요?',
        a: '비교를 켜고 A를 고른 뒤 다른 줄을 B로 두고 재생을 한 번 누릅니다. 같은 계열에서 속도만 바꾸면 글이 남습니다. 계열이 바뀌면 그 칸은 지워집니다.',
      },
      {
        q: '비용은 어떻게 계산하나요?',
        a: 'AA 출력 가격이 있을 때 누적은 토큰 수×단가, 초당 비용은 속도×단가입니다. 가격이 없으면 줄표로 두며, 가격을 만들지 않습니다.',
      },
      {
        q: '어떤 언어를 지원하나요?',
        a: '간체 중국어, 번체 중국어, 영어, 일본어, 한국어, 스페인어, 포르투갈어, 루마니아어, 프랑스어, 독일어입니다. 자동 감지는 브라우저를 따릅니다. 언어를 고르면 bubufu-language 쿠키에 저장하고 그 언어 주소로 이동합니다.',
      },
    ],
    languagesLabel: '언어',
    sourceLabel: '출처',
    updatedLabel: '페이지 업데이트',
  },
  ...addedSeo,
};

export function titleTag(lang: Language): string {
  const t = translations[lang];
  return `${t.title} · ${t.description}`;
}

export function metaDescription(lang: Language, facts: object): string {
  const summary = translations[lang].summary;
  return `${summary} ${fill(seoCopy[lang].metaExtra, facts)}`;
}

export function fill(template: string, extras: object): string {
  const bag = extras as Record<string, string>;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => bag[key] ?? '');
}
