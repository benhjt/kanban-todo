(function () {
	'use strict';

	/**
	 * backendMock Module
	 *
	 * Mocking of the calls to the RESTful api
	 */
	angular
		.module('backendMock', ["ngMockE2E"])
		.run(function ($httpBackend) {
			var tasks = [{
				"id": 1,
				"name": "Lorem",
				"description": "Anim cillum non cillum est cupidatat consequat velit deserunt aliquip do. Cillum nostrud incididunt culpa proident enim ullamco.",
				"dueDate": "15/06/2015",
				"status": "TODO"
			}, {
				"id": 2,
				"name": "magna",
				"description": "Duis consequat labore ex aute pariatur cillum mollit quis mollit ex excepteur aute. Sunt Lorem eu nisi eiusmod sint dolor officia nulla culpa pariatur qui eu.",
				"dueDate": "19/08/2014",
				"status": "DOING"
			}, {
				"id": 3,
				"name": "excepteur",
				"description": "Id ad esse ut aliqua irure anim fugiat nisi laboris esse. Eu commodo ipsum anim duis exercitation nulla ex.",
				"dueDate": "13/09/2014",
				"status": "DONE"
			}, {
				"id": 4,
				"name": "ex",
				"description": "Magna commodo dolor in et ullamco id ullamco ullamco commodo enim. Consequat et laboris minim anim nulla non do excepteur laboris exercitation proident non irure.",
				"dueDate": "17/04/2014",
				"status": "TODO"
			}, {
				"id": 5,
				"name": "et",
				"description": "Officia do tempor culpa qui excepteur elit eiusmod anim duis laboris. Ut nisi proident commodo mollit ut dolor.",
				"dueDate": "20/02/2014",
				"status": "TODO"
			}, {
				"id": 6,
				"name": "ex",
				"description": "Fugiat anim eu id in labore eiusmod est irure sunt Lorem aliqua esse incididunt. Nulla tempor consequat cillum do dolore.",
				"dueDate": "11/09/2014",
				"status": "DOING"
			}, {
				"id": 7,
				"name": "est",
				"description": "Proident nulla laboris pariatur nisi nisi ipsum ex id tempor do. Ut pariatur et magna laboris veniam dolore in.",
				"dueDate": "27/05/2014",
				"status": "TODO"
			}, {
				"id": 8,
				"name": "cupidatat",
				"description": "Cillum consectetur enim dolor exercitation cillum amet eiusmod pariatur eiusmod. Quis adipisicing incididunt incididunt Lorem qui ea aliquip id irure ex do reprehenderit officia do.",
				"dueDate": "05/05/2014",
				"status": "DONE"
			}, {
				"id": 9,
				"name": "minim",
				"description": "Culpa eiusmod eiusmod do consectetur laborum est commodo et nostrud incididunt irure est nostrud ea. Mollit veniam irure dolor nulla labore.",
				"dueDate": "06/07/2014",
				"status": "TODO"
			}, {
				"id": 10,
				"name": "ea",
				"description": "Sint enim irure culpa excepteur culpa nulla irure proident occaecat laboris tempor Lorem Lorem eu. Occaecat aliqua dolor et enim qui velit deserunt amet.",
				"dueDate": "07/01/2015",
				"status": "TODO"
			}, {
				"id": 11,
				"name": "laborum",
				"description": "Minim ullamco irure esse tempor enim adipisicing laborum nulla. Incididunt veniam non anim tempor deserunt eiusmod laboris consequat amet enim reprehenderit et deserunt pariatur.",
				"dueDate": "03/01/2015",
				"status": "DOING"
			}, {
				"id": 12,
				"name": "ut",
				"description": "Qui in laborum laborum aliquip dolore adipisicing qui. Eu proident adipisicing occaecat eu irure deserunt do culpa.",
				"dueDate": "18/02/2015",
				"status": "TODO"
			}];

			var restUrl = "/rest/tasks";

			$httpBackend.whenGET(restUrl).respond(tasks);

			var editingRegex = new RegExp(restUrl + "/[0-9][0-9]*", '');
			$httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
				var task = {
					"id": 0
				};
				var parameters = url.split("/");
				var length = parameters.length;
				var id = parameters[length - 1];

				if (id > 0) {
					for (var i = 0; i < tasks.length; i++) {
						if (tasks[i].id == id) {
							task = tasks[i];
							break;
						}
					}
				}

				return [200, task, {}];
			});

			$httpBackend.whenPOST(restUrl).respond(function (method, url, data) {
				var task = angular.fromJson(data);

				if (!task.id) {
					// new task so give it an id
					task.id = tasks[tasks.length - 1].id + 1;
					tasks.push(task);
				} else {
					// updating existing task
					for (var i = 0; i < tasks.length; i++) {
						if (tasks[i].id == task.id) {
							tasks[i] = task;
							break;
						}
					}
				}

				return [200, task, {}];
			});

			$httpBackend.whenDELETE(editingRegex).respond(function (method, url, data) {
				var parameters = url.split("/");
				var length = parameters.length;
				var id = parameters[length - 1];

				if (id > 0) {
					// updating existing task
					for (var i = 0; i < tasks.length; i++) {
						if (tasks[i].id == id) {
							tasks.splice(i, 1);
							break;
						}
					}
				}

				return [200, {}, {}];
			});

			$httpBackend.whenGET(/views/).passThrough();
		});
}());