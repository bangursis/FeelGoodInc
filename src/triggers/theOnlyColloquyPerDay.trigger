trigger theOnlyColloquyPerDay on Colloquy__c (before insert, before update) {
    for(Colloquy__c coll : Trigger.New){
        if([SELECT Count() FROM Colloquy__c WHERE Resource__c = :coll.Resource__c AND ColloquyDate__c = :coll.ColloquyDate__c] >= 1)
            coll.addError('The candidate already has an interview on ' + coll.ColloquyDate__c);
    }
}