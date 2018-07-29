trigger deleteStorageOnResourceCreation  on Resource__c (after insert) {
  List<TemporaryStorage__c> oldRecords = new List<TemporaryStorage__c>();

  for(Resource__c resource : trigger.new)  {
	
	List<TemporaryStorage__c> ts = [SELECT Id FROM TemporaryStorage__c WHERE Email__c = :resource.Email__c ];
      
	if(ts != null)
		oldRecords.addAll(ts);
  	else 
        System.debug('false');
  }

  delete oldRecords;
}