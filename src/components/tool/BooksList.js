export default function BooksList({booklist}){
    // console.log(booklist)
    if(booklist.length !== 0){
        return(
            <div className="row mt-3" style={{width:'100%', margin: 0, marginLeft:'auto', marginBottom:'auto'}}>
                {
                    booklist.map((bk,i) => 
                        <div className="flip-outer" style={{marginLeft:'auto', marginRight:'auto'}} key={i}>
                            <div className="flip-inner">
                                <div className="front">
                                    <div>
                                        <img src={bk.thumbnail} className="mt-3" alt={bk.title}/>
                                        <h5 className="mt-3 fw-b">{bk.title}</h5>
                                        {bk.authors.map ((at,i) => <span key={i} className="badge text-bg-secondary mx-1">{at}</span>)}
                                        <div>
                                            <p className="mt-2 badge text-bg-success mx-1">{bk.publisher}</p>
                                        </div>
                                        <div className="mt-1">
                                            <span>정상가 : {bk.price}원</span>
                                            {
                                                bk.sale_price !== -1?
                                                <span> / 세일가 : {bk.sale_price}원</span>
                                                :null
                                            }
                                        </div>
                                    </div>
                                </div>
                                <a href={bk.url} target="_blank" rel="noreferrer">
                                    <div className="card p-3 back">
                                        <p>{bk.contents} ... </p>
                                        <p className="mt-1 fw-b">(클릭하여 더 알아보기)</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )
                }
            </div>

        )
    }else{
        return(
            <h2 className="m-3">검색 결과가 없슴</h2>
        )
    }

}