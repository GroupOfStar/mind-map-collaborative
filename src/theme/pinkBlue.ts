import { Theme } from './Theme'

/** 和风 */
export const pinkBlue = Theme.mergeTheme({
  lineColor: '#FFABAA',
  lineStyle: 'direct',
  generalizationLineWidth: 3,
  generalizationLineColor: '#FFABAA',
  backgroundColor: '#FFFFFF',
  root: {
    lineColor: '#FFABAA',
    fillColor: '#191958'
  },
  second: {
    lineColor: '#FFABAA',
    fillColor: '#FFABAA',
    borderColor: '',
    borderWidth: 0,
    color: '#fff'
  },
  node: {
    lineColor: '#FFABAA',
    lineWidth: 2,
    fillColor: '#FFEEEE',
    color: '#0D0D0D',
    borderColor: 'transparent',
    borderWidth: 0
  },
  generalization: {
    fillColor: '#FFABAA',
    color: '#222'
  }
})
