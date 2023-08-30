import React from 'react'

const Insights = ({name, value}) => {

    const INSIGHTS_WRAPPER ={
        display : "flex",
        flexDirection : "row",
        alignItems: "center",
    }

    const INSIGHTS_NAME = {
        fontFamily: "var(--font-family-1)",
        color: "var(--primary-color)" ,
        fontSize: "20px",
        fontWeight: "600",
    }

    const INSIGHTS_VALUE = {
        fontFamily: "var(--font-family-1)",
        color: "var(--text-color)" ,
        fontSize: "20px",
        marginLeft: "15px",
    }

  return (
    <div className='insights-wrapper' style={INSIGHTS_WRAPPER}>
      <div className="insights-name" style={INSIGHTS_NAME}>{name}</div>
      <div className="insights-value" style={INSIGHTS_VALUE}>{value}</div>
    </div>
  )
}

export default Insights
