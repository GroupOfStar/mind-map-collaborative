import { Theme } from './Theme'

/** 蓝色系 */
export const blueGray = Theme.mergeTheme({
  lineColor: '#4A51D9',
  lineStyle: 'straight',
  generalizationLineColor: '#4A51D9',
  backgroundColor: '#FFFFFF',
  root: {
    fillColor: '#4A51D9',
    lineColor: '#4A51D9'
  },
  second: {
    fillColor: '#6CA1FF',
    color: '#FFFFFF',
    lineWidth: 2,
    lineColor: '#4A51D9',
    borderWidth: 0
  },
  node: {
    lineColor: '#4A51D9',
    fillColor: '#EBEBEB',
    color: '#0D0D0D',
    borderColor: '#8BB5FF'
  },
  generalization: {
    fillColor: '#4A51D9',
    color: '#fff',
    borderColor: '#549688'
  }
})
