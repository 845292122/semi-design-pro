import { VChart } from '@visactor/react-vchart'
import { initVChartSemiTheme } from '@visactor/vchart-semi-theme'

initVChartSemiTheme()

const commonSpec = {
  type: 'bar',
  data: [
    {
      id: 'barData',
      values: [
        { type: 'Date', month: 'Monday', sales: 21 },
        { type: 'Date', month: 'Tuesday', sales: 13 },
        { type: 'Date', month: 'Wednesday', sales: 25 },
        { type: 'Date', month: 'Thursday', sales: 29 },
        { type: 'Date', month: 'Friday', sales: 38 }
      ]
    }
  ],
  title: {
    visible: true,
    text: 'Bar chartafsfsd',
    subtext: 'This is a bar chartsdfsdfsd'
  },
  legends: {
    visible: true
  },
  xField: 'month',
  yField: 'sales',
  seriesField: 'type',
  direction: 'vertical'
}

export default function Home() {
  return (
    <div id="chart" style={{ width: '600px', height: '400px' }}>
      <VChart key="vertical" spec={commonSpec} />
    </div>
  )
}
