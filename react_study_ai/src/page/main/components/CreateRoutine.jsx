import React from "react"

const CreateRoutine = () => {
  return (
    <>
      <div className="main-page-detail-routine-add-title">루틴 추가하기</div>
      <div className="main-page-detail-routine-add-container">
        <input
          placeholder="12:00"
          className="main-page-detail-routine-add-input-time"
        />
        <input
          placeholder="목표를 적어보세요."
          className="main-page-detail-routine-add-input-content"
        />
      </div>
      <div className="main-page-detail-routine-day-title-container">
        <div className="main-page-detail-routine-day-title">실천 요일</div>
        <div className="main-page-detail-routine-day-sub-title">
          최소 2일 선택
        </div>
      </div>
      <div className="main-page-detail-routine-day-container">
        {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
          <div key={index} className="main-page-detail-routine-day-item">
            {day}
          </div>
        ))}
      </div>

      <div className="main-page-detail-routine-alert-title">알림 설정</div>
      {/* 알림 설정 로직을 나중에 만들어야 함 */}

      <hr className="main-page-detail-routine-alert-bottom-hr" />
    </>
  )
}

export default CreateRoutine
