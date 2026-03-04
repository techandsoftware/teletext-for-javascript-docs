import * as PAGES from './demoPages.js';
import { Level } from '@techandsoftware/teletext';

// this module maps the api-playground to the actual teletext APIs

let teletext;
export function setButtonTeletextInstance(teletextInstance) {
  teletext = teletextInstance;
}

// define each demo button and the corresponding API action.
// reveal, mix and boxed demonstate the events API, which doesn't require access to the teletext instance.
// the run() method for each button either dispatches the event or calls the teletext instance API
export const buttons = [
  {
    id: 'revealButton',
    label: 'Toggle reveal',
    key: '?',
    invokingMsg: 'dispatching Event("ttx.reveal") // we could also use toggleReveal().  No effect if the screen doesn\'t contain concealed characters',
    run() {
      window.dispatchEvent(new Event('ttx.reveal'))
    }
  },
  {
    id: 'mixButton',
    label: 'Toggle mix mode',
    key: 'm',
    invokingMsg: 'dispatching Event("ttx.mix") // we could also use toggleMixMode()',
    run() {
      window.dispatchEvent(new Event('ttx.mix'))
    }
  },
  {
    id: 'boxedButton',
    label: 'Toggle boxed mode',
    key: 'b',
    invokingMsg: 'dispatching Event("ttx.subtitlemode") // we could also use toggleBoxMode().  The screen is blank if it doesn\'t contain boxed characters',
    run() {
      window.dispatchEvent(new Event('ttx.subtitlemode'))
    }
  },
  {
    id: 'gridButton',
    label: 'Toggle grid',
    key: 'g',
    invokingMsg: 'calling toggleGrid()',
    run() {
      teletext.toggleGrid()
    }
  },
  {
    id: 'clearButton',
    label: 'Clear screen',
    key: 'w',
    invokingMsg: 'calling clearScreen()',
    run() {
      teletext.clearScreen()
    }
  },
  {
    id: 'loadPageButton',
    label: 'Load a page encoded in a string',
    key: 'l',
    invokingMsg: 'calling loadPageFromEncodedString(data) // data is a string packed from 7-bit bytes',
    run() {
      teletext.loadPageFromEncodedString(PAGES.WIKIFAX)
    }
  },
  {
    id: 'setPageRowsButton',
    label: 'Draw multiple rows',
    key: 'd',
    invokingMsg: 'calling setPageRows(arrayOfRowData)',
    run() {
      teletext.setPageRows(PAGES.PAGE_LEVEL_1)
    }
  },
  {
    id: 'loadTestPageButton',
    label: 'Load a built-in test page',
    key: 't',
    invokingMsg: 'calling showTestPage()',
    run() {
      teletext.showTestPage()
    }
  },
  {
    id: 'randomiseButton',
    label: 'Randomise page',
    key: 'x',
    invokingMsg: 'calling showRandomisedPage()',
    run() {
      teletext.showRandomisedPage()
    }
  }, {
    id: 'doubleWidthAndSize',
    label: 'Show a level 2.5 page containing double width and size characters',
    key: 'z',
    invokingMsg: 'calling setPageRows(arrayOfRowData) and setLevel(Level[2.5]) // data includes double width and size attributes',
    run() {
      teletext.setPageRows(PAGES.PAGE_WITH_DOUBLE_WIDTH_AND_HEIGHT);
      // screenLevel.value = '2.5' is set in the vue integration code, which will call setLevel(Level[2.5])
    }
  }, {
    id: 'outputLines',
    label: 'Load a test page from Output Lines',
    key: 'o',
    invokingMsg: 'calling setPageFromOutputLines(arrayofOutputLines)',
    run() {
      teletext.setPageFromOutputLines(PAGES.PAGE_OUTPUT_LINES);
    }
  }
];

// Create a map of button keyboard shortcut to the button index, for keyboard shortcut handling
export const keyToButtonIndex = Object.fromEntries(buttons.map((btn, indexToButton) => [btn.key, indexToButton]));

export function setTheTeletextLevel(newLevel) {
  teletext.setLevel(Level[newLevel]);
}

export function setTheTeletextFont(newFont) {
  teletext.setFont(newFont);
}

export function setTheTeletextView(newView) {
  teletext.setView(newView);
}

export async function loadTheSmoothMosaicPlugin() {
  const { SmoothMosaicPlugin } = await import('@techandsoftware/teletext-plugin-smooth-mosaic');
  teletext.registerViewPlugin(SmoothMosaicPlugin);
}
