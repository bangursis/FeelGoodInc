public class JoinUs {
	@AuraEnabled
    public static void addToStorage(String inName, String phone, String email, String position){
		insert new TemporaryStorage__c(
			Name = inName,
      Phone__c = phone, 
			Email__c = email,
			Position__c = position
		);
    }
}