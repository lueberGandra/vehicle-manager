export const drivers = [
    {
        id: 1,
        name: 'Din jarrin',
        createdAt: '2024-02-05T03:00:00.000Z',
        updatedAt: '2024-02-05T03:00:00.000Z',
        deletedAt: null,
    },
    {
        id: 2,
        name: 'khal drogo',
        createdAt: '2024-02-05T04:00:00.000Z',
        updatedAt: '2024-02-05T04:00:00.000Z',
        deletedAt: null,
    },
    {
        id: 3,
        name: 'Severo snape',
        createdAt: '2024-02-05T04:10:00.000Z',
        updatedAt: '2024-02-05T04:10:00.000Z',
        deletedAt: null,
    },
   
];
export const createDriver = {
    name: 'Din jarrin',
};

export const paginateDrivers = {
    items: drivers,
    links:{},
    meta: {
        totalItems: drivers.length,
        itemCount: drivers.length,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
    },
};
