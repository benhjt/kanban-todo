(function () {
	'use strict';

	angular
		.module('kanbanTodo')
		.directive('taskItem', taskItem);

	function taskItem() {
		return {
			restrict: 'EA', // element or attribute
			replace: true, // replace tag with content of template
			templateUrl: 'views/taskListView/taskDirective.html' // external template
		};
	}
}());