import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from 'src/modules/driver/driver.controller';
import { DriverService } from 'src/modules/driver/driver.service';

describe('DriverController', () => {
    let controller: DriverController;
    let service: DriverService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DriverController],
            providers: [
                {
                    provide: DriverService,
                    useValue: {
                        createDriver: jest.fn(),
                        findAllDrivers: jest.fn(),
                        findDriverById: jest.fn(),
                        updateDriver: jest.fn(),
                        deleteDriver: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<DriverController>(DriverController);
        service = module.get<DriverService>(DriverService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a driver', async () => {
        const createDriverDto = { name: 'John Doe', licenseNumber: 'ABC123' };
        await controller.create(createDriverDto);
        expect(service.createDriver).toHaveBeenCalledWith(createDriverDto);
    });

    it('should find all drivers', async () => {
        const query = { page: '1', limit: '10' };
        await controller.findAll(query);
        expect(service.findAllDrivers).toHaveBeenCalledWith(query);
    });

    it('should find one driver by id', async () => {
        const id = '1';
        await controller.findOne(id);
        expect(service.findDriverById).toHaveBeenCalledWith(+id);
    });

    it('should update a driver', async () => {
        const id = '1';
        const updateDriverDto = { name: 'Jane Doe' };
        await controller.update(id, updateDriverDto);
        expect(service.updateDriver).toHaveBeenCalledWith(+id, updateDriverDto);
    });

    it('should delete a driver', async () => {
        const id = '1';
        await controller.remove(id);
        expect(service.deleteDriver).toHaveBeenCalledWith(+id);
    });
});
