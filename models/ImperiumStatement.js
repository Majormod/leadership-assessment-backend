// models/ImperiumStatement.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines the schema for a single Likert scale statement for the new assessment.
const ImperiumStatementSchema = new Schema({
    statementText: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        // Example categories: 'Strategic Thinking', 'Communication', 'Decision Making', etc.
        enum: ['Strategic Thinking', 'Communication', 'Decision Making', 'Team Leadership', 'Personal Integrity']
    },
    // This is important for scoring. Some statements might be phrased negatively.
    // e.g., "I find it difficult to..." where "Strongly Agree" is a low score.
    isReverseScored: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('ImperiumStatement', ImperiumStatementSchema);