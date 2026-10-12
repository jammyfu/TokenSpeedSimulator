import type { SeoCopy } from '../seo/copy';
import { Translation } from '../types';

const families = {
  familyOpenAI: 'OpenAI · GPT',
  familyAnthropic: 'Anthropic · Claude',
  familyGoogle: 'Google · Gemini',
  familySpaceXAI: 'SpaceXAI · Grok',
  familyDeepSeek: 'DeepSeek',
  familyAlibaba: 'Alibaba · Qwen',
  familyZai: 'Z AI · GLM',
  familyKimi: 'Kimi · Moonshot',
  familyMiniMax: 'MiniMax',
} as const;

type Added = 'es' | 'pt' | 'ro' | 'fr' | 'de';

export const addedSamples: Record<Added, string> = {
  es: `Simulador de ritmo de tokens

Es una herramienta del navegador en Bubufu. No llama a la API de un modelo y no sube tu texto. El movimiento que ves es este texto reproducido a un número de tokens por segundo. Las mismas palabras se sienten distintas cuando llegan más rápido. Pulsa Reproducir y mira el ritmo de la IA.

Un token es un fragmento de texto que un modelo lee y escribe. Unos 1.000 tokens equivalen a unas 750 palabras en inglés. Esta herramienta cuenta 4 caracteres como 1 token, para comparar el ritmo con una regla estable. No es el recuento exacto de un tokenizador.

El ranking usa la mediana de tokens/s de salida publicada por Artificial Analysis el 2026-10-12. Elige una fila y Reproducir usa esa mediana. Los modelos van por líneas: OpenAI, Anthropic, Google, SpaceXAI, DeepSeek, Qwen, GLM, Kimi, MiniMax y otros conocidos por la velocidad. Los números son para sentir el ritmo, no una prueba en vivo de una API. Un modelo sin mediana publicada no está en la lista.

Comparar pone dos flujos uno al lado del otro. Cambiar de línea vacía el escenario. Seguir en la misma línea puede conservar el texto ya visible. Así ves si el cambio viene de la velocidad o de pasar a otra línea de producto.

Puedes editar este texto o sustituirlo por el tuyo. Pega el enlace de una página pública y la herramienta lee el artículo, luego lo reproduce a la velocidad elegida. Títulos y párrafos se muestran como Markdown. A gran velocidad solo quedan los últimos 5.000 caracteres. El texto vuelve a empezar, así que la página no crece sin límite.

Si una fila publica un precio de salida, la herramienta estima el gasto con el número de tokens y muestra un coste aproximado por segundo, por minuto y por hora. Si falta el precio, queda una raya. No se inventa ninguno.

Las lenguas coinciden con Bubufu. Auto sigue al navegador. También puedes elegir 简体中文, 繁體中文, English, 日本語, 한국어, Español, Português, Română, Français o Deutsch. La elección se guarda en la misma cookie bubufu-language, así que el sitio principal sigue el mismo idioma. La herramienta es gratis y está lista al abrirla.`,

  pt: `Simulador do ritmo dos tokens

É uma ferramenta de navegador no Bubufu. Não chama a API de um modelo e não envia o teu texto. O movimento que vês é este texto reproduzido a um número de tokens por segundo. As mesmas palavras sentem-se diferentes quando chegam mais depressa. Carrega em Reproduzir e vê o ritmo da IA.

Um token é um pedaço de texto que um modelo lê e escreve. Cerca de 1 000 tokens equivalem a cerca de 750 palavras em inglês. Esta ferramenta conta 4 caracteres como 1 token, para comparar o ritmo com uma régua estável. Não é a contagem exata de um tokenizador.

O ranking usa a mediana de tokens/s de saída publicada pela Artificial Analysis em 2026-10-12. Escolhe uma linha e Reproduzir usa essa mediana. Os modelos estão agrupados: OpenAI, Anthropic, Google, SpaceXAI, DeepSeek, Qwen, GLM, Kimi, MiniMax e outros conhecidos pela velocidade. Os números servem para sentir o ritmo, não são um teste ao vivo de uma API. Um modelo sem mediana publicada não entra na lista.

Comparar põe dois fluxos lado a lado. Mudar de linha limpa o palco. Ficar na mesma linha pode manter o texto já visível. Assim vês se a diferença vem da velocidade ou de mudares de linha de produto.

Podes editar este texto ou trocá-lo pelo teu. Cola a ligação de uma página pública e a ferramenta lê o artigo, depois reprodu-lo à velocidade escolhida. Títulos e parágrafos aparecem como Markdown. A alta velocidade ficam só os últimos 5 000 caracteres. O texto recomeça, por isso a página não cresce sem fim.

Se uma linha publica um preço de saída, a ferramenta estima o gasto pelo número de tokens e mostra um custo aproximado por segundo, por minuto e por hora. Sem preço, fica um traço. Não se inventa nenhum.

As línguas coincidem com o Bubufu. Auto segue o navegador. Também podes escolher 简体中文, 繁體中文, English, 日本語, 한국어, Español, Português, Română, Français ou Deutsch. A escolha fica no mesmo cookie bubufu-language, por isso o site principal acompanha. A ferramenta é gratuita e está pronta quando a abres.`,

  ro: `Simulator de ritm al tokenilor

Este o unealtă de browser pe Bubufu. Nu apelează API-ul unui model și nu încarcă textul tău. Mișcarea pe care o vezi este textul redat la un număr de tokeni pe secundă. Aceleași cuvinte se simt altfel când vin mai repede. Apasă Redă și vezi ritmul AI.

Un token este o bucată de text pe care un model o citește și o scrie. Cam 1.000 de tokeni înseamnă cam 750 de cuvinte în engleză. Unealta numără 4 caractere ca 1 token, ca să compari ritmul cu o riglă stabilă. Nu este numărul exact al unui tokenizer.

Clasamentul folosește mediana de tokeni/s la ieșire publicată de Artificial Analysis pe 2026-10-12. Alegi un rând și Redă folosește mediana aceea. Modelele sunt grupate: OpenAI, Anthropic, Google, SpaceXAI, DeepSeek, Qwen, GLM, Kimi, MiniMax și altele cunoscute pentru viteză. Numerele sunt pentru ritm, nu un test live al unui API. Un model fără mediană publicată nu este în listă.

Compară pune două fluxuri unul lângă altul. Schimbarea liniei golește scena. Dacă rămâi pe aceeași linie, textul deja vizibil poate rămâne. Așa vezi dacă diferența vine din viteză sau din schimbarea liniei de produs.

Poți edita textul sau îl poți înlocui cu al tău. Lipește linkul unei pagini publice, iar unealta citește articolul și îl redă la viteza aleasă. Titlurile și paragrafele apar ca Markdown. La viteză mare rămân doar ultimele 5.000 de caractere. Textul o ia de la capăt, ca pagina să nu crească la nesfârșit.

Dacă un rând are un preț de ieșire publicat, unealta estimează cheltuiala după numărul de tokeni și arată un cost aproximativ pe secundă, pe minut și pe oră. Fără preț, rămâne o linie. Nu inventează un preț.

Limbile coincid cu Bubufu. Auto urmează browserul. Poți alege și 简体中文, 繁體中文, English, 日本語, 한국어, Español, Português, Română, Français sau Deutsch. Alegerea se salvează în același cookie bubufu-language, așa că site-ul principal rămâne pe aceeași limbă. Unealta este gratuită și e gata când o deschizi.`,

  fr: `Simulateur de rythme de jetons

C’est un outil de navigateur sur Bubufu. Il n’appelle pas l’API d’un modèle et n’envoie pas ton texte. Le mouvement que tu vois est ce texte lu à un nombre de jetons par seconde. Les mêmes mots changent quand ils arrivent plus vite. Appuie sur Lecture et vois le rythme de l’IA.

Un jeton est un morceau de texte qu’un modèle lit et écrit. Environ 1 000 jetons valent environ 750 mots anglais. Cet outil compte 4 caractères pour 1 jeton, afin de comparer le rythme avec une règle stable. Ce n’est pas le compte exact d’un tokeniseur.

Le classement utilise la médiane de jetons/s en sortie publiée par Artificial Analysis le 2026-10-12. Choisis une ligne, et Lecture utilise cette médiane. Les modèles sont groupés : OpenAI, Anthropic, Google, SpaceXAI, DeepSeek, Qwen, GLM, Kimi, MiniMax, et d’autres connus pour la vitesse. Les chiffres servent à sentir le rythme. Ce n’est pas un test en direct d’une API. Un modèle sans médiane publiée n’est pas dans la liste.

Comparer joue deux flux côte à côte. Changer de ligne vide la scène. Rester dans la même ligne peut garder le texte déjà affiché. Tu vois alors si le changement vient de la vitesse ou d’un changement de ligne de produit.

Tu peux modifier ce texte ou le remplacer par le tien. Colle le lien d’une page publique : l’outil lit l’article, puis le joue à la vitesse choisie. Titres et paragraphes s’affichent en Markdown. À grande vitesse, seuls les 5 000 derniers caractères restent. Le texte reprend au début, donc la page ne s’allonge pas sans fin.

Si une ligne publie un prix de sortie, l’outil estime la dépense à partir du nombre de jetons et montre un coût approximatif par seconde, par minute et par heure. Sans prix, il reste un tiret. Aucun prix n’est inventé.

Les langues suivent Bubufu. Auto suit le navigateur. Tu peux aussi choisir 简体中文, 繁體中文, English, 日本語, 한국어, Español, Português, Română, Français ou Deutsch. Le choix est enregistré dans le même cookie bubufu-language, donc le site principal reste aligné. L’outil est gratuit et prêt dès l’ouverture.`,

  de: `Token-Tempssimulator

Das ist ein Browser-Werkzeug auf Bubufu. Es ruft keine Modell-API auf und lädt deinen Text nicht hoch. Die Bewegung, die du siehst, ist dieser Text, abgespielt mit einer Zahl von Token pro Sekunde. Dieselben Wörter wirken anders, wenn sie schneller ankommen. Drück auf Abspielen und sieh das Tempo der KI.

Ein Token ist ein Textstück, das ein Modell liest und schreibt. Etwa 1.000 Token sind ungefähr 750 englische Wörter. Dieses Werkzeug zählt 4 Zeichen als 1 Token, damit das Tempo an einem festen Maß vergleichbar bleibt. Das ist nicht die genaue Zahl eines Tokenizers.

Die Rangliste nutzt den Median der Ausgabe-Token/s, den Artificial Analysis am 2026-10-12 veröffentlicht hat. Wähl eine Zeile, und Abspielen nutzt diesen Median. Die Modelle sind nach Linien gruppiert: OpenAI, Anthropic, Google, SpaceXAI, DeepSeek, Qwen, GLM, Kimi, MiniMax und weitere, die für Tempo bekannt sind. Die Zahlen sind zum Fühlen da. Sie sind kein Live-Test einer API. Ein Modell ohne veröffentlichten Median steht nicht auf der Liste.

Vergleich spielt zwei Ströme nebeneinander. Ein Wechsel der Linie leert die Bühne. Bleibst du in derselben Linie, kann der schon sichtbare Text bleiben. So siehst du, ob der Unterschied vom Tempo kommt oder von einer anderen Produktlinie.

Du kannst diesen Text ändern oder durch deinen eigenen ersetzen. Füg den Link einer öffentlichen Seite ein. Das Werkzeug liest den Artikel und spielt ihn mit dem gewählten Tempo ab. Überschriften und Absätze erscheinen als Markdown. Bei hohem Tempo bleiben nur die letzten 5.000 Zeichen. Der Text beginnt von vorn, damit die Seite nicht immer länger wird.

Wenn eine Zeile einen Ausgabepreis veröffentlicht, schätzt das Werkzeug die Summe aus der Tokenzahl und zeigt ungefähre Kosten pro Sekunde, pro Minute und pro Stunde. Fehlt der Preis, bleibt ein Strich. Es wird keiner erfunden.

Die Sprachen folgen Bubufu. Auto folgt dem Browser. Du kannst auch 简体中文, 繁體中文, English, 日本語, 한국어, Español, Português, Română, Français oder Deutsch wählen. Die Wahl liegt im selben Cookie bubufu-language, deshalb bleibt die Hauptseite auf derselben Sprache. Das Werkzeug ist kostenlos und sofort bereit.`,
};

