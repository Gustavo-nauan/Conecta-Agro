# 🌱 Conecta Agro Design System — *Vellum & Forest*

> **Versão:** 3.0.0 (O Design Híbrido)
> **Conceito:** A fusão perfeita entre a estética de revista impressa (Arva) e o minimalismo botânico e tátil (Leandra-isler). 
> **Inspiração:** Uma prancheta de botânico moderno. Onde o "Vellum Sand" de cadernos antigos encontra o verde denso "Forest Ink" da tecnologia agrícola.

---

## 1. O Manifesto do Design Híbrido

Para criar um sistema único e proprietário para o Conecta Agro, fundimos as forças de duas referências de design:
1. **Do estilo Arva**, herdamos as **Pill Shapes** (botões altamente arredondados que convidam ao clique), o verde **Forest Ink** profundo e o acento **Vivid Lime**.
2. **Do estilo Leandra-isler**, adotamos a filosofia de **Vellum Canvas** (fundo areia/papiro em toda a tela), a ausência de sombras (tudo é plano), o uso de **Hairlines** (linhas de 1px) para dividir o conteúdo em vez de caixas isoladas, e a tipografia em tamanhos **extremos** para impacto visual.

---

## 2. Paleta de Cores (Tokens Híbridos)

### 2.1 Cores Base e Canvas
| Token | Hex | Origem e Uso |
| :--- | :--- | :--- |
| `--color-vellum-sand` | `#f4e6cd` | **(Leandra)** Canvas principal. Nunca usamos branco puro na tela. |
| `--color-pressed-linen` | `#edddc3` | **(Leandra)** Fundo secundário para destacar campos de texto e cartões sutis. |

### 2.2 Tintas e Acentos
| Token | Hex | Origem e Uso |
| :--- | :--- | :--- |
| `--color-forest-ink` | `#07503f` | **(Arva)** A cor principal da marca, usada para texto principal, botões preenchidos e linhas (hairlines). |
| `--color-aged-ink` | `#1e211e` | **(Leandra)** Usado para textos secundários e parágrafos de alta densidade. |
| `--color-vivid-lime` | `#e8fe85` | **(Arva)** O único ponto de cor vibrante. Usado no Marquee ou em micro-alertas. |

### 2.3 Cores de Risco (Semântica)
Adaptadas para fluir no Vellum sem gritar como um "SaaS genérico":
* **Normal:** Forest Ink (`#07503f`)
* **Atenção/Alerta:** Um mostarda escuro (derivado do *Twilight Bronze*).
* **Crítico:** Um vermelho tijolo opaco.

---

## 3. Tipografia (Extrema & Editorial)

Mantivemos o contraste entre Serif e Sans, mas aplicamos a regra de escala massiva do *Leandra-isler*:

* **Cormorant Garamond (Serifa):** Usada para cabeçalhos e display. Na home, ela escala para **120px+** com tracking negativo para impacto de revista.
* **Inter (Sans-serif):** Trata de toda a interface, leitura de dados (14px a 18px) e botões.

---

## 4. Geometria Híbrida (Formas e Linhas)

O sistema de formas é um contraste deliberado entre o estrutural e o interativo:
1. **Zero Curvatura Estrutural:** Painéis, cartões e divisões usam `border-radius: 0px`. 
2. **Divisões em Hairline:** A separação de elementos se dá por bordas sólidas de 1px (`--color-forest-ink`), sem drop-shadows.
3. **Pill Interativo:** Tudo que pode ser clicado fortemente (Botões de Ação) ganha `border-radius: 100px` (Pill). Inputs ganham `33px`.

---

## 5. Implementação CSS

```css
:root {
  /* Cores Híbridas */
  --color-vellum-sand: #f4e6cd;
  --color-pressed-linen: #edddc3;
  --color-forest-ink: #07503f;
  --color-aged-ink: #1e211e;
  --color-vivid-lime: #e8fe85;
  --color-white: #ffffff; /* Uso extremamente restrito */

  /* Linhas e Contornos */
  --hairline: 1px solid var(--color-forest-ink);

  /* Formas */
  --radius-sharp: 0px;
  --radius-input: 33px;
  --radius-pill: 100px;
}
```
