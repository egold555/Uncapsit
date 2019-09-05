const {
  app,
  BrowserWindow,
  Menu,
  MenuItemConstructorOptions
} = require('electron');
const fs = require("fs");

//https://ourcodeworld.com/articles/read/524/how-to-use-live-reload-in-your-electron-project
// Enable live reload for Electron too
require('electron-reload')(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`)
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
});

//This is a function that can be called from the renderer
exports.getThingsToInstall = () => {

  var data = fs.readFileSync('input.txt');
  console.log("Synchronous read: " + data.toString());

  return data.toString();

}


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var template = [{
    label: 'File',
    submenu: [{
        label: 'Open',
        accelerator: 'Ctrl+O'
      },
      {
        label: 'Save',
        accelerator: 'Ctrl+S'
      },
      {
        label: 'Save As...',
        accelerator: 'Ctrl+Shift+S'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [{
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        type: 'separator'
      },
      // {
      //   role: 'delete'
      // },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [{
        role: 'reload'
      },
      {
        role: 'forcereload'
      },
      {
        role: 'toggledevtools'
      },
      // {
      //   type: 'separator'
      // },
      // {
      //   role: 'resetzoom'
      // },
      // {
      //   role: 'zoomin'
      // },
      // {
      //   role: 'zoomout'
      // },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    label: 'Options',
    submenu: [{
      label: 'Theme',
      submenu: [{

          label: 'Light',
          type: 'checkbox',
          checked: true
        },
        {
          label: 'Dark',
          type: 'checkbox',
          checked: true

        }
      ]
    }]
  },
  {
    role: 'help',
    submenu: [{
      label: 'Learn More',
      click: function () {
        require('electron').shell.openExternal('https://electronjs.org');
      }
    }]
  }
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));