({
	updateIndex : function(component, event, helper) {
		let evt = event.getParam("index");
        let colloquies = component.get("v.colloquies");
        component.set("v.colloquy", colloquies ? colloquies[evt] : {});
        
        component.set("v.disabled", false);
	},
    handleClick: function(component, event, helper) {
		helper.upsertColl(component, event);
    }
})