({
	serverCall : function(component, cand) {
		let action = component.get("c.retreiveResource");
        action.setParam("cId", cand);
        
        action.setCallback(this, res => {
            let state = res.getState();
            
            if(state == 'SUCCESS'){
            	let cand = res.getReturnValue();
            	component.set("v.Candidate",cand );   
            	
        	}
                           component.set("v.hideSpinner", true);
        });
        $A.enqueueAction(action);
	}
})