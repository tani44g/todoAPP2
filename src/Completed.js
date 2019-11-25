var Delete = require('./DeleteItem').handleDelete;
module.exports = {
    handleComplete : function(key,count,all,comp,active){
        var index = all.findIndex(function(comp){
            return comp.key === key
          })
          
          var complete = all[index];
          if(complete.completed === false){
            
            complete.completed = true
            var tag = document.getElementById(complete.id);
            tag.style.TransitionDuration = "1s"
            tag.style.textDecoration = 'line-through';
            tag.style.color = "grey"
            count--;
        
            var tasks = all;
            var NewActive = Delete(key,tasks);
            
            var newstate = {
              count: count ,
              active : NewActive,
              completed: [
                ...comp,
                complete
              ]
            }
            return newstate;
          }
          else{
            complete.completed = false
            var tag2 = document.getElementById(complete.id);
            tag2.style.textDecoration = 'none';
            tag2.style.color = "black"
            tag2.style.TransitionDuration = "1s"
            count++;
        
            var task = all;
            var NewComp = Delete(key,task);
            
            var setstate = {
              count: count ,
              completed : NewComp,
              active: [
                ...active,
                complete
              ]
            
            }
            return setstate;
          }
    }
}