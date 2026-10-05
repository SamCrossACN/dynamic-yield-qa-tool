import React from 'react';
type HexColor = `#${string}`;
type RgbColorStr = `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})`;
type Color = HexColor | RgbColorStr | 'none';

export type IconProps = {
  width?: string;
  height?: string;
  stroke?: Color;
  fill?: Color;
  color?: Color;
}

export const Beaker = ({ width, height, color }: IconProps) => (
  <svg className="icon beaker-icon"  xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={height} viewBox="0 0 24 24" fill={color}>
    <path d="M8.99998 4.5V10.7382C8.99998 11.1132 8.90628 11.4822 8.72739 11.8117L7.53944 14H16.4605L15.2726 11.8117C15.0937 11.4822 15 11.1132 15 10.7382V4.5H16C16.4142 4.5 16.75 4.16421 16.75 3.75C16.75 3.33579 16.4142 3 16 3H8C7.58579 3 7.25 3.33579 7.25 3.75C7.25 4.16421 7.58579 4.5 8 4.5H8.99998Z" fill={color}/>
    <path d="M17.2748 15.5H6.72515L5.14269 18.415C4.50968 19.5811 5.35388 20.9999 6.68068 20.9999H17.3193C18.6461 20.9999 19.4903 19.5811 18.8573 18.415L17.2748 15.5Z" fill={color}/>
  </svg>
)

export const Chevron = ({ width, height, color }: IconProps) => (
  <svg className="icon arrow-icon" xmlns="http://www.w3.org/2000/svg" fill={color || "#000000"} version="1.1" width={width || "800"} height={height || "800"} viewBox="0 0 96.154 96.154">
    <g>
      <path d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61   c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056   c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z" />
    </g>
  </svg>
);

export const Clear = ({ width, height, color }: IconProps) => (
  <svg className="icon clear-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" fill={color || '#000000'} width={width} height={height} viewBox="0 0 56 56">
    <path d="M 13.7851 49.5742 L 42.2382 49.5742 C 47.1366 49.5742 49.5743 47.1367 49.5743 42.3086 L 49.5743 13.6914 C 49.5743 8.8633 47.1366 6.4258 42.2382 6.4258 L 13.7851 6.4258 C 8.9101 6.4258 6.4257 8.8398 6.4257 13.6914 L 6.4257 42.3086 C 6.4257 47.1602 8.9101 49.5742 13.7851 49.5742 Z M 13.8554 45.8008 C 11.5117 45.8008 10.1992 44.5586 10.1992 42.1211 L 10.1992 13.8789 C 10.1992 11.4414 11.5117 10.1992 13.8554 10.1992 L 42.1679 10.1992 C 44.4882 10.1992 45.8007 11.4414 45.8007 13.8789 L 45.8007 42.1211 C 45.8007 44.5586 44.4882 45.8008 42.1679 45.8008 Z M 18.1913 35.9336 C 18.1913 36.9649 19.0117 37.8086 20.0429 37.8086 C 20.5585 37.8086 21.0273 37.6211 21.3554 37.2696 L 27.9882 30.6133 L 34.6444 37.2696 C 34.9726 37.5977 35.4179 37.8086 35.9335 37.8086 C 36.9648 37.8086 37.8085 36.9649 37.8085 35.9336 C 37.8085 35.3945 37.5976 34.9727 37.2460 34.6211 L 30.6366 27.9883 L 37.2695 21.3320 C 37.6444 20.9571 37.8320 20.5352 37.8320 20.0430 C 37.8320 19.0118 37.0117 18.1680 35.9570 18.1680 C 35.4882 18.1680 35.0898 18.3555 34.7148 18.7305 L 27.9882 25.4102 L 21.3085 18.7539 C 20.9570 18.4258 20.5585 18.2149 20.0429 18.2149 C 19.0351 18.2149 18.1913 19.0352 18.1913 20.0664 C 18.1913 20.5586 18.4023 21.0039 18.7304 21.3555 L 25.3632 27.9883 L 18.7304 34.6445 C 18.4023 34.9961 18.1913 35.4180 18.1913 35.9336 Z" fill={color || '#fff'} />
  </svg>
)

export const Close = ({ width, height, color }: IconProps) => (
  <svg className="icon close-icon" xmlns="http://www.w3.org/2000/svg" version="1.1"  width={width} height={height} viewBox="0 0 24 24" fill={color || 'unset'}>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729" />
  </svg>
);

