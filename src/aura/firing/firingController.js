({
	handleClick : function(component, event, helper) {
		let action = component.get("c.fire");
        
        action.setParams({
            rId: component.get("v.Resource").Id,
            text: component.find("template").get("v.value"),
            email:component.get("v.Resource").Email__c
        })
        
        action.setCallback(this, res=>{
            if(res.getState() == 'SUCCESS'){
            	let evt = $A.get("e.c:redirectModal");
            	evt.setParam("cmp", "employees");
            	evt.fire();
        		component.find("overlayLib").notifyClose();
        	}
        })
        
        $A.enqueueAction(action);
	}
})