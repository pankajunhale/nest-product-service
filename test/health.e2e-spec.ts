import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { HealthModule } from "../src/components/health/health.module";
import * as request from 'supertest';

describe('HealthController (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [HealthModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET health', function () {
        return request(app.getHttpServer())
            .get('/health')
            .set("Accept", "application/json")
            .expect(200)
            .expect("Ok");
    });

    afterAll(async () => {
        await app.close();
    });
});