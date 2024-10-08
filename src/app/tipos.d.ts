export interface Postagem {
  id: number;
  data_insercao?: string;
  subtitulo: string;
  texto: string;
  titulo: string;
  curtidas?: number;
  postagem_mae?: number;
}

export interface Postagens {
  postagens: Postagem[];
}

export interface Mensagem {
  mensagem: any;
}

export interface Sessao {
  access_token: string;
}

export interface Login {
  email: string;
  senha: string;
}
