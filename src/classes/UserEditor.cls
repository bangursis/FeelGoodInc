public class UserEditor {
	@AuraEnabled
    public static void updateUser(AppUser__c userId, String name, String phone, String email){
        Resource__c resource = [SELECT Name, Phone__c, Email__c FROM Resource__c WHERE Id = :userId.Resource__c];

        resource.Name = name;
        resource.Phone__c = phone;
        resource.Email__c = email;
		
        List<SObject> objects = new List<SObject>{userId, resource};
        
        update objects;
    }
}