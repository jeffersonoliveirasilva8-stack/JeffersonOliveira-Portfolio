export const CATEGORIAS = [
  "Criativos para Redes Sociais",
  "Comunicação Institucional",
  "Identidade Visual",
  "Materiais Impressos",
  "UI/UX",
  "Produto Digital",
  "Website",
  "Comunicação de Evento",
  "Cobertura de Evento",
  "Apresentação",
  "Publicidade",
  "Branding",
  "Design Gráfico",
  "Motion",
  "Outros",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export const TIPOS_PROJETO = ["Profissional", "Autoral"] as const;
export type TipoProjeto = (typeof TIPOS_PROJETO)[number];

export type Projeto = {
  slug: string;
  titulo: string;
  tipo: TipoProjeto;
  cliente: string;
  categorias: Categoria[];
  papel: string;
  destaque: boolean;
  ordemDestaque?: number;
  imagemPrincipal?: string;
  thumbnail?: string;
  prototipoEmbedUrl?: string;
  linkExterno?: { label: string; url: string };
  contexto?: string;
  desenvolvimento?: string;
  solucao?: string;
  galeriaAplicacoes?: string[];
  grupos?: { titulo?: string; descricao?: string; itens: string[]; layout?: "masonry" | "stack" | "full" }[];
  videosDestaque?: { titulo?: string; descricao?: string; src: string }[];
  resultado?: string;
  creditos?: string;
  pendente?: boolean;
};

export type Cargo = {
  cargo: string;
  periodo: string;
  descricao: string;
  projetosRelacionados?: string[];
  clientesDestaque?: string[];
};

export type Experiencia = {
  empresa: string;
  tipo?: string;
  cargos: Cargo[];
};

export type Formacao = {
  instituicao: string;
  curso: string;
  periodo: string;
};

export type Perfil = {
  nome: string;
  titulo: string;
  foto?: string;
  heroTituloLinha1: string;
  heroTituloLinha2: string;
  fraseHero: string;
  marcasHeroDestaque: string[];
  fraseCurta: string;
  bio: string[];
  marcasAtendidas: { nome: string; logo: string }[];
  formacao: Formacao[];
  ferramentas: string[];
  competenciasDesign: string[];
  competenciasComplementares: string[];
  contato: {
    email: string;
    telefone?: string;
    localizacao: string;
    behance?: string;
    linkedin?: string;
    instagram?: string;
  };
};
