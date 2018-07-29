public class Employees {
	@AuraEnabled
    public static List<Resource__c> retreiveEmployees(){
        return [SELECT Id, Name, Position__c, Phone__c, Email__c, Status__c FROM Resource__c WHERE Status__c = 'Hired' ORDER BY CreatedDate DESC];
       
    }
    @AuraEnabled
    public static void deleteEmployee(String rId){
        delete [SELECT ID from Resource__c WHERE Id = :Id.valueOf(rId)];
    }
}