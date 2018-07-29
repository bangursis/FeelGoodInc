({
    handleClick: function(component, event, helper){
		let evt = component.getEvent("fgiNext");
        evt.setParams({
            "cmpNext": event.getSource().get("v.name")
        });
        evt.fire();
    }
})