//https://github.com/AlexTorresSk/custom-electron-titlebar

const customTitlebar = require('custom-electron-titlebar');

let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#03a9f4'),
    shadow: true,
    icon: './assets/img/caps-lock-button.svg'
});

MyTitleBar.updateTitle('Uncapsit');