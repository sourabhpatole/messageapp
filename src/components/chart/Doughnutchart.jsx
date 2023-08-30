import React from "react";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function LChart({ veg, nonveg }) {
  console.log(veg);
  console.log(nonveg);
  const data = {
    datasets: [
      {
        label: "Percentage",
        data: [nonveg, veg],
        backgroundColor: ["#C89AFE", "#FDC799"],
        // borderColor: ["red","blue","green"],
        cutout: "89.5%",
        borderRadius: 100,
        borderWidth: 0,
      },
    ],
    labels: [`Non-Veg : ${nonveg} `, `Veg : ${veg}`],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",

        labels: {
          color: "wheat",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 50,
          font: {
            size: 18,
          },
        },
      },
    },
  };

  const backgroundCircle = {
    id: "backgroundCircle",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx } = chart;
      ctx.save();

      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
      const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
      const width = outerRadius - innerRadius;
      const angle = Math.PI / 180;

      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.strokeStyle = "#2A2F39";
      ctx.arc(xCoor, yCoor, outerRadius - width / 2, 0, angle * 360, false);
      ctx.stroke();
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx } = chart;
      // let text = `Responses For Today's Lunch`;
      ctx.save();

      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      ctx.font = "bold 25px Quicksand";
      ctx.fillStyle = "wheat";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`Lunch Responses`, xCoor, yCoor);
    },
  };

  return (
    <div className="doughnut-div" style={{ width: "70%" }}>
      <Doughnut
        style={{ width: "30%", height: "30%" }}
        data={data}
        options={options}
        plugins={[backgroundCircle, textCenter]}
      ></Doughnut>
    </div>
  );
}
export function DChart({ veg, nonveg }) {
  console.log(veg);
  console.log(nonveg);
  const data = {
    datasets: [
      {
        label: "Percentage",
        data: [nonveg, veg],
        backgroundColor: ["#C89AFE", "#FDC799"],
        // borderColor: ["red", "blue", "green"],
        cutout: "89.5%",
        borderRadius: 100,
        borderWidth: 0,
      },
    ],
    labels: [`Non-Veg : ${nonveg}`, `Veg : ${veg}`],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",

        labels: {
          color: "wheat",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 50,
          font: {
            size: 18,
          },
        },
      },
    },
  };

  const backgroundCircle = {
    id: "backgroundCircle",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx } = chart;
      ctx.save();

      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
      const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
      const width = outerRadius - innerRadius;
      const angle = Math.PI / 180;

      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.strokeStyle = "#2A2F39";
      ctx.arc(xCoor, yCoor, outerRadius - width / 2, 0, angle * 360, false);
      ctx.stroke();
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx } = chart;
      // let text = `Responses For Today's Lunch`;
      ctx.save();

      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      ctx.font = "bold 25px Quicksand";
      ctx.fillStyle = "wheat";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`Dinner Responses`, xCoor, yCoor);
    },
  };

  return (
    <div className="doughnut-div" style={{ width: "70%" }}>
      <Doughnut
        style={{ width: "30%", height: "30%" }}
        data={data}
        options={options}
        plugins={[backgroundCircle, textCenter]}
      ></Doughnut>
    </div>
  );
}
