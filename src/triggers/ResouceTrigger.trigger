trigger ResouceTrigger on Resource__c (before insert,before update, after update,  after insert) {

	if(Trigger.isBefore && (Trigger.isInsert || Trigger.isUpdate))
		ResourceTriggerHandler.hrRequired(Trigger.new);
	if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate)){
		ResourceTriggerHandler.updateRole(Trigger.newMap.keySet(), Trigger.new);
		ResourceTriggerHandler.deleteStorage(Trigger.new);
	}

		

}