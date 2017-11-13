(function(input, ul, btnsave){
  
    input = input || document.getElementById('inputodo');
    ul = ul || document.getElementById('listodo');
    btnsave = btnsave || document.getElementById('btnsave');
    
    render();

    input.onkeyup = (e)=> { if(e.keyCode === 13) {app.todo.add(e.target.value);e.target.value=''; render();} } ;
    
    btnsave.onclick = () => app.todo.save(); 

    
    function render(){
        var lis=[];
        app.todo.getItems().forEach((item)=> lis+=`<li>${item.text}</li>`);
        ul.innerHTML = lis;
    };

})(document.getElementById('itodo'));
