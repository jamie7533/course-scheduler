import { useQuery } from '@tanstack/react-query';

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw response;
  return response.json();
};

export const useJsonQuery = (url) => {
  const { data, isLoading, error } = useQuery([url], () => fetchJson(url));  // had to wrap url in an array
  return [ data, isLoading, error ];
};