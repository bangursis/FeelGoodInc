@isTest
private class FeelGoodIncTest
{	
	@testSetup static void setup() {
		List<Resource__c> resources = new List<Resource__c>();
		List<TemporaryStorage__c> storages = new List<TemporaryStorage__c>();
		Resource__c hr = new Resource__c(Status__c = 'Hired', Position__c = 'HR', Name = 'HR', Email__c='hr@fgi.c');
		insert hr;

		resources.add(new Resource__c(Status__c = 'Hired', Position__c = 'Admin', Name = 'Admin', Email__c='admin@fgi.c'));
		resources.add(new Resource__c(Status__c = 'Hired', Position__c = 'Standard', Name='Standard', Email__c='standard1@fgi.c'));
		resources.add(new Resource__c(Status__c = 'Hired', Position__c = 'Standard', Name='Standard', Email__c='standard2@fgi.c'));

		for (Integer i = 0; i < 10; i++) {
		   resources.add(new Resource__c(Position__c = 'Standard', HR__c = hr.Id, Email__c='candidate'+ i +'@fgi.c'));
		   storages.add(new TemporaryStorage__c(Position__c = 'Standard', Email__c='storage'+ i +'@fgi.c'));
		}

		insert resources;
		insert storages;
	}

	@isTest
	static void testErrorOnCreation(){
		try {
		   insert new Resource__c(Position__c='Failed insert', Email__c='failedinsert@fgi.c');
		} catch (Exception error) {
		   System.assert(error.getMessage().contains('For a candidate the HR field is required!'));
		}
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

	@isTest
	static void Employees_retreiveEmployees_AND_deleteEmployee()
	{
		List<Resource__c> resources = Employees.retreiveEmployees();

		System.assertNotEquals(resources, null);
		System.assertEquals(resources.size(), 4, 'Predicted: 4, but was: ' + resources.size());

		Employees.deleteEmployee([SELECT Id FROM Resource__c WHERE Email__c='standard2@fgi.c'].Id);
		resources = Employees.retreiveEmployees();
		System.assertEquals(resources.size(), 3, 'Predicted: 4, but was: ' + resources.size());

	}

	@isTest
	static void Candidats_retreiveCandidats_AND_deleteCand()
	{
		List<Resource__c> resources = Candidats.retreiveCandidats();

		System.assertNotEquals(resources, null);
		System.assertEquals(resources.size(), 10, 'Predicted: 10, but was: ' + resources.size());

		Candidats.deleteCand(resources[0].Id);
		resources = Candidats.retreiveCandidats();
		System.assertEquals(resources.size(), 9, 'Predicted: 9, but was: ' + resources.size());

	}

	@isTest
	static void getStorageRecords_fillList_AND_reject(){
		List<SObject> storages= getStorageRecords.fillList();

		System.assertNotEquals(storages, null);
		System.assertEquals(storages.size(), 10, 'Predicted: 10, but was: ' + storages.size());

		getStorageRecords.reject(storages[0].Id);
		storages= getStorageRecords.fillList();

		System.assertNotEquals(storages, null);
		System.assertEquals(storages.size(), 9, 'Predicted: 9, but was: ' + storages.size());	

	}

	@isTest
	static void JoinUs_addToStorage(){
		try {
			Test.startTest();
				JoinUs.addToStorage(
					'Test Join Us', '123456789', 'TestJoinUs@fgi.c','Test Join Us'
				);
			Test.stopTest();

			List<TemporaryStorage__c> storages= [SELECT Name, Phone__c, Email__c, Position__c FROM TemporaryStorage__c ORDER BY CreatedDate DESC];

			System.assertNotEquals(storages, null);
			System.assertEquals(storages.size(), 11, 'Predicted: 11, but was: ' + storages.size());
			System.assertEquals(storages[0].Name, 'Test Join Us', 'Predicted name was incorrect, was: ' + storages[0].Name);

			JoinUs.addToStorage(
				'Test failed insert', '123456789', 'TestJoinUs@fgi.c','Test Join Us'
			);
		} catch (Exception error) {
		   System.assert(error.getMessage().contains('Someone with provided email exists'));
		}
	}

	@isTest
	static void Resource_retreiveResource(){

		Resource__c res = Resource.retreiveResource([SELECT Id FROM Resource__c WHERE Status__c = 'Hired' AND Position__c = 'HR' LIMIT 1].Id);

		System.assertNotEquals(res, null);
		System.assertEquals(res.Name, 'HR', 'Predicted name was wrong. Actual was ' + res.Name);
	}

	@isTest
	static void testColloquyTrigger_CaseOfSecondCollPerDay(){
		Resource__c candidate = [SELECT Id FROM Resource__c WHERE Status__c <> 'Hired' LIMIT 1];

		Set<String> strings = new Set<String>();
		strings.add('The candidate already has an interview on the' + date.today());
		strings.add('You cannot interview employees');

		List<Colloquy__c> colloquies = new List<Colloquy__c>();
		colloquies.add(new Colloquy__c(Resource__c = candidate.id, ColloquyDate__c = date.today()));
		colloquies.add(new Colloquy__c(Resource__c = candidate.id, ColloquyDate__c = date.today()));


		Database.SaveResult[] srList = Database.insert(colloquies, false);

		for (Database.SaveResult sr : srList) {
			for(Database.Error err : sr.getErrors()) {
				if(strings.contains(err.getMessage()))
					System.assert(true, err.getMessage());
				else
					System.assert(false, err.getMessage());
			}
		}
	}

		@isTest
	static void testColloquyTrigger_CaseOfCollForHired(){
		Resource__c employee = [SELECT Id FROM Resource__c WHERE Status__c = 'Hired' LIMIT 1];

		Set<String> strings = new Set<String>();
		strings.add('The candidate already has an interview on the' + date.today());
		strings.add('You cannot interview employees');

		List<Colloquy__c> colloquies = new List<Colloquy__c>();
		colloquies.add(new Colloquy__c(Resource__c = employee.id, ColloquyDate__c = date.today()));


		Database.SaveResult[] srList = Database.insert(colloquies, false);

		for (Database.SaveResult sr : srList) {
			for(Database.Error err : sr.getErrors()) {
				if(strings.contains(err.getMessage()))
					System.assert(true, err.getMessage());
				else
					System.assert(false, err.getMessage());
			}
		}
	}
}