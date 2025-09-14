// models/TradeoffDimension.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This model represents a single "Trade-off Arena" with its two opposing statements.
const TradeoffDimensionSchema = new Schema({
    // e.g., "Innovation vs. Stability", "Delegation vs. Direct Control"
    dimensionName: {
        type: String,
        required: true,
        trim: true
    },
    // The broader category this dimension belongs to, e.g., "GrowthCraft™"
    category: {
        type: String,
        required: true,
        trim: true
    },
    statementA: {
        text: { type: String, required: true },
        id: { type: Number, required: true, unique: true } // The number from the PDF (e.g., 3)
    },
    statementB: {
        text: { type: String, required: true },
        id: { type: Number, required: true, unique: true } // The number from the PDF (e.g., 4)
    },
    // Add these two new fields:
    arenaTitle: {
        type: String,
        required: true
    },
    arenaDescription: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TradeoffDimension', TradeoffDimensionSchema);