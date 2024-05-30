import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SearchAndLoadBooks from './components/page/SearchAndLoadBooks';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { searchBooks } from './functions/searchBooks';
import Navbar from './components/Navbar';

function App() {

  // react-query가 종속된 상태, 실제 검색어가 될 상태, searchBtn(navbar Component) 상태가 변경되면 tempQuery의 값과 같아진다.
  const [query, setQuery] = useState('리액트');

  // 더 불러오기 버튼을 누를때마다 page + 1 증가
  const [page, setPage] = useState(1);

  // 리액트 쿼리로 데이터 불러오기 (종속 상태 : query(검색어), page(불러올 페이지))
  const {data, isLoading, isError} = useQuery(['searchbook', query, page], () => searchBooks(query,page))

  return(
    <div>
      <Navbar query={query} setQuery={setQuery} setPage={setPage} />
      <SearchAndLoadBooks setPage={setPage} data={data} isLoading={isLoading} isError={isError} />
    </div>
  )
}

export default App;

