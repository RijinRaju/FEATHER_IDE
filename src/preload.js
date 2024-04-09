const customTitlebar = require('custom-electron-titlebar')
const {ipcRenderer}=require('electron');
// const express=require('express');
// const app=express;

window.addEventListener('DOMContentLoaded', () => {
  new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#9932cc'),
    icon:'feather-16387.png',
  })
  
 
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

          
         





