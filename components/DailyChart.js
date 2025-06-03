import React, {useMemo} from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import useTotalTimeStore from '../utils/TotalTimeStore';

const screenWidth = Dimensions.get('window').width;

const DailyChart = () => {
    const duration = useTotalTimeStore((state) => state.dailyWorkoutDuration);

    const chartData = useMemo(() => {
        const dates = Object.keys(duration).sort();
        const recentDates = dates.slice(-7);

        return recentDates.map((date) => ({
        label: date,
        value: parseFloat((duration[date] / 60).toFixed(2)),
        }));
    }, [duration]);

  const labels = chartData.map((d) => d.label);
  const dataValues = chartData.map((d) => d.value);

  return (
    <View>
      <BarChart
        data={{
          labels,
          datasets: [{ data: dataValues }],
        }}
        width={screenWidth - 90}
        height={250}
        fromZero
        chartConfig={{
          backgroundGradientFrom: '#1E293B',
          backgroundGradientTo: '#1E293B',
          fillShadowGradient: '#93E13C',
          fillShadowGradientOpacity: 1,
          decimalPlaces: 2,
          color: () => '#93E13C',
          labelColor: () => '#93E13C',
          propsForLabels: {
            fontFamily: 'Montserrat-Regular',
            fontSize: 12,
          },
          propsForBackgroundLines: {
            stroke: '#334155',
          },
        }}
        style={{
          borderRadius: 12,
        }}
      />
    </View>
  );
};

export default DailyChart;
