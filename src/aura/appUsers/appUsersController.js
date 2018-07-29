({
	doInit : function(component, event, helper) {
		component.set("v.columns",[
            {label:'Name', fieldName:'Resource', type:'text', class: 'cols'},
            {label:'Register date',  fieldName:'CreatedDate', type:'date', class: 'cols'},
            {label:'Login',  fieldName:'Login__c', type:'text', class: 'cols'},
            {label:'Role',  fieldName:'Role__c', type:'text', class: 'cols'}          
        ]);
        
        helper.getUsers(component);

	},
    
    applyFilter: function(component, event, helper){
        let role = component.find("select").get("v.value").toLowerCase();
        let roles = component.get("v.rolesMap");
        if(roles.has(role))
            component.set("v.data", roles.get(role));
        else{
            let arr = [];
            for(let k of roles.keys())
				for(let it of roles.get(k))
                    arr.push(it);
			component.set("v.data", arr);
        }
    },
})