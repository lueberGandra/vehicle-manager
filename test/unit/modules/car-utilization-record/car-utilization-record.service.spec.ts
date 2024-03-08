import { Test, TestingModule } from '@nestjs/testing';
import { CarUtilizationRecord } from 'src/libs/typeorm/entities/car-utilization-record.entity';
import { Driver } from 'src/libs/typeorm/entities/driver.entity';
import { Vehicle } from 'src/libs/typeorm/entities/vehicle.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarUtilizationRecordService } from 'src/modules/car-utilization-record/car-utilization-record.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { drivers } from '../driver/mock/data';

describe('CarUtilizationRecordService', () => {
    let service: CarUtilizationRecordService;
    let mockCarUtilizationRecordRepository;
    let mockDriverRepository;
    let mockVehicleRepository;

    beforeEach(async () => {
        mockCarUtilizationRecordRepository = {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
        };

        mockDriverRepository = {
            findOne: jest.fn(),
        };

        mockVehicleRepository = {
            findOne: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CarUtilizationRecordService,
                {
                    provide: getRepositoryToken(CarUtilizationRecord),
                    useValue: mockCarUtilizationRecordRepository,
                },
                {
                    provide: getRepositoryToken(Driver),
                    useValue: mockDriverRepository,
                },
                {
                    provide: getRepositoryToken(Vehicle),
                    useValue: mockVehicleRepository,
                },
            ],
        }).compile();

        service = module.get<CarUtilizationRecordService>(CarUtilizationRecordService);
    });
    it('should throw an HttpException when car utilization record is not found', async () => {
        const carUtilizationRecordId = 1;
        const finishCarUtilizationRecordData = { utilizationEndDate: new Date() };

        mockCarUtilizationRecordRepository.findOne.mockResolvedValue(null);

        await expect(service.finishCarUtilization(carUtilizationRecordId, finishCarUtilizationRecordData))
            .rejects
            .toThrow(HttpException);

        await expect(service.finishCarUtilization(carUtilizationRecordId, finishCarUtilizationRecordData))
            .rejects
            .toEqual(expect.objectContaining({
                message: `Car Utilization Record ${carUtilizationRecordId} not found!`,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            }));
    });

    it('should throw an HttpException when utilizationEndDate is less than utilizationStartDate', async () => {
        const carUtilizationRecordId = 1;
        const utilizationStartDate = new Date();
        const utilizationEndDate = new Date(utilizationStartDate.getTime() - 1000); // Less than utilizationStartDate
        const finishCarUtilizationRecordData = { utilizationEndDate };

        const carUtilizationRecord = { id: carUtilizationRecordId, utilizationStartDate };
        mockCarUtilizationRecordRepository.findOne.mockResolvedValue(carUtilizationRecord);

        await expect(service.finishCarUtilization(carUtilizationRecordId, finishCarUtilizationRecordData))
            .rejects
            .toThrow(HttpException);

        await expect(service.finishCarUtilization(carUtilizationRecordId, finishCarUtilizationRecordData))
            .rejects
            .toEqual(expect.objectContaining({
                message: 'utilizationEndDate must be greater than utilizationStartDate!',
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            }));
    });

    it('should throw HttpException when driver is not found', async () => {
        const createCarUtilizationRecordData = {
            "vehicleId": 3,
            "driverId": 3,
            "reason": "Hunger games",
            "utilizationStartDate": new Date("2024-03-08")
        };
        const errorMessage = `Driver ${createCarUtilizationRecordData.driverId} not found!`

        mockDriverRepository.findOne.mockResolvedValue(null);
        mockVehicleRepository.findOne.mockResolvedValue(null);

        mockCarUtilizationRecordRepository.save.mockRejectedValue(new Error(errorMessage));

        try {
            await service.createsRecord(createCarUtilizationRecordData);
            fail('Expected method to throw an exception');
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.message).toBe(errorMessage);
            expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
    it('should throw HttpException when vehicle is not found', async () => {
        const createCarUtilizationRecordData = {
            "vehicleId": 3,
            "driverId": 3,
            "reason": "Hunger games",
            "utilizationStartDate": new Date("2024-03-08")
        };
        const errorMessage = `Vehicle ${createCarUtilizationRecordData.driverId} not found!`

        mockDriverRepository.findOne.mockResolvedValue(drivers[0]);
        mockVehicleRepository.findOne.mockResolvedValue(null);

        mockCarUtilizationRecordRepository.save.mockRejectedValue(new Error(errorMessage));

        try {
            await service.createsRecord(createCarUtilizationRecordData);
            fail('Expected method to throw an exception');
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.message).toBe(errorMessage);
            expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
    it('should update the utilizationEndDate successfully', async () => {
        const carUtilizationRecordId = 1;
        const utilizationStartDate = new Date();
        const utilizationEndDate = new Date(utilizationStartDate.getTime() + 1000);
        const finishCarUtilizationRecordData = { utilizationEndDate };

        const carUtilizationRecord = { id: carUtilizationRecordId, utilizationStartDate };
        mockCarUtilizationRecordRepository.findOne.mockResolvedValue(carUtilizationRecord);

        const updatedCarUtilizationRecord = { ...carUtilizationRecord, utilizationEndDate };
        mockCarUtilizationRecordRepository.save.mockResolvedValue(updatedCarUtilizationRecord);

        const result = await service.finishCarUtilization(carUtilizationRecordId, finishCarUtilizationRecordData);

        expect(result).toEqual(updatedCarUtilizationRecord);
    });


    it('should create a car utilization record successfully', async () => {
        const createCarUtilizationRecordData = {
            "vehicleId": 3,
            "driverId": 3,
            "reason": "Hunger games",
            "utilizationStartDate": new Date("2024-03-08")
        };
        const driver = { id: 1};
        const vehicle = { id: 1 };

        mockDriverRepository.findOne.mockResolvedValue(driver);
        mockVehicleRepository.findOne.mockResolvedValue(vehicle);
        mockCarUtilizationRecordRepository.find.mockResolvedValue([]);
        mockCarUtilizationRecordRepository.save.mockResolvedValue({ });

        const result = await service.createsRecord(createCarUtilizationRecordData);

        expect(result).toBeDefined();
        expect(mockDriverRepository.findOne).toHaveBeenCalledWith({ where: { id: createCarUtilizationRecordData.driverId } });
        expect(mockVehicleRepository.findOne).toHaveBeenCalledWith({ where: { id: createCarUtilizationRecordData.vehicleId } });
        expect(mockCarUtilizationRecordRepository.save).toHaveBeenCalledWith(expect.anything());
    });

    it('should throw an HttpException when an error occurs in findAllCarUtilizationRecords', async () => {
        const error = new Error('Database query error');
        mockCarUtilizationRecordRepository.find.mockRejectedValue(error);

        await expect(service.findAllCarUtilizationRecords())
            .rejects
            .toThrow(HttpException);

        await expect(service.findAllCarUtilizationRecords())
            .rejects
            .toEqual(expect.objectContaining({
                message: error.message,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            }));
    });

});
