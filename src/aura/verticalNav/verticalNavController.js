({
	onClick : function(component, event, helper) {
		let id = event.target.dataset.menuItemId;
        if(id){
            component.getSuper().navigate(id);
        }
	}
})