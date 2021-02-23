const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

export class SwaggerDoc implements IDocInitializer {
    async initializeDocumentation(app: any): Promise<void> {
        let docRoute = "./doc/doc.yaml";
        if (process.env.NODE_ENV !== 'local') {
            docRoute = "app/build/doc/doc.yaml"
        }
        const swaggerDocument = YAML.load(docRoute);
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        return;
    }

}
