trigger hrRequired on Resource__c (before insert,before update) {
    System.debug('TRIGGER:');
    for(Resource__c res : Trigger.new){
		List<Resource__c> hrs = [SELECT Status__c, Position__c FROM Resource__c WHERE Id = :res.HR__c LIMIT 1];
        
        if (res.Status__c.toLowerCase() != 'hired'  && (res.HR__c == null || hrs.size() < 1|| hrs[0].Status__c.toLowerCase() != 'hired' || hrs[0].Position__c.toLowerCase() != 'hr'))
            res.addError('For a candidate the HR field is required!');
    }
}