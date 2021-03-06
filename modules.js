var app = {};
(function(exports){

    var storageInterface = {
        save : function save(){throw new Error('.save() method not implemented.')},
    }

    var localStorageProvider = Object.setPrototypeOf({
        getItem : (item)=> JSON.parse(localStorage[item] || '[]') ,
        save : (item, data)=>{localStorage[item] = JSON.stringify(data)},
    },storageInterface);

    var cookieProvider = Object.setPrototypeOf({
        getItem : (item)=> JSON.parse(document.cookie.split('=')[1] || '[]'),
        save : (item, data)=>{setCookie(item, JSON.stringify(data), 2)}
    },storageInterface);

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires ;
    }

    supportsLocalStorage = (typeof localStorage !== 'undefined') && localStorage !== null,


    (function todoModule(exports){

        const storage = supportsLocalStorage? localStorageProvider : cookieProvider;
        var items = [];

        (function Init(){LoadItems();})();
        function LoadItems(){items = storage.getItem('todos');}
        function getItems(){return [].slice.call(items, 0)}
        function add(text){items.push({id: uuidv4(), text});}
        function save(){storage.save('todos' ,items)}
        function del(id){
            let index = items.findIndex((e, i)=> e.id === id)
            items.splice(index, 1);
        }
        var api = {
            getItems,
            add,
            del,
            save,
            refresh : LoadItems
        }
        exports['todo'] = api;
    })(
        (typeof exports === 'undefined')?
        window : exports
    );


})(app);