# 🌱 Conecta Agro Design System — *Arva Editorial*

> **Versão:** 2.0.0 (Atualização Arva)
> **Conceito:** Uma linguagem pastoral e editorial que substitui o visual de "SaaS técnico" por uma revista impressa no campo.
> **Inspiração:** A harmonia entre a solidez orgânica da terra e a acurácia cirúrgica dos dados agronômicos, utilizando cores como Forest Ink, Vivid Lime, Bone Canvas e uma tipografia editorial (Cormorant Garamond e Inter).
> **Status:** Referência Oficial para a Interface do Conecta Agro.

---

## 1. Manifesto & Conceito de Identidade

O **Conecta Agro** não é apenas uma planilha digital; é a ferramenta de campo do produtor rural e do técnico agrícola. Ele precisa funcionar debaixo de sol forte, transmitindo ao mesmo tempo:

1. **Editorial Pastoral:** Uso de um canvas em tom "Bone" (off-white quente) para simular papel impresso, evitando o branco puro que causa fadiga ocular.
2. **Contraste & Scarcity:** O verde Forest Ink ancora a estrutura pesada da página, enquanto o Vivid Lime é o único acento de alta energia, usado de forma muito escassa para destacar.
3. **Formas Amigáveis (Pill):** O formato "Pill" domina os botões e interações, tirando a rigidez do formato clássico quadrado.

---

## 2. Paleta de Cores (Color Tokens)

### 2.1 Cores Estruturais
| Token | Hex | Uso Principal |
| :--- | :--- | :--- |
| `--color-forest-ink` | `#07503f` | Cor primária da marca, fundos de cabeçalho, footer, botões de ação primária e banners de seção. |
| `--color-vivid-lime` | `#e8fe85` | Tiras promocionais (marquee), barras de anúncios. Única cor de alta energia. |
| `--color-bone` | `#f1efdf` | Canvas/Fundo principal da página. Quente e orgânico. Nunca usar branco puro como base. |
| `--color-pure-white` | `#ffffff` | Superfície de cartões, campos de entrada de dados, texto de botões primários. |

### 2.2 Cores Secundárias (Tons Neutros e de Texto)
| Token | Hex | Uso Principal |
| :--- | :--- | :--- |
| `--color-charcoal` | `#212529` | Texto corrido principal, altíssimo contraste sobre canvas Bone ou Branco. |
| `--color-graphite` | `#353535` | Texto secundário, bordas de links e contornos sutis de UI. |
| `--color-pewter` | `#6d6d6d` | Textos de ajuda, informações terciárias. |
| `--color-moss` | `#c3cda7` | Bordas sutis, contorno de inputs e divisores de conteúdo. |
| `--color-ash-gray` | `#efefef` | Superfície secundária de cartões e divisores de seção sutil. |

### 2.3 Superfícies Quilted (Cartões Decorativos)
Ao invés de branco, cartões de parcerias e categorias utilizam uma escala de tons pastéis alternados (quilt).
| Token | Hex | Uso Principal |
| :--- | :--- | :--- |
| `--color-sky-card` | `#b2cee7` | Fundo de cartão pastel (Azul céu). |
| `--color-peach-card` | `#fceace` | Fundo de cartão pastel (Pêssego). |
| `--color-sage-card` | `#e6ecd5` | Fundo de cartão pastel (Sálvia / Verde claro). |

---

## 3. Tipografia (Typography System)

Para unir a **personalidade editorial contemporânea** com a **legibilidade analítica de dados**:

* **Família Primária (Interface, Textos Corridos e Números):** `'Inter', sans-serif`
  * *Por quê:* Trata tudo que é funcional abaixo de 24px. Rótulos, botões e valores.
* **Família de Exibição (Cabeçalhos Editoriais e Citações):** `'Cormorant Garamond', serif` *(Substituto para Reckless)*
  * *Por quê:* Traz o peso literário e a confiança da marca. Usada de forma leve (peso 300) em grandes tamanhos (57px+).

---

## 4. Forma e Espaçamento (Shape Language)

Os raios são desproporcionalmente grandes para suavizar o visual:
* **Botões e Nav-pills:** Raio de 100px a 110px. O formato de "pílula" é assinatura da marca.
* **Inputs e Campos de Texto:** Raio de 33px.
* **Cartões (Quilted Cards e Records):** Raio de 20px com padding generoso de 30px.

Sem sombras profundas (Box-shadows são evitados). A separação de elementos é feita através da mudança drástica de superfície (Cartões brancos ou pastéis flutuando em um fundo Bone).

---

## 5. Aplicação no Código (CSS Base)

O arquivo principal de tokens é o `design-system.css`, que deve ser importado globalmente. Ele redefine a estética do painel web e da Home.

```css
:root {
  --color-forest-ink: #07503f;
  --color-vivid-lime: #e8fe85;
  --color-bone: #f1efdf;
  --color-pure-white: #ffffff;
  /* ... outros tokens no design-system.css ... */
}
```

---

## 6. Diretrizes de Uso ("Do's and Don'ts")

> [!TIP]
> **Faça (Do):**
> * Use Bone (`#f1efdf`) como a tela de fundo em qualquer seção clara, nunca branco puro.
> * Aplique o arredondamento (border-radius) de 100px para todos os botões e CTAs.
> * Utilize a Serifada (Cormorant/Reckless) para grandes títulos em páginas de marketing.
> * Use os cartões pastéis (Sky, Peach, Sage, Bone) como uma paleta rotativa na mesma linha (formato "colcha").

> [!WARNING]
> **Evite (Don't):**
> * Não use Vivid Lime em grandes blocos. É restrito à Marquee e micro-acentos.
> * Não utilize a tipografia serifada para textos pequenos ou body copy.
> * Não crie cantos rígidos em elementos interativos ou botões.
> * Não utilize sombras acentuadas (elevation) nos cartões; use cores de superfície para separar.
