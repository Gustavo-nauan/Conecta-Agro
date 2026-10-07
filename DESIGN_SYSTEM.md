# 🌱 Conecta Agro Design System — *Raiz & Precisão (Soil & Pulse)*

> **Versão:** 1.0.0  
> **Conceito:** A harmonia entre a solidez orgânica da terra e a acurácia cirúrgica dos dados agronômicos.  
> **Inspiração:** Fusão de arquitetura de alta densidade de dados (Tech SaaS agrícola) com a calorosa identidade visual da cultura do campo (tons terrosos, texturas nobres e tipografia humanista contemporânea).  
> **Status:** Referência Oficial para a Interface do Conecta Agro.

---

## 1. Manifesto & Conceito de Identidade

O **Conecta Agro** não é apenas uma planilha digital; é a ferramenta de campo do produtor rural e do técnico agrícola. Ele precisa funcionar debaixo de sol forte, em telas com poeira ou com dedos em movimento, transmitindo ao mesmo tempo:

1. **Robustez & Confiabilidade da Terra (*Raiz*):** Cores que remetem ao solo fértil, à argila úmida, à folhagem viva e ao trigo maduro. A estética não é fria nem corporativa genérica.
2. **Precisão & Clareza Operacional (*Pulso*):** Dados numéricos tabulares limpos, badges de alerta instantâneas, contrastes rigorosos para alta visibilidade à luz do dia e hierarquia visual sem ruído.

```
       ┌────────────────────────────────────────────────────────┐
       │                CONECTA AGRO DESIGN SYSTEM              │
       │                                                        │
       │      [ RAIZ ]                           [ PULSO ]      │
       │   Solo, Argila, Trigo              Métricas, Sensores  │
       │   Identidade Humana                 Alertas Críticos   │
       │   Acolhimento & Tradição            Velocidade & Dados │
       │                \                     /                 │
       │                 ▼                   ▼                  │
       │             "Agrotech Orgânico de Precisão"            │
       └────────────────────────────────────────────────────────┘
```

---

## 2. Paleta de Cores (Color Tokens)

A paleta foi calibrada com proporções HSL balanceadas para garantir contraste WCAG AA/AAA em telas externas e ambientes de luminosidade extrema.

### 2.1 Cores Primárias — *Vitalidade da Lavoura*
| Token | Nome | Hex | Uso Principal |
| :--- | :--- | :--- | :--- |
| `--color-brand-900` | **Deep Canopy** | `#0D2818` | Cabeçalhos institucionais, texto de máximo contraste, badges nobres |
| `--color-brand-800` | **Forest Prime** | `#164E2E` | Cor de destaque primária, barras laterais, botões principais |
| `--color-brand-600` | **Agro Leaf** | `#227C4B` | Botões em hover, ícones de destaque, bordas ativas |
| `--color-brand-500` | **Sprout Green** | `#34A853` | Ações positivas, confirmações, botões secundários ativos |
| `--color-brand-100` | **Dew Soft** | `#EAF7EE` | Fundos de cards destacados, chips de seleção leve |

### 2.2 Cores Secundárias — *A Força da Terra & Safra*
| Token | Nome | Hex | Uso Principal |
| :--- | :--- | :--- | :--- |
| `--color-earth-700` | **Rich Clay** | `#6E4032` | Títulos secundários de talhão, detalhes estruturais |
| `--color-earth-500` | **Terracotta** | `#A85A3F` | Acentos terrosos quentes, indicadores de solo |
| `--color-harvest-500`| **Wheat Amber** | `#E5A93C` | Alertas de dessecação, época de colheita, gráficos |
| `--color-harvest-100`| **Pale Straw** | `#FCF6E8` | Fundo de observações de campo, destaques especiais |

