const searchUsersMock = {
    users: [
        {
            id: '11ea1626-fbbf-a2b0-9520-0242ac110002',
            userName: 'john.messi@do48.com',
            firstName: 'John',
            lastName: 'Messi',
            team: {
                id: '76713882-1621-11ea-96d5-02ca17608968',
                name: 'DefaultTeam'
            },
            fullName: 'John Messi'
        },
        {
            id: '11ea1626-fbbf-a2b0-9520-0242ac110003',
            userName: 'tom.hank@do48.com',
            firstName: 'Tom',
            lastName: 'Hank',
            team: {
                id: '76713882-1621-11ea-96d5-02ca17608968',
                name: 'DefaultTeam'
            },
            fullName: 'Tom Hank'
        },
        {
            id: '11ea1626-fbbf-a2b0-9520-0242ac110004',
            userName: 'carlos.johnson@do48.com',
            firstName: 'Carlos',
            lastName: 'Johnson',
            team: {
                id: '7ba6c122-22d9-4006-8e82-92aa31eb50ee',
                name: 'Admin Team'
            },
            fullName: 'Carlos Johnson'
        }
    ]
};

export class SearchUserMock {
    public static getUsearsDataMock() {
        return searchUsersMock;
    }
}