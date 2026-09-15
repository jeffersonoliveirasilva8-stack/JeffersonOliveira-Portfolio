# Portfólio — Jefferson Oliveira

Portfólio profissional construído em Next.js + Tailwind CSS. Todo o conteúdo
(projetos, materiais, experiência e perfil) vive em arquivos JSON separados do
código — para adicionar ou editar conteúdo você **não precisa mexer em
componentes ou layout**.

## Sistema visual

Tema escuro editorial (fundo quase preto, tipografia serifada Fraunces +
Inter, acento terracota/âmbar) em todo o site — inspirado em referências de
portfólio dark/bold, mas deliberadamente mais contido: sem textura granulada,
sem verde neon, sem fonte condensada pesada. Os tokens de cor ficam em
`src/app/globals.css` (`--color-bg`, `--color-fg`, `--color-muted`,
`--color-border`, `--color-accent`, `--color-surface`) — mudar a paleta é
editar esse arquivo, nada mais.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Onde editar o conteúdo

Tudo fica em `/content`:

| Arquivo | O que é | Usado em |
|---|---|---|
| `content/profile.json` | Nome, bio, formação, ferramentas, competências, contato | Home, Sobre, Contato, rodapé |
| `content/experience.json` | Empresas, cargos e períodos | /experiencia |
| `content/projects.json` | Cases completos | /projetos e /projetos/[slug] |

### Adicionar um novo projeto (case)

Adicione um objeto em `content/projects.json`:

```json
{
  "slug": "nome-do-projeto",
  "titulo": "Nome do Projeto",
  "tipo": "Profissional",
  "cliente": "Nome do cliente",
  "categorias": ["Branding", "Direção de Arte"],
  "papel": "Direção de Arte",
  "destaque": true,
  "ordemDestaque": 1,
  "thumbnail": "/projects/nome-do-projeto/thumb.jpg",
  "imagemPrincipal": "/projects/nome-do-projeto/capa.jpg",
  "contexto": "...",
  "desenvolvimento": "...",
  "solucao": "...",
  "galeriaAplicacoes": ["/projects/nome-do-projeto/1.jpg", "/projects/nome-do-projeto/2.jpg"],
  "resultado": "Só preencha se houver dado real. Omita o campo se não houver."
}
```

O case não tem mais campo de ano nem de Objetivo/Conceito — foram removidos do
modelo (o texto de contexto/desenvolvimento já cobre isso). Blocos de texto
(`contexto`, `desenvolvimento`, `solucao`, `resultado`, `creditos`) só
aparecem na página quando preenchidos — não deixe placeholder tipo `[A
DEFINIR]` num campo; se ainda não houver a informação real, omita o campo
inteiro.

### Agrupar a galeria por tema/campanha

Quando um projeto reúne vários materiais de temas/campanhas diferentes sob
um mesmo cliente (ex.: posts de Instagram desenvolvidos ao longo do tempo
para um cliente recorrente), use `grupos` em vez de `galeriaAplicacoes`:

```json
"grupos": [
  {
    "titulo": "Nome da campanha",
    "descricao": "Uma linha de contexto sobre essa campanha (opcional).",
    "itens": ["/projects/slug/img1.jpg", "/projects/slug/img2.mp4"]
  }
]
```

Cada grupo vira uma seção com título dentro de "Material". Por padrão a
galeria (tanto `grupos` quanto `galeriaAplicacoes`) é renderizada em mosaico
(masonry) — cada imagem/vídeo mantém sua proporção natural, sem cortar
conteúdo — e é clicável: abre em tela cheia com navegação anterior/próxima.
Veja `revise-seu-plano-social` em `content/projects.json` como exemplo real.

Quando um grupo reúne poucas peças que fazem mais sentido lidas em sequência
(ex.: as páginas de um livreto/folheto), adicione `"layout": "stack"` nesse
grupo — em vez de mosaico, as imagens aparecem uma embaixo da outra, em
largura maior, na mesma ordem do array. Veja o grupo "Aplicações reais"
em `revise-identidade-visual` como exemplo.

Se o projeto tiver mais de um vídeo que mereça destaque em tela cheia (não
só como thumbnail de mosaico), use `videosDestaque` no nível do projeto:

```json
"videosDestaque": [
  {
    "titulo": "Nome do vídeo (opcional)",
    "descricao": "Uma linha de contexto (opcional)",
    "src": "/projects/slug/video.mp4"
  }
]
```

Cada item vira um bloco de vídeo em largura total, com reprodução automática,
entre os textos do case e a seção "Material". Use isso para vídeos que
merecem o mesmo destaque do vídeo principal do case, mas sem substituí-lo.

**Todo vídeo do site inicia automaticamente** (mudo, em loop) assim que a
página carrega ou a peça entra na tela — não precisa configurar nada além do
caminho do arquivo `.mp4`.

Se o projeto tiver um protótipo interativo publicado (Adobe XD, Figma),
adicione `prototipoEmbedUrl` com o link de embed — ele substitui a imagem
principal por um iframe navegável (usado hoje no Portal do Cliente). Para
linkar o case original em outra plataforma, use `linkExterno: { "label":
"...", "url": "..." }` — vira um link logo abaixo do cabeçalho do case.

