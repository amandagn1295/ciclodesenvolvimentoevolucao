# Ciclo de Desenvolvimento e Evolução — Design System

Design system e aplicação web para gestão do Ciclo de Desenvolvimento e Evolução, do Grupo Águia Branca · Divisão Comércio: cadastro de gestores e colaboradores pelo RH, abertura de ciclos de avaliação (autopercepção + percepção do gestor) e acompanhamento via dashboard.

## Objetivo

Demonstrar uma aplicação de gestão de pessoas com:

- login segmentado por papel (RH administrador / gestor / colaborador)
- cadastro de gestores com hierarquia organizacional (Diretoria, Regional, Unidade, Setor, Departamento)
- cadastro de colaboradores (individual e em massa via planilha Excel)
- abertura de ciclos de desenvolvimento, com formulário do gestor e do colaborador
- dashboard geral do RH com métricas, alertas de ciclos vencendo/previstos e exportação de relatórios
- design system próprio (cores, tipografia, componentes) usado em toda a aplicação

## Stack

- React 18 + Babel Standalone (via CDN, sem build)
- Supabase (Postgres + Realtime) como banco de dados em nuvem
- SheetJS (`xlsx`) para importação/exportação de planilhas
- Lucide Icons
- CSS puro com custom properties (tokens)

## Estrutura de pastas

```
ciclo-desenvolvimento/
├── styles.css
├── _ds_bundle.js
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   ├── layout.css
│   └── base.css
├── components/
│   ├── forms/
│   ├── display/
│   ├── layout/
│   ├── data/
│   └── feedback/
├── guidelines/
├── assets/
└── ui_kits/ciclo/
    ├── index.html
    ├── App.jsx
    ├── *Screen.jsx
    ├── helpers.jsx
    ├── supabaseClient.js
    └── SUPABASE_SETUP.md
```

### Responsabilidade de cada camada

| Camada | Responsabilidade |
| --- | --- |
| `tokens/` | Valores de marca (cor, tipografia, espaçamento) como CSS custom properties. |
| `components/` | Componentes visuais reutilizáveis, documentados com `.d.ts` + `.prompt.md`. |
| `ui_kits/ciclo/` | Aplicação real do Ciclo de Desenvolvimento, consumindo os componentes do design system. |
| `_ds_bundle.js` | Gerado automaticamente a partir de `components/` — nunca editar manualmente. |

### Componentes

**Todos os componentes:** Button, TextField, DateField, TextArea, Select, Field, FormGrid, MetricCard, StatusBadge, Avatar, ProgressBar, Banner, Legend, RoleTag, AppHeader, Card, SectionTitle, DataTable, FilterBar, DualPane, Pane, PdiTable, LinkBox, Modal, Toast.

- `forms/` — Button, TextField, DateField, TextArea, Select, Field, FormGrid
- `display/` — MetricCard, StatusBadge, Avatar, ProgressBar, Banner, Legend, RoleTag
- `layout/` — AppHeader, Card, SectionTitle
- `data/` — DataTable, FilterBar, DualPane, Pane, PdiTable, LinkBox
- `feedback/` — Modal, Toast

## Como rodar

Pré-requisitos: nenhum (não há build). Basta um servidor estático.

```
npx serve ui_kits/ciclo
```

ou abra `ui_kits/ciclo/index.html` direto no navegador. Para publicar: suba o conteúdo de `ui_kits/ciclo/` no GitHub Pages.

## Configuração do banco de dados (Supabase)

A aplicação funciona sem configuração (usa `localStorage` isolado por navegador), mas para sincronizar dados entre todos os usuários é necessário configurar o Supabase. Veja o passo a passo completo em [`ui_kits/ciclo/SUPABASE_SETUP.md`](ui_kits/ciclo/SUPABASE_SETUP.md).

Resumo:
1. Criar projeto gratuito em [supabase.com](https://supabase.com).
2. Rodar o SQL de criação da tabela `ciclo_dados`.
3. Colar a **Project URL** e a **anon key** em `ui_kits/ciclo/supabase-config.js`.

## Papéis de acesso

| Papel | Acesso |
| --- | --- |
| RH (admin) | Login com usuário e senha próprios — cadastra gestores/colaboradores, vê dashboard geral. |
| Gestor | Usuário/senha gerados pelo RH ao cadastrar — vê só seus colaboradores e ciclos. |
| Colaborador | Sem login — acessa por link único + senha de 4 dígitos gerada por ciclo. |

## Usando os componentes

```js
const { Button, Card, PdiTable } = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
```

Link `styles.css` e carregue `_ds_bundle.js` (gerado automaticamente) antes de usar.

## Limitações

- Sem build step/bundler — React carregado via CDN e JSX transpilado no navegador.
- Sem testes automatizados.
- Autenticação própria (não usa Supabase Auth) — senhas em texto simples no banco.
- Sem rate limiting no login.

## Observações

- O design system (`_ds_bundle.js`, `styles.css`) é gerado automaticamente e não deve ser editado manualmente.
- Dados sensíveis (senhas de gestores) ficam salvos em texto simples — adequado para o piloto atual, mas deve evoluir para hashing antes de uso em produção com dados reais de RH.
