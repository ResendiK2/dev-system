export interface IDesenvolvedor {
  id?: number | null;
  nivel_id: number;
  nome: string;
  sexo: string;
  data_nascimento: Date;
  idade: number;
  hobby: string;
  nivel?: string;
}

export interface INivel {
  id?: number;
  nivel: string;
  n_desenvolvedores?: number;
  Desenvolvedor?: IDesenvolvedor[];
}

export interface ICustomError {
  response?: {
    data?: {
      error?: string;
    };
  };
}
