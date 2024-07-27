const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getGeminiResult = async (req, res) => {
    
    try {

        const data = req.body.data
        const prompt = ` ok, I will give you some input data, with this prompt- 
 we have data regarding details of assets management of vehicle
 
 here's the data -: ${data}
 

our task is to return whether the "asset need maintenance or replacement"

if and only if it need maintenance, show the date of maintenance.

if the asset is not maintained from a long time, or much damaged return just replacement not any date of maintenance.
return for maintenance with date or replacement`


        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.status(200).json({ result: text })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
}

module.exports = {
    getGeminiResult
}