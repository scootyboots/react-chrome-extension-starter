import { SIDE_PANEL_NAME } from '../gloabal'

type Context = 'options' | 'popup' | 'devtools' | 'panel' | ''

export function findContext() {
  const href = window.location.href
  let context: Context = ''
  if (href.includes('options.html')) return 'options'
  if (href.includes('popup.html')) return 'popup'
  if (href.includes('devtools.html')) {
    chrome.devtools.panels.create(SIDE_PANEL_NAME, '', 'src/panel/panel.html')
    return 'devtools'
  }
  if (href.includes('panel.html')) return 'panel'
  return context
}
