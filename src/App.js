import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { searchBooks } from './functions/searchBooks';
import { useDispatch, useSelector } from 'react-redux';
import { cleanBooklist, updateBooklist } from './store';
import BooksList from './BooksList';

function App() {

  const dispatch = useDispatch();

  // input에 입력되는 값을 임시 저장하는 상태
  const [tempQuery, setTempQuery] = useState('');
  // react-query가 종속된 상태, 실제 검색어가 될 상태, searchBtn 상태가 변경되면 tempQuery의 값과 같아진다.
  const [query, setQuery] = useState('리액트');
  // 더 불러오기 버튼을 누를때마다 page + 1 증가
  const [page, setPage] = useState(1);
  // 스크롤 위치를 저장할 상태 생성
  const [scrollPosition, setScrollPosition] = useState(0);
  // 리액트 쿼리로 데이터 불러오기 (종속 상태 : query(검색어), page(불러올 페이지))
  const {data, isLoading, isError} = useQuery(['searchbook', query, page], () => searchBooks(query,page))

  // store에 저장된 booklist 불러오기
  let booklist = useSelector(state => state.booklist)

  useEffect(()=>{

    window.scrollTo({top : scrollPosition, behavior : 'auto'})

  },[data, scrollPosition])

  // data가 추가로 들어올 때마다 store에 추가하기
  useEffect(()=>{
    if(data !== undefined){
      dispatch(updateBooklist(data.documents));
    }
  },[data,dispatch])

  if(isLoading) return <h1>로딩중임 기달ㅋ</h1>
  if(isError) return <h1>에러남; ㅈㅅ</h1>

  return (
    <div className='app'>
      <input placeholder='리액트' value={tempQuery} onChange={(e)=>{
        setTempQuery(e.target.value)
      }}/>
      <button onClick={()=>{
        // 오류 : 검색어를 변경하지 않고 검색 버튼을 누르면 스토어만 초기화됨
        // 해결 : tempQuery와 query 상태가 같으면 (query가 최신화 되어있다면) 동작 금지
        if(tempQuery !== '' && query !== tempQuery){
          setQuery(tempQuery);
          // 다른 검색어 입력시 store 비우기
          dispatch(cleanBooklist());
          // page 초기화
          setPage(1);
        }else{
          alert('되겠냐');
        }
      }}>검색</button>
      <BooksList booklist={booklist}/>
      <button onClick={(e)=>{
        e.preventDefault();
        // 스크롤 위치 저장
        setScrollPosition(window.scrollY);
        // 오류 : 최대 페이지를 넘어가면 같은 책을 계속 불러오는 오류 발생
        // 해결 : data 변수의 meta 데이터에 is_end 프로퍼티를 사용
        if (!data.meta.is_end){
          // 더 불러오기 버튼 클릭시 불러오는 페이지 1 증가
          setPage(pre => pre + 1);
        }else{
          alert('마지막 페이지임');
        }
      }}>더 불러오기</button>
    </div>
  )
}

export default App;

