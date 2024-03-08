import { Test, TestingModule } from '@nestjs/testing';
import { Vehicle } from 'src/libs/typeorm/entities/vehicle.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { VehicleService } from 'src/modules/vehicle/vehicle.service';
import { Repository } from 'typeorm';
import { vehicles } from './mock/data';

jest.mock('nestjs-typeorm-paginate', () => ({
    paginateRaw: jest.fn().mockImplementation(() => Promise.resolve({
        items: vehicles,
        meta: {
            itemCount: vehicles.length,
            totalItems: vehicles.length,
            itemsPerPage: 10,
            totalPages: 1,
            currentPage: 1,
        },
    })),
}));
describe('VehicleService', () => {
    let service: VehicleService;
    let vehicleRepositoryMock: Partial<Record<keyof Repository<Vehicle>, jest.Mock>>;

    beforeEach(async () => {
        jest.clearAllMocks();

        vehicleRepositoryMock = {
            save: jest.fn(),
            findOne: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
                andWhere: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue([]),
            })),
            softDelete: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehicleService,
                {
                    provide: getRepositoryToken(Vehicle),
                    useValue: vehicleRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<VehicleService>(VehicleService);
    });

    it('should create and return a vehicle', async () => {
        const createVehicleDto = { color: 'red', brand: 'GM', plate:'GWA-8210'};
        const expectedVehicle = { /* ... */ };
        vehicleRepositoryMock.save.mockResolvedValue(expectedVehicle);

        const result = await service.createVehicle(createVehicleDto);

        expect(vehicleRepositoryMock.save).toHaveBeenCalledWith(createVehicleDto);
        expect(result).toEqual(expectedVehicle);
    });
    it('should throw an HttpException when creating a vehicle fails', async () => {
        const createVehicleDto = { brand: 'Test Brand', model: 'Test Model' };
        const errorMessage = 'Error saving vehicle';
        vehicleRepositoryMock.save.mockRejectedValue(new Error(errorMessage));

        await expect(service.createVehicle(vehicles[0]))
            .rejects
            .toThrow(HttpException);

        await expect(service.createVehicle(vehicles[0]))
            .rejects
            .toEqual(expect.objectContaining({
                message: errorMessage,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            }));
    });
    it('should return all vehicles and apply filters correctly', async () => {
        const queryData = { page: '1', limit: '10', name: 'Toyota' }; // Include a filter in the query data

        // Setup the query builder mock with chainable methods
        const queryBuilderMock = {
            andWhere: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            offset: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            getRawMany: jest.fn().mockResolvedValue(vehicles),
        };
        vehicleRepositoryMock.createQueryBuilder = jest.fn(() => queryBuilderMock);

        // Call the service method
        const result = await service.findAllVehicles(queryData);

        // Check if the `andWhere` was called with the correct argument
        expect(queryBuilderMock.andWhere).toHaveBeenCalledWith(
            `LOWER(vehicles.name) LIKE '%${queryData.name.toLowerCase()}%'`
        );

        // Assuming your service correctly handles pagination and filtering
        expect(result.items).toEqual(vehicles);
        expect(result.meta.totalItems).toEqual(vehicles.length);
    });

    it('should return a vehicle by id', async () => {
        const vehicleId = 1;
        const expectedVehicle = { id: vehicleId, /* ... */ };
        vehicleRepositoryMock.findOne.mockResolvedValue(expectedVehicle);

        const result = await service.findVehicleById(vehicleId);

        expect(vehicleRepositoryMock.findOne).toHaveBeenCalledWith({ where: { id: vehicleId } });
        expect(result).toEqual(expectedVehicle);
    });
    it('should update and return the vehicle', async () => {
        const vehicleId = 1;
        const updateVehicleData = { /* ... */ };
        const updatedVehicle = { id: vehicleId, ...updateVehicleData };
        vehicleRepositoryMock.findOne.mockResolvedValue(updatedVehicle);
        vehicleRepositoryMock.save.mockResolvedValue(updatedVehicle);

        const result = await service.updateVehicle(vehicleId, updateVehicleData);

        expect(vehicleRepositoryMock.save).toHaveBeenCalledWith(updatedVehicle);
        expect(result).toEqual(updatedVehicle);
    });
    it('should delete a vehicle', async () => {
        const vehicleId = 1;
        const expectedResponse = { msg: `Vehicle ${vehicleId} successfully deleted!` };
        vehicleRepositoryMock.findOne.mockResolvedValue({ id: vehicleId });
        vehicleRepositoryMock.softDelete.mockResolvedValue({});

        const result = await service.deleteVehicle(vehicleId);

        expect(vehicleRepositoryMock.softDelete).toHaveBeenCalledWith({ id: vehicleId });
        expect(result).toEqual(expectedResponse);
    });





});
