import axios from 'axios';
import {useEffect, useMemo, useState} from 'react';
import {IData} from '../types/types';

axios.defaults.baseURL = 'http://localhost:3000/';

interface useFetchProps {
  url: string
}

const useFetch = ({url}: useFetchProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  function fetchData() {
    axios.get(`${url}`)
      .then((res) => setData( res.data ))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {loading, data, error, setData};

}

export {useFetch};