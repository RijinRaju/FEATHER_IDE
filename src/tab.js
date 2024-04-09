var defaultTab = document.getElementById("defaultTab");


if (fullFilePathIndex == null && splitListName == null) {
  defaultTab.appendChild(document.createTextNode(`UNTITLED`));
}
// else{
//       // defaultTab.appendChild(document.createTextNode(`${splitUrl}`));
// }





var langTools = ace.require("ace/ext/language_tools");
var modelist = ace.require("ace/ext/modelist");

var editor = ace.edit('editor');
editor.setTheme("ace/theme/dracula");

editor.setShowPrintMargin(false);

(function () {
  
  var filePath = `${fullFilePathIndex}`;
  var mode = modelist.getModeForPath(filePath).mode;
  editor.session.setMode(mode);
 
}());
editor.setHighlightActiveLine(false);
editor.focus();
editor.on('change', edit => {
  passData = editor.getSession().getValue("\n");
  console.log(passData)
  require('electron').ipcRenderer.send("save as", passData);
});

editor.setOptions({
  enableBasicAutocompletion:true,
  enableSnippets:true,
  enableLiveAutocompletion:true
});
editor.session.setValue(dat);
editor.clearSelection();



