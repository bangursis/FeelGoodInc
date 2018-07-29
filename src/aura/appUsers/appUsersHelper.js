({
        getUsers : function(component) {
		let action = component.get("c.retreiveUsers");
        action.setStorable();
            
        action.setCallback(this, res => {
            let state = res.getState()
            
            if (state === 'SUCCESS'){
            	let roles = new Map();
				var rows = res.getReturnValue();
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (row.Resource__r) row.Resource = row.Resource__r.Name;
            
            		if(! roles.has(row.Role__c))
            			roles.set(row.Role__c, []);
            
            		roles.get(row.Role__c).push(row);
                }
                component.set('v.data', rows);
            	component.set('v.rolesMap', roles);
        	}
        });

        
        $A.enqueueAction(action);
	}
})