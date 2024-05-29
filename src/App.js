import './App.css';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { searchBooks } from './functions/searchBooks';



function App() {

  // 검색어 설정

  // input에 입력되는 값을 임시 저장하는 상태
  const [tempQuery, setTempQuery] = useState('');
  // react-query가 종속된 상태, 실제 검색어가 될 상태, searchBtn 상태가 변경되면 tempQuery의 값과 같아진다.
  const [query, setQuery] = useState('리액트')

  const {data, isLoading, isError} = useQuery(['searchbook', query], () => searchBooks(query) )

  useEffect(()=>{
    console.log(data)
  },[data])

  if(isLoading) return <h1>로딩중임 기달ㅋ</h1>
  if(isError) return <h1>에러남; ㅈㅅ</h1>

  return (
    <div>
      <input value={tempQuery} onChange={(e)=>{
        setTempQuery(e.target.value)
      }}/>
      <button onClick={()=>{
        if(tempQuery !== ''){
          setQuery(tempQuery);
        }else{
          alert('꽉 채워 오쇼');
        }
      }}>검색</button>
      <button>더 불러오기</button>
    </div>
  )
}

export default App;

