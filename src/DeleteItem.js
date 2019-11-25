module.exports = {
    // return an array with elements that doesn't satisfy the conditon
    handleDelete : function(key,tasks){
        var filteredItems = tasks.filter(function(item){
            return item.key !== key
          })
      
        return filteredItems;
    }
}


