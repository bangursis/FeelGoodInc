trigger updateRole on Resource__c (after update) {
    for(Resource__c res : Trigger.New){
        
        if (res.Status__c.toLowerCase() == 'hired' ){
            List<AppUser__c> user = [SELECT Role__c FROM AppUser__c WHERE Resource__c = :res.Id];
            
            if(user != null && user.size() > 0){
                system.debug(user[0].Role__c + ' ' + res.Position__c.toLowerCase());
                
                if(res.Position__c.toLowerCase() == 'hr' || res.Position__c.toLowerCase() == 'admin' ){
                    user[0].Role__c = res.Position__c.toLowerCase();
                }
                else
                    user[0].Role__c = 'standard';
                update user[0];
                
			}  
        }
    }
}