# Event API

Your application can dispatch these events as an alternative to using the teletext screen API.

| Event | Use |
|-------|------|
|`ttx.reveal` | toggles reveal. If the page contains concealed characters, then this shows or hides them.  This is used for things like punchlines or quizzes.  This corresponds to a 'reveal' button on a TV remote control. This has no effect if the page doesn't have any concealed characters. The initial state is to conceal, and the reveal state is reset to concealed on API calls which update the page, set the character set (when `withUpdate` is true) or set the level. |
| `ttx.mix` | toggles mix display mode.  When mixed, the page background colours are hidden. In a real TV this would display the TV picture with text on top. For your app, it would display whatever you have positioned behind the screen or used as the html body background. |
| `ttx.subtitlemode` | toggles boxed display mode.  A page can contain 'boxed' characters. When in boxed mode, the boxed characters display on top of the TV picture, which is used for subtitles or a newsflash page.  Non-boxed characters are hidden. On a broadcast teletext service, the broadcaster decides whether the page is displayed in boxed mode or not. If the page doesn't contain any boxed characters, the page is blank, so that the screen shows the TV picture. For your app, the display shows whatever you have positioned behind the screen or used as the html body background. |

You can send an event like this in your application:

```javascript
window.dispatchEvent(new Event('ttx.reveal'));
```