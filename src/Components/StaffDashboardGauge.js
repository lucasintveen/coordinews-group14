import React from "react";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { format } from "d3-format";

export default function StaffDashboardGauge(props) {
  const label = props.Label;
  const value = props.Value;
  const pointerColor = props.PointerColor;

  const min = props.Min;
  const max = props.Max;

  const percentScale = scaleLinear().domain([min, max]).range([0, 1]);
  const percent = percentScale(value);
  var array;

  if (pointerColor === "normal") {
    array = [0, 25, 50, 75];
    console.log("Array True: ", array);
  }
  if (pointerColor === "twisted") {
    array = [75, 50, 25, 0];
    console.log("Array False: ", array);
  }

  const angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true);

  const angle = angleScale(percent);
  const markerLocation = getCoordsOnArc(angle, 0.47 - (1 - 0.65) / 2);

  const redArc = arc()
    .innerRadius(0.4)
    .outerRadius(0.35)
    .startAngle(-Math.PI / 2)
    .endAngle(-Math.PI / 4)
    .padAngle(0)
    .cornerRadius(2)();

  const lightredArc = arc()
    .innerRadius(0.4)
    .outerRadius(0.35)
    .startAngle(-Math.PI / 4)
    .endAngle(0)
    .padAngle(0)
    .cornerRadius(2)();

  const yelloArc = arc()
    .innerRadius(0.4)
    .outerRadius(0.35)
    .startAngle(0)
    .endAngle(Math.PI / 4)
    .padAngle(0)
    .cornerRadius(2)();

  const greenArc = arc()
    .innerRadius(0.4)
    .outerRadius(0.35)
    .startAngle(Math.PI / 4)
    .endAngle(Math.PI / 2)
    .padAngle(0)
    .cornerRadius(2)();

  const getBlobColor = (value) => {
    if (pointerColor === "normal") {
      if (value >= array[0] && value <= array[1]) return "#A6506D";
      if (value > array[1] && value <= array[2]) return "#D1817D";
      if (value > array[2] && value <= array[3]) return "#EDE0C0";
      if (value >= array[3]) return "#6EB89E";
    } else if (pointerColor === "twisted") {
      // if (value <= array[0]) return "#A6506D";
      // if (value < array[1] && value >= array[2]) return "#EDE0C0";
      // // if (value < array[2] && value >= array[3]) return "#D1817D";
      // if (value <= array[2]) return "#6EB89E";
      return "#6EB89E";
    }
  };

  return (
    <div className="gauge-position">
      <div
        style={{
          textAlign: "center",
        }}
      >
        <svg viewBox={[-1, -1, 2, 1].join(" ")}>
          <path d={redArc} fill="#A6506D" />
          <path d={lightredArc} fill="#D1817D" />
          <path d={yelloArc} fill="#EDE0C0" />
          <path d={greenArc} fill="#6EB89E" />
          <circle
            cx={markerLocation[0]}
            cy={markerLocation[1]}
            r="0.03"
            strokeWidth="0.01"
            fill="white"
            stroke={getBlobColor(value)}
          />
        </svg>

        <div
          style={{
            marginTop: "-44px",
            fontSize: "3em",
            lineHeight: "1em",
            fontWeight: "900",
            fontFeatureSettings: "'zero', 'tnum' 1",
          }}
        >
          {format(",")(value)}
        </div>

        {!!label && (
          <div
            style={{
              color: "#8b8ba7",
              fontSize: "1.3em",
              lineHeight: "1.3em",
              fontWeight: "700",
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
}

const getCoordsOnArc = (angle, offset = 10) => [
  Math.cos(angle - Math.PI / 2) * offset,
  Math.sin(angle - Math.PI / 2) * offset,
];
