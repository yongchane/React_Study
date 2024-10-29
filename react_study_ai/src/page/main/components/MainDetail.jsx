import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedSection } from "../../../Redux/main"
import CreateRoutine from "./CreateRoutine"

import { ReactComponent as RoutinePlus } from "../../../assets/main/RoutinePlus.svg"
import { ReactComponent as Check } from "../../../assets/main/Check.svg"
import { ReactComponent as NotCheck } from "../../../assets/main/NotCheck.svg"

const MainDetail = ({ routineData, setRoutineData }) => {
  const selectedSection = useSelector(
    (state) => state.selectedSection.selectedSection
  )
  const dispatch = useDispatch()

  const onClickSelectedSection = (section) => {
    dispatch(setSelectedSection(section))
  }

  const toggleEventSuccess = (eventTitle) => {
    const updatedEvents = routineData.map((event) =>
      event.title === eventTitle ? { ...event, success: !event.success } : event
    )
    setRoutineData(updatedEvents)
  }

  const deleteEvent = (eventTitle) => {
    const updatedEvents = routineData.filter(
      (event) => event.title !== eventTitle
    )
    setRoutineData(updatedEvents)
  }

  return (
    <div className="main-page-detail-routine-container">
      <div className="main-page-detail-routine-selection-container">
        <div
          className={
            selectedSection === "view1"
              ? "main-page-detail-routine-selection active"
              : "main-page-detail-routine-selection"
          }
          onClick={() => onClickSelectedSection("view1")}
        >
          오늘 목표🔥
        </div>
        <div
          className={
            selectedSection === "view2"
              ? "main-page-detail-routine-selection active"
              : "main-page-detail-routine-selection"
          }
          onClick={() => onClickSelectedSection("view2")}
        >
          루틴 추가
        </div>
      </div>
      <hr className="main-page-detail-routine-selection-hr" />
      {selectedSection === "view1" ? (
        <>
          <div className="main-page-detail-routine-title">
            개인 루틴
            <RoutinePlus onClick={() => onClickSelectedSection("view2")} />
          </div>
          {routineData.map((event) => (
            <div
              className="main-page-detail-routine-input-container"
              key={event.title}
            >
              <div className="main-page-detail-routine-input-time">
                {event.time}
              </div>
              <div className="main-page-detail-routine-input-content">
                {event.title}
              </div>
              <div
                className="main-page-detail-routine-input-checkbox"
                onClick={() => toggleEventSuccess(event.title)}
              >
                {event.success ? <Check /> : <NotCheck />}
              </div>
            </div>
          ))}
        </>
      ) : (
        <CreateRoutine />
      )}
    </div>
  )
}

export default MainDetail
