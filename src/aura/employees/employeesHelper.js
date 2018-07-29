({
	fillTable : function(component) {
		let action = component.get("c.retreiveEmployees");
        
        action.setCallback(this, res => {
            let state = res.getState();
            
            if (state === 'SUCCESS'){
				var rows = res.getReturnValue();
                component.set('v.filtered', rows);
            	component.set('v.data', rows);
        		component.set("v.hideSpinner", true);
			}        	
        });

  
        $A.enqueueAction(action);
	},
	viewInfo : function(cId){
		let evt = $A.get("e.c:viewCandidate");
		evt.setParam("candidateId", cId);
	    evt.fire();  
    },
	fire : function(row, component){
        let body;
            
            $A.createComponent("c:firing", {}, 
                               function(content, status){
                                   if(status = 'SUCCESS'){
                                       body = content;
                                       body.set("v.Resource", row);
                                       component.find('overlayLib').showCustomModal({
                                           header: "Do you wanna to fire " + row.Name + "?",
                                           body: body,
                                           cssClass: "btn",
                                           showCloseButton: true
                    })
                }
            });
            
    }
})