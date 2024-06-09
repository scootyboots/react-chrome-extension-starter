import { SIDE_PANEL_NAME } from '../gloabal'

chrome.devtools.panels.create(SIDE_PANEL_NAME, '', 'src/panel/index.html')
