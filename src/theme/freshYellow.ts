import { Theme } from './Theme'

/** 复古 */
export const freshYellow: ITheme = Theme.mergeTheme({
  lineColor: '#FFBC9E',
  lineStyle: 'curve',
  generalizationLineColor: '#026D77',
  backgroundColor: '#F9F8ED',
  root: {
    fillColor: '#026D77',
    lineColor: '#FFBC9E',
    lineWidth: 2,
    lineDasharray: 'none'
  },
  second: {
    lineColor: '#FFBC9E',
    fillColor: '#FFBC9E',
    marginY: 77,
    borderColor: '',
    borderWidth: 0
  },
  node: {
    lineColor: '#FFBC9E',
    fillColor: '#FAECDD',
    color: '#661E01',
    borderColor: '',
    borderWidth: 0
  },
  generalization: {
    fillColor: '#026D77',
    borderColor: 'rgb(56, 123, 233)',
    color: '#fff',
    borderWidth: 0
  }
})
