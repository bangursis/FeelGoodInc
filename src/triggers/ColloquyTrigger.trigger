trigger ColloquyTrigger on Colloquy__c (before insert, before update) {
    for(Colloquy__c coll : Trigger.New){
        Resource__c ress = [SELECT Status__c FROM Resource__c WHERE Id = :coll.Resource__c LIMIT 1];

        if([SELECT Count() FROM Colloquy__c WHERE Resource__c = :coll.Resource__c AND ColloquyDate__c = :coll.ColloquyDate__c] >= 1)
            coll.addError('The candidate already has an interview on the' + coll.ColloquyDate__c);

        if(ress.Status__c.toLowerCase() == 'hired' )
            coll.addError('You cannot interview employees');
    }
}