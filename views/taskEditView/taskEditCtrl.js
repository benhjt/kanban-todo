(function () {
	'use strict';

	angular
		.module('kanbanTodo')
		.controller('TaskEditCtrl', TaskEditCtrl);

	TaskEditCtrl.$inject = ['task', '$state', 'restService'];

	function TaskEditCtrl(task, $state, restService) {
		var vm = this;
		// the task being edited
		vm.task = task;

		// date picker
		vm.isDatePickerOpen = false;
		vm.openDatePicker = openDatePicker;

		// add/remove tags
		vm.addTagsToTask = addTagsToTask;
		vm.removeTagFromTask = removeTagFromTask;

		// cancel, save, delete button functions
		vm.cancelAndReturn = cancelAndReturn;
		vm.saveTask = saveTask;
		vm.deleteTask = deleteTask;

		// date picker
		function openDatePicker($event) {
			$event.preventDefault();
			$event.stopPropagation();

			vm.isDatePickerOpen = !vm.isDatePickerOpen;
		}

		// add/remove tags
		function addTagsToTask(tags) {
			if (tags) {
				var array = tags.split(',');
				vm.task.tags = vm.task.tags ? vm.task.tags.concat(array) : array;
				vm.newTags = "";
			} else {
				toastr.error("Please enter one or more tags separated by a comma");
			}
		}

		function removeTagFromTask(tagId) {
			vm.task.tags.splice(tagId, 1);
		}

		// cancel, save, delete button functions
		function cancelAndReturn() {
			$state.go('taskList');
		}

		function saveTask(isValid) {
			if (isValid) {
				vm.task.$save(function (data) {
					toastr.success("Save successful");
					$state.go('taskList');
				});
			} else {
				toastr.error("Please correct validation errors before saving");
			}
		}

		function deleteTask() {
			if (vm.task.id) {
				return restService.delete({
					taskId: vm.task.id
				}).$promise.then(function (result) {
					$state.go('taskList');
					toastr.success("Task deleted");
				});
			}
		}
	}
}());