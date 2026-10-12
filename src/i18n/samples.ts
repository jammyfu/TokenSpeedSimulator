import { Language } from '../types';

/** Default source text. The same introduction, written for each live locale. */
export const sampleTexts: Record<Language, string> = {
  zh: `Token 速度模拟

这是步步福上的一个浏览器工具。它不连接模型接口，也不上传你的文字。你看到的流动，是按每秒 Token 数把一段文字播放出来。同一段话，快和慢，读起来并不一样。按下播放，就能看见人工智能的响应节奏。

Token 是模型读写文字的片段。大约 1,000 个 Token 约等于 750 个英文词。这里用 4 个字符近似 1 个 Token，方便比较节奏。它不是分词器的精确结果，只是一把稳定的尺子。

排行里的速度，来自 Artificial Analysis 在 2026-10-12 公布的中位输出 tokens/s。点一行，播放就按这个中位速度走。模型按系列分开：OpenAI、Anthropic、Google、SpaceXAI、DeepSeek、通义千问、GLM、Kimi、MiniMax，以及以速度见长的其他模型。这些数字用来感受快慢，不是此刻对接口的实测。没有公布中位速度的模型，不会出现在表里。

可以打开对比，让两段输出并排走。换到另一个系列时，舞台上的文字会清空。还在同一系列里换模型，已经流出的文字可以留着。这样你能看清，差别来自速度，还是来自你刚刚换了一整条产品线。

这段原文可以改，也可以换成你自己的文章。贴一个公开网页的链接，工具会读出正文，再按你选的速度播放。标题和段落默认按 Markdown 渲染。高速时，画面只保留最后 5,000 个字符，文字会从头重复，页面不会被越撑越长。

如果某一行公布了输出标价，工具会按 Token 数估算花费，并给出大约的每秒、每分钟、每小时费用。没有标价就显示横线，不会替你猜一个价格。

语言与步步福相同。选择自动时，跟随浏览器；你也可以指定简体中文、繁體中文、English、日本語或한국어。在这里改语言，会记在同一个 bubufu-language 里。回到主站，语言仍然一致。这个工具免费，打开就能用。`,

  'zh-Hant': `Token 速度模擬

這是步步福上的一個瀏覽器工具。它不連接模型介面，也不上傳你的文字。你看到的流動，是按每秒 Token 數把一段文字播放出來。同一段話，快和慢，讀起來並不一樣。按下播放，就能看見人工智能的回應節奏。

Token 是模型讀寫文字的片段。大約 1,000 個 Token 約等於 750 個英文詞。這裡用 4 個字元近似 1 個 Token，方便比較節奏。它不是分詞器的精確結果，只是一把穩定的尺子。

排行裡的速度，來自 Artificial Analysis 在 2026-10-12 公布的中位輸出 tokens/s。點一行，播放就按這個中位速度走。模型按系列分開：OpenAI、Anthropic、Google、SpaceXAI、DeepSeek、通義千問、GLM、Kimi、MiniMax，以及以速度見長的其他模型。這些數字用來感受快慢，不是此刻對介面的實測。沒有公布中位速度的模型，不會出現在表裡。

可以打開對比，讓兩段輸出並排走。換到另一個系列時，舞台上的文字會清空。還在同一系列裡換模型，已經流出的文字可以留著。這樣你能看清，差別來自速度，還是來自你剛剛換了一整條產品線。

這段原文可以改，也可以換成你自己的文章。貼一個公開網頁的連結，工具會讀出正文，再按你選的速度播放。標題和段落預設按 Markdown 渲染。高速時，畫面只保留最後 5,000 個字元，文字會從頭重複，頁面不會被越撐越長。

如果某一行公布了輸出標價，工具會按 Token 數估算花費，並給出大約的每秒、每分鐘、每小時費用。沒有標價就顯示橫線，不會替你猜一個價格。

語言與步步福相同。選擇自動時，跟隨瀏覽器；你也可以指定簡體中文、繁體中文、English、日本語或한국어。在這裡改語言，會記在同一個 bubufu-language 裡。回到主站，語言仍然一致。這個工具免費，打開就能用。`,

  en: `Token simulator

This is a browser tool on Bubufu. It does not call a model API, and it does not upload your text. The movement you see is this text played back at a chosen number of tokens per second. The same words feel different when they arrive faster. Press Play, and you can see the pace of AI.

A token is a piece of text a model reads and writes. About 1,000 tokens is roughly 750 English words. This tool treats 4 characters as 1 token, so the pace stays easy to compare. That is a steady ruler, not a tokenizer's exact count.

The ranking uses median output tokens/s published by Artificial Analysis on 2026-10-12. Choose a row, and Play uses that median speed. Models are grouped by line: OpenAI, Anthropic, Google, SpaceXAI, DeepSeek, Qwen, GLM, Kimi, MiniMax, and other models known for speed. The numbers are for feel. They are not a live test of an API. A model with no published median speed is not on the list.

Compare plays two streams side by side. Moving to another model line clears the stage. Staying in the same line can keep the text already on screen. You can then tell whether the change comes from speed, or from switching to a different product line.

You can edit this text, or replace it with your own writing. Paste a public page link, and the tool reads the article, then plays it at the speed you chose. Headings and paragraphs render as Markdown by default. At high speed, only the last 5,000 characters stay on screen. The text repeats from the start, so the page does not keep growing.

When a row has a published output price, the tool estimates spend from the token count and shows a rough cost per second, per minute, and per hour. A missing price stays as a dash. The tool does not invent one.

The languages match Bubufu. Auto follows your browser. You can also choose Simplified Chinese, Traditional Chinese, English, Japanese, or Korean. A choice here is stored in the same bubufu-language cookie, so the main site stays in step. The tool is free, and it is ready when you open it.`,

  ja: `Token速度シミュレーター

これは Bubufu のブラウザーツールです。モデルの API には接続せず、入力した文章もアップロードしません。見えている流れは、選んだ毎秒トークン数で文章を再生したものです。同じ文章でも、速いときと遅いときでは印象が変わります。再生を押すと、AI の応答速度を体感できます。

トークンは、モデルが読み書きする文字のかたまりです。およそ 1,000 トークンが英単語 750 語程度です。このツールでは 4 文字を 1 トークンとして扱い、速度を比べやすくしています。分詞器の正確な数ではなく、安定したものさしです。

ランキングの速度は、Artificial Analysis が 2026-10-12 に公開した出力 tokens/s の中央値です。行を選ぶと、再生はその中央値で進みます。モデルは系列ごとに分かれています。OpenAI、Anthropic、Google、SpaceXAI、DeepSeek、Qwen、GLM、Kimi、MiniMax、そして速度で知られるその他のモデルです。数値は体感のためのもので、いまの API を測った結果ではありません。中央値が公開されていないモデルは表に入りません。

比較を開くと、二つの出力が並んで流れます。別の系列に移ると、舞台の文字は消えます。同じ系列のままモデルを変えたときは、すでに出た文字を残せます。違いが速度によるものか、製品の系列を替えたことによるものかを見分けられます。

この原文は書き換えられます。自分の文章に替えてもかまいません。公開ページのリンクを貼ると、本文を読み取り、選んだ速度で再生します。見出しと段落は、初期状態では Markdown として表示します。高速のときは最後の 5,000 文字だけを残し、文章は最初から繰り返します。ページが際限なく長くなることはありません。

出力単価が公開されている行では、トークン数から費用を見積もり、秒あたり、分あたり、時間あたりの目安も出します。単価がない行は横線のままです。価格を推測して埋めません。

言語は Bubufu と同じです。自動を選ぶとブラウザーに従います。簡体字中国語、繁体字中国語、English、日本語、한국어も指定できます。ここで選んだ言語は同じ bubufu-language に保存され、メインサイトとも揃います。このツールは無料で、開けばすぐ使えます。`,

  ko: `Token 속도 시뮬레이터

이것은 Bubufu의 브라우저 도구입니다. 모델 API에 연결하지 않고, 입력한 글도 업로드하지 않습니다. 보이는 흐름은 고른 초당 토큰 수로 글을 재생한 것입니다. 같은 문장도 빠르기와 느리기에 따라 다르게 읽힙니다. 재생을 누르면 AI의 응답 속도를 확인할 수 있습니다.

토큰은 모델이 읽고 쓰는 글의 조각입니다. 토큰 1,000개는 영어 단어 약 750개입니다. 이 도구는 4자를 토큰 1개로 보아 속도를 비교하기 쉽게 합니다. 토크나이저의 정확한 수가 아니라, 일정한 자입니다.

순위의 속도는 Artificial Analysis가 2026-10-12에 공개한 출력 tokens/s 중앙값입니다. 한 줄을 고르면 재생은 그 중앙값으로 진행됩니다. 모델은 계열별로 나뉩니다. OpenAI, Anthropic, Google, SpaceXAI, DeepSeek, Qwen, GLM, Kimi, MiniMax, 그리고 속도로 알려진 다른 모델입니다. 숫자는 체감을 위한 것이며, 지금 API를 직접 측정한 결과가 아닙니다. 중앙값이 공개되지 않은 모델은 목록에 없습니다.

비교를 열면 두 출력이 나란히 흐릅니다. 다른 계열로 옮기면 화면의 글은 지워집니다. 같은 계열에서 모델만 바꾸면 이미 나온 글을 남겨 둘 수 있습니다. 차이가 속도에서 왔는지, 제품 계열을 바꾼 것에서 왔는지 구분할 수 있습니다.

이 원문은 고칠 수 있고, 자신의 글로 바꿀 수도 있습니다. 공개 페이지 링크를 붙이면 본문을 읽어 고른 속도로 재생합니다. 제목과 문단은 기본적으로 Markdown으로 표시합니다. 빠를 때는 마지막 5,000자만 남기고, 글은 처음부터 반복됩니다. 페이지가 끝없이 길어지지 않습니다.

출력 가격이 공개된 줄은 토큰 수로 비용을 가늠하고, 초당, 분당, 시간당 비용의 대략적인 값도 보여 줍니다. 가격이 없으면 줄표로 남깁니다. 없는 가격을 추측해 넣지 않습니다.

언어는 Bubufu와 같습니다. 자동을 고르면 브라우저를 따릅니다. 简体中文, 繁體中文, English, 日本語, 한국어를 직접 고를 수도 있습니다. 여기서 고른 언어는 같은 bubufu-language에 저장되어 메인 사이트와 맞춰집니다. 이 도구는 무료이며, 열면 바로 쓸 수 있습니다.`,
};
