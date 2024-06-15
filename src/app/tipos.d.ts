export interface Postagem {
  id: number;
  data_insercao?: string;
  subtitulo: string;
  texto: string;
  titulo: string;
  curtidas?: number;
}

export interface Postagens {
  postagens: Postagem[];
}

export interface Mensagem {
  mensagem: any;
}