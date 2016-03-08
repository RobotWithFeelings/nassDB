var mongoose = require('mongoose');
var Chance = require('chance');
var chance = new Chance();

nm = chance.name();

module.exports = new mongoose.Schema({
	name: {
		type: String,
		default: nm,
		lowercase: true
	},
	time: {
		type: Date,
		default: Date.now
	},
	ownMachine: {
		type: Boolean,
		required: true
	},
	cs: {
		type: Boolean,
		required: true
	},
	gender: {
		type: String,
		required: true,
		enum: ['m','f'],
		lowercase: true
	},
	progExp: {
		type: Number,
		required: true,
		min: 0,
		max: 1000
	},
	age: {
		type: Number,
		required: true,
		min: 1,
		max: 100
	},
	q1: {
		type: Number,
		required: true,
		min: 1,
		max: 10
	},
	q2: {
		type: Number,
		required: true,
		min: 1,
		max: 10
	},
	q3: {
		type: Number,
		required: true,
		min: 1,
		max: 10
	},
	q4: {
		type: Number,
		required: true,
		min: 1,
		max: 10
	},
	q5: {
		type: Number,
		required: true,
		min: 1,
		max: 10
	}
});