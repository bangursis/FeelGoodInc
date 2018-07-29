({
	doInit : function(component, event, helper) {
		let action = component.get("c.getHrs");
        
        action.setCallback(this, res=> {
            if(res.getState() == 'SUCCESS')
            	component.set("v.Hrs", res.getReturnValue());
        });
        
        $A.enqueueAction(action);
        //helper.checkDisabled(component);
	},
	handleClick: function(component, event, helper){
        console.log(component.isValid ())
        helper.updater(component);
    }, 
    handleSubmit :function(component, event, helper){
        if(component.get("v.isNew")){
            //helper.redirect(component, );
			component.find("overlayLib").notifyClose();
        }
    },
	change: function(component, event, helper){
        let rex = /\b\w+@\w+\.\w+\b/;
		helper.checkDisabled(component);
	}
})