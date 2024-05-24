import { Test } from "@nestjs/testing";
import { HealthController } from "./health.controller"

describe("HealthController", () => {
    let healthCtrl: HealthController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [HealthController]
        }).compile();
        healthCtrl = moduleRef.get<HealthController>(HealthController);
    })

    it("should be defined", () => {
        expect(healthCtrl).toBeDefined();
    })

})