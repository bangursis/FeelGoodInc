({
	doInit : function(component, event, helper) {
        let isStandard = component.get("v.isStandard") ;
        
        let actions = isStandard? [{label: 'Show details', name: 'showDetails'}]: [{label: 'Show details', name: 'showDetails'}, {label: 'Fire', name: 'fire'}];
		component.set("v.columns",[
            {label:'', fieldName:'edit',type:'action', typeAttributes: { rowActions: actions }},
            {label:'Name',fieldName:'Name', type:'text' },
            {label:'Position',  fieldName:'Position__c', type:'text'},
            {label:'Phone',  fieldName:'Phone__c', type:'phone'},
            {label:'Email', fieldName:'Email__c', type:'email'}     
        ]);
		helper.fillTable(component);

	},
    
    search : function(component, event, helper) {
        let query = component.find("search").get("v.value").toLowerCase();
        let result = [];
        
        
        if (query.toString().length < 1 || query == null)
            result = component.get("v.data");                
        else            
            component.get("v.data").map( el => { if(el.Name.toLowerCase().includes(query) || el.Position__c.toLowerCase().includes(query)) result.push(el);});
        
        component.set("v.filtered", result);
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
        }  else
            helper.fire(row, component);
    }, 
})