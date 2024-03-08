import { Test, TestingModule } from '@nestjs/testing';
import { CreateVehicleDto } from 'src/modules/vehicle/dto/create-vehicle.dto';
import { GetAllVehiclesDto } from 'src/modules/vehicle/dto/get-all-vehicle.dto';
import { UpdateVehicleDto } from 'src/modules/vehicle/dto/update-vehicle.dto';
import { VehicleController } from 'src/modules/vehicle/vehicle.controller';
import { VehicleService } from 'src/modules/vehicle/vehicle.service';


describe('VehicleController', () => {
    let controller: VehicleController;
    let service: VehicleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehicleController],
            providers: [
                {
                    provide: VehicleService,
                    useValue: {
                        createVehicle: jest.fn(),
                        findAllVehicles: jest.fn(),
                        findVehicleById: jest.fn(),
                        updateVehicle: jest.fn(),
                        deleteVehicle: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<VehicleController>(VehicleController);
        service = module.get<VehicleService>(VehicleService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a vehicle', async () => {
        const dto = new CreateVehicleDto();
        await controller.create(dto);
        expect(service.createVehicle).toHaveBeenCalledWith(dto);
    });

    it('should find all vehicles', async () => {
        const query = new GetAllVehiclesDto();
        await controller.findAll(query);
        expect(service.findAllVehicles).toHaveBeenCalledWith(query);
    });

    it('should find one vehicle by id', async () => {
        const id = '1';
        await controller.findOne(id);
        expect(service.findVehicleById).toHaveBeenCalledWith(+id);
    });

    it('should update a vehicle', async () => {
        const id = '1';
        const dto = new UpdateVehicleDto();
        await controller.update(id, dto);
        expect(service.updateVehicle).toHaveBeenCalledWith(+id, dto);
    });

    it('should delete a vehicle', async () => {
        const id = '1';
        await controller.remove(id);
        expect(service.deleteVehicle).toHaveBeenCalledWith(+id);
    });
});
