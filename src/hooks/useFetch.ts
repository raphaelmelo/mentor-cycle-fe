import { useCallback, useMemo } from "react";
import { IBGE_PLACES_API_URL } from "./../config/constants";
import { City, GetCountriesParams, IUseFetch, State } from "./useFetch.types";

export const useFetch = (): IUseFetch => {
  const GET_PROPS = useMemo(
    () => ({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }),
    []
  );

  const getCountries = useCallback(
    async (params?: GetCountriesParams) => {
      const url = new URL(`${IBGE_PLACES_API_URL}/paises`);
      if (params?.orderBy) {
        url.searchParams.append("orderBy", params.orderBy);
      }
      const res = await fetch(url.toString(), GET_PROPS);
      const countries = await res.json();
      return countries.map(({ id: { M49 }, nome }: any) => ({
        value: nome,
        label: nome,
      }));
    },
    [GET_PROPS]
  );

  const getStates = useCallback(async (): Promise<State[]> => {
    const res = await fetch(`${IBGE_PLACES_API_URL}/estados`, GET_PROPS);
    const states = await res.json();
    return states.map(({ sigla, nome }: any) => ({
      value: nome,
      label: sigla,
    }));
  }, [GET_PROPS]);

  const getCities = useCallback(
    async (state: string): Promise<City[]> => {
      const res = await fetch(
        `${IBGE_PLACES_API_URL}/estados/${state}/municipios`,
        GET_PROPS
      );
      const cities: City[] = await res.json();
      return cities.map(({ id, nome }: any) => ({ value: id, label: nome }));
    },
    [GET_PROPS]
  );

  return {
    getCountries,
    getCities,
    getStates,
  };
};
