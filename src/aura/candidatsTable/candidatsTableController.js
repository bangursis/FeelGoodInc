({
	doInit : function(component, event, helper) { 
        let actions = [{label: 'Show details', name: 'showDetails'},{label: 'Preview resume', name: 'file'} ,{label: 'Reject', name: 'reject'}];
		component.set("v.columns",[
            {label:'', fieldName:'edit',type:'action', typeAttributes: { rowActions: actions }},
            {label:'Name',fieldName:'Name', type:'text' },
            {label:'Position',  fieldName:'Position__c', type:'text'},
            {label:'HR',  fieldName:'HR', type:'text'},
            {label:'Sallary',  fieldName:'Salary__c', type:'currency', typeAttributes: { currencyCode: 'USD', maximumSignificantDigits: 5}},
            {label:'Experience', fieldName:'Experience__c', type:'number'},
            {label:'Phone',  fieldName:'Phone__c', type:'phone'},
            {label:'Email', fieldName:'Email__c', type:'email'},
            {label:'Status', fieldName:'Status__c', type:'text'}           
        ]);
		helper.fillTable(component);

	},
    handleRow : function(component, event, helper) {
        let row = event.getParam('row');
        let evt = component.getEvent("fgiNext");
        
        if(event.getParam('action').name === 'showDetails'){
            helper.viewInfo(row.Id);   
            evt.setParam(
                "cmpNext", "candidate"
            );
            evt.fire();
            
        } else if(event.getParam('action').name === 'file'){
            if(row.ContentDocumentLinks != null && row.ContentDocumentLinks.length > 0)
                $A.get('e.lightning:openFiles').fire({
                    recordIds: [row.ContentDocumentLinks[0].ContentDocumentId]
                });
            else{
				let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    type: 'warning',
                    title: "No resume",
                    message: row.Name + " has no resume"
                });
                toastEvent.fire();
            }
        }
        
		else
            helper.reject(component, row);
    }, 
    newCandidate : function(component, event, helper) {
        helper.showModal(component);
    }, 
    offset : function(component, event, helper) {
        let val = parseInt(event.getSource().get("v.value"));
        let data = component.get("v.data").slice(val*component.get("v.items"), (val+1) * component.get("v.items"));
        component.set("v.particledData", data);
        component.set("v.offset", val);
    }

})