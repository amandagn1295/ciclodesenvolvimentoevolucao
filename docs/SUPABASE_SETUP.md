# Colocar o Ciclo de Desenvolvimento na nuvem (Supabase)

Sem isso, cada navegador só enxerga os dados que ELE MESMO criou (localStorage).
Com o Supabase configurado, todos os colaboradores/gestores compartilham o mesmo banco,
com atualização em tempo real.

## Passo 1 — Criar o projeto (grátis)
1. Acesse https://supabase.com → "Start your project" → crie conta (pode usar GitHub).
2. "New Project": dê um nome (ex: `ciclo-aguia-branca`), escolha uma senha de banco
   (guarde-a, mas não é a mesma coisa dos logins do app) e a região mais próxima (ex: São Paulo).
3. Aguarde ~2 min até o projeto ficar pronto.

## Passo 2 — Criar a tabela
No painel do projeto, abra **SQL Editor** → **New query**, cole e rode:

```sql
create table ciclo_dados (
  id text primary key default 'default',
  funcionarios jsonb not null default '[]',
  ciclos jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

insert into ciclo_dados (id) values ('default');

alter table ciclo_dados enable row level security;

create policy "public read"   on ciclo_dados for select using (true);
create policy "public insert" on ciclo_dados for insert with check (true);
create policy "public update" on ciclo_dados for update using (true);

alter publication supabase_realtime add table ciclo_dados;
```

Isso cria 1 linha só (`id = 'default'`) que guarda TODOS os funcionários e ciclos como JSON.
As políticas acima liberam leitura/escrita pública — ok para este caso (chave "anon" não dá
acesso a nada além desta tabela), mas se quiser reforçar depois, dá para trocar por regras
que exigem login.

## Passo 3 — Pegar a URL e a chave
Em **Project Settings → API**, copie:
- **Project URL**
- **anon public key**

## Passo 4 — Colar no projeto
Abra `ui_kits/ciclo/supabase-config.js` e substitua:

```js
window.CICLO_SUPABASE_URL = "COLE_AQUI_SUA_PROJECT_URL";
window.CICLO_SUPABASE_ANON_KEY = "COLE_AQUI_SUA_ANON_KEY";
```

pelos valores reais. Suba esse arquivo no GitHub junto com o resto — é seguro publicar
(a chave "anon" é feita para ser pública; a segurança vem das políticas do Passo 2).

## Passo 5 — Testar
Abra o link publicado em duas abas/computadores diferentes, logados como gestor.
Cadastre um colaborador em uma aba — ele deve aparecer na outra em poucos segundos,
sem precisar dar F5.

## Atualização — novos campos (RH, gestores, histórico)
Se você já tinha criado a tabela antes desta atualização, rode no **SQL Editor** do Supabase:

```sql
alter table ciclo_dados add column if not exists gestores jsonb not null default '[]';
alter table ciclo_dados add column if not exists "auditLog" jsonb not null default '[]';
alter table ciclo_dados add column if not exists "rhAuth" jsonb;
```

Sem isso, o app mostra erro no console (`column ciclo_dados.gestores does not exist`) e não salva os dados novos.

## Atualização — cargo do gestor + listas suspensas de hierarquia (Regional, Diretoria | Negócios, Setor, Departamento, Unidade)
Rode também esta migração:

```sql
alter table ciclo_dados add column if not exists catalogos jsonb not null default '{}';
```

Os campos Diretoria, Setor, Departamento, Unidade e Regional agora são listas suspensas
pré-carregadas com a estrutura da empresa; a opção "+ Cadastrar novo..." em qualquer um deles
adiciona um item novo à lista (fica disponível para todos os gestores seguintes).

## Acessando o Painel do RH
É o **mesmo endereço e a mesma tela de login** do gestor — o sistema reconhece automaticamente
pelo usuário digitado. Login do RH: usuário `pessoascultura.gabcomercio`, senha `AguiaRH@2026`
(troca obrigatória no 1º acesso). Pelo Painel do RH você cadastra os gestores (nome + hierarquia)
— cada um recebe seu próprio usuário e senha inicial para entrar nessa mesma tela e ver só os
próprios colaboradores e ciclos.

## Observação sobre o login da gestão
O login (usuário/senha) do painel continua local a cada navegador — não foi alterado.
Os DADOS (colaboradores e ciclos) é que agora ficam centralizados na nuvem e sincronizam
entre todo mundo. Se depois quiser logins individuais por gestor(a), dá para evoluir
para o sistema de autenticação do próprio Supabase.