export const Code = ({ width, height, color }: IconProps) => (
  <svg className="icon code-icon" xmlns="http://www.w3.org/2000/svg" width={width || "800px"} height={height || "800px"} viewBox="0 0 24 24" fill="none">
    <path d="M11 16L13 8" strokeWidth="2" strokeLinecap="round" stroke={color || '#323232'} />
    <path d="M17 15L19.6961 12.3039V12.3039C19.8639 12.1361 19.8639 11.8639 19.6961 11.6961V11.6961L17 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke={color || '#323232'}/>
    <path d="M7 9L4.32151 11.6785V11.6785C4.14394 11.8561 4.14394 12.1439 4.32151 12.3215V12.3215L7 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke={color || '#323232'}/>
  </svg>
)

export const Copy = ({ width, height, color }: IconProps) => (
  <svg className="icon copy-icon" xmlns="http://www.w3.org/2000/svg" version="1.1"  width={width} height={height} viewBox="0 0 24 24" fill={color || 'unset'}>
    <path d="M17.5 14H19C20.1046 14 21 13.1046 21 12V5C21 3.89543 20.1046 3 19 3H12C10.8954 3 10 3.89543 10 5V6.5M5 10H12C13.1046 10 14 10.8954 14 12V19C14 20.1046 13.1046 21 12 21H5C3.89543 21 3 20.1046 3 19V12C3 10.8954 3.89543 10 5 10Z" stroke={color || '#ffffff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const Fail = ({ width, height }: IconProps) => (
  <svg className="icon fail-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width={width || '256'} height={height || '256'} viewBox="0 0 256 256">
    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" strokeWidth={0} strokeDasharray="none" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} fillRule="nonzero" opacity={1} >
      <path d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z" transform="matrix(1 0 0 1 0 0)" strokeWidth={1} strokeDasharray="none" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} fillRule="nonzero" opacity={1} fill="#ec0000"/>
      <path d="M 28.5 65.5 c -1.024 0 -2.047 -0.391 -2.829 -1.172 c -1.562 -1.562 -1.562 -4.095 0 -5.656 l 33 -33 c 1.561 -1.562 4.096 -1.562 5.656 0 c 1.563 1.563 1.563 4.095 0 5.657 l -33 33 C 30.547 65.109 29.524 65.5 28.5 65.5 z" transform="matrix(1 0 0 1 0 0)" strokeWidth={1} strokeDasharray="none" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} fillRule="nonzero" opacity={1} fill="#ffffff" />
      <path d="M 61.5 65.5 c -1.023 0 -2.048 -0.391 -2.828 -1.172 l -33 -33 c -1.562 -1.563 -1.562 -4.095 0 -5.657 c 1.563 -1.562 4.095 -1.562 5.657 0 l 33 33 c 1.563 1.562 1.563 4.095 0 5.656 C 63.548 65.109 62.523 65.5 61.5 65.5 z" transform="matrix(1 0 0 1 0 0)" strokeWidth={1} strokeDasharray="none" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} fillRule="nonzero" opacity={1} fill="#ffffff" />
    </g>
  </svg>
);

export const Home = ({ width, height }: IconProps) => (
  <svg className="icon home-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={height} viewBox="0 0 24 24">
    <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z" />
  </svg>
);

export const Logo = ({ width, height }: IconProps) => (
  <svg className="icon logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width || '166'} ${height || '124'}`} height={height || '124'} width={width || '166'}>
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,124)">
        <g transform="scale(0.1)">
          <path style={{fill:'#231f20',fillOpacity:1,fillRule:'nonzero',stroke:'none'}} d="M 415.172,308.977 H 365.09 c -26.629,34.816 -56.113,79.199 -56.113,154.503 0,75.262 29.484,119.676 56.113,154.473 h 50.082 c -33.383,-44.738 -60.027,-86.64 -60.027,-154.473 0,-67.5 26.644,-109.394 60.027,-154.503" />
          <path style={{fill:'#231f20',fillOpacity:1,fillRule:'nonzero',stroke:'none'}} d="m 825.703,617.953 h 50.434 c 26.281,-34.797 55.75,-79.211 55.75,-154.473 0,-75.304 -29.469,-119.687 -55.75,-154.503 h -50.434 c 33.387,45.109 59.668,87.003 60.016,154.503 -0.348,67.833 -26.629,109.735 -60.016,154.473" />
          <path style={{fill:'#231f20',fillOpacity:1,fillRule:'nonzero',stroke:'none'}} d="M 431.09,572.484 H 617.172 V 532.707 H 546.855 V 354.438 H 501.043 V 532.707 H 431.09 v 39.777" />
          <path style={{fill:'#231f20',fillOpacity:1,fillRule:'nonzero',stroke:'none'}} d="M 647.117,572.484 H 692.57 V 394.574 H 794.141 V 354.438 H 647.117 v 218.046" />
        </g>
      </g>
    </svg>
);

