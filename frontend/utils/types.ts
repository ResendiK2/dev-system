export interface IDesenvolvedor {
  id?: number | null;
  nivel_id: number;
  nome: string;
  sexo: string;
  data_nascimento: Date | string;
  idade?: number;
  hobby: string;
  nivel?: INivel;
}

export interface INivel {
  id?: number;
  nivel: string;
  n_desenvolvedores?: number;
  Desenvolvedor?: IDesenvolvedor[];
}

export interface IMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface IGetNiveis {
  data: INivel[];
  meta: IMeta;
}

export interface IGetDesenvolvedores {
  data: IDesenvolvedor[];
  meta: IMeta;
}

export interface ICustomError {
  message?: string;
  response?: {
    data?: {
      error?: string;
    };
  };
}
