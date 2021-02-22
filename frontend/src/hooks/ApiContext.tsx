import { useState, createContext, useContext, ReactNode, useCallback } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { apiService } from '../services/api';

interface IApiProvider {
  children: ReactNode;
}

interface IApiContext {
  api: (config: AxiosRequestConfig) => Promise<AxiosResponse<any> | any>;
}

const ApiContext = createContext<IApiContext>({} as IApiContext);

export function ApiProvider({ children }: IApiProvider) {
  const [error, setError] = useState<Error | null>(null);

  const api = useCallback(async (config: AxiosRequestConfig) => {
    try {
      const response = await apiService(config);

      return response;
    } catch(err) {
      return setError(err);
    }
  }, []);

  if (error) {
    return <h1>{error.message}</h1>
  }

  return (
    <ApiContext.Provider
      value={{ api }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error('useApi context must be used within an ApiProvider')
  }

  return context;
}