const express = require('express');
const Template = require('./models/Template');
// Load middleware
const { auth, admin } = require('./middleware');

const app = express();
const port = 8080;

app.use(auth);
app.use(admin);

// helper function to get the templates
async function getTemplates() {
    try{
        const templates = await Template.find().sort('name');

        return templates;
    } catch (error) {
        // handle any errors that might occur during the process
        console.error('Error fetching templates:', error);
        throw new Error('Failed to fetch templates');
    }
}

app.get('/templates', async (req, res) => {
    try {
        const templates = await getTemplates();

        // Transform the templates
        const transformedTemplates = templates.map(template => ({
            id: template.id,
            name: template.name,
            content: JSON.parse(template.content),
        }));

        return res.status(200).json(transformedTemplates);
    }
    catch (error) {
        // Handle errors that might occur during template retrieval
        console.error('Error fetching email templates:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});