export const Power = ({ width, height }: IconProps) => (
  <svg className="icon power-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={height} viewBox="0 0 24 24" >
    <g>
      <path d="M20.034,2.357v3.824c3.482,1.798,5.869,5.427,5.869,9.619c0,5.98-4.848,10.83-10.828,10.83   c-5.982,0-10.832-4.85-10.832-10.83c0-3.844,2.012-7.215,5.029-9.136V2.689C4.245,4.918,0.731,9.945,0.731,15.801   c0,7.921,6.42,14.342,14.34,14.342c7.924,0,14.342-6.421,14.342-14.342C29.412,9.624,25.501,4.379,20.034,2.357z" />
      <path d="M14.795,17.652c1.576,0,1.736-0.931,1.736-2.076V2.08c0-1.148-0.16-2.08-1.736-2.08   c-1.57,0-1.732,0.932-1.732,2.08v13.496C13.062,16.722,13.225,17.652,14.795,17.652z" />
    </g>
  </svg>
)

export const Preview = ({ width, height, color }: IconProps) => (
  <svg className="icon preview-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width={width} height={height} viewBox="0 0 24 24" fill="currentColor" >
    <path d="M10 12.9167C10.8102 12.9167 11.4988 12.6331 12.066 12.066C12.6331 11.4988 12.9167 10.8102 12.9167 10C12.9167 9.18981 12.6331 8.50116 12.066 7.93403C11.4988 7.3669 10.8102 7.08333 10 7.08333C9.18982 7.08333 8.50116 7.3669 7.93404 7.93403C7.36691 8.50116 7.08334 9.18981 7.08334 10C7.08334 10.8102 7.36691 11.4988 7.93404 12.066C8.50116 12.6331 9.18982 12.9167 10 12.9167ZM10 11.6667C9.53704 11.6667 9.14353 11.5046 8.81945 11.1806C8.49538 10.8565 8.33334 10.463 8.33334 10C8.33334 9.53704 8.49538 9.14352 8.81945 8.81944C9.14353 8.49537 9.53704 8.33333 10 8.33333C10.463 8.33333 10.8565 8.49537 11.1806 8.81944C11.5046 9.14352 11.6667 9.53704 11.6667 10C11.6667 10.463 11.5046 10.8565 11.1806 11.1806C10.8565 11.5046 10.463 11.6667 10 11.6667ZM10 15C8.49538 15 7.11228 14.5978 5.8507 13.7934C4.58913 12.989 3.58797 11.9271 2.84723 10.6076C2.78936 10.515 2.74885 10.418 2.7257 10.3165C2.70255 10.215 2.69098 10.1109 2.69098 10.004C2.69098 9.89717 2.70255 9.79167 2.7257 9.6875C2.74885 9.58333 2.78936 9.48495 2.84723 9.39236C3.58797 8.07292 4.58913 7.011 5.8507 6.2066C7.11228 5.4022 8.49538 5 10 5C11.5046 5 12.8877 5.4022 14.1493 6.2066C15.4109 7.011 16.412 8.07292 17.1528 9.39236C17.2107 9.48495 17.2512 9.582 17.2743 9.68349C17.2975 9.78498 17.309 9.88915 17.309 9.99599C17.309 10.1028 17.2975 10.2083 17.2743 10.3125C17.2512 10.4167 17.2107 10.515 17.1528 10.6076C16.412 11.9271 15.4109 12.989 14.1493 13.7934C12.8877 14.5978 11.5046 15 10 15Z" stroke={color} fill={color} />
  </svg>
);

