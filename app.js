(function () {
	'use strict';

	/**
	 * kanbanTodo Module.
	 *
	 * Simple todo task list app
	 */
	var app = angular.module('kanbanTodo', [
		"commonServices",
		"ui.router",
		"ui.bootstrap",
		"backendMock"
	]);

	/**
	 *	Routing config
	 */
	app.config(["$stateProvider", "$urlRouterProvider",
		function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise("/");

			$stateProvider.state("taskList", {
				url: "/",
				templateUrl: "views/taskListView/taskListView.html",
				controller: "TaskListCtrl as vm",
				resolve: {
					restService: "restService",
					tasks: function (restService) {
						return restService.query().$promise;
					}
				}
			}).state("taskEdit", {
				url: "/edit/:taskId",
				templateUrl: "views/taskEditView/taskEditView.html",
				controller: "TaskEditCtrl as vm",
				resolve: {
					restService: "restService",
					task: function (restService, $stateParams) {
						var taskId = $stateParams.taskId;
						return restService.get({
							taskId: taskId
						}).$promise;
					}
				}
			});
		}
	]);
}());
