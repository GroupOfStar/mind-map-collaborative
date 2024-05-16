import { mergeTheme } from './Theme'

/** 商务 */
export const deepPurple = mergeTheme({
  lineColor: '#534E96',
  generalizationLineColor: '#5E3295',
  backgroundColor: '#FFFFFF',
  root: {
    lineColor: '#534E96',
    fillColor: '#5E3295'
  },
  second: {
    lineColor: '#534E96',
    fillColor: '#534E96',
    borderWidth: 1,
    color: '#FFFFFF'
  },
  node: {
    lineColor: '#534E96',
    fillColor: '#DDDCEA',
    color: '#534E96',
    borderWidth: 1
  },
  generalization: {
    fillColor: '#5E3295',
    borderColor: 'rgb(56, 123, 233)',
    color: '#fff',
    borderWidth: 0
  }
})