const names =
  '简体中文、繁體中文、English、日本語、한국어、Español、Português、Română、Français、Deutsch';

export const addedTranslations: Record<Added, Omit<Translation, 'sampleText'>> = {
  es: {
    title: 'Simulador de ritmo de tokens',
    description: 'Mira el ritmo de la IA.',
    summary:
      'Simula flujos de tokens en tiempo real para comparar el ritmo y la fluidez de las respuestas.',
    back: 'Bubufu',
    speedConfig: 'Velocidad',
    tps: 'Tokens por segundo',
    sourceContent: 'Texto',
    sourceToggle: 'Edita el texto o pega un enlace',
    placeholder: 'Pega el texto aquí…',
    repeatNote: 'El texto se repite. A gran velocidad solo se quedan los últimos 5.000 caracteres.',
    start: 'Reproducir',
    pause: 'Pausa',
    reset: 'Reiniciar',
    time: 'Tiempo',
    tokens: 'Tokens',
    realTimeSpeed: 'Velocidad actual',
    tpsUnit: 'tokens / s',
    status: 'Estado',
    idle: 'En espera',
    streaming: 'Saliendo',
    completed: 'Listo',
    whatIsToken: '¿Qué es un token?',
    whatIsTokenDesc:
      'Un token es un fragmento de texto que el modelo lee y escribe. Unos 1.000 tokens son unas 750 palabras en inglés. Aquí, 4 caracteres cuentan como 1 token.',
    whySpeedMatters: 'Por qué importa el ritmo',
    whySpeedMattersDesc:
      'Las mismas palabras se sienten distintas si llegan más rápido. Lento parece tecleo. Rápido se acerca a una respuesta.',
    clear: 'Borrar',
    copy: 'Copiar',
    autoMarkdown: 'Mostrar Markdown',
    awaitingSimulation: 'Pulsa Reproducir y mira salir el texto',
    language: 'Idioma',
    auto: 'Auto',
    theme: 'Tema',
    themeSystem: 'Sistema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    rankingTitle: 'Ranking de velocidad',
    rankingSubtitle: 'Elige una línea y luego una versión. Reproducir usa esa mediana.',
    modelLine: 'Modelo',
    modelVersion: 'Versión',
    pickVersion: 'Elige una versión',
    lineAlibaba: 'Qwen',
    lineOther: 'Otros',
    speedCeiling: 'Máximo',
    gptSpeedTierNote:
      'Fast de Pro no publica tokens/s de Astra; algunos modelos llegan a 2.5×. Ultrafast pide Pro 500: hasta 300 t/s en Codex (hasta 8×) y hasta 6× en la API. La mediana de Astra estándar es 65.8.',
    rankingSource: 'Fuente: Artificial Analysis · mediana de tokens/s de salida · {date}',
    rankingDisclaimer:
      'Las velocidades son la mediana de tokens/s de salida publicada por Artificial Analysis. Sirven para sentir el ritmo, no son una prueba en vivo de la API.',
    rankingSelectHint: 'Elige una línea y luego una versión. Comparar pone dos flujos uno al lado del otro.',
    compare: 'Comparar',
    compareOn: 'Comparando',
    compareOff: 'Uno',
    compareA: 'A',
    compareB: 'B',
    setAsCompare: 'Poner como contraste',
    clearCompare: 'Quitar contraste',
    selectedModel: 'Ahora',
    fastestBadge: 'El más rápido',
    contrastBadge: 'Contraste',
    medianTps: 'Mediana t/s',
    creator: 'Creador',
    ...families,
    familySpecialists: 'Especialistas en velocidad / otros',
    costPerSec: 'Coste / s',
    costPerMin: 'Coste / min',
    costPerHour: 'Coste / h',
    spent: 'Gastado',
    costNa: '—',
    costDisclaimer:
      'El gasto es aproximadamente tokens × el precio de salida. El ritmo es aproximadamente TPS × el precio de salida. Precios de lista de AA, {date}.',
    outputPrice: '$/1M salida',
    sourceUrl: 'Enlace',
    sourceUrlPlaceholder: 'https://example.com/article',
    sourceFetch: 'Leer',
    sourceFetching: 'Leyendo…',
    sourceFetchError: 'No se pudo abrir esa página.',
    sourceFetchInvalid: 'Escribe un enlace http(s) válido.',
    sourceFetchBlocked: 'Esa dirección no se puede leer.',
    sourceFetchEmpty: 'Esa página no tiene texto legible.',
  },
  pt: {
    title: 'Simulador do ritmo dos tokens',
    description: 'Vê o ritmo da IA.',
    summary:
      'Simula fluxos de tokens em tempo real para comparar o ritmo e a fluidez das respostas.',
    back: 'Bubufu',
    speedConfig: 'Velocidade',
    tps: 'Tokens por segundo',
    sourceContent: 'Texto',
    sourceToggle: 'Edita o texto ou cola uma ligação',
    placeholder: 'Cola o texto aqui…',
    repeatNote: 'O texto repete-se. A alta velocidade ficam só os últimos 5 000 caracteres.',
    start: 'Reproduzir',
    pause: 'Pausa',
    reset: 'Repor',
    time: 'Tempo',
    tokens: 'Tokens',
    realTimeSpeed: 'Velocidade atual',
    tpsUnit: 'tokens / s',
    status: 'Estado',
    idle: 'Em espera',
    streaming: 'A sair',
    completed: 'Concluído',
    whatIsToken: 'O que é um token?',
    whatIsTokenDesc:
      'Um token é um pedaço de texto que o modelo lê e escreve. Cerca de 1 000 tokens são cerca de 750 palavras em inglês. Aqui, 4 caracteres contam como 1 token.',
    whySpeedMatters: 'Porque é que o ritmo importa',
    whySpeedMattersDesc:
      'As mesmas palavras sentem-se diferentes quando chegam mais depressa. Devagar parece digitação. Depressa aproxima-se de uma resposta.',
    clear: 'Limpar',
    copy: 'Copiar',
    autoMarkdown: 'Mostrar Markdown',
    awaitingSimulation: 'Carrega em Reproduzir e vê o texto a sair',
    language: 'Língua',
    auto: 'Auto',
    theme: 'Tema',
    themeSystem: 'Sistema',
    themeLight: 'Claro',
    themeDark: 'Escuro',
    rankingTitle: 'Ranking de velocidade',
    rankingSubtitle: 'Escolhe uma linha e depois uma versão. Reproduzir usa essa mediana.',
    modelLine: 'Modelo',
    modelVersion: 'Versão',
    pickVersion: 'Escolhe uma versão',
    lineAlibaba: 'Qwen',
    lineOther: 'Outros',
    speedCeiling: 'Máximo',
    gptSpeedTierNote:
      'O Fast do Pro não publica tokens/s do Astra; alguns modelos chegam a 2.5×. Ultrafast pede Pro 500: até 300 t/s no Codex (até 8×) e até 6× na API. A mediana do Astra padrão é 65.8.',
    rankingSource: 'Fonte: Artificial Analysis · mediana de tokens/s de saída · {date}',
    rankingDisclaimer:
      'As velocidades são a mediana de tokens/s de saída publicada pela Artificial Analysis. Servem para sentir o ritmo, não são um teste ao vivo da API.',
    rankingSelectHint: 'Escolhe uma linha e depois uma versão. Comparar põe dois fluxos lado a lado.',
    compare: 'Comparar',
    compareOn: 'A comparar',
    compareOff: 'Um',
    compareA: 'A',
    compareB: 'B',
    setAsCompare: 'Usar como contraste',
    clearCompare: 'Limpar contraste',
    selectedModel: 'Agora',
    fastestBadge: 'O mais rápido',
    contrastBadge: 'Contraste',
    medianTps: 'Mediana t/s',
    creator: 'Criador',
    ...families,
    familySpecialists: 'Especialistas em velocidade / outros',
    costPerSec: 'Custo / s',
    costPerMin: 'Custo / min',
    costPerHour: 'Custo / h',
    spent: 'Gasto',
    costNa: '—',
    costDisclaimer:
      'O gasto é cerca de tokens × o preço de saída. O ritmo é cerca de TPS × o preço de saída. Preços de tabela da AA, {date}.',
    outputPrice: '$/1M saída',
    sourceUrl: 'Ligação',
    sourceUrlPlaceholder: 'https://example.com/article',
    sourceFetch: 'Ler',
    sourceFetching: 'A ler…',
    sourceFetchError: 'Não foi possível abrir essa página.',
    sourceFetchInvalid: 'Introduz uma ligação http(s) válida.',
    sourceFetchBlocked: 'Esse endereço não pode ser lido.',
    sourceFetchEmpty: 'Essa página não tem texto legível.',
  },
  ro: {
    title: 'Simulator de ritm al tokenilor',
    description: 'Vezi ritmul AI.',
    summary:
      'Simulează fluxuri de tokeni în timp real ca să compari ritmul și fluența răspunsurilor.',
    back: 'Bubufu',
    speedConfig: 'Viteză',
    tps: 'Tokeni pe secundă',
    sourceContent: 'Text',
    sourceToggle: 'Editează textul sau lipește un link',
    placeholder: 'Lipește textul aici…',
    repeatNote: 'Textul se repetă. La viteză mare rămân doar ultimele 5.000 de caractere.',
    start: 'Redă',
    pause: 'Pauză',
    reset: 'Resetează',
    time: 'Timp',
    tokens: 'Tokeni',
    realTimeSpeed: 'Viteză acum',
    tpsUnit: 'tokeni / s',
    status: 'Stare',
    idle: 'Așteptare',
    streaming: 'Curge',
    completed: 'Gata',
    whatIsToken: 'Ce este un token?',
    whatIsTokenDesc:
      'Un token este o bucată de text pe care modelul o citește și o scrie. Cam 1.000 de tokeni sunt cam 750 de cuvinte în engleză. Aici, 4 caractere înseamnă 1 token.',
    whySpeedMatters: 'De ce contează ritmul',
    whySpeedMattersDesc:
      'Aceleași cuvinte se simt altfel când vin mai repede. Încet pare tastare. Repede se apropie de un răspuns.',
    clear: 'Șterge',
    copy: 'Copiază',
    autoMarkdown: 'Arată Markdown',
    awaitingSimulation: 'Apasă Redă și vezi cum iese textul',
    language: 'Limbă',
    auto: 'Auto',
    theme: 'Temă',
    themeSystem: 'Sistem',
    themeLight: 'Luminos',
    themeDark: 'Întunecat',
    rankingTitle: 'Clasament de viteză',
    rankingSubtitle: 'Alege o linie, apoi o versiune. Redă folosește mediana aceea.',
    modelLine: 'Model',
    modelVersion: 'Versiune',
    pickVersion: 'Alege o versiune',
    lineAlibaba: 'Qwen',
    lineOther: 'Altele',
    speedCeiling: 'Vârf',
    gptSpeedTierNote:
      'Fast de la Pro nu publică tokens/s pentru Astra; unele modele ajung la 2.5×. Ultrafast cere Pro 500: până la 300 t/s în Codex (până la 8×) și până la 6× în API. Mediana Astra standard este 65.8.',
    rankingSource: 'Sursă: Artificial Analysis · mediana tokeni/s la ieșire · {date}',
    rankingDisclaimer:
      'Vitezele sunt mediana de tokeni/s la ieșire publicată de Artificial Analysis. Sunt pentru ritm, nu un test live al API-ului.',
    rankingSelectHint: 'Alege o linie, apoi o versiune. Compară pune două fluxuri unul lângă altul.',
    compare: 'Compară',
    compareOn: 'Compari',
    compareOff: 'Unul',
    compareA: 'A',
    compareB: 'B',
    setAsCompare: 'Pune ca contrast',
    clearCompare: 'Șterge contrastul',
    selectedModel: 'Acum',
    fastestBadge: 'Cel mai rapid',
    contrastBadge: 'Contrast',
    medianTps: 'Mediană t/s',
    creator: 'Creator',
    ...families,
    familySpecialists: 'Specialiști în viteză / altele',
    costPerSec: 'Cost / s',
    costPerMin: 'Cost / min',
    costPerHour: 'Cost / h',
    spent: 'Cheltuit',
    costNa: '—',
    costDisclaimer:
      'Cheltuiala este aproximativ tokeni × prețul de ieșire. Ritmul este aproximativ TPS × prețul de ieșire. Prețuri de listă AA, {date}.',
    outputPrice: '$/1M ieșire',
    sourceUrl: 'Link',
    sourceUrlPlaceholder: 'https://example.com/article',
    sourceFetch: 'Citește',
    sourceFetching: 'Se citește…',
    sourceFetchError: 'Pagina nu a putut fi deschisă.',
    sourceFetchInvalid: 'Introdu un link http(s) valid.',
    sourceFetchBlocked: 'Adresa aceasta nu poate fi citită.',
    sourceFetchEmpty: 'Pagina nu are text lizibil.',
  },
  fr: {
    title: 'Simulateur de rythme de jetons',
    description: 'Vois le rythme de l’IA.',
    summary:
      'Simule des flux de jetons en temps réel pour comparer le rythme et la fluidité des réponses.',
    back: 'Bubufu',
    speedConfig: 'Vitesse',
    tps: 'Jetons par seconde',
    sourceContent: 'Texte',
    sourceToggle: 'Modifie le texte ou colle un lien',
    placeholder: 'Colle le texte ici…',
    repeatNote: 'Le texte se répète. À grande vitesse, seuls les 5 000 derniers caractères restent.',
    start: 'Lecture',
    pause: 'Pause',
    reset: 'Réinitialiser',
    time: 'Temps',
    tokens: 'Jetons',
    realTimeSpeed: 'Vitesse actuelle',
    tpsUnit: 'jetons / s',
    status: 'État',
    idle: 'En attente',
    streaming: 'En cours',
    completed: 'Terminé',
    whatIsToken: 'Qu’est-ce qu’un jeton ?',
    whatIsTokenDesc:
      'Un jeton est un morceau de texte que le modèle lit et écrit. Environ 1 000 jetons valent environ 750 mots anglais. Ici, 4 caractères comptent pour 1 jeton.',
    whySpeedMatters: 'Pourquoi le rythme compte',
    whySpeedMattersDesc:
      'Les mêmes mots changent quand ils arrivent plus vite. Lent, cela ressemble à de la frappe. Vite, cela se rapproche d’une réponse.',
    clear: 'Effacer',
    copy: 'Copier',
    autoMarkdown: 'Afficher le Markdown',
    awaitingSimulation: 'Appuie sur Lecture pour voir le texte sortir',
    language: 'Langue',
    auto: 'Auto',
    theme: 'Thème',
    themeSystem: 'Système',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    rankingTitle: 'Classement de vitesse',
    rankingSubtitle: 'Choisis une ligne, puis une version. Lecture utilise cette médiane.',
    modelLine: 'Modèle',
    modelVersion: 'Version',
    pickVersion: 'Choisis une version',
    lineAlibaba: 'Qwen',
    lineOther: 'Autres',
    speedCeiling: 'Pic',
    gptSpeedTierNote:
      'Le mode Fast de Pro ne publie pas de tokens/s pour Astra ; certains modèles vont jusqu’à 2.5×. Ultrafast demande Pro 500 : jusqu’à 300 t/s dans Codex (jusqu’à 8×) et jusqu’à 6× dans l’API. La médiane d’Astra standard est 65.8.',
    rankingSource: 'Source : Artificial Analysis · médiane de jetons/s en sortie · {date}',
    rankingDisclaimer:
      'Les vitesses sont la médiane de jetons/s en sortie publiée par Artificial Analysis. Elles servent à sentir le rythme, pas à un test en direct de l’API.',
    rankingSelectHint: 'Choisis une ligne, puis une version. Comparer joue deux flux côte à côte.',
    compare: 'Comparer',
    compareOn: 'Comparaison',
    compareOff: 'Un seul',
    compareA: 'A',
    compareB: 'B',
    setAsCompare: 'Mettre en contraste',
    clearCompare: 'Retirer le contraste',
    selectedModel: 'En cours',
    fastestBadge: 'Le plus rapide',
    contrastBadge: 'Contraste',
    medianTps: 'Médiane t/s',
    creator: 'Créateur',
    ...families,
    familySpecialists: 'Spécialistes de la vitesse / autres',
    costPerSec: 'Coût / s',
    costPerMin: 'Coût / min',
    costPerHour: 'Coût / h',
    spent: 'Dépensé',
    costNa: '—',
    costDisclaimer:
      'La dépense est environ jetons × le prix de sortie. Le rythme est environ TPS × le prix de sortie. Prix catalogue AA, {date}.',
    outputPrice: '$/1M sortie',
    sourceUrl: 'Lien',
    sourceUrlPlaceholder: 'https://example.com/article',
    sourceFetch: 'Lire',
    sourceFetching: 'Lecture…',
    sourceFetchError: 'Cette page n’a pas pu s’ouvrir.',
    sourceFetchInvalid: 'Entre un lien http(s) valide.',
    sourceFetchBlocked: 'Cette adresse ne peut pas être lue.',
    sourceFetchEmpty: 'Cette page n’a pas de texte lisible.',
  },
  de: {
    title: 'Token-Tempssimulator',
    description: 'Sieh das Tempo der KI.',
    summary:
      'Simuliert Token-Ströme in Echtzeit, um Tempo und Fluss der Antworten zu vergleichen.',
    back: 'Bubufu',
    speedConfig: 'Tempo',
    tps: 'Token pro Sekunde',
    sourceContent: 'Text',
    sourceToggle: 'Text ändern oder einen Link einfügen',
    placeholder: 'Text hier einfügen…',
    repeatNote: 'Der Text wiederholt sich. Bei hohem Tempo bleiben nur die letzten 5.000 Zeichen.',
    start: 'Abspielen',
    pause: 'Pause',
    reset: 'Zurücksetzen',
    time: 'Zeit',
    tokens: 'Token',
    realTimeSpeed: 'Tempo jetzt',
    tpsUnit: 'Token / s',
    status: 'Status',
    idle: 'Bereit',
    streaming: 'Läuft',
    completed: 'Fertig',
    whatIsToken: 'Was ist ein Token?',
    whatIsTokenDesc:
      'Ein Token ist ein Textstück, das ein Modell liest und schreibt. Etwa 1.000 Token sind ungefähr 750 englische Wörter. Hier zählen 4 Zeichen als 1 Token.',
    whySpeedMatters: 'Warum das Tempo zählt',
    whySpeedMattersDesc:
      'Dieselben Wörter wirken anders, wenn sie schneller ankommen. Langsam liest sich wie Tippen. Schnell wirkt näher an einer Antwort.',
    clear: 'Löschen',
    copy: 'Kopieren',
    autoMarkdown: 'Markdown zeigen',
    awaitingSimulation: 'Drück auf Abspielen und sieh den Text kommen',
    language: 'Sprache',
    auto: 'Auto',
    theme: 'Darstellung',
    themeSystem: 'System',
    themeLight: 'Hell',
    themeDark: 'Dunkel',
    rankingTitle: 'Tempo-Rangliste',
    rankingSubtitle: 'Wähl zuerst eine Linie, dann eine Version. Abspielen nutzt diesen Median.',
    modelLine: 'Modell',
    modelVersion: 'Version',
    pickVersion: 'Version wählen',
    lineAlibaba: 'Qwen',
    lineOther: 'Andere',
    speedCeiling: 'Höchst',
    gptSpeedTierNote:
      'Pro Fast veröffentlicht keine Astra-Token/s; manche Modelle sind bis zu 2.5×. Ultrafast braucht Pro 500: bis zu 300 t/s in Codex (bis zu 8×) und bis zu 6× in der API. Der Median von Standard-Astra ist 65.8.',
    rankingSource: 'Quelle: Artificial Analysis · Median der Ausgabe-Token/s · {date}',
    rankingDisclaimer:
      'Die Tempi sind der von Artificial Analysis veröffentlichte Median der Ausgabe-Token/s. Sie sind zum Fühlen da, kein Live-Test der API.',
    rankingSelectHint: 'Wähl zuerst eine Linie, dann eine Version. Vergleich spielt zwei Ströme nebeneinander.',
    compare: 'Vergleich',
    compareOn: 'Vergleich läuft',
    compareOff: 'Einzeln',
    compareA: 'A',
    compareB: 'B',
    setAsCompare: 'Als Kontrast setzen',
    clearCompare: 'Kontrast löschen',
    selectedModel: 'Jetzt',
    fastestBadge: 'Am schnellsten',
    contrastBadge: 'Kontrast',
    medianTps: 'Median t/s',
    creator: 'Anbieter',
    ...families,
    familySpecialists: 'Tempo-Spezialisten / andere',
    costPerSec: 'Kosten / s',
    costPerMin: 'Kosten / min',
    costPerHour: 'Kosten / h',
    spent: 'Summe',
    costNa: '—',
    costDisclaimer:
      'Die Summe ist etwa Token × Ausgabepreis. Das Tempo ist etwa TPS × Ausgabepreis. Listenpreise von AA, {date}.',
    outputPrice: '$/1M Ausgabe',
    sourceUrl: 'Link',
    sourceUrlPlaceholder: 'https://example.com/article',
    sourceFetch: 'Lesen',
    sourceFetching: 'Liest…',
    sourceFetchError: 'Diese Seite ließ sich nicht öffnen.',
    sourceFetchInvalid: 'Gib einen gültigen http(s)-Link ein.',
    sourceFetchBlocked: 'Diese Adresse kann nicht gelesen werden.',
    sourceFetchEmpty: 'Diese Seite hat keinen lesbaren Text.',
  },
};

