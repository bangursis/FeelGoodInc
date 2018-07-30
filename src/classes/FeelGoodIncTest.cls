@isTest
private class FeelGoodIncTest
{

	@testSetup static void setup() {
		List<SObject> sobjects = new List<SObject>();
		Resource__c hr = new Resource__c(Status__c = 'Hired', Position__c = 'HR', Name = 'HR', Email__c='hr@fgi.c');
		insert hr;

		sobjects.add(new Resource__c(Status__c = 'Hired', Position__c = 'Admin', Name = 'Admin', Email__c='admin@fgi.c'));
		sobjects.add(new Resource__c(Status__c = 'Hired', Position__c = 'Standard', Name='Standard', Email__c='standard@fgi.c'));

		for (Integer i = 0; i < 10; i++) {
		   sobjects.add(new Resource__c(Position__c = 'Standard', HR__c = hr.Id, Email__c='candidate'+ i +'@fgi.c'));
		}

		insert sobjects;

	}

	@isTest
	static void CandidateInfo_getHrs()
	{
		List<Resource__c> hrs = CandidateInfo.getHrs();

		System.assertEquals(hrs.size(), 1);
		System.assertEquals(hrs[0].Name , 'HR');
	}

	@isTest
	static void CandidateInfo_updateCand()
	{
		Resource__c res = [SELECT Id, Name, Position__c, HR__r.Name, Salary__c, Experience__c, Phone__c, Email__c, Status__c FROM Resource__c WHERE Status__c <> 'Hired' ORDER BY CreatedDate DESC LIMIT 1];
		String resId = res.Id;

		res = CandidateInfo.updateCand(
			'Test candidate', 'candidate', res.HR__c, '12345678', 'testUpdate@fgi.c', 'Test task',
			100, 1, res.Id
		);

		System.assertNotEquals(res, null, 'Res is empty');
		System.assertEquals(res.Id, resId, 'Id is different');
		System.assertEquals(res.Name, 'Test candidate', 'Name is different');
		System.assertEquals(res.Status__c, 'Test task', 'Status is different');
		System.assertEquals(res.Email__c, 'testUpdate@fgi.c', 'Email is different');
	}




}