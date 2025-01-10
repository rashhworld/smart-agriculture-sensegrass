const generateDummyAIAnalysis = () => {
    const soilHealth = {
        score: Math.floor(Math.random() * 100),
        ph: (Math.random() * (8.5 - 5.5) + 5.5).toFixed(1),
        nitrogen: Math.floor(Math.random() * 100),
        phosphorus: Math.floor(Math.random() * 100),
        potassium: Math.floor(Math.random() * 100),
        organicMatter: (Math.random() * (5 - 1) + 1).toFixed(1),
    };

    const cropHealth = {
        score: Math.floor(Math.random() * 100),
        diseaseRisk: Math.floor(Math.random() * 100),
        pestRisk: Math.floor(Math.random() * 100),
        growthRate: Math.floor(Math.random() * 100),
        stressLevel: Math.floor(Math.random() * 100),
    };

    const recommendations = [
        "Consider adding nitrogen-rich fertilizers",
        "Maintain proper irrigation schedule",
        "Monitor for early signs of pest infestation",
        "Soil pH adjustment recommended",
        "Prune dead or diseased branches regularly",
        "Add organic compost to enrich the soil",
        "Ensure crops are spaced appropriately",
        "Test soil nutrient levels periodically",
        "Introduce beneficial insects for pest control",
        "Apply mulch to retain soil moisture",
        "Rotate crops to prevent soil depletion",
        "Ensure adequate sunlight for plant growth",
        "Check drainage to prevent waterlogging",
        "Avoid over-fertilizing to reduce nutrient burn",
        "Apply foliar sprays for quick nutrient uptake",
        "Install drip irrigation for water efficiency",
        "Aerate the soil to improve root penetration",
        "Use companion planting to boost yields",
        "Protect plants with row covers during frost",
        "Remove weeds to reduce competition for resources",
        "Harvest crops at the right maturity stage",
        "Use rainwater harvesting to reduce costs",
        "Inspect plants for fungal diseases",
        "Maintain consistent soil temperature with mulch",
        "Choose disease-resistant plant varieties",
        "Apply lime or sulfur to adjust soil pH",
        "Optimize planting time based on seasons",
        "Use organic pest repellents for eco-friendly farming",
        "Trim overgrown foliage for better air circulation",
        "Track weather conditions for timely interventions"
    ].sort(() => Math.random() - 0.5).slice(0, 2);

    return {
        soilHealth,
        cropHealth,
        recommendations,
        timestamp: new Date(),
    };
};

exports.getFieldAnalysis = async (req, res) => {
    try {
        const analysis = generateDummyAIAnalysis();
        res.status(200).json({ status: "success", analysis });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
}; 