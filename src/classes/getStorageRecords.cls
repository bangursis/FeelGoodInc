public class getStorageRecords {
	@AuraEnabled
    public static List<SObject> fillList(){
        return [SELECT Name, Phone__c, Email__c, Position__c FROM TemporaryStorage__c ORDER BY CreatedDate DESC];
    }
    @AuraEnabled
    public static void reject(Id el){
        TemporaryStorage__c ts = [SELECT Id, Name, Email__c FROM TemporaryStorage__c WHERE ID = :el];
        delete ts;
    }
}