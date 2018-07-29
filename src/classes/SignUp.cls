public class SignUp {
	@AuraEnabled
    public static AppUser__c Register(String email, String login, String password){
        Resource__c resource = [SELECT Id, Position__c, Status__c, (SELECT Id FROM AppUsers__r) FROM Resource__c WHERE Email__c = :email AND Status__c = 'Hired'];
				AppUser__c usr = new AppUser__c();
        
        System.debug(resource);

        if (resource != null && resource.AppUsers__r.size() < 1){
            usr.Login__c = login;
						usr.Password__c = password;
						usr.Resource__c = resource.Id;
					}	else	throw new SignUpException('User with provided email seems to exist or is not hired');

						insert usr;
						return [SELECT Id, Login__c, Role__c, Password__c, Resource__c,  Resource__r.Name, Resource__r.Email__c, Resource__r.Phone__c FROM AppUser__c WHERE Id = :usr.Id LIMIT 1];
					}

    public class SignUpException extends Exception{}
}