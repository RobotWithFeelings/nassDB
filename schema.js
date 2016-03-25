var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	name: {
		type: String,
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
	international: {
		type: Boolean,
		required: true,
	},
	q1: {
		type: Number,
		min: 1,
		max: 10
	},
	q2: {
		type: Number,
		min: 1,
		max: 10
	},
	q3: {
		type: Number,
		min: 1,
		max: 10
	},
	q4: {
		type: Number,
		min: 1,
		max: 10
	},
	q5: {
		type: Number,
		min: 1,
		max: 10
	},
	q6: {
		type: Number,
		min: 1,
		max: 10
	},
	q7: {
		type: Number,
		min: 1,
		max: 10
	},
	q8: {
		type: Number,
		min: 1,
		max: 10
	},
	q9: {
		type: Number,
		min: 1,
		max: 10
	},
	q10: {
		type: Number,
		min: 1,
		max: 10
	},
	q11: {
		type: Number,
		min: 1,
		max: 10
	},
	q12: {
		type: Number,
		min: 1,
		max: 10
	},
	q13: {
		type: Number,
		min: 1,
		max: 10
	},
	q14: {
		type: Number,
		min: 1,
		max: 10
	},
	q15: {
		type: Number,
		min: 1,
		max: 10
	},
	q16: {
		type: Number,
		min: 1,
		max: 10
	},
	q17: {
		type: Number,
		min: 1,
		max: 10
	},
	q18: {
		type: Number,
		min: 1,
		max: 10
	},
	q19: {
		type: Number,
		min: 1,
		max: 10
	},
	q20: {
		type: Number,
		min: 1,
		max: 10
	}
});