import { useState, useEffect } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(url: string, dependencies: any[] = []) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on URL
        const mockData = getMockData<T>(url);
        
        setState({
          data: mockData,
          loading: false,
          error: null
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    };

    fetchData();
  }, dependencies);

  return state;
}

function getMockData<T>(url: string): T {
  // Mock data factory based on URL patterns
  if (url.includes('/services')) {
    return [] as T;
  }
  if (url.includes('/requests')) {
    return [] as T;
  }
  if (url.includes('/bookings')) {
    return [] as T;
  }
  if (url.includes('/conversations')) {
    return [] as T;
  }
  
  return null as T;
}

export async function apiCall<T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response
  return getMockData<T>(url);
}