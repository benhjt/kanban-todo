(function () {
	'use strict';

	angular
		.module('kanbanTodo')
		.controller('TaskListCtrl', TaskListCtrl);

	TaskListCtrl.$inject = ['tasks'];

	function TaskListCtrl(tasks) {
		var vm = this;

		// the list of tasks
		vm.tasks = tasks;
		vm.tasksDueToday = [];
		vm.numberOfUncompletedTasks = 0;

		init();

		function findTasksDueToday() {
			var todaysDate = moment();

			for (var i = 0; i < vm.tasks.length; i++) {
				var task = vm.tasks[i];
				var taskDueDate = moment(task.dueDate, "DD/MM/YYYY");
				if (todaysDate.diff(taskDueDate, "days") === 0 && task.status !== "DONE") {
					vm.tasksDueToday.push(task.name);
				}
			}
		}

		function countNumberOfUncompletedTasks() {
			for (var i = 0; i < vm.tasks.length; i++) {
				var task = vm.tasks[i];
				if (task.status !== "DONE") {
					vm.numberOfUncompletedTasks++;
				}
			}
		}

		function init() {
			findTasksDueToday();
			countNumberOfUncompletedTasks();
		}
	}
})();