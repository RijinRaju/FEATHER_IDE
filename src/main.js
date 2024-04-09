const { app, BrowserWindow, Menu, ipcMain, dialog,systemPreferences } = require('electron');
const path = require('path');
const fs = require('fs');
const{readdir}=require('readdir-enhanced')
const dirTree = require("directory-tree");
const tree=require("tree-node-cli");
const pty = require("node-pty");
const os = require("os");
const { title } = require('process');
   
   

var shell = os.platform() === "win32" ? "powershell.exe" : "bash";



let folderContent, fileName,fullFilePath,saveAs;
let mainWindow ,aboutWindow,docWindow,musicWindow;
let v1, folderPath,pathName,name,editorContent,directoryPath;


function  terminalWindow() {
   addwindow=new BrowserWindow({
      width:900,
      height:200,
      x:270,
      y:525,
      resizable:true,
      parent:mainWindow,
       backgroundColor:'#000000',
      webPreferences:{
         nodeIntegration:true,
         contextIsolation:false
      },


      

   });
   
   addwindow.loadFile('src/terminal.html');
addwindow.removeMenu();
   addwindow.on('closed', () => {
      addwindow= null
    });
  

   
   var ptyProcess = pty.spawn(shell, [], {
      name: "xterm-color",
      cwd: process.env.HOME,
      env: process.env
   });
   
   ptyProcess.on('data', function(data) {
      addwindow.webContents.send("terminal indata", data);
      console.log("data"); 
   });

   ipcMain.on("terminal outdata", function(event, data) {
      ptyProcess.write(data);
   
   });
   

}





function createWindow() {
   mainWindow = new BrowserWindow({
      width: 1500,
      height: 1000,
      frame: false,
      webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
         enableRemoteModule: true,
         nodeIntegration: true,
         contextIsolation: false,
         slashes: true,
         webviewTag:true,
      },
     

   })

   mainWindow.loadFile('src/index.html');
  // mainWindow.webContents.openDevTools()
   mainWindow.on('closed', () => {
      mainWindow = null
   })
}
const template = [
   {
      label: 'File',
      submenu: [
         {
            label:'New File',
            click:()=>{
               addNewFile()
            }
         },
       {
            label: 'Open File',
            accelerator: 'Ctrl+O',
            click: () => {
               var file = dialog.showOpenDialogSync(mainWindow, {
                  properties: ['openFile']
               })
               // url splitting to show file name in tab
                   fullFilePath=`${file}`
                  

               fs.readFile(`${file}`, (err, buff) => {
                  if (err) {
                     console.error(err);
                     return;
                  }
                  var data = buff.toString();
                  v1 = data;
                   pathName=file;

                  if (v1) {
                     mainWindow.reload();
                  }
               });
         
         }

      }, {
            label: 'Open Folder',
            accelerator: 'Ctrl+Shift+F',
            click: () => {
               openFolder();
         }
      },{
         label: 'Save',
         accelerator:"Ctrl+S",
         click:()=>{
            if(fullFilePath!=null){
            fs.writeFile(fullFilePath, saveAs, (err) => {
               if (err)
                 console.log(err);
               else {
                 console.log("File written successfully\n");
               }
             });
            }
            else if(directoryPath!=null )
            {
               fs.writeFile(directoryPath, saveAs, (err) => {
                  if (err)
                    console.log(err);
                  else {
                    console.log("File written successfully\n");
                  //   fs.readFile(`${directoryPath}`, (err, buff) => {
                  //    if (err) {
                  //       console.error(err);
                  //       return;
                  //    }
                  //    var data = buff.toString();
                  //    v1 = data;
   
                    
                  // });
                  }
                });
            }
            else{
               var save1 = dialog.showSaveDialog(mainWindow, {
                  properties: [],
                  title:'save',
                  defaultPath: path.join(__dirname, '../assets/untitled.txt')
               }).then(file => {
                  // Stating whether dialog operation was cancelled or not.
                  console.log(file.canceled);
                  if (!file.canceled) {
                     console.log(file.filePath.toString());
                  
                     // Creating and Writing to the sample.txt file
                     fs.writeFile(file.filePath.toString(),
                        `${saveAs}`, function (err) {
                           if (err) throw err;
                           console.log('Saved!');
                        });
                  }
               }).catch(err => {
                  console.log(err)
               });
            }
         }

      }, {
         type: 'separator'
      },
       {
            label: 'Save As',
            accelerator: 'Ctrl+Shift+S',
            click: () => {
               var save = dialog.showSaveDialog(mainWindow, {
                  properties: [],
                  defaultPath: path.join(__dirname, '../assets/untitled.txt')
               }).then(file => {
                  // Stating whether dialog operation was cancelled or not.
                  console.log(file.canceled);
                  if (!file.canceled) {
                     console.log(file.filePath.toString());
                  
                     // Creating and Writing to the sample.txt file
                     fs.writeFile(file.filePath.toString(),
                        `${saveAs}`, function (err) {
                           if (err) throw err;
                           console.log('Saved!');
                        });
                  }
               }).catch(err => {
                  console.log(err)
               });
            }

         },
       {
            label: 'Exit'
         }
      ]
   },
   {
      label: 'Edit',
      submenu: [
         {
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
         }
      ]
   },

   {
      label: 'View',
      submenu: [
         {
            role: 'reload'
         },
         {
            role: 'toggledevtools'
         },
         {
            type: 'separator'
         },
         {
            role: 'resetzoom'
         },
         {
            role: 'zoomin'
         },
         {
            role: 'zoomout'
         },
         {
            type: 'separator'
         },
         {
            role: 'togglefullscreen'
         }
      ]
   },
{
      label: 'Tools',
      submenu: [
         {
            label: 'Browser',
            accelerator:'Ctrl+Shift+B',
            click:()=>{
               featherBrowserWindow = new BrowserWindow({
                  width: 400,
                  height: 600,
                  x:965,
                  y:60,
                  parent:mainWindow,
                  autoHideMenuBar:true,
                  webPreferences: {
                     webviewTag:true
                  },
               });
               featherBrowserWindow.loadURL('https://duckduckgo.com/search_box');
            }
         },
         {
            label:'Terminal',
            accelerator:'Ctrl+T',
            click:()=>{
               terminalWindow();
            }
         },
         {
            label:'Music',
            accelerator:'Ctrl+Shift+M',
            click:()=>{
               openMusic()
            }
         }
      ]
   },
   {
      label:'Help',
      submenu:[
         {
            label:'Document',
            click:()=>{
               docWindow = new BrowserWindow({
                  width:1000,
                  height:1000,
                  frame:false,
                  titleBarStyle:'hidden',
                  titleBarOverlay:true,
               })
               docWindow.loadFile('src/docs.html');
            }
         },
         {
            label:'About',
            click :()=>{
               aboutWindow = new BrowserWindow({
                  width: 500,
                  height: 400,
                  frame:false,
                  titleBarStyle: 'hidden',
                 titleBarOverlay: true,
               })
               aboutWindow.loadFile('src/about.html');
            }
         }
      ]
   }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu);



