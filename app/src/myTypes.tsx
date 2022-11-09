import { ReactNode } from "react";

export interface Serie {
  id: number;
  name: string;
  season?: number;
  episode?: number;
  finished: boolean;
}

export interface SerieList {
  finished: Serie[];
  ongoing: Serie[];
}

export interface SerieForm {
  name: string | null;
  id?: number;
  season?: number;
  episode?: number;
  finished: string | null;
}

export interface ChildrenProp {
  children: ReactNode;
}

export interface TokenContextType {
  token: string | null;
  setTokenValue: (value: string) => void;
}

export interface AccessTokenResponse {
  accessToken: string;
}
