export interface IDesenvolvedor {
  id: number | null;
  nivel_id: number;
  nome: string;
  sexo: string;
  data_nascimento: Date | string;
  idade: number;
  hobby: string;
  nivel: INivel;
}

export interface IDesenvolvedorBody {
  id?: number;
  nivel_id: number;
  nome: string;
  sexo: string;
  data_nascimento: Date | string;
  hobby: string;
}

export interface INivel {
  id: number;
  nivel: string;
  n_desenvolvedores: number;
}

export interface INivelBody {
  id?: number;
  nivel: string;
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
