public  class ResourceTriggerHandler {

	public static void hrRequired(List<Resource__c> resources){
		for(Resource__c res : resources){
			List<Resource__c> hrs = [SELECT Status__c, Position__c FROM Resource__c WHERE Id = :res.HR__c LIMIT 1];
			
			if (res.Status__c.toLowerCase() != 'hired'  && (res.HR__c == null || hrs.size() < 1|| hrs[0].Status__c.toLowerCase() != 'hired' || hrs[0].Position__c.toLowerCase() != 'hr'))
				res.addError('For a candidate the HR field is required!');
		}
	}

	public static void updateRole(Set<Id> ids, List<Resource__c> resources){
		List<AppUser__c> user = [SELECT Role__c FROM AppUser__c WHERE Resource__c = :ids];
		
		for(Resource__c res : resources){
			
			if (res.Status__c.toLowerCase() == 'hired' ){
				
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

	public static void deleteStorage(List<Resource__c> resources){
		List<TemporaryStorage__c> oldRecords = new List<TemporaryStorage__c>();

		for(Resource__c res : resources)  {
			
			List<TemporaryStorage__c> ts = [SELECT Id FROM TemporaryStorage__c WHERE Email__c = :res.Email__c ];
				
			if(ts != null)
			oldRecords.addAll(ts);
			

			if(res.Status__c.toLowerCase() != 'hired')
			FgiMessaging.Approved(res.Name, res.Email__c);
		}

		delete oldRecords;
		}
}