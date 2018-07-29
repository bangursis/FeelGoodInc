({
	redirect : function(component, vname) {
		let evt = component.getEvent("fgiNext");
        evt.setParam(
            "cmpNext", vname
        );
        evt.fire();
	}
})