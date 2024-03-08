export const driverRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    softDelete: jest.fn(),
    findDriverByFilters: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
        andWhere: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([]),
    })),
};
const andWhere = jest.fn().mockReturnThis();

const createQueryBuilder = jest.fn(() => ({
    andWhere,
}));

export const driverService = {
    createDriver: jest.fn(),
    findAllDrivers: jest.fn(),
    findDriverById: jest.fn(),
    updateDriver: jest.fn(),
    deleteDriver: jest.fn(),
    createQueryBuilder
};
