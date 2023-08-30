import React from "react";

import { PieChart, Pie, Label, Cell } from "recharts";

const data = [
  { name: "Bubble Tea Sold", value: 0 },
  { name: "Bubble Tea Left", value: 0 },
  { name: "no value", value: 1 }, // this is the crucial element
];

function EmptyPieChart() {
  return (
    <div>
      <PieChart width={1080} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          dataKey="value"
          outerRadius={80}
        >
          {data.map((entry, index) => {
            if (index === 1 || index === 2) {
              return <Cell key={`cell-${index}`} fill="#f3f6f9" />;
            }
            return <Cell key={`cell-${index}`} fill="green" />;
          })}
          <Label
            value={data[0].value}
            position="center"
            fill="grey"
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          />
        </Pie>
      </PieChart>
    </div>
  );
}

export default EmptyPieChart;
