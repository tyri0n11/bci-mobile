import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Svg, { Polyline, Text as SvgText } from 'react-native-svg';

const CHANNELS = [
  { name: 'AF3', color: '#1f77b4' },
  { name: 'AF4', color: '#ff7f0e' },
  { name: 'O1',  color: '#2ca02c' },
  { name: 'O2',  color: '#d62728' },
];

const oscillators = [
  (i) => 4 + 1.2 * Math.sin(i / 8) + (Math.random() - 0.5) * 0.3, // AF3
  (i) => 4 + 1.1 * Math.cos(i / 7) + (Math.random() - 0.5) * 0.3, // AF4
  (i) => 4 + 1.3 * Math.sin(i / 10) + (Math.random() - 0.5) * 0.3, // O1
  (i) => 4 + 1.0 * Math.cos(i / 9) + (Math.random() - 0.5) * 0.3, // O2
];

interface EEGChartProps {
  width?: number;
  height?: number;
  numPoints?: number;
  speed?: number; // ms mỗi lần cập nhật
  isConnected?: boolean;
}

const EEGChart: React.FC<EEGChartProps> = ({
  width = 350,
  height = 180,
  numPoints = 100,
  speed = 100,
  isConnected = false,
}) => {
  const numChannels = CHANNELS.length;
  const [autoData, setAutoData] = useState<number[][]>(() =>
    Array.from({ length: numChannels }, (_, ch) =>
      Array.from({ length: numPoints }, (_, i) =>
        oscillators[ch](i)
      )
    )
  );
  const tickRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isConnected) {
      intervalRef.current && clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      tickRef.current += 1;
      setAutoData(prev =>
        prev.map((channel, ch) => {
          const i = tickRef.current + channel.length;
          const nextVal = oscillators[ch](i);
          return [...channel.slice(1), nextVal];
        })
      );
    }, speed);
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [numChannels, numPoints, speed, isConnected]);

  if (!isConnected) {
    return (
      <View style={{height, justifyContent: 'center', alignItems: 'center'}}>
        <SvgText x={100} y={height/2} fontSize={18} fill="#aaa">No data</SvgText>
      </View>
    );
  }

  const chartData = autoData;
  if (!chartData || chartData.length === 0) return null;
  const numCh = chartData.length;
  const numPts = chartData[0].length;

  let min = Math.min(...chartData.flat());
  let max = Math.max(...chartData.flat());
  if (min === max) max = min + 1;

  const channelHeight = height / numCh;
  const labelWidth = 32;
  const chartWidth = width - labelWidth;

  return (
    <View>
      <Svg width={width} height={height}>
        {chartData.map((channel, chIdx) => {
          const points = channel.map((v, i) => {
            const x = labelWidth + (i / (numPts - 1)) * chartWidth;
            const y = ((v - min) / (max - min)) * (channelHeight * 0.8) + chIdx * channelHeight + channelHeight * 0.1;
            return `${x},${y}`;
          }).join(' ');
          // Label vị trí y giữa line
          const labelY = chIdx * channelHeight + channelHeight * 0.5 + 5;
          return (
            <React.Fragment key={chIdx}>
              <SvgText
                x={4}
                y={labelY}
                fontSize={14}
                fill={CHANNELS[chIdx].color}
                fontWeight="bold"
                alignmentBaseline="middle"
              >
                {CHANNELS[chIdx].name}
              </SvgText>
              <Polyline
                points={points}
                fill="none"
                stroke={CHANNELS[chIdx].color}
                strokeWidth="2"
              />
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

export default EEGChart; 