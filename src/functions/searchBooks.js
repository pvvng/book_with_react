// 책 검색 함수 정의
// argement query는 검색어임

import axios from 'axios';

// 요청에 필요한 정보
const apiUrl = 'https://dapi.kakao.com/v3/search/book'; // API 엔드포인트 URL
const apiKey = process.env.REACT_APP_KAKAO_KEY; // 카카오 개발자 사이트에서 발급받은 API 키


export async function searchBooks(query) {
    try {
        // API 요청 보내기
        const response = await axios.get(apiUrl, {
            headers: {
                // 인증
                Authorization: `KakaoAK ${apiKey}`
            },
            params: {
                // 검색어
                query: query,
                page: 2, // 페이지 번호 설정
                size: 20 // 한 페이지에 가져올 항목 수 설정
            }
        });

        // 검색 결과 반환
        return response.data;
    } catch (error) {
        console.error('책 검색 중 오류 발생:', error);
        throw error;
    }
}