### 2.3 Neutros de Alto Contraste Solar
| Token | Nome | Hex | Uso Principal |
| :--- | :--- | :--- | :--- |
| `--color-neutral-900`| **Charcoal Basalt** | `#111815` | Texto corrido principal (altíssimo contraste sob sol) |
| `--color-neutral-700`| **Dark Slate** | `#37413C` | Rótulos secundários, legendas de gráficos |
| `--color-neutral-400`| **Field Mist** | `#9CA39F` | Bordas inativas, placeholders, divisores suaves |
| `--color-neutral-200`| **Warm Gray** | `#E8EAE7` | Linhas de tabela, bordas de cards e inputs |
| `--color-neutral-100`| **Field Stone** | `#F3F5F2` | Fundo de inputs e cards desabilitados |
| `--color-neutral-50` | **Off-White Canvas**| `#F9FAF7` | Fundo geral da aplicação (evita reflexo agressivo do branco puro) |
| `--color-surface`    | **Pure White** | `#FFFFFF` | Superfície dos cards de medição e modais |

### 2.4 Cores Semânticas de Campo & Alertas Fitossanitários
Cada status possui a cor de frente (texto/ícone) e um fundo suave (*tint*) com borda dedicada:

| Status Agronômico | Token Cor Primária | Token Fundo Suave | Significado na Ronda |
| :--- | :--- | :--- | :--- |
| **🟢 Normal / Seguro** | `--color-status-success` (`#15803D`) | `--color-status-success-bg` (`#DCFCE7`) | Nenhuma praga detectada, solo em faixa ótima |
| **🟡 Atenção / Monitorar** | `--color-status-warning` (`#B45309`) | `--color-status-warning-bg` (`#FEF3C7`) | Início de infestação em bordadura, umidade no limite |
| **🟠 Alerta / Prevenção** | `--color-status-alert` (`#C2410C`) | `--color-status-alert-bg` (`#FFEDD5`) | Incidência média de praga, necessidade de dessecação |
| **🔴 Crítico / Ação Já** | `--color-status-danger` (`#B91C1C`) | `--color-status-danger-bg` (`#FEE2E2`) | Ataque severo de lagarta/ferrugem, estresse hídrico agudo |
| **💧 Hidro / Solo** | `--color-status-water` (`#0369A1`) | `--color-status-water-bg` (`#E0F2FE`) | Medições de umidade do solo, irrigação |

---

## 3. Tipografia (Typography System)

Para unir a **personalidade editorial contemporânea** com a **legibilidade analítica de dados**:

* **Família Primária (Interface & Números):** `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`
  * *Por quê:* Geometria aberta, excelente legibilidade em tamanhos pequenos e numerais tabulares bem definidos para medições de `°C` e `%`.
* **Família de Título & Assinatura (Marca & Cabeçalhos):** `'Outfit', sans-serif`
  * *Por quê:* Traz modernidade, frescor e presença institucional premium.

### Escala Tipográfica
```
Display Hero : 32px (2.00rem) | Weight: 700 | Line-Height: 1.2  | Letras: -0.02em
H1 / Seção   : 24px (1.50rem) | Weight: 700 | Line-Height: 1.3  | Letras: -0.01em
H2 / Card    : 18px (1.125rem)| Weight: 600 | Line-Height: 1.4  | Letras: -0.01em
H3 / Talhão  : 16px (1.00rem) | Weight: 600 | Line-Height: 1.4  | Letras: 0
Body Regular : 15px (0.9375rem)| Weight: 400 | Line-Height: 1.5  | Letras: 0
Body Medium  : 15px (0.9375rem)| Weight: 500 | Line-Height: 1.5  | Letras: 0
Caption / Ref: 13px (0.8125rem)| Weight: 400 | Line-Height: 1.4  | Letras: +0.01em
Badge / Meta : 12px (0.75rem) | Weight: 600 | Line-Height: 1.2  | Letras: +0.04em (Uppercase)
Metric Value : 28px (1.75rem) | Weight: 700 | Line-Height: 1.1  | Tabular Numbers
```

---

## 4. Espaçamento, Grid e Elevações

### 4.1 Sistema de Espaçamento (Base 4/8pt)
```css
--space-xxs: 4px;   /* Micro espaçamentos internos de badges e ícones */
--space-xs:  8px;   /* Gaps entre elementos relacionados */
--space-sm:  12px;  /* Padding interno de botões compactos e inputs */
--space-md:  16px;  /* Padding padrão de inputs e cards menores */
--space-lg:  24px;  /* Padding de cards principais e seções de formulário */
--space-xl:  32px;  /* Separação de grandes blocos de conteúdo */
--space-2xl: 48px;  /* Espaçamento de cabeçalho e rodapé */
```

