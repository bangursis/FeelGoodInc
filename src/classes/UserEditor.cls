public class UserEditor {
	@AuraEnabled
    public static void updateUser(AppUser__c userId, String name, String phone, String email){
       	//AppUser__c appUser = [SELECT Login__c, Password__c, Resource__c FROM AppUser__c WHERE Id = :userId];
        Resource__c resource = [SELECT Name, Phone__c, Email__c FROM Resource__c WHERE Id = :userId.Resource__c];
                    
        //appUser.Login__c = login;
        //appUser.Password__c = password;
        resource.Name = name;
        resource.Phone__c = phone;
        resource.Email__c = email;
		
        List<SObject> objects = new List<SObject>{userId, resource};
        
        update objects;
    }
}