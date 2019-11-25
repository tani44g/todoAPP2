var $ = require('jquery')

//localStorage to store the data so it won't get lost on reload
module.exports = {
    setAll: function(all){
        
        if($.isArray(all)){
            localStorage.setItem('alltodos',JSON.stringify(all))
            return all;
        }
    },

    setActive: function(active){
        if($.isArray(active)){
            localStorage.setItem('activetodos',JSON.stringify(active))
            return active;
        }
    },

    setCompleted: function(comptodos){
        if($.isArray(comptodos)){
            localStorage.setItem('comptodos',JSON.stringify(comptodos))
            return comptodos;
        }
    },

    setCount : function(count){
        localStorage.setItem('count',count)
    },

    getAll: function(){
        var stringTodos = localStorage.getItem('alltodos');
        var alltodos = [];
        try {
            alltodos = JSON.parse(stringTodos);
        }catch(e){

        }
        return $.isArray(alltodos)? alltodos : []
    },

    getActive: function(){
        var stringTodos = localStorage.getItem('activetodos');
        var activetodos = [];
        try {
            activetodos = JSON.parse(stringTodos);
        }catch(e){

        }
        return $.isArray(activetodos)? activetodos : []
    },

    getCount : function(){
        var count = localStorage.getItem('count');
        return parseInt(count);
    },

    getComp: function(){
        var stringTodos = localStorage.getItem('comptodos');
        var comptodos = [];
        try {
            comptodos = JSON.parse(stringTodos);
        }catch(e){

        }
        return $.isArray(comptodos)? comptodos : []
    }
}