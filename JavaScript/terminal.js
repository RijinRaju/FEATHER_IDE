
   //compiler section..................
  

   function execute() {
  
    $('#container__bottom').append("<textarea id='outputArea' cols='148' rows='6' readonly></textarea>");
    var op = document.getElementById('outputArea'); 
    
    
  
    var k = document.getElementById("languages");
    let p = k.options[k.selectedIndex].text;

    let textst = editor.getValue("\n");
    const { c, cpp, python, java } = require("compile-run");

    //java compiler
    if (p == 'java') {
      
      let resultJava=java.runSource(textst)
      resultJava.then((result)=>{
        console.log(result);
        if(result.stdout){
          op.value=result.stdout;

    }
    else{
    op.value=result.stderr
    }

      })
    }

    //c and cpp compiler
    if (p == 'C' || p == 'CPP') {

      cpp.runSource(textst, { stdin: '3\n4' }, (err, result) => {
      
        if(result.stdout){
        op.value=result.stdout;
           }
           else{        
              op.value=result.stderr;
           }
         
      
      });
    }
    //python compiler
    if (p == 'python') {


      let resultPromise = python.runSource(textst);
      resultPromise
        .then(result => {
          
        if(result.stdout){
              op.value=result.stdout;
        }
        else{
        op.value=result.stderr
        }
        })
    
        
    }
  }

   
function opclose(){
  $("#container__bottom").empty();
}