export const Question = ({ width, height }: IconProps) => (
  <svg className="icon question-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width={width || "256"} height={height || "256"} viewBox="0 0 256 256">
    <g stroke={"none"} strokeWidth={0} strokeDasharray={"none"} strokeLinecap={"butt"} strokeLinejoin={"miter"} strokeMiterlimit={10} fill={"none"} fillRule={"nonzero"} opacity={1} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <circle cx="45" cy="45" r="45" stroke={"none"} strokeWidth={1} strokeDasharray={"none"} strokeLinecap={"butt"} strokeLinejoin={"miter"} strokeMiterlimit={10} fill={"rgb(255,186,64)"} fillRule={"nonzero"} opacity={1} transform="  matrix(1 0 0 1 0 0) "/>
      <path d="M 45 58.88 c -2.209 0 -4 -1.791 -4 -4 v -4.543 c 0 -1.101 0.454 -2.153 1.254 -2.908 l 8.083 -7.631 c 1.313 -1.377 2.035 -3.181 2.035 -5.087 v -0.302 c 0 -2.005 -0.791 -3.881 -2.228 -5.281 c -1.436 -1.399 -3.321 -2.14 -5.342 -2.089 c -3.957 0.102 -7.175 3.523 -7.175 7.626 c 0 2.209 -1.791 4 -4 4 s -4 -1.791 -4 -4 c 0 -8.402 6.715 -15.411 14.969 -15.623 c 4.183 -0.109 8.138 1.439 11.131 4.357 c 2.995 2.918 4.645 6.829 4.645 11.01 v 0.302 c 0 4.027 -1.546 7.834 -4.354 10.72 c -0.04 0.041 -0.08 0.081 -0.121 0.12 L 49 52.062 v 2.818 C 49 57.089 47.209 58.88 45 58.88 z" stroke={"none"} strokeWidth={1} strokeDasharray={"none"} strokeLinecap={"butt"} strokeLinejoin={"miter"} strokeMiterlimit={10} fill={"brown"} fillRule={"nonzero"} opacity={1} transform=" matrix(1 0 0 1 0 0) "/>
      <path d="M 45 71.96 c -1.32 0 -2.61 -0.53 -3.54 -1.46 c -0.23 -0.23 -0.43 -0.49 -0.62 -0.76 c -0.18 -0.271 -0.33 -0.561 -0.46 -0.86 c -0.12 -0.311 -0.22 -0.62 -0.28 -0.94 c -0.07 -0.32 -0.1 -0.65 -0.1 -0.98 c 0 -0.32 0.03 -0.65 0.1 -0.97 c 0.06 -0.32 0.16 -0.641 0.28 -0.94 c 0.13 -0.3 0.28 -0.59 0.46 -0.86 c 0.19 -0.279 0.39 -0.529 0.62 -0.76 c 1.16 -1.16 2.89 -1.7 4.52 -1.37 c 0.32 0.07 0.629 0.16 0.93 0.29 c 0.3 0.12 0.59 0.28 0.859 0.46 c 0.28 0.181 0.53 0.391 0.761 0.62 c 0.239 0.23 0.439 0.48 0.63 0.76 c 0.18 0.271 0.33 0.561 0.46 0.86 c 0.12 0.3 0.22 0.62 0.279 0.94 C 49.97 66.31 50 66.64 50 66.96 c 0 0.33 -0.03 0.66 -0.101 0.979 c -0.06 0.32 -0.159 0.63 -0.279 0.94 c -0.13 0.3 -0.28 0.59 -0.46 0.86 c -0.19 0.27 -0.391 0.529 -0.63 0.76 c -0.23 0.229 -0.48 0.439 -0.761 0.62 c -0.27 0.18 -0.56 0.34 -0.859 0.46 c -0.301 0.13 -0.61 0.22 -0.93 0.279 C 45.65 71.93 45.33 71.96 45 71.96 z" stroke={"none"} strokeWidth={1} strokeDasharray={"none"} strokeLinecap={"butt"} strokeLinejoin={"miter"} strokeMiterlimit={10} fill={"brown"} fillRule={"nonzero"} opacity={1} transform=" matrix(1 0 0 1 0 0) "/>
    </g>
  </svg>
)

export const Spinner = ({ width, height, color }: IconProps) => (
  <svg className="icon spinner-icon" xmlns="http://www.w3.org/2000/svg" width={width || "200"} height={height || "200"} viewBox="0 0 200 200">
    <radialGradient id="a5" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
      <stop offset="0" stopColor={color || "#FF156D"}></stop>
      <stop offset=".3" stopColor={color || "#FF156D"} stopOpacity=".9"></stop>
      <stop offset=".6" stopColor={color || "#FF156D"} stopOpacity=".6"></stop>
      <stop offset=".8" stopColor={color || "#FF156D"} stopOpacity=".3"></stop>
      <stop offset="1" stopColor={color || "#FF156D"} stopOpacity="0"></stop>
    </radialGradient>
    <circle transform-origin="center" fill="none" stroke="url(#a5)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70">
      <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
    </circle>
    <circle transform-origin="center" fill="none" opacity=".2" stroke={color || "#FF156D"} strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle>
  </svg>
)

export const Save = ({ width, height }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="icon" width={width} height={height} viewBox="0 0 24 24" >
    <path fillRule="evenodd" clipRule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" />
  </svg>
)

export const Settings = ({ width, height, color }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={width || '50px'} height={height || '50px'}>
    <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z" fill={color}/>
  </svg>
);

export const Success = ({ width, height }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="icon success-icon" width={width || '256'} height={height || '256'} viewBox="0 0 256 256">
    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" strokeWidth={0} strokeDasharray="none" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} fillRule="nonzero" opacity={1} fill="none" stroke="none" >
      <circle cx="45" cy="45" r="45" transform="matrix(1 0 0 1 0 0)" strokeWidth={1} strokeDasharray="none" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} fillRule="nonzero" opacity={1} stroke="none" fill='#28c937' />
      <path d="M 38.478 64.5 c -0.01 0 -0.02 0 -0.029 0 c -1.3 -0.009 -2.533 -0.579 -3.381 -1.563 L 21.59 47.284 c -1.622 -1.883 -1.41 -4.725 0.474 -6.347 c 1.884 -1.621 4.725 -1.409 6.347 0.474 l 10.112 11.744 L 61.629 27.02 c 1.645 -1.862 4.489 -2.037 6.352 -0.391 c 1.862 1.646 2.037 4.49 0.391 6.352 l -26.521 30 C 40.995 63.947 39.767 64.5 38.478 64.5 z" transform="matrix(1 0 0 1 0 0)" strokeLinecap="round" strokeWidth={1} strokeDasharray="none" strokeLinejoin="miter" strokeMiterlimit={10} fillRule="nonzero" opacity={1} stroke="none" fill="#ffffff"/>
    </g>
  </svg>
);

export const Team = ({ width, height, color }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="icon" width={width} height={height} viewBox="0 0 512 512">
    <g>
      <path d="M147.57,320.188c-0.078-0.797-0.328-1.531-0.328-2.328v-6.828c0-3.25,0.531-6.453,1.594-9.5   c0,0,17.016-22.781,25.063-49.547c-8.813-18.594-16.813-41.734-16.813-64.672c0-5.328,0.391-10.484,0.938-15.563   c-11.484-12.031-27-18.844-44.141-18.844c-35.391,0-64.109,28.875-64.109,73.75c0,35.906,29.219,74.875,29.219,74.875   c1.031,3.047,1.563,6.25,1.563,9.5v6.828c0,8.516-4.969,16.266-12.719,19.813l-46.391,18.953   C10.664,361.594,2.992,371.5,0.852,383.156l-0.797,10.203c-0.406,5.313,1.406,10.547,5.031,14.438   c3.609,3.922,8.688,6.125,14.016,6.125H94.93l3.109-39.953l0.203-1.078c3.797-20.953,17.641-38.766,36.984-47.672L147.57,320.188z" fill={color || '#000000'} />
      <path d="M511.148,383.156c-2.125-11.656-9.797-21.563-20.578-26.531l-46.422-18.953   c-7.75-3.547-12.688-11.297-12.688-19.813v-6.828c0-3.25,0.516-6.453,1.578-9.5c0,0,29.203-38.969,29.203-74.875   c0-44.875-28.703-73.75-64.156-73.75c-17.109,0-32.625,6.813-44.141,18.875c0.563,5.063,0.953,10.203,0.953,15.531   c0,22.922-7.984,46.063-16.781,64.656c8.031,26.766,25.078,49.563,25.078,49.563c1.031,3.047,1.578,6.25,1.578,9.5v6.828   c0,0.797-0.266,1.531-0.344,2.328l11.5,4.688c20.156,9.219,34,27.031,37.844,47.984l0.188,1.094l3.094,39.969h75.859   c5.328,0,10.406-2.203,14-6.125c3.625-3.891,5.438-9.125,5.031-14.438L511.148,383.156z" fill={color || '#000000'} />
      <path d="M367.867,344.609l-56.156-22.953c-9.375-4.313-15.359-13.688-15.359-23.969v-8.281   c0-3.906,0.625-7.797,1.922-11.5c0,0,35.313-47.125,35.313-90.594c0-54.313-34.734-89.234-77.594-89.234   c-42.844,0-77.594,34.922-77.594,89.234c0,43.469,35.344,90.594,35.344,90.594c1.266,3.703,1.922,7.594,1.922,11.5v8.281   c0,10.281-6.031,19.656-15.391,23.969l-56.156,22.953c-13.047,5.984-22.344,17.984-24.906,32.109l-2.891,37.203h139.672h139.672   l-2.859-37.203C390.211,362.594,380.914,350.594,367.867,344.609z" fill={color || '#000000'} />
    </g>
  </svg>
)