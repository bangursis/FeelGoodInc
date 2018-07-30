public class SignIn {

	@AuraEnabled
	public static AppUser__c login(String lgn, String pass) {
			AppUser__c usr = [SELECT Id, Login__c, Role__c, Password__c, Resource__c, Resource__r.Name, Resource__r.Email__c, Resource__r.Phone__c FROM AppUser__c WHERE Login__c = :lgn AND Password__c = :pass];

	if (usr == null)
		throw new SignInException('Incorrect login and/or rassword');
    else
		return usr;
	}

	public class SignInException extends Exception{}
}