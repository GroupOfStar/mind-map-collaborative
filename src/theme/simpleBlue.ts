import { mergeTheme } from './Theme'

/** 简约 */
export const simpleBlue = mergeTheme({
  lineColor: '#0D0D0D',
  lineStyle: 'straight',
  generalizationLineWidth: 1,
  generalizationLineColor: '#0D0D0D',
  backgroundColor: '#F2F2F2',
  root: {
    lineWidth: 2,
    lineColor: '#0D0D0D',
    lineDasharray: 'none',
    fillColor: '#0D0D0D'
  },
  second: {
    lineColor: '#0D0D0D',
    fillColor: '#233ED9',
    color: '#FFFFFF',
    borderWidth: 0
  },
  node: {
    lineColor: '#0D0D0D',
    fillColor: '#EBEBEB',
    color: '#0D0D0D',
    borderColor: 'transparent',
    borderWidth: 0
  },
  generalization: {
    fillColor: '#fff',
    color: '#565656',
    borderColor: '#0D0D0D'
  }
})