Coloque as imagens em `public/projects/nome-do-projeto/`. Vídeo também é
suportado: em `imagemPrincipal` ou dentro de `galeriaAplicacoes`, qualquer
caminho terminado em `.mp4` é automaticamente renderizado como player de
vídeo (com controles) em vez de imagem — não precisa marcar nada além da
extensão do arquivo.

**Vídeos brutos de celular/câmera costumam vir pesadíssimos** (um Reel de
30s pode chegar a 600-800MB em 4K). Antes de colocar em `public/`, comprima
para a web:

```bash
ffmpeg -i original.mp4 -vf "scale=1080:-2" -c:v libx264 -preset medium -crf 27 -c:a aac -b:a 128k -movflags +faststart saida.mp4
```

Isso normalmente reduz o arquivo para 15-30MB sem perda visível em tela de
celular/redes sociais. Sem isso, o site fica pesado para carregar e o
repositório Git incha rapidamente.

Categorias
disponíveis estão em `src/lib/types.ts` (`CATEGORIAS`) — um projeto pode ter
quantas categorias fizerem sentido.

- `tipo`: `"Profissional"` (trabalho para cliente/empregador) ou `"Autoral"`
  (iniciativa própria, ex. Arkanjo Store, Construindo Sonhos). Controla em
  qual seção do `/projetos` o card aparece — profissionais sempre em
  primeiro, com destaque maior.
- `destaque: true` faz o projeto concorrer a um lugar na Home.
- `ordemDestaque`: número que define a ordem entre os destaques na Home
  (menor aparece primeiro). Sem esse campo, o projeto entra por último.
  **A Home mostra no máximo 7 projetos em destaque** — isso é proposital
  (curadoria: veja a seção abaixo).
- Remova o campo `pendente` quando o case estiver completo (ele só existe
  para sinalizar visualmente que o conteúdo ainda é placeholder — inclusive
  escondendo a seção "Material" até você ter imagens reais).

### Peça única, sem fragmentar em várias imagens

Quando um projeto é uma peça só (um brandbook, um brasão, uma apresentação em
scroll único), não fragmente em vários itens. Junte tudo em uma única imagem
(`convert img1.jpg img2.jpg img3.jpg -append completo.jpg` no ImageMagick) e
use `"layout": "full"` no grupo, com um único item:

```json
"grupos": [
  { "layout": "full", "itens": ["/projects/slug/peca-completa.jpg"] }
]
```

`"full"` renderiza a imagem em largura total, sem o teto de `max-w-2xl` do
`"stack"` — pensado para uma peça só que precisa ficar legível sem precisar
abrir em tela cheia. Veja `amora-velas-aromatizadas`, `chicmob-identidade-visual`
e os dois brasões em `content/projects.json` como exemplo.

### Adicionar sua foto no hero da Home

Preencha o campo `foto` em `content/profile.json` com o caminho da imagem
(ex.: `"foto": "/profile/jefferson.jpg"`, arquivo em `public/profile/`). Sem
esse campo, a Home mostra a caixa "Foto a inserir" no lugar do retrato — é
só isso que muda, nenhum outro ajuste é necessário.

Os campos `heroTituloLinha1` e `heroTituloLinha2` (ex. "Designer" /
"Gráfico") são o título grande que fica acima e abaixo da foto na
Home — edite-os se quiser reformular o título sem mexer na frase de
posicionamento (`fraseHero`).

### Atualizar experiência, formação, ferramentas

Edite diretamente `content/experience.json` e `content/profile.json`. Não há
build step extra — o Next.js lê o JSON em tempo de build/requisição.

Em `experience.json`, um `cargo` pode ter `clientesDestaque: ["Marca A", "Marca B"]`
— isso renderiza os nomes como tags destacadas abaixo da descrição do cargo
(hoje usado para JHSF/Fazenda Boa Vista/Catarina Aviation Show/Reserva Trancoso/Stan/Engelux em Animal Marketing Digital).
Use só para clientes que valem prova social visível, não para todos.

Quando uma empresa tem mais de um `cargo` no array, a página de Experiência
desenha automaticamente a trilha de progressão (linha vertical + "Etapa X de
Y") — liste os cargos em ordem cronológica **ascendente** (mais antigo
primeiro) para que a progressão fique legível de cima para baixo.

## Curadoria — como pensar antes de marcar `destaque`

A Home é a primeira impressão e só mostra até 7 projetos em destaque. Antes
de marcar um projeto novo como `destaque: true`, pergunte: *um recrutador
que veja só este trabalho já entende meu nível?* Prefira:

1. Projetos profissionais com resultado visual forte antes de projetos autorais.
2. Poucos e fortes — 4 a 7 — em vez de mostrar tudo que existe no sistema.
3. `ordemDestaque` baixo para os cases mais relevantes à vaga que você está
   almejando no momento (hoje: hospitalidade/alto padrão).

Projetos sem `destaque` continuam acessíveis em `/projetos` — nada se perde,
só não compete pela atenção na Home.

## Pendências conhecidas (marcadas no conteúdo)

- Confirmar e-mail público de contato em `content/profile.json` e, se
  fizer sentido, preencher `linkedin`/`instagram`.
- Publicar o site institucional da Revise (`revise-site-institucional`) e
  atualizar o case com o link real quando ele sair do ambiente local.

## Deploy

Recomendado: [Vercel](https://vercel.com/new) — importe o repositório e o
deploy é automático a cada alteração.
