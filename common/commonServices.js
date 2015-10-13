(function () {
	'use strict';

	// set up toastr options
	toastr.options = {
		timeOut: 2000
	};

	/**
	 * commonServices Module.
	 *
	 * Holds any common services for the module
	 */
	var app = angular.module('commonServices', ["ngResource"]);

	/**
	 * Factory for accessing the rest service
	 */
	app.factory('restService', ['$resource',
		function ($resource) {
			return $resource("/rest/tasks/:taskId");
		}
	]);
})();