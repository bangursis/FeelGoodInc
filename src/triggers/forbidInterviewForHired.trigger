trigger forbidInterviewForHired on Colloquy__c (before insert) {
    for (Colloquy__c coll : Trigger.New){
		Resource__c ress = [SELECT Status__c FROM Resource__c WHERE Id = :coll.Resource__c LIMIT 1];
        if(ress.Status__c.toLowerCase() == 'hired' )
            coll.addError('You cannot interview employees');
    }
}