// folder open dialogue 
function openFolder(){
   var folder = dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
     
   }).then((obj) => {
      folderPath = obj.filePaths
      if(folderPath != null){
         console.log('file path ia available');
      }  
      
     
      function ignoreNodeModules (stats) {
         return stats.path.indexOf("node_modules") === -1;
       }
      readdir(`${folderPath}`,{sep:"\\",deep: ignoreNodeModules}, (err, files) => {
         console.log(files);
         folderContent=files;
         if(folderContent){
             mainWindow.reload();
         }
       });



})

}
function openMusic(){

   musicWindow=new BrowserWindow({
      width:200,
      height:200,
      x:30,
      y:300,
      parent:mainWindow,
      autoHideMenuBar:true,
      webPreferences: {
         webviewTag:true
      }
   });
   musicWindow.loadFile('src/music.html');

}

function addNewFile(){
   dialog.showSaveDialog({
      title: 'Create New File',
      defaultPath: path.join(__dirname, '../assets/'),
      buttonLabel: 'Create',
      properties: []
  }).then(file => {
      // Stating whether dialog operation was cancelled or not.
      console.log(file.canceled);
      if (!file.canceled) {
          
          fullFilePath=file.filePath.toString();
          console.log(fullFilePath); 
          // Creating and Writing to the sample.txt file
          fs.writeFile(file.filePath.toString(), 
                       '', function (err) {
              if (err) throw err;
              console.log(file.filePath.toString());
            
          });
          fs.readFile(file.filePath.toString(), (err, buff) => {
            if (err) {
               console.error(err);
               return;
            }
            var data = buff.toString();
             v1 = data;
             console.log(v1)
             var pathName2=file;
                console.log("this is last path",pathName2)
            if (pathName2) {
               mainWindow.reload();
            }
         });
      }
  }).catch(err => {
      console.log(err)
  });
}

/***************************************************************************************** */
//Data passing between main and renderer files 
//file content
ipcMain.on("msg", (event, data) => {
   // console.log(data);
   event.reply("reply", [v1,fullFilePath]);
   
});
//folder content
ipcMain.on("msg2", (event, data) => {
   event.reply("reply2", folderContent);
})
// folder file open
ipcMain.on("msg3", (event, data) => {
   
   fileName = data
    directoryPath = path.join(`${folderPath}`, '\\', `${fileName}`);
   fs.readFile(`${directoryPath}`, (err, buff) => {
      if(buff!=undefined)
      {
         var data = buff.toString();
      }
   else{
      // fs.readdir(`${directoryPath}`,"utf8",(err, files) => {
              
      //             //  returnFileNames=files;  
      //              event.reply("reply3",files);
      //              console.log(typeof files)
                   
      //           });
      
      // const treee =  read.nested(`${directoryPath}`)
      //  console.log(treee);
      // const tree = dirTree(`${directoryPath}`);
       //event.reply("reply3",string);
      // console.log(tree);
     
       }
   console.log(typeof data);
   event.reply("reply3", data);
   
   })
   
    
       
})
// editor content for saveAs

ipcMain.on("save as",(event,data)=>{
   saveAs=data;
   //  console.log(saveAs);
})
// calling terminal from rendered process
ipcMain.on("msg10",(event,data)=>{
   
    terminalWindow();
})
// for opening the music windows
ipcMain.on("msg11",(event,data)=>{
openMusic();
})

ipcMain.on("msg12",(event,data)=>{
   event.reply("addfilereply",[v1,fullFilePath]);
})
ipcMain.on("msg13",(event,data)=>{
   addNewFile();
})

/*************************************************************************************** */
app.on('ready', () => { createWindow() });


