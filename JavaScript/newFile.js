
function newFile(){
  var newFileName=document.getElementById('new-file').value;

var stream = require('fs').createWriteStream(`${newFileName}`);

stream.once('open', (fd) => {

  editor.on('change', edit => {
    passData = editor.getSession().getValue("\n");
    console.log(passData);
  });

    stream.write(passData);

    
    stream.end();
});

var newData=require('fs').createReadStream(`${newFileName}`,"utf-8");
let newFileData="";
newData.on('data',(data)=>{
 
  newFileData += data;
  console.log(newFileData);
  editor.setValue(newFileData);

})


}