### 4.2 Raios de Curvatura (Border Radii)
Inspirado na precisão técnica suavizada:
* `--radius-sm`: `6px` (Inputs, campos de formulário, botões secundários)
* `--radius-md`: `12px` (Cards de medição, caixas de diálogo, modais)
* `--radius-lg`: `16px` (Banners de resumo, containers de talhão)
* `--radius-full`: `9999px` (Status badges em pílula, chips de filtro, botões circulares)

### 4.3 Sombras Quentes Orgânicas (Warm Shadows)
Ao invés de sombras pretas duras de sistemas genéricos, usamos um tom de terra suave (`rgba(17, 24, 21, ...)`):
* **Elevação 1 (Cards em repouso):** `0 1px 3px rgba(17, 24, 21, 0.05), 0 1px 2px rgba(17, 24, 21, 0.08)`
* **Elevação 2 (Hover / Destaque):** `0 4px 12px rgba(22, 78, 46, 0.08), 0 2px 4px rgba(17, 24, 21, 0.06)`
* **Elevação 3 (Modais e Menus):** `0 12px 28px rgba(13, 40, 24, 0.15), 0 4px 10px rgba(17, 24, 21, 0.08)`

---

## 5. Anatomia dos Componentes Especializados

### 5.1 KPI Metric Cards (Painel de Visão Rápida)
Cards de topo com fundo branco, microborda e indicador temático:
* **Ícone em container arredondado** com cor de fundo suave (ex: gota azul para umidade, folha verde para medições, alerta laranja para infestações).
* **Valor numérico grande (28px)** em negrito com unidade de medida menor ao lado (`%`, `°C`).
* **Micro-rótulo superior** em caixa alta sutil.

### 5.2 Formulário de Medição (Input de Campo de Alta Densidade)
* **Toque Generoso:** Altura mínima de 46px para todos os campos (permite uso com luvas ou dedos molhados de campo).
* **Rótulos Flutuantes ou Fixos com Contraste Alto:** O técnico agrícola precisa saber com clareza instantânea qual dado está inserindo.
* **Badges de Unidade Integradas:** Campos numéricos exibem sufixo visual integrado (`%` para umidade, `°C` para temperatura).
* **Seletor Visual de Pragas:** Ao invés de um select comum sem graça, botões em estilo *Segmented Chips* coloridos com ícones que facilitam o clique rápido.

### 5.3 Badges de Alerta de Pragas & Fitossanidade
```
[ 🟢 Normal ]    -> Fundo verde claro, texto verde escuro, borda 1px verde suave
[ 🟡 Atenção ]   -> Fundo amarelo claro, texto âmbar escuro, borda 1px amarelo
[ 🟠 Alerta ]    -> Fundo laranja claro, texto terracota, borda 1px laranja
[ 🔴 Crítico ]   -> Fundo vermelho claro, texto vermelho escuro, ponto pulsante (animado)
```

### 5.4 Card de Registro de Campo (Histórico de Medições)
* **Cabeçalho do Card:** Nome do Talhão em destaque com Tag de Cultura (ex: `Talhão 04` • `Milho Safrinha`).
* **Badge de Alerta no canto direito:** Visível imediatamente sem necessidade de abrir detalhes.
* **Faixa Central de Medições:** Dois blocos destacados em mini-cards:
  * 💧 Umidade: `28%` com barra de status hídrico.
  * 🌡️ Temperatura: `31.5°C`.
* **Rodapé do Card:** Observação de manejo e data/hora formatada em padrão brasileiro (`DD/MM/AAAA às HH:mm`).

### 5.5 Botões de Ação
* **Primary Action ("Salvar Medição"):** Fundo `Forest Prime` (`#164E2E`), texto branco, ícone de confirmação, hover com expansão sutil e sombra esmeralda.
* **Secondary Action ("Limpar" / "Filtrar"):** Fundo `Warm Gray` ou transparente com borda `Field Mist`, texto neutro de alta legibilidade.
* **Danger Action ("Excluir"):** Fundo vermelho suave, texto vermelho escuro.

---

## 6. Diretrizes de Usabilidade sob Condições de Campo

> [!IMPORTANT]
> **Fatores Críticos do Usuário Agrícola:**
> 1. **Sol e Brilho na Tela:** Nunca use cinzas claros demais para textos importantes. O texto principal deve manter taxa de contraste superior a 7:1 contra o fundo.
> 2. **Superfícies de Toque:** A área de clique mínima recomendada para qualquer botão ou chip é de **44px × 44px**.
> 3. **Feedback Imediato:** Sempre que um registro for salvo, exiba uma notificação tipo *Toast* ou animação de confirmação evidente com mensagem humana e clara.
> 4. **Prevenção de Erro:** Indicar valores fora dos limites agronômicos razoáveis (ex: umidade acima de 100% ou temperatura acima de 60°C).

---

## 7. Variáveis CSS Globais (`tokens.css`)

Abaixo está o bloco canônico de variáveis CSS projetado especificamente para o Conecta Agro:

```css
:root {
  /* Marca Primária (Forest & Sprout) */
  --ca-brand-deep: #0D2818;
  --ca-brand-primary: #164E2E;
  --ca-brand-hover: #227C4B;
  --ca-brand-accent: #34A853;
  --ca-brand-light: #EAF7EE;

  /* Cores da Terra & Safra */
  --ca-earth-rich: #6E4032;
  --ca-earth-terra: #A85A3F;
  --ca-harvest-gold: #E5A93C;
  --ca-harvest-light: #FCF6E8;

  /* Neutros & Superfícies */
  --ca-text-main: #111815;
  --ca-text-muted: #4B554F;
  --ca-border-light: #E2E6E2;
  --ca-border-medium: #CBD2CB;
  --ca-bg-app: #F7F9F6;
  --ca-bg-surface: #FFFFFF;
  --ca-bg-subtle: #EFF2EE;

  /* Semântica e Alertas */
  --ca-status-safe: #15803D;
  --ca-status-safe-bg: #DCFCE7;
  --ca-status-safe-border: #86EFAC;

  --ca-status-warn: #B45309;
  --ca-status-warn-bg: #FEF3C7;
  --ca-status-warn-border: #FDE047;

  --ca-status-alert: #C2410C;
  --ca-status-alert-bg: #FFEDD5;
  --ca-status-alert-border: #FDBA74;

  --ca-status-danger: #B91C1C;
  --ca-status-danger-bg: #FEE2E2;
  --ca-status-danger-border: #FCA5A5;

  --ca-status-hydro: #0369A1;
  --ca-status-hydro-bg: #E0F2FE;
  --ca-status-hydro-border: #7DD3FC;

  /* Tipografia */
  --ca-font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --ca-font-display: 'Outfit', 'Plus Jakarta Sans', sans-serif;

  /* Espaçamentos */
  --ca-space-xxs: 4px;
  --ca-space-xs: 8px;
  --ca-space-sm: 12px;
  --ca-space-md: 16px;
  --ca-space-lg: 24px;
  --ca-space-xl: 32px;
  --ca-space-2xl: 48px;

  /* Bordas e Raios */
  --ca-radius-sm: 8px;
  --ca-radius-md: 14px;
  --ca-radius-lg: 20px;
  --ca-radius-full: 9999px;

  /* Sombras */
  --ca-shadow-sm: 0 1px 3px rgba(17, 24, 21, 0.06), 0 1px 2px rgba(17, 24, 21, 0.04);
  --ca-shadow-md: 0 6px 16px -2px rgba(22, 78, 46, 0.08), 0 3px 6px -2px rgba(17, 24, 21, 0.05);
  --ca-shadow-lg: 0 14px 30px -4px rgba(13, 40, 24, 0.12), 0 6px 12px -3px rgba(17, 24, 21, 0.06);

  /* Transições */
  --ca-transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 8. Conclusão & Aplicação

Este Design System estabelece uma linguagem visual sólida, autêntica e conectada com a realidade agronômica. Todos os arquivos de desenvolvimento da aplicação (`style.css`, `index.html` e `app.js`) deverão consumir estritamente essas variáveis e padrões aqui consolidados.
