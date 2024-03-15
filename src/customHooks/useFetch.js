import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export function useFetch(url, query = '', initPageSize = 8) {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)
  const reloadData = ()=>{
    setReload(!reload)
  }
  const [paging, setPaging] = useState({
    page: 1,
    pageSize: initPageSize,
    total: 10,
  });

  url += `?populate=*&pagination[page]=${paging.page}&pagination[pageSize]=${paging.pageSize}&${query}`;
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data.data);
        setPaging({
          ...res?.data?.meta?.pagination,
        });
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        setLoading(false)
      });
  }, [url, paging.page, paging.pageSize, reload, query]);

  return {data, setData, paging, setPaging, reload, reloadData, loading, setLoading};
}