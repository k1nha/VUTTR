import axios from 'axios';
import {useEffect, useState} from 'react';
import {IData} from '../types/types';

axios.defaults.baseURL = 'http://localhost:3000/';

interface useFetchProps {
  url: string
  method: string
}

const useFetch = ({url, method, ...rest}: useFetchProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<IData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  function fecthData() {
    axios.get(`${url}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fecthData();
  }, []);

  return {loading, data, error};

}

export {useFetch};