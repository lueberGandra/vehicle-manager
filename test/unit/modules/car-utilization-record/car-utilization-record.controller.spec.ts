import { Test, TestingModule } from '@nestjs/testing';
import { CarUtilizationRecordController } from 'src/modules/car-utilization-record/car-utilization-record.controller';
import { CarUtilizationRecordService } from 'src/modules/car-utilization-record/car-utilization-record.service';

describe('CarUtilizationRecordController', () => {
    let controller: CarUtilizationRecordController;
    let service: CarUtilizationRecordService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CarUtilizationRecordController],
            providers: [
                {
                    provide: CarUtilizationRecordService,
                    useValue: {
                        createsRecord: jest.fn(),
                        finishCarUtilization: jest.fn(),
                        findAllCarUtilizationRecords: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<CarUtilizationRecordController>(CarUtilizationRecordController);
        service = module.get<CarUtilizationRecordService>(CarUtilizationRecordService);
    });

    it('should call service to create a car utilization record', async () => {
        const createCarUtilizationRecordData = {
            "vehicleId": 3,
            "driverId": 3,
            "reason": "Hunger games",
            "utilizationStartDate": new Date("2024-03-08")
        };
        await controller.create(createCarUtilizationRecordData);
        expect(service.createsRecord).toHaveBeenCalledWith(createCarUtilizationRecordData);
    });

    it('should call service to finish car utilization record', async () => {
        const id = '1';
        const finishCarUtilizationRecordData = {
            "utilizationEndDate": new Date("2024-03-08")
        };
        await controller.findAll(finishCarUtilizationRecordData, id);
        expect(service.finishCarUtilization).toHaveBeenCalledWith(+id, finishCarUtilizationRecordData);
    });
    it('should call service to find all car utilization records', async () => {
        await controller.find();
        expect(service.findAllCarUtilizationRecords).toHaveBeenCalled();
    });

});
