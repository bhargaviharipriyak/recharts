import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import * as d3 from "d3-selection";

const series = [
  {
    name: "Actual Order",
    data: [
      { orderDate: "1", value: 8 },
      { orderDate: "2", value: 5 },
      { orderDate: "3", value: 5.5 },
      { orderDate: "4", value: 4.25 },
      { orderDate: "12", value: 11.99 }
    ],
    stroke: "#ffc220"
  },
  {
    name: "HVI Prediction",
    data: [
      { orderDate: "1", value: 6 },
      { orderDate: "2", value: 5.5 },
      { orderDate: "3", value: 4.25 },
      { orderDate: "4", value: 5 }
    ],
    stroke: "#a0b5e8"
  },
  {
    name: "HVI Order",
    data: [
      { orderDate: "8", value: 6 },
      { orderDate: "9", value: 4.5, HVIRecommendedOrder: true }
    ],
    stroke: "#0065ff",
    strokeDasharray: "7 7"
  }
];

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload } = props;
  if (!payload.HVIRecommendedOrder) {
    return (
      <svg
        x={cx - 10}
        y={cy - 10}
        width={40}
        height={40}
        fill={stroke}
        viewBox="0 0 200 200"
      >
        <circle
          tabIndex="0"
          cx="50"
          cy="50"
          r="40"
          strokeWidth="3"
          fill={stroke}
        />
      </svg>
    );
  }

  return (
    <svg x={cx - 20} y={cy - 15} width={40} height={40} viewBox="0 0 200 200">
      <rect
        width="15"
        height="15"
        fill="white"
        stroke={stroke}
        strokeWidth="2"
        transform="matrix(3 3 -3 3 100 25)"
      />
    </svg>
  );
};

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.tooltip = null;
    this.linechart = null;
    this.tooltipQty = null;
    this.tooltipDate = null;
    this.params = {
      width: 150,
      height: 75,
      radius: 5,
      offset: 15,
      placement: "T"
    };
  }

  getTopTooltipPath() {
    const top = -this.params.offset - this.params.height;
    return `M 0,0
  	L ${-this.params.offset},${-this.params.offset} 
    H ${-this.params.width / 2 + this.params.radius} 
    Q ${-this.params.width / 2},${-this.params.offset}  
    ${-this.params.width / 2},${-this.params.offset - this.params.radius} 
    V ${top + this.params.radius} 
    Q ${-this.params.width / 2},${top}  
    ${-this.params.width / 2 + this.params.radius},${top}
    H ${this.params.width / 2 - this.params.radius}
    Q ${this.params.width / 2},${top}  
    ${this.params.width / 2},${top + this.params.radius} 
    V ${-this.params.offset - this.params.radius}
    Q ${this.params.width / 2},${-this.params.offset}  
    ${this.params.width / 2 - this.params.radius},${-this.params.offset}
    H ${this.params.offset} z`;
  }

  getBottomTooltipPath() {
    const bottom = this.params.offset + this.params.height;
    return `M 0,0
  	L ${-this.params.offset},${this.params.offset} 
    H ${-this.params.width / 2 + this.params.radius} 
    Q ${-this.params.width / 2},${this.params.offset}  
    ${-this.params.width / 2},${this.params.offset + this.params.radius} 
    V ${bottom - this.params.radius} 
    Q ${-this.params.width / 2},${bottom}  
    ${-this.params.width / 2 + this.params.radius},${bottom}
    H ${this.params.width / 2 - this.params.radius}
    Q ${this.params.width / 2},${bottom}  
    ${this.params.width / 2},${bottom - this.params.radius} 
    V ${this.params.offset + this.params.radius}
    Q ${this.params.width / 2},${this.params.offset}  
    ${this.params.width / 2 - this.params.radius},${this.params.offset}
    H ${this.params.offset} z`;
  }

  getLeftTooltipPath() {
    const left = -this.params.offset - this.params.width;
    return `M 0,0
  	L ${-this.params.offset},${this.params.offset}
    V ${this.params.height / 2 - this.params.radius}
    Q ${-this.params.offset},${this.params.height / 2}
    ${-this.params.offset - this.params.radius},${this.params.height / 2}
    H ${left + this.params.radius}
    Q ${left},${this.params.height / 2}
    ${left},${this.params.height / 2 - this.params.radius}
    V ${-this.params.height / 2 + this.params.radius}
    Q ${left},${-this.params.height / 2}
    ${left + this.params.radius},${-this.params.height / 2}
    H ${-this.params.offset - this.params.radius}
    Q ${-this.params.offset},${-this.params.height / 2}
    ${-this.params.offset},${-this.params.height / 2 + this.params.radius}
    V ${-this.params.offset} z`;
  }

  getRightTooltipPath() {
    const right = this.params.offset + this.params.width;
    return `M 0,0
  	L ${this.params.offset},${this.params.offset}
    V ${this.params.height / 2 - this.params.radius}
    Q ${this.params.offset},${this.params.height / 2}
    ${this.params.offset + this.params.radius},${this.params.height / 2}
    H ${right - this.params.radius}
    Q ${right},${this.params.height / 2}
    ${right},${this.params.height / 2 - this.params.radius}
    V ${-this.params.height / 2 + this.params.radius}
    Q ${right},${-this.params.height / 2}
    ${right - this.params.radius},${-this.params.height / 2}
    H ${this.params.offset + this.params.radius}
    Q ${this.params.offset},${-this.params.height / 2}
    ${this.params.offset},${-this.params.height / 2 + this.params.radius}
    V ${-this.params.offset} z`;
  }

  getTooltipPath(placement) {
    switch (placement) {
      case "L":
        return this.getLeftTooltipPath();
      case "T":
        return this.getTopTooltipPath();
      case "R":
        return this.getRightTooltipPath();
      case "B":
        return this.getBottomTooltipPath();
      default:
        return this.getTopTooltipPath();
    }
  }

  getToolTipPosition(x, y, chartWidth, chartHeight) {
    console.log("args:::", { x, y, chartWidth, chartHeight });
    console.log("args::MODI1:", {
      x: x - 80,
      y: y - 50,
      chartWidth,
      chartHeight
    });
    console.log("args::MODI2:", {
      x: x + 80,
      y: y + 50,
      chartWidth,
      chartHeight
    });
    if (x - 100 < 0) {
      return "R";
    } else if (x + 100 > chartWidth) {
      return "L";
    } else if (y + 60 > chartHeight) {
      return "T";
    } else if (y - 60 < 0) {
      return "B";
    }

    return "T";
  }
  customMouseOver = (e, name, b) => {
    // console.log("I am called......", this.linechart);
    console.log("props:Le", e);
    console.log("props::name", name);
    console.log("props::b", b);
    const lineChartSvg = d3.select("svg#jumbo-chart-id-1").node();

    console.log("lineChartSvg:::");

    let chartWidth = lineChartSvg?.width?.baseVal?.value;
    let chartHeight = lineChartSvg?.height?.baseVal?.value;
    //console.log("chartWidth::", chartWidth);
    //console.log("chartHeight::", chartHeight);
    let x = Math.round(b.cx);
    let y = Math.round(b.cy);

    let toolTipPostion = this.getToolTipPosition(x, y, chartWidth, chartHeight);
    let tooTipPath = this.getTooltipPath(toolTipPostion);
    this.tooltip.style.transform = `translate(${x}px, ${y}px)`;
    console.log(x, y);
    this.tooltip.style.opacity = "1";
    this.tooltip.innerHTML = `<path class='tooltip' d="${tooTipPath}"></path>`;
    //this.tooltipDate.innerHTML = b.payload["orderDate"];
  };

  over = (e) => {
    console.log("mouse leave called");
    this.tooltip.style.opacity = "0";
  };

  xAxisTickFormatter(month) {
    return month;
  }
  componentDidMount() {
    const lines = d3
      .select("svg#jumbo-chart-id-1")
      .selectAll("g.recharts-line");

    const dots_0 = d3
      .select(lines.nodes()[0])
      .selectAll("g.recharts-line-dots svg")
      .nodes();
    const dots_1 = d3
      .select(lines.nodes()[1])
      .selectAll("g.recharts-line-dots svg")
      .nodes();
    const dots_2 = d3
      .select(lines.nodes()[2])
      .selectAll("g.recharts-line-dots svg")
      .nodes();
    console.log("dots_0:::", dots_0.length);
    console.log("dots_1:::", dots_1.length);
    console.log("dots_2:::", dots_2.length);
  }
  render() {
    return (
      <div>
        <LineChart
          width={900}
          height={300}
          margin={{ top: 20, right: 20 }}
          onKeyPress={(evt) => {
            console.log("EE:", evt);
          }}
          ref={(ref) => (this.linechart = ref)}
          id={"jumbo-chart-id-1"}
        >
          <CartesianGrid vertical={false} id={"jumbo-chart-id-2"} />
          <XAxis
            dataKey="orderDate"
            tick={{ fontSize: 14, fontWeight: "bold" }}
            domain={[1, 12]}
            tickCount={4}
            tickFormatter={this.xAxisTickFormatter}
            type="number"
            tickLine={false}
            allowDuplicatedCategory={false}
            padding={{ left: 30, right: 30 }}
          />
          <YAxis
            dataKey="value"
            tick={{ fontSize: 13, fill: "#6d6e71" }}
            domain={[0, "dataMax + 12"]}
            tickCount={20}
            allowDecimals={false}
            tickLine={false}
          />
          <Tooltip cursor={false} wrapperStyle={{ display: "none" }} />

          {series.map((s) => (
            <Line
              activeDot={{
                onMouseOver: (e, b) => this.customMouseOver(e, s.name, b),
                onMouseLeave: () => this.over
              }}
              isAnimationActive={false}
              dataKey="value"
              dot={<CustomizedDot />}
              stroke={s.stroke}
              strokeDasharray={s.strokeDasharray}
              data={s.data}
              name={s.name}
              key={s.name}
            />
          ))}
          <g
            ref={(ref) => (this.tooltip = ref)}
            style={{ opacity: 0, transform: "translate(297px, 218px)" }}
          >
            <path
              class="tooltip"
              d="M 0,0 L -15,-15 H -70 Q -75,-15 -75,-20 V -85 
              Q -75,-90 -70,-90 H 70 Q 75,-90 75,-85 V -20 Q 75,-15 70,-15 H 15 z"
            ></path>
          </g>
        </LineChart>
      </div>
    );
  }
}
