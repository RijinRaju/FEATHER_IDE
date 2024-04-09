
let   dat, foldersFiles, selectedFile, tabFileName, splitUrl, fullFilePathIndex, listFileName, splitListName, pathFromData, resultFullPath;
let passData, tabName, folderData;


//file content from main prcess
require('electron').ipcRenderer.send("msg", "html message1");
require('electron').ipcRenderer.on("reply", (event, data) => {
  fullFilePathIndex = data[1];
  tabFileName = data[1].split('\\');
  splitUrl = tabFileName[tabFileName.length - 1];


  dat = data[0];

 
  //adding the name of file in tab when open file operation is worked

  var defaultTab = document.getElementById("defaultTab");
  defaultTab.appendChild(document.createTextNode(`${splitUrl}`));


});


//folder content from main process 
require('electron').ipcRenderer.send("msg2", "html message2");
require('electron').ipcRenderer.on("reply2", (event, data) => {

  pathFromData = data;
  data.forEach(data => {
    //splitting the folder path for getting the fileName 
    listFileName = data.split("\\");
    splitListName = listFileName[listFileName.length - 1];

    var ul = document.getElementById('fileSelect');
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(`${splitListName}`))
    ul.appendChild(li)


  })
})
//files content in folder
$(document).ready(function () {
  $("ul[id*=fileSelect] li").click(function () {
    selectedFile = $(this).text();

    var defaultTab = document.getElementById("defaultTab");
    $('#defaultTab').empty();
    defaultTab.appendChild(document.createTextNode(`${selectedFile}`));

    pathFromData.forEach(pathData => {
      if (pathData.includes(selectedFile)) {

        resultFullPath = pathData;
      }
      var folderpath = `${resultFullPath}`;
      var mode = modelist.getModeForPath(folderpath).mode;
      editor.session.setMode(mode);
    });

    require('electron').ipcRenderer.send("msg3", resultFullPath);
    require('electron').ipcRenderer.on("reply3", (event, data) => {


      folderData = data;

      editor.session.setValue(folderData);
      editor.clearSelection();

    })

  });
});
require('electron').ipcRenderer.send("msg12","addnewfile");
require('electron').ipcRenderer.on("addfilereply", (event, data) => {

  fullFilePathIndex = data[1];
  tabFileName = data[1].split('\\');
  splitUrl = tabFileName[tabFileName.length - 1];

editor.session.setValue(data[0]);
editor.clearSelection();
});

function terminalClick() {
  require('electron').ipcRenderer.send("msg10", " calling terminal");
}

function musicClick() {
  require('electron').ipcRenderer.send("msg11", "opening music");
}

function addNewFile(){
  require('electron').ipcRenderer.send("msg13","open Newfiledialog");
}