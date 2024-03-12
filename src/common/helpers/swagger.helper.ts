import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function setupSwaggerForModule(app: any) {
    const config = new DocumentBuilder()
  .setTitle('Condo API')
  .setDescription('The Condo API description')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
}