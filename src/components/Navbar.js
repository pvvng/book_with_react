import { useState } from "react";
import { useDispatch } from "react-redux";
import { cleanBooklist } from '../store';
import { Link } from "react-router-dom";

export default function Navbar({query, setQuery, setPage}){

    const dispatch = useDispatch();

    // input에 입력되는 값을 임시 저장하는 상태
    const [tempQuery, setTempQuery] = useState('');

    function handleSearch (){
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
    }

    return(
        <nav className="navbar p-3 pb-4" style={{background : '#99CCFF', borderBottomRightRadius:'20px', borderBottomLeftRadius:'20px'}}>
            <div className="container-fluid">
                <div>
                    <Link className="navbar-brand" to="/" style={{display:'flex', alignItems:'center'}}>
                        <img src={process.env.PUBLIC_URL + 'stringify.png'} alt="Logo" width="80" className="d-inline-block align-text-top"/>
                        <span className='fs-1 fw-b mx-2'>교뿡문고</span>
                    </Link>
                </div>

                <div className="input-group mt-3" style={{maxWidth:'620px', marginLeft:'auto'}}>
                    <input type="text" className="form-control" placeholder="리액트" value={tempQuery} onChange={(e)=>{
                        setTempQuery(e.target.value)
                    }}/>
                    <button className="btn btn-dark" type="button" id="button-addon2" 
                        onClick={handleSearch}
                    >검색</button>
                </div>
            </div>
        </nav>
    )
}