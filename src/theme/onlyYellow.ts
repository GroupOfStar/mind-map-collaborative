import { Theme } from './Theme'

/** 护眼 */
export const onlyYellow = Theme.mergeTheme({
  lineColor: '#837A5C',
  lineStyle: 'direct',
  generalizationLineWidth: 3,
  generalizationLineColor: '#837A5C',
  backgroundColor: '#FBF5E0',
  root: {
    lineColor: '#837A5C',
    fillColor: '#FBF5E0',
    color: '#837A5C',
    borderColor: '#837A5C',
    borderWidth: 2
  },
  second: {
    lineColor: '#837A5C',
    lineWidth: 2,
    fillColor: '#EAE4CC',
    color: '#837A5C',
    borderColor: '#837A5C',
    borderWidth: 2
  },
  node: {
    lineColor: '#837A5C',
    lineWidth: 2,
    fillColor: '#FBF5E0',
    color: '#837A5C',
    borderColor: '#837A5C'
  },
  generalization: {
    fillColor: '#837A5C',
    color: '#FBF5E0'
  }
})
