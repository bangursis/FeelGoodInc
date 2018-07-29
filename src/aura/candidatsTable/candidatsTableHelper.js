({
	fillTable : function(component) {
		let action = component.get("c.retreiveCandidats");
        
        action.setCallback(this, res => {
            let state = res.getState();
            
            if (state === 'SUCCESS'){
				var rows = res.getReturnValue();
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (row.HR__r) row.HR = row.HR__r.Name;
                }
                component.set('v.data', rows);
        		component.set('v.particledData', rows.slice(0, component.get("v.items")));
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
	
	reject: function(component, row){
        let action = component.get("c.deleteCand");
        action.setParam("rId", row.Id);
        action.setCallback(this, res => {
            let state = res.getState();
            
            if(state = 'SUCCESS'){
				this.remove(component, "v.data", row);
            
				let off = component.get("v.offset");
            	let data = component.get("v.data");
            
            	component.set('v.particledData', data.slice(off*15, (off+1) * 15))
				
        	}

        });
        
        $A.enqueueAction(action);
    },
	remove: function(component, el, row){
		let data = component.get(el);
            
		let index = data.indexOf(row);
            
		data.splice(index, 1);      
		component.set(el, data);	 
    },
        
	showModal: function(component){
		let body;
        
        $A.createComponent("c:candidateInfo", {
            					
        					}, 
                           function(content, status){
                               if(status = 'SUCCESS'){
                                   body = content;
                                   body.set("v.Candidate", {});
                                   body.set("v.isNew", true);
                                   component.find('overlayLib').showCustomModal({
                                       header: "Create a candidate",
                                       body: body,
                                       cssClass: "btn",
                                       showCloseButton: true
				})
			}
		});
    },
})