import { Test, TestingModule } from '@nestjs/testing';
import { Driver } from 'src/libs/typeorm/entities/driver.entity';
import { DriverService } from 'src/modules/driver/driver.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { driverRepository } from './mock/methods';
import { drivers, paginateDrivers } from './mock/data';
import { HttpException, HttpStatus } from '@nestjs/common';



jest.mock('nestjs-typeorm-paginate', () => ({
    paginateRaw: jest.fn(),
}));

describe('Driver', () => {
    let service: DriverService;
    let paginateRaw;
    beforeEach(async () => {
        jest.clearAllMocks();

        const { paginateRaw: mockedPaginateRaw } = require('nestjs-typeorm-paginate');
        paginateRaw = mockedPaginateRaw;
        paginateRaw.mockResolvedValueOnce({
            items: drivers,
            meta: {
                itemCount: drivers.length,
                totalItems: drivers.length,
                itemsPerPage: 10,
                totalPages: 1,
                currentPage: 1,
            },
            links: {}
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DriverService,
                {
                    provide: getRepositoryToken(Driver),
                    useValue: driverRepository,
                },
            ],
        }).compile();

        service = module.get<DriverService>(DriverService);
    });

    describe('createDriver', () => {
        const createDriverData = { name: 'New Driver', licenseNumber: 'ABC123' };
        const createdDriver = { id: 1, ...createDriverData };
        const errorMessage = 'Database connection error';

        beforeEach(() => {
            driverRepository.save.mockReset();
        });

        it('should successfully create and return a driver', async () => {
            driverRepository.save.mockResolvedValueOnce(createdDriver);

            const result = await service.createDriver(createDriverData);

            expect(driverRepository.save).toHaveBeenCalledWith(createDriverData);
            expect(result).toEqual(createdDriver);
        });

        it('should throw an HttpException if there is a problem creating the driver', async () => {
            driverRepository.save.mockRejectedValueOnce(new Error(errorMessage));

            await expect(service.createDriver(createDriverData))
                .rejects
                .toBeInstanceOf(HttpException);
        });
    });

    describe('findAllDrivers', () => {
        const queryData = { page: '1', limit: '10' };

        let queryBuilder;

        beforeEach(() => {
            const mockPaginateRaw = require('nestjs-typeorm-paginate').paginateRaw;
            mockPaginateRaw.mockResolvedValueOnce(paginateDrivers)

            queryBuilder =
            {
                andWhere: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue(drivers)

            };
            driverRepository.createQueryBuilder.mockReturnValue(queryBuilder);
        });

        it('should paginate and return drivers correctly', async () => {
            const queryData = { page: '1', limit: '10' };


            driverRepository.createQueryBuilder.mockReturnValue(queryBuilder);
            paginateRaw.mockResolvedValueOnce(paginateDrivers);

            const result = await service.findAllDrivers(queryData);

            expect(driverRepository.createQueryBuilder).toHaveBeenCalledWith('drivers');
            expect(result).toEqual(paginateDrivers);
        });

        it('should apply filters correctly', async () => {
            const queryData = {
                page: '1',
                limit: '10',
                name: 'John'
            };


            const queryBuilder = {
                andWhere: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue([])
            };
            driverRepository.createQueryBuilder.mockReturnValue(queryBuilder);

            await service.findAllDrivers(queryData);


            expect(queryBuilder.andWhere).toHaveBeenCalledWith(
                "LOWER(drivers.name) LIKE '%john%'"
            );
        });


        it('should throw an HttpException when an error occurs', async () => {
            driverRepository.createQueryBuilder.mockImplementation(() => {
                throw new Error('Database error');
            });

            await expect(service.findAllDrivers(queryData)).rejects.toThrow(HttpException);
            await expect(service.findAllDrivers(queryData)).rejects.toMatchObject({
                message: 'Database error',
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            });
        });
    });

    describe('findDriverById', () => {
        const mockDriverId = 1;
        const mockDriver = { id: mockDriverId, name: 'Test Driver' };

        beforeEach(() => {
            driverRepository.findOne.mockReset();
        });

        it('should return the driver when found', async () => {
            driverRepository.findOne.mockResolvedValueOnce(mockDriver);
            const result = await service.findDriverById(mockDriverId);
            expect(driverRepository.findOne).toHaveBeenCalledWith({ where: { id: mockDriverId } });
            expect(result).toEqual(mockDriver);
        });


        it('should throw an error when the driver does not exist', async () => {
            driverRepository.findOne.mockResolvedValueOnce(null);
            try {
                await service.findDriverById(mockDriverId);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toBe(`Driver ${mockDriverId} not found!`);
                expect(error.status).toBe(HttpStatus.NOT_FOUND)
            }
        });

        it('should throw an driver not found! when an exception occurs', async () => {
            const errorMessage = 'Driver 1 not found!';
            driverRepository.findOne.mockRejectedValueOnce(new Error(errorMessage));

            try {
                await service.findDriverById(mockDriverId);
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException);
                expect(error.message).toBe(errorMessage);
                expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    });

    describe('updateDriver', () => {
        const mockDriverId = 1;
        const mockDriver = { id: mockDriverId, name: 'Existing Driver' };
        const updateDriverData = { name: 'Updated Driver' };
        const updatedDriver = { ...mockDriver, ...updateDriverData };

        beforeEach(() => {
            driverRepository.findOne.mockReset();
            driverRepository.save.mockReset();
        });

        it('should successfully update the driver when the driver exists', async () => {
            driverRepository.findOne.mockResolvedValueOnce(mockDriver);
            driverRepository.save.mockResolvedValueOnce(updatedDriver);

            const result = await service.updateDriver(mockDriverId, updateDriverData);

            expect(driverRepository.findOne).toHaveBeenCalledWith({ where: { id: mockDriverId } });
            expect(driverRepository.save).toHaveBeenCalledWith(updatedDriver);
            expect(result).toEqual(updatedDriver);
        });

        it('should throw a NOT_FOUND error when the driver does not exist', async () => {
            driverRepository.findOne.mockResolvedValueOnce(null);

            await expect(service.updateDriver(mockDriverId, updateDriverData))
                .rejects
                .toEqual(new HttpException(`Driver ${mockDriverId} not found!`, HttpStatus.NOT_FOUND));
        });

        it('should throw an INTERNAL_SERVER_ERROR when an exception occurs', async () => {
            const errorMessage = 'Internal server error';
            driverRepository.findOne.mockRejectedValueOnce(new Error(errorMessage));

            await expect(service.updateDriver(mockDriverId, updateDriverData))
                .rejects
                .toEqual(new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR));
        });
    });

    describe('deleteDriver', () => {
        const mockDriverId = 1;
        const driver = { id: mockDriverId, name: 'Test Driver' };

        beforeEach(() => {
            driverRepository.findOne.mockReset();
            driverRepository.softDelete.mockReset();
        });

        it('should successfully delete the driver and return a success message', async () => {
            driverRepository.findOne.mockResolvedValueOnce(driver);
            driverRepository.softDelete.mockResolvedValueOnce({ affected: 1 });

            const result = await service.deleteDriver(mockDriverId);

            expect(driverRepository.findOne).toHaveBeenCalledWith({ where: { id: mockDriverId } });
            expect(driverRepository.softDelete).toHaveBeenCalledWith({ id: mockDriverId });
            expect(result).toEqual({ msg: `Driver ${mockDriverId} successfully deleted!` });
        });

        it('should throw an error if the driver is not found', async () => {
            driverRepository.findOne.mockResolvedValueOnce(null);

            await expect(service.deleteDriver(mockDriverId))
                .rejects
                .toThrow(`Driver ${mockDriverId} not found!`);
        });

        it('should throw an HttpException if an error occurs during the deletion process', async () => {
            const errorMessage = `Driver ${mockDriverId} not found!`;
            driverRepository.findOne.mockResolvedValueOnce(driver);
            driverRepository.softDelete.mockRejectedValueOnce(new Error(errorMessage));

            await expect(service.deleteDriver(mockDriverId))
                .rejects
                .toBeInstanceOf(HttpException);
            await expect(service.deleteDriver(mockDriverId))
                .rejects
                .toMatchObject({
                    message: errorMessage,
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                });
        });
    });


});
