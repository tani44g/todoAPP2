module.exports = {
    Active : function(){
        document.getElementById('all').style.border = "none";
        document.getElementById('completed').style.border = "none";
        var el = document.getElementById('active');
        el.style.border = "1px solid blanchedalmond";
        el.style.borderRadius = "5px";
    },

    All : function(){
        document.getElementById('completed').style.border = "none";
        document.getElementById('active').style.border = "none";
        var el = document.getElementById('all');
        el.style.border = "1px solid blanchedalmond";
        el.style.borderRadius = "5px";
    },

    Complete : function(){
        document.getElementById('all').style.border = "none";
        document.getElementById('active').style.border = "none";
        var el = document.getElementById('completed');
        el.style.border = "1px solid blanchedalmond";
        el.style.borderRadius = "5px";

    }
}