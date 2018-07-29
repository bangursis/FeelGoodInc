({
	doInit : function(component, event, helper) {
		helper.fillList(component);
	},
    decide : function(component, event, helper){
        let index = event.getSource().get("v.value");
        if(event.getSource().get("v.name") === 'reject') 
            helper.reject(component, index);
		else
            helper.add(component, index);
        
    },
})