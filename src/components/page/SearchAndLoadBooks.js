import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBooklist } from '../../store';
import BooksList from '../tool/BooksList';

export default function SearchAndLoadBooks ({setPage, data, isLoading, isError}){

  let dispatch = useDispatch();
  // store에 저장된 booklist 불러오기
  let booklist = useSelector(state => state.booklist)

  // 스크롤 위치를 저장할 상태 생성
  const [scrollPosition, setScrollPosition] = useState(0);

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
    <div>
      {/* 책 리스트 */}
      <BooksList booklist={booklist}/>

      {/* 더 불러오기 버튼 */}
      <button className='btn mb-4' style={{background:'#6666FF', color:'white'}} onClick={(e)=>{
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

      {/* 위로 가기 버튼 */}
      <button className='btn go-top-btn' onClick={()=>{
        window.scrollTo({top:0});
      }}>
        <svg className='bi bi-arrow-up-circle-fill go-top-icon' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
        </svg>
      </button>
    </div>
  )
}