(function(input, ul, btnsave, btnreload){
  
    input = input || document.getElementById('inputodo');
    ul = ul || document.getElementById('listodo');
    btnsave = btnsave || document.getElementById('btnsave');
    btnreload = btnreload || document.getElementById('reload');
    
    render();

    input.onkeyup = (e)=> { if(e.keyCode === 13) {app.todo.add(e.target.value);e.target.value=''; render();} } ;
    
    btnsave.onclick = () => app.todo.save(); 
    btnreload.onclick = () => {
        app.todo.refresh();
        render();
    }; 

    ul.onclick = (e) => {
        app.todo.del(e.target.attributes.key.value);
        render();
    };
    
    function render(){
        var lis=[];
        app.todo.getItems().forEach((item)=> lis+=`<li key=${item.id}>${item.text}</li>`);
        ul.innerHTML = lis;
    };

})(document.getElementById('itodo'));
