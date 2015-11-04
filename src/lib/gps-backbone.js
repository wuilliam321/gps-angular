var BackboneGPS = {

	// Statically defined user roles
	ADMIN_ROLE: 'Admin',
	OWNER_ROLE: 'Owner',
	REGISTERED_USER_ROLE: 'RegisteredUser',

};

/*
 * BackboneGPS is an extension of Backbone infrastructure.
 * Its purpose is to add methods to handle models relations
 * and to give the upper layers an abstraction of the service
 * that implements Backend functionalities.
 */
BackboneGPS.__init = function(constructor, options) {
	if (options == undefined) {
		options = constructor;
		constructor = undefined;
	}

	constructor && constructor.apply(this);

	var Model = Backbone.Model.extend(_.extend({

		/*
		 * The type of this instance. This attribute can be
		 * used to create sync urls.
		 */
		instanceType: undefined,

		/* Comma separated list of relations to fetch together with model */
		relationsString: undefined,

		/*
		 * Adds a relationship with the given name and saves it
		 * to your database. The argument 'value' can be an array
		 * or a single object.
		 */
		/* abstract */ addRelationship : function(relationship, value, options) {},

		/*
		 * Removes all the elements inside a relationship. The elements
		 * will be also removed from the server.
		 */
		/* abstract */ removeRelationship: function(relationship, options) {},

		/*
		 * It construct the filter string depending on the attribute and the criteria.
		 * @param  {String} attribute, the attribute to use for the filter
		 * @param  {String} criteriaOperator, the critearia operator, ex: =, IN, BETWEEN.
		 * @params {Object} could be a simpler value String or an array of values.
		 * @return {String}  filter, the string to sent to the server to apply the filter.
		 */
		/* abstract */ constructFilterString: function(attribute, criteriaOperator, values) {},

		/*
		 * Removes the element with the given id from the relationship.
		 * The element will be also removed from the server.
		 */
		/* abstract */ removeChild: function(relationship, id, options) {},

	}, options.model || {}));

	var Collection = Backbone.Collection.extend(_.extend({

		/*
		 * Returns the type of the elements contained inside
		 * this collection.
		 */
		instanceType: undefined,

		/* Filtering constraint */
		filterBy: undefined,

		/* Sorting constraint */
		orderBy: undefined,

		/* Comma separated list of relations to fetch together with model */
		relationsString: undefined,

		/* Comma separated list of attributes to bring. */
		fieldsProjection: undefined,

		/*
		 * It construct the filter string depending on the attribute and the criteria.
		 * @param  {String} attribute, the attribute to use for the filter
		 * @param  {String} criteriaOperator, the critearia operator, ex: =, IN, BETWEEN.
		 * @params {Object} could be a simpler value String or an array of values.
		 * @return {String}  filter, the string to sent to the server to apply the filter.
		 */
		/* abstract */ constructFilterString: function(attribute, criteriaOperator, values) {},

		/*
		 * Saves all its child to your database.
		 */
		saveAll: function(options) {
			this.__saveChildRecursively(this.models, this.models.length - 1, options);
		},

		/* private */__saveChildRecursively: function(models, index, options) {
			var success = options.success || function() {};
			var error = options.error || function() {};

			if (index > 0) {
				success = function(model, result) {
					this.createRecursively(models, index - 1, options);
				}.bind(this);
			}

			models[index].save(models[index].toJSON(), {
				success: success,
				error : error,
			});
		},

	}, options.collection || {}));

	var View = Backbone.View.extend(_.extend({
	}, options.view || {}));

	var User = Model.extend(_.extend({

		username: undefined,
		__sessionToken: undefined,
		SESSION_EXPIRATION_TIME_IN_HOURS: 2,
		SESSION_EXPIRED_MESSAGE: 'Your session expired, Please log in.',

		getSessionToken: function() {
			return this.__sessionToken;
		},

		setSessionToken: function(token) {
			this.__sessionToken = token;
		},

		/* abstract */ getMyClientRid: function() {},

		/* abstract */ register: function(username, password, profile, options) {},

		/* abstract */ login: function(username, password, options) {},

		/* abstract */ logout: function(options) {},

		/* abstract */ isAuthorized: function() {},

		/* abstract */ hasRole: function(role) {},

		clear: function(options) {
			this.username = undefined;
			Backbone.Model.prototype.clear.call(this, options);
		},

	}, options.user || {}));

	this.Model = Model;
	this.Collection = Collection;
	this.View = View;
	this.User = User;

}
