({
	handleClick : function(component, event, helper) {
		let name = component.find("name").get("v.value");
		let phone = component.find("phone").get("v.value");
		let email = component.find("email").get("v.value");
		let lgn = component.find("lgn").get("v.value");
		let pass = component.find("pass").get("v.value");
		let usr = component.get("v.user");
        console.log(usr.Resource__c);
        
		if(pass !== usr.Password__c)
            usr.Password__c = pass;
        
		if(lgn !== usr.Login__c )
            usr.Login__c = lgn;
        
        helper.updateUser(component, usr, name, phone, email);

	}
})