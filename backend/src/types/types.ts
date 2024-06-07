export interface IDesenvolvedor {
  id?: number;
  nivel_id: number;
  nome: string;
  sexo: string;
  data_nascimento: Date;
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