const fastest = {
  es: 'En la instantánea del {date}, el más rápido es {a} ({aTps} t/s), luego {b} ({bTps} t/s) y {c} ({cTps} t/s).',
  pt: 'Na fotografia de {date}, o mais rápido é {a} ({aTps} t/s), depois {b} ({bTps} t/s) e {c} ({cTps} t/s).',
  ro: 'În fotografia din {date}, cel mai rapid este {a} ({aTps} t/s), apoi {b} ({bTps} t/s) și {c} ({cTps} t/s).',
  fr: 'Sur l’instantané du {date}, le plus rapide est {a} ({aTps} t/s), puis {b} ({bTps} t/s) et {c} ({cTps} t/s).',
  de: 'In der Momentaufnahme vom {date} ist {a} am schnellsten ({aTps} t/s), dann {b} ({bTps} t/s) und {c} ({cTps} t/s).',
} as const;

export const addedSeo: Record<Added, SeoCopy> = {
  es: {
    ogLocale: 'es_ES',
    siteName: 'Bubufu',
    imageAlt: 'Bubufu',
    metaExtra:
      'La reproducción se queda en el navegador y no llama a la API de un modelo. Las velocidades son la mediana de tokens/s de salida de Artificial Analysis del {date}.',
    leadExtra: 'Es un reproductor del navegador: sin inicio de sesión y sin llamada a la API de un modelo.',
    facts:
      'Unos 4 caracteres cuentan como 1 token, para sentir el ritmo. No es el tokenizador del modelo. Las filas van por familia: OpenAI, Anthropic, Google, SpaceXAI Grok, DeepSeek, Qwen, GLM, Kimi, MiniMax y especialistas en velocidad. El coste aparece solo si hay un precio de salida publicado. Gemini 4 Argon no tiene mediana publicada, así que no está en la lista.',
    fastest: fastest.es,
    howTitle: 'Cómo usarlo',
    steps: [
      'Elige una línea, como GPT o Claude, y luego una versión. Reproducir usa esa mediana de tokens/s.',
      'Pulsa Reproducir y mira el texto salir a ese ritmo. Puedes editar el texto o pegar el enlace de una página pública.',
      'Activa Comparar y pon otra fila como B. Cambiar de familia vacía ese panel.',
    ],
    faqTitle: 'Preguntas',
    faqs: [
      {
        q: '¿Qué es el simulador de ritmo de tokens?',
        a: 'Simula flujos de tokens en tiempo real para comparar el ritmo y la fluidez de las respuestas. Mira el ritmo de la IA.',
      },
      {
        q: '¿La reproducción envía el texto a un modelo?',
        a: 'No. El navegador escribe a la velocidad que elegiste. No inicia sesión ni llama a la API de un modelo. Un enlace público se lee para sacar el texto; si el navegador no puede, se prueba un proxy de lectura.',
      },
      {
        q: '¿De dónde salen las velocidades?',
        a: 'Son la mediana de tokens/s de salida de Artificial Analysis, con fecha {date}. Sirven para sentir el ritmo, no son una prueba en vivo de tu cuenta.',
      },
      {
        q: '¿Cuál es el más rápido ahora?',
        a: fastest.es,
      },
      {
        q: '¿Cómo comparo dos modelos?',
        a: 'Activa Comparar, elige A, pon otra fila como B y pulsa Reproducir una vez. La misma familia conserva el texto si solo cambia la velocidad. Otra familia vacía ese panel.',
      },
      {
        q: '¿Cómo se calcula el coste?',
        a: 'Si AA publica un precio de salida, el gasto es aproximadamente tokens por ese precio, y el ritmo es aproximadamente tokens/s por ese precio. Si falta el precio, queda una raya. No se inventa nada.',
      },
      {
        q: '¿Qué idiomas hay?',
        a: `${names}. Auto sigue al navegador. Un idioma concreto se guarda en la cookie bubufu-language y abre su dirección.`,
      },
    ],
    languagesLabel: 'Idiomas',
    sourceLabel: 'Fuente',
    updatedLabel: 'Página actualizada',
  },
  pt: {
    ogLocale: 'pt_PT',
    siteName: 'Bubufu',
    imageAlt: 'Bubufu',
    metaExtra:
      'A reprodução fica no navegador e não chama a API de um modelo. As velocidades são a mediana de tokens/s de saída da Artificial Analysis em {date}.',
    leadExtra: 'É um reprodutor no navegador: sem início de sessão e sem chamada à API de um modelo.',
    facts:
      'Cerca de 4 caracteres contam como 1 token, para sentires o ritmo. Não é o tokenizador do modelo. As linhas estão por família: OpenAI, Anthropic, Google, SpaceXAI Grok, DeepSeek, Qwen, GLM, Kimi, MiniMax e especialistas em velocidade. O custo só aparece quando há um preço de saída publicado. Gemini 4 Argon não tem mediana publicada, por isso não está na lista.',
    fastest: fastest.pt,
    howTitle: 'Como usar',
    steps: [
      'Escolhe uma linha, como GPT ou Claude, e depois uma versão. Reproduzir usa essa mediana de tokens/s.',
      'Carrega em Reproduzir e vê o texto sair a esse ritmo. Podes editar o texto ou colar a ligação de uma página pública.',
      'Liga Comparar e põe outra linha como B. Mudar de família limpa esse painel.',
    ],
    faqTitle: 'Perguntas',
    faqs: [
      {
        q: 'O que é o simulador do ritmo dos tokens?',
        a: 'Simula fluxos de tokens em tempo real para comparar o ritmo e a fluidez das respostas. Vê o ritmo da IA.',
      },
      {
        q: 'A reprodução envia o texto a um modelo?',
        a: 'Não. O navegador escreve à velocidade que escolheste. Não inicia sessão nem chama a API de um modelo. Uma ligação pública é lida para obter o texto; se o navegador não conseguir, tenta-se um proxy de leitura.',
      },
      {
        q: 'De onde vêm as velocidades?',
        a: 'São a mediana de tokens/s de saída da Artificial Analysis, com data {date}. Servem para sentir o ritmo, não são um teste ao vivo da tua conta.',
      },
      {
        q: 'Qual é o mais rápido agora?',
        a: fastest.pt,
      },
      {
        q: 'Como comparo dois modelos?',
        a: 'Liga Comparar, escolhe A, põe outra linha como B e carrega uma vez em Reproduzir. A mesma família mantém o texto se só a velocidade mudar. Outra família limpa esse painel.',
      },
      {
        q: 'Como se calcula o custo?',
        a: 'Quando a AA publica um preço de saída, o gasto é cerca de tokens vezes esse preço, e o ritmo é cerca de tokens/s vezes esse preço. Sem preço, fica um traço. Nada é inventado.',
      },
      {
        q: 'Que línguas existem?',
        a: `${names}. Auto segue o navegador. Uma língua concreta fica no cookie bubufu-language e abre o endereço dessa língua.`,
      },
    ],
    languagesLabel: 'Línguas',
    sourceLabel: 'Fonte',
    updatedLabel: 'Página atualizada',
  },
  ro: {
    ogLocale: 'ro_RO',
    siteName: 'Bubufu',
    imageAlt: 'Bubufu',
    metaExtra:
      'Redarea rămâne în browser și nu apelează API-ul unui model. Vitezele sunt mediana de tokeni/s la ieșire de la Artificial Analysis, din {date}.',
    leadExtra: 'Este un player în browser: fără autentificare și fără apel către API-ul unui model.',
    facts:
      'Cam 4 caractere contează ca 1 token, ca să simți ritmul. Nu este tokenizerul modelului. Rândurile sunt grupate pe familii: OpenAI, Anthropic, Google, SpaceXAI Grok, DeepSeek, Qwen, GLM, Kimi, MiniMax și specialiști în viteză. Costul apare doar când există un preț de ieșire publicat. Gemini 4 Argon nu are mediană publicată, deci nu este în listă.',
    fastest: fastest.ro,
    howTitle: 'Cum se folosește',
    steps: [
      'Alege o linie, cum ar fi GPT sau Claude, apoi o versiune. Redă folosește mediana aceea de tokeni/s.',
      'Apasă Redă și vezi textul ieșind în ritmul acela. Poți edita textul sau lipi linkul unei pagini publice.',
      'Pornește Compară și pune alt rând ca B. Schimbarea familiei golește panoul acela.',
    ],
    faqTitle: 'Întrebări',
    faqs: [
      {
        q: 'Ce este simulatorul de ritm al tokenilor?',
        a: 'Simulează fluxuri de tokeni în timp real ca să compari ritmul și fluența răspunsurilor. Vezi ritmul AI.',
      },
      {
        q: 'Redarea trimite textul către un model?',
        a: 'Nu. Browserul scrie la viteza aleasă. Nu te autentifică și nu apelează API-ul unui model. Un link public este citit pentru text; dacă browserul nu poate, se încearcă un proxy de citire.',
      },
      {
        q: 'De unde vin vitezele?',
        a: 'Sunt mediana de tokeni/s la ieșire de la Artificial Analysis, din {date}. Sunt pentru ritm, nu un test live al contului tău.',
      },
      {
        q: 'Care este cel mai rapid acum?',
        a: fastest.ro,
      },
      {
        q: 'Cum compar două modele?',
        a: 'Pornește Compară, alege A, pune alt rând ca B și apasă Redă o dată. Aceeași familie păstrează textul dacă se schimbă doar viteza. O altă familie golește panoul.',
      },
      {
        q: 'Cum se calculează costul?',
        a: 'Când AA publică un preț de ieșire, cheltuiala este aproximativ tokeni înmulțiți cu prețul, iar ritmul este aproximativ tokeni/s înmulțiți cu prețul. Fără preț, rămâne o linie. Nu se inventează nimic.',
      },
      {
        q: 'Ce limbi există?',
        a: `${names}. Auto urmează browserul. O limbă aleasă se salvează în cookie-ul bubufu-language și deschide adresa acelei limbi.`,
      },
    ],
    languagesLabel: 'Limbi',
    sourceLabel: 'Sursă',
    updatedLabel: 'Pagină actualizată',
  },
  fr: {
    ogLocale: 'fr_FR',
    siteName: 'Bubufu',
    imageAlt: 'Bubufu',
    metaExtra:
      'La lecture reste dans le navigateur et n’appelle pas l’API d’un modèle. Les vitesses sont la médiane de jetons/s en sortie d’Artificial Analysis au {date}.',
    leadExtra: 'C’est un lecteur dans le navigateur : pas de connexion, pas d’appel à l’API d’un modèle.',
    facts:
      'Environ 4 caractères comptent pour 1 jeton, pour sentir le rythme. Ce n’est pas le tokeniseur du modèle. Les lignes sont groupées par famille : OpenAI, Anthropic, Google, SpaceXAI Grok, DeepSeek, Qwen, GLM, Kimi, MiniMax et spécialistes de la vitesse. Le coût n’apparaît que si un prix de sortie est publié. Gemini 4 Argon n’a pas de médiane publiée, donc il n’est pas dans la liste.',
    fastest: fastest.fr,
    howTitle: 'Comment l’utiliser',
    steps: [
      'Choisis une ligne, comme GPT ou Claude, puis une version. Lecture utilise cette médiane de jetons/s.',
      'Appuie sur Lecture et regarde le texte sortir à ce rythme. Tu peux modifier le texte ou coller le lien d’une page publique.',
      'Active Comparer et mets une autre ligne en B. Changer de famille vide ce volet.',
    ],
    faqTitle: 'Questions',
    faqs: [
      {
        q: 'Qu’est-ce que le simulateur de rythme de jetons ?',
        a: 'Simule des flux de jetons en temps réel pour comparer le rythme et la fluidité des réponses. Vois le rythme de l’IA.',
      },
      {
        q: 'La lecture envoie-t-elle le texte à un modèle ?',
        a: 'Non. Le navigateur écrit à la vitesse choisie. Il ne te connecte pas et n’appelle pas l’API d’un modèle. Un lien public est lu pour son texte ; si le navigateur ne peut pas, un proxy de lecture est essayé.',
      },
      {
        q: 'D’où viennent les vitesses ?',
        a: 'Ce sont les médianes de jetons/s en sortie d’Artificial Analysis, à la date du {date}. Elles servent à sentir le rythme, pas à un test en direct de ton compte.',
      },
      {
        q: 'Lequel est le plus rapide maintenant ?',
        a: fastest.fr,
      },
      {
        q: 'Comment comparer deux modèles ?',
        a: 'Active Comparer, choisis A, mets une autre ligne en B, puis appuie une fois sur Lecture. La même famille garde le texte si seule la vitesse change. Une autre famille vide ce volet.',
      },
      {
        q: 'Comment le coût est-il calculé ?',
        a: 'Quand AA publie un prix de sortie, la dépense est environ jetons fois ce prix, et le rythme est environ jetons/s fois ce prix. Sans prix, il reste un tiret. Rien n’est inventé.',
      },
      {
        q: 'Quelles langues sont disponibles ?',
        a: `${names}. Auto suit le navigateur. Une langue précise est enregistrée dans le cookie bubufu-language et ouvre l’adresse de cette langue.`,
      },
    ],
    languagesLabel: 'Langues',
    sourceLabel: 'Source',
    updatedLabel: 'Page mise à jour',
  },
  de: {
    ogLocale: 'de_DE',
    siteName: 'Bubufu',
    imageAlt: 'Bubufu',
    metaExtra:
      'Die Wiedergabe bleibt im Browser und ruft keine Modell-API auf. Die Tempi sind der Median der Ausgabe-Token/s von Artificial Analysis vom {date}.',
    leadExtra: 'Es ist ein Player im Browser: kein Login und kein Aufruf einer Modell-API.',
    facts:
      'Etwa 4 Zeichen zählen als 1 Token, damit du das Tempo fühlst. Das ist nicht der Tokenizer des Modells. Die Zeilen sind nach Familien gruppiert: OpenAI, Anthropic, Google, SpaceXAI Grok, DeepSeek, Qwen, GLM, Kimi, MiniMax und Tempo-Spezialisten. Kosten erscheinen nur, wenn ein Ausgabepreis veröffentlicht ist. Gemini 4 Argon hat keinen veröffentlichten Median und fehlt deshalb.',
    fastest: fastest.de,
    howTitle: 'So geht’s',
    steps: [
      'Wähl eine Linie, zum Beispiel GPT oder Claude, dann eine Version. Abspielen nutzt diesen Median in Token/s.',
      'Drück auf Abspielen und sieh den Text in diesem Tempo. Du kannst den Text ändern oder den Link einer öffentlichen Seite einfügen.',
      'Schalt Vergleich ein und setz eine andere Zeile als B. Ein Familienwechsel leert diese Seite.',
    ],
    faqTitle: 'Fragen',
    faqs: [
      {
        q: 'Was ist der Token-Tempssimulator?',
        a: 'Simuliert Token-Ströme in Echtzeit, um Tempo und Fluss der Antworten zu vergleichen. Sieh das Tempo der KI.',
      },
      {
        q: 'Schickt die Wiedergabe den Text an ein Modell?',
        a: 'Nein. Der Browser schreibt mit dem Tempo, das du gewählt hast. Er meldet dich nicht an und ruft keine Modell-API auf. Ein öffentlicher Link wird gelesen; wenn der Browser ihn nicht lesen kann, wird ein Lese-Proxy versucht.',
      },
      {
        q: 'Woher kommen die Tempi?',
        a: 'Es sind die Mediane der Ausgabe-Token/s von Artificial Analysis, Stand {date}. Sie sind zum Fühlen da, kein Live-Test deines Kontos.',
      },
      {
        q: 'Welches Modell ist gerade am schnellsten?',
        a: fastest.de,
      },
      {
        q: 'Wie vergleiche ich zwei Modelle?',
        a: 'Schalt Vergleich ein, wähl A, setz eine andere Zeile als B und drück einmal auf Abspielen. Dieselbe Familie behält den Text, wenn sich nur das Tempo ändert. Eine andere Familie leert die Seite.',
      },
      {
        q: 'Wie werden die Kosten gerechnet?',
        a: 'Wenn AA einen Ausgabepreis veröffentlicht, ist die Summe etwa Token mal diesem Preis, und das Tempo etwa Token/s mal diesem Preis. Fehlt der Preis, bleibt ein Strich. Nichts wird erfunden.',
      },
      {
        q: 'Welche Sprachen gibt es?',
        a: `${names}. Auto folgt dem Browser. Eine konkrete Sprache wird im Cookie bubufu-language gespeichert und öffnet die Adresse dieser Sprache.`,
      },
    ],
    languagesLabel: 'Sprachen',
    sourceLabel: 'Quelle',
    updatedLabel: 'Seite aktualisiert',
  },
};

export function withSample(lang: Added): Translation {
  return { ...addedTranslations[lang], sampleText: addedSamples[lang] };
}
