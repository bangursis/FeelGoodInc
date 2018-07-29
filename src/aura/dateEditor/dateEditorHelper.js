({
	upsertColl : function(component, event) {
		let el;
        el = event.getSource().get("v.value");
        if (!el)
            el = {};
        
        el.ColloquyDate__c = component.find("date").get("v.value") ;
        el.Form__c =  component.find("form").get("v.value");
        el.Resource__c = component.get("v.id");
        
        let action = component.get("c.UpsertColloquy");
        action.setParam("JsonColl", JSON.stringify(el));
        
        action.setCallback(this, res => {
            let state = res.getState();
            
            if(state = 'SUCCESS' && (!("Id" in el))){
            	let evt = $A.get("e.c:insertColloquy");
            	evt.setParam("coll", res.getReturnValue());
            	evt.fire();
	        }
        })
        
        $A.enqueueAction(action);
        
	}
})