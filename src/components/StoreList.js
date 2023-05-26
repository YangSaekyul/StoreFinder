import React, { useState } from "react";
import data from "./stores.json";

function StoreList() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextStore = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevStore = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const currentStore = data.stores[currentIndex];

  if (!currentStore) {
    return (
      <div>
        <p>더 이상 매장이 없습니다.</p>
      </div>
    );
  }

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === data.stores.length - 1;

  // 리뷰 추가 함수
  const addReview = (review) => {
    if (!currentStore.reviews) {
      currentStore.reviews = []; // reviews 배열이 없는 경우 빈 배열로 초기화
    }
    currentStore.reviews.push(review);
    setCurrentIndex(currentIndex);
  };

  return (
    <div>
      <h2>{currentStore.name}</h2>
      <p>업종: {currentStore.industry}</p>
      <p>매장소개: {currentStore.introduction}</p>
      <p>전화번호: {currentStore.phone}</p>
      <p>주소: {currentStore.address}</p>
      <p>영업시간: {currentStore.operationHours}</p>
      <ul>
        {currentStore.menu &&
          Object.entries(currentStore.menu).map(([menuName, price]) => (
            <li key={menuName}>
              {menuName} - {price}원
            </li>
          ))}
      </ul>

      <h3>리뷰</h3>
      <ul>
        {currentStore.reviews &&
          currentStore.reviews.map((review, index) => (
            <li key={index}>
              <p>작성자: {review.author}</p>
              <p>평점: {review.rating}</p>
              <p>내용: {review.content}</p>
            </li>
          ))}
      </ul>

      {!isFirstPage && <button onClick={handlePrevStore}>이전</button>}
      {!isLastPage && <button onClick={handleNextStore}>다음</button>}

      {/* 리뷰 추가 예시 */}
      <button
        onClick={() =>
          addReview({
            author: "John",
            rating: 4,
            content: "맛있는 음식입니다!",
          })
        }
      >
        리뷰 작성하기
      </button>
    </div>
  );
}

export default StoreList;
