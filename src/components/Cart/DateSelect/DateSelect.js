import React, { useEffect,  useRef } from "react";



const DateSelect = props => { 

    const ref = useRef()

    const checkIfClickedOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
          props.toggleDates()
        }
      }

  useEffect(()=>{
    document.addEventListener("click", checkIfClickedOutside)
    return () => {
      document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [])

    return(
        <select className="dateSelect" onChange={props.setNewDate.bind(this)}  value={props.date} ref={ref}>
        {props.dates.map((item,i)=>(
        <option key={i} value={item}>{item}</option>
        ))}
        </select>
    )
}

export default